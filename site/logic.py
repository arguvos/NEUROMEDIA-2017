from flask import Flask, render_template, request
from flask_pymongo import PyMongo
from flask import jsonify
import flask_login
import flask

app = Flask(__name__)
mongo = PyMongo(app)
login_manager = flask_login.LoginManager()
login_manager.init_app(app)
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
app.config["MONGO_DBNAME"] =  'db'
flask_login.home_page='index.html'
#Логи и пароль TODO: переместить в базу данных и использовать для пароля md5
users = {'admin': {'password': 'admin'}}

#Методы для flask_login
class User(flask_login.UserMixin):
    pass

@login_manager.user_loader
def user_loader(login):
    if login not in users:
        return

    user = User()
    user.id = login
    return user


@login_manager.request_loader
def request_loader(request):
    login = request.form.get('login')
    if login not in users:
        return

    user = User()
    user.id = login

    user.is_authenticated = request.form['password'] == users[login]['password']

    return user
#Конец методов для flask_login

#Методы для реализации авторизации
@app.route('/login', methods=['GET', 'POST'])
def login():
    if flask.request.method == 'GET':
        return '''
               <form action='login' method='POST'>
                <input type='text' name='login' id='login' placeholder='login'/>
                <input type='password' name='password' id='password' placeholder='password'/>
                <input type='submit' name='submit'/>
               </form>
               '''

    login = flask.request.form['login']
    if flask.request.form['password'] == users[login]['password']:
        user = User()
        user.id = login
        flask_login.login_user(user)
        return flask.redirect(flask.url_for('home_page'))

    return 'Bad login'

@app.route('/logout')
def logout():
    flask_login.logout_user()
    return 'Logged out'
#Конец методов для реализации авторизации

@app.route('/')
@flask_login.login_required
def home_page():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)