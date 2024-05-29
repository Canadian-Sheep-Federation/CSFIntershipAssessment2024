from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
DATABASE = 'reviews.db'

def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS reviews
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, recipe_name TEXT, score INTEGER,
                  difficulty TEXT, preparation_time INTEGER)''')
    conn.commit()
    conn.close()

@app.route('/', methods=['POST'])
def add_review():
    data = request.json
    print("Received data:", data)  # Debug print statement
    try:
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        c.execute("INSERT INTO reviews (recipe_name, score, difficulty, preparation_time) VALUES (?, ?, ?, ?)",
                  (data['recipe_name'], data['score'], data['difficulty'], data['preparation_time']))
        conn.commit()
        review_id = c.lastrowid
        print("Inserted data with id:", review_id)  # Debug print statement
    except Exception as e:
        print("Error:", e)  # Debug print statement
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
    return jsonify({'id': review_id})

@app.route('/<int:id>', methods=['GET'])
def get_review(id):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("SELECT * FROM reviews WHERE id = ?", (id,))
    review = c.fetchone()
    conn.close()
    if review:
        return jsonify({'id': review[0], 'recipe_name': review[1], 'score': review[2],
                        'difficulty': review[3], 'preparation_time': review[4]})
    else:
        return jsonify({'error': 'Review not found'}), 404

@app.route('/', methods=['GET'])
def get_all_reviews():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("SELECT * FROM reviews")
    reviews = c.fetchall()
    conn.close()
    return jsonify([{'id': review[0], 'recipe_name': review[1], 'score': review[2],
                     'difficulty': review[3], 'preparation_time': review[4]} for review in reviews])

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
