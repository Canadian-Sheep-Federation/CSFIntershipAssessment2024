# I have used sqllite database
# Run this file to run the application

from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)

def connect_db():
    #connect to db
    return sqlite3.connect('database.db')

@app.route('/locations', methods=['POST'])
#create new location entry, insert the location to table
def create_location():
    data = request.get_json()
    name = data['name']
    description = data.get('description', '')
    category = data.get('category', '')
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO locations (name, description, category) VALUES (?, ?, ?)",
        (name, description, category))
    conn.commit()
    location_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': location_id}), 201

@app.route('/locations', methods=['GET'])
# to get all location entries
def get_all_locations():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM locations")
    locations = cursor.fetchall()
    conn.close()
    return jsonify([{'id': location[0], 'name': location[1], 'description': location[2], 'category': location[3]} for location in locations])

@app.route('/search', methods=['GET'])
# this is used to search for locations
def search_locations():
    query = request.args.get('query', '')
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM locations WHERE name LIKE ? OR description LIKE ? OR category LIKE ?", 
                   ('%' + query + '%', '%' + query + '%', '%' + query + '%'))
    locations = cursor.fetchall()
    conn.close()
    return jsonify([{'id': location[0], 'name': location[1], 'description': location[2], 'category': location[3]} for location in locations])

@app.route('/')
def web_app():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
