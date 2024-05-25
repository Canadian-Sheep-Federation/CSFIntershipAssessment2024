from flask import Flask, request, render_template, redirect
import sqlite3
import requests

app = Flask(__name__)

# Setting up database
def init_db():
    # connect to the data base
    conn = sqlite3.connect('database.db')
    # create table is table does not exist already
    conn.execute('''
        CREATE TABLE IF NOT EXISTS USERS (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            city TEXT,
            country TEXT,
            favorite TEXT,
            frequent TEXT
        )
    ''')
    # close the connection
    conn.close()

# Initialize the database
init_db()

# route for home page
@app.route("/")
def home():
    return render_template("index.html")

# route for Post
@app.route('/add-user', methods=['GET', 'POST'])
def add_user():
    if request.method == 'POST':
        name = request.form['name']
        city = request.form['city']
        country = request.form['country']
        favorite = request.form['favorite']
        frequent = request.form['frequent']
        
        # query to insert data into the database
        with sqlite3.connect('database.db') as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO USERS (name, city, country, favorite, frequent) VALUES (?, ?, ?, ?, ?)', 
                           (name, city, country, favorite, frequent))
            conn.commit()
        
        # redirect to all user page after adding user
        return redirect('/get-all-users')
    
    return render_template('form.html')
    
# route for all users page
@app.route('/get-all-users') 
def get_all_participants(): 

    # query to get all users
    connect = sqlite3.connect('database.db') 
    cursor = connect.cursor()
    cursor.execute('SELECT * FROM USERS') 
  
    data = cursor.fetchall()     
    return render_template("users.html", data=data)

# route to the search page for a single user
@app.route('/get-user', methods=['GET', 'POST'])
def get_user():
    if request.method == 'POST':
        user_id = request.form['id']
        
        # redirect to the searched user
        return redirect(f'/get-user/{user_id}')
    
    return render_template('search_user.html')

# route to the single user data by id
@app.route('/get-user/<int:id>', methods=['GET'])
def get_user_by_id(id):
    # query to get the data of the user from id
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM USERS WHERE id = ?', (id,))
        data = cursor.fetchone()
    
    return render_template('user.html', data=data)

# route to access the public api by weatherstack
@app.route('/weather', methods=['GET', 'POST'])
def get_weather():
    key = '967c641f38d5cabf63c2290c6f07e1a3'
    url = 'http://api.weatherstack.com/current'

    if request.method == 'POST':
        location = request.form['location']

        data = requests.get(url, params={
            'access_key': key,
            'query' : location
        }).json()

        return render_template('weather.html', data=data)
    
    return render_template('search_weather.html')

if __name__ == "__main__":
    app.run(debug=True)