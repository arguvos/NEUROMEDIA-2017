$.ajax({
	url: '/home',
	data: 'OK',
	type: 'POST',
	success: function(response){
		console.log(response);
	},
	error: function(error){
		console.log(error);
	}
});