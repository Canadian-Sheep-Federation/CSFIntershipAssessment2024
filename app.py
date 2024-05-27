#!/usr/bin/env python3
from flask import Flask, make_response, render_template, request
from flask_restful import abort, Api, Resource
from flask_sqlalchemy import SQLAlchemy
import requests, urllib.parse, os, json, base64

categories = {}
difficulties = ["easy", "medium", "hard"]

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Trivia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(300), nullable=False)
    answer = db.Column(db.Boolean, nullable=False)
    category = db.Column(db.String(300), nullable=False)

    def __repr__(self):
        return f"Trivia<Question = {self.question}, Answer = {self.answer}, Category = {self.category})"

class Items(Resource):
    def get(self):
        global categories, difficulties
        trivia_entries = Trivia.query.order_by(Trivia.id.asc()).all()
        response = make_response(render_template("index.html", categories=categories, difficulties=difficulties, trivia_entries=trivia_entries))
        response.headers['Content-Type'] = 'text/html'
        return response

    def post(self):
        global categories, difficulties
        url = "https://opentdb.com/api.php?"

        if request.form['amount'] and request.form['difficulty'] and request.form['category']:
            params = {
                'amount': int(request.form['amount']),
                'category': categories[request.form['category']],
                'difficulty': request.form['difficulty'],
                'encode': 'base64',
                'type': 'boolean'
            }
            if params["amount"] < 0 or params["amount"] > 30:
                abort(400, message="Please enter an amount between zero and thirty")
            result = json.loads(requests.get(url= url + urllib.parse.urlencode(params)).content)
            if result["response_code"] != 0:
                abort(500, message="Problem with api request, please try again")

            for item in range(params['amount']):
                question = base64.b64decode(result["results"][item]['question']).decode('utf-8')
                answer = bool(base64.b64decode(result["results"][item]['correct_answer']).decode('utf-8'))
                category = base64.b64decode(result["results"][item]['category']).decode('utf-8')
                trivia = Trivia(question=question, answer=answer, category=category)
                db.session.add(trivia)
                db.session.commit()
            return self.get()

        abort(500, message="There was a problem")

class Item(Resource):
    def get(self, trivia_id):
        trivia_entry = Trivia.query.filter_by(id=trivia_id).first()
        if not trivia_entry:
            abort(404, message="Trivia id not found")
        response = make_response(render_template("detail.html", trivia_entry=trivia_entry))
        response.headers['Content-Type'] = 'text/html'
        return response

class ClearItems(Resource):
    # Forgot that HTML doesn't support delete method lol
    def post(self):
        db.session.query(Trivia).delete()
        db.session.commit()
        return Items().get()

api.add_resource(Items, "/")
api.add_resource(Item, "/<int:trivia_id>")
api.add_resource(ClearItems, "/clear")

def get_categories():
    global categories
    url = "https://opentdb.com/api_category.php"
    result = json.loads(requests.get(url).content)
    
    for category in result["trivia_categories"]:
        categories[category["name"]] = category["id"]

if __name__ == "__main__":
    with app.app_context():
        get_categories()
        db.create_all()
        app.secret_key='12345'
        app.run(port=8000, debug=True)
