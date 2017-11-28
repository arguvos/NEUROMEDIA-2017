resize()
var floor;
var room;
var lights;
var light_sensor;
var motion_detector;
var state;

function getState(){
	$.ajax({
        url: '/get_state',
        dataType: 'json',
        data: {data: JSON.stringify({"value": 'def'})},
        type: 'POST',
		async: false,
        success: function(response){
            window.state = response;
        },
        error: function(error){
            console.log(error);
        }
    });
}
		
function getFloor(){
	$.ajax({
        url: '/floor',
        dataType: 'json',
        data: {data: JSON.stringify({"value": 'def'})},
        type: 'POST',
		async: false,
        success: function(response){
            window.floor = response;
			ctrl=2;
        },
        error: function(error){
            console.log(error);
        }
    });
}		
		
function getLights(strRoom){
	var data = {
            data: JSON.stringify({
                "value": strRoom
            })
        }	
	
	$.ajax({
        url: '/lights',
        dataType: 'json',
        data: data,        
        type: 'POST',
		async: false,
        success: function(response){
            window.lights = response;
        },
        error: function(error){
            console.log(error);
        }
    });
}
		
function getData(strRoom){	
    var data = {
            data: JSON.stringify({
                "value": strRoom
            })
        }
		
	$.ajax({
        url: '/floor',
        dataType: 'json',
        data: {data: JSON.stringify({"value": 'def'})},
        type: 'POST',
		async: false,
        success: function(response){
            window.floor = response;
			ctrl=2;
        },
        error: function(error){
            console.log(error);
        }
    });
	
    $.ajax({
        url: '/room',
        dataType: 'json',
        data: data,        
        type: 'POST',
		async: false,
        success: function(response){
            window.room = response;
        },
        error: function(error){
            console.log(error);
        }
    });

    $.ajax({
        url: '/lights',
        dataType: 'json',
        data: data,        
        type: 'POST',
		async: false,
        success: function(response){
            window.lights = response;
        },
        error: function(error){
            console.log(error);
        }
    });

    $.ajax({
        url: '/light_sensor',
        dataType: 'json',
        data: data,        
        type: 'POST',
		async: false,
        success: function(response){
            window.light_sensor = response;
        },
        error: function(error){
            console.log(error);
        }
    });

    $.ajax({
        url: '/motion_detector',
        dataType: 'json',
        data: data,        
        type: 'POST',
		async: false,
        success: function(response){
            window.motion_detector = response;
        },
        error: function(error){
            console.log(error);
        }
    });
}

function draw(){
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#"
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'grey';
    ctx.lineCap="round";
    board = 50;
	    
    
    kX = (canvas.width-board)/arrayMax(room.coordinateX);
    kY = (canvas.height-board)/arrayMax(room.coordinateY);

    k = kX < kY ? kX : kY

    offsetX = ( (canvas.width) - arrayMax(room.coordinateX) * k ) / 2
    offsetY = ( (canvas.height) - arrayMax(room.coordinateY) * k ) / 2
	
	//стены
	l = room.coordinateX["length"];
    for (var i=0;i<l;i++)
    {
        ctx.beginPath();
        if(i!=l-1)
        {
            ctx.moveTo( offsetX + room.coordinateX[i] * k, offsetY + room.coordinateY[i] * k);
            ctx.lineTo( offsetX + room.coordinateX[i+1] * k, offsetY + room.coordinateY[i+1] * k);
        }
        else
        {
            ctx.moveTo( offsetX + room.coordinateX[i] * k,  offsetY + room.coordinateY[i] * k);
            ctx.lineTo( offsetX + room.coordinateX[0] * k,  offsetY + room.coordinateY[0] * k);   
        }
        ctx.stroke();
    }

    //свет
	max = 15;
	min = 5;
    l = lights["length"];
    for (var i=0;i<l;i++)
    {        
        ctx.strokeStyle = lights[i].color;
        ctx.beginPath();

        ctx.arc( offsetX + lights[i].coordinateXY[0] * k, offsetY + lights[i].coordinateXY[1] * k, 5, 0, 2 * Math.PI, false)
        ctx.stroke();
		
		ctx.font='15px Verdana';
		ctx.fillStyle='#000000';
		ctx.fillText(i, (offsetX + lights[i].coordinateXY[0] * k)-5, (offsetY + lights[i].coordinateXY[1] * k)+5);
    }

    //датчик света
    l = light_sensor["length"];
    ctx.strokeStyle = 'green';
    
    for (var i=0;i<l;i++)
    {         
        ctx.beginPath();
        ctx.arc( offsetX + light_sensor[i].coordinateXY[0] * k, offsetY + light_sensor[i].coordinateXY[1] * k, 5, 0, 2 * Math.PI, false)
        ctx.stroke();
    }

    //датчики движения
    l = motion_detector["length"];
    ctx.strokeStyle = 'black';
    
    for (var i=0;i<l;i++)
    {         
        ctx.beginPath();
        ctx.arc( offsetX + motion_detector[i].coordinateXY[0] * k, offsetY + motion_detector[i].coordinateXY[1] * k, 5, 0, 2 * Math.PI, false)
        ctx.stroke();
    }        
}

function arrayMax(arr) {
  return arr.reduce(function (p, v) {
    return ( p > v ? p : v );
  });
}


function resize() {
    var canvas = document.getElementById('canvas'),
            context = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {            
			document.getElementById("canvas").width = document.getElementById("plan-id").clientWidth;
			document.getElementById("canvas").height = document.getElementById("plan-id").clientHeight;
            drawStuff(); 
    }
    resizeCanvas();

    function drawStuff() {
            // do your drawing stuff here
    }
}

function update(){
	getState()	
}

//setTimeout(update, 10000);

