from flask import Flask, request,render_template
import pickle
import requests

app = Flask(__name__)


def quiz_builder(category, q_type, difficulty):
    cat_url = r'https://opentdb.com/api_category.php'
    base = r'https://opentdb.com/api.php?amount=10'
    if category != 'Any Category':
        response = requests.get(cat_url)
        cats = response.json()
        cat = cats['trivia_categories']
        for c in cat:
            if c['name'] == category:
                category = c['id']
                id =category
        base += f'&category={category}'
    if difficulty != 'Any Difficulty':
        base += f'&difficulty={difficulty}'
    if q_type != 'Any Type':
        base += f'&type={q_type}'
    response = requests.get(base)
    return response.json()


@app.route('/')
def hello_world():  # put application's code here
    return open('templates/index.html')


@app.route('/submit', methods=['POST'])
def submit():
    # get the data from the request

    name = request.form.get('name')
    category = request.form.get('trivia_category')
    q_type = request.form.get('question_type')
    difficulty = request.form.get('difficulty')
    try:
        dct = pickle.load(open('model.pkl', 'rb'))
        dct[len(dct) + 1] = {'name': name, 'category': category, 'q_type': q_type, 'difficulty': difficulty}
        print(dct)
        pickle.dump(dct, open('model.pkl', 'wb'))
    except FileNotFoundError:
        dct = {1: {'name': name, 'category': category, 'q_type': q_type, 'difficulty': difficulty}}
        pickle.dump(dct, open('model.pkl', 'wb'))
    qs = quiz_builder(category, q_type, difficulty)
    qs = qs['results']
    q = qs[0]
    ques = q['question']
    ans = q['correct_answer']
    choices = q['incorrect_answers']
    choices.append(ans)
    tp = q['type']
    qs.pop(0)
    if tp == 'multiple':
        game = open('templates/game.html')
        render_template(game,  category=category, q_type=q_type, difficulty=difficulty, ques=ques, ans=ans,)
    else:
        game = open('templates/game2.html')



    game = open('templates/game.html')
    return render_template(game, name=name, category=category, q_type=q_type, difficulty=difficulty)


@app.route('/get/<id>', methods=['GET'])
def get(id):
    try:
        dct = pickle.load(open('model.pkl', 'rb'))
        return dct[int(id)]
    except FileNotFoundError:
        return 'No data found'


@app.route('/get', methods=['GET'])
def get_all():
    try:
        dct = pickle.load(open('model.pkl', 'rb'))
        return dct
    except FileNotFoundError:
        return 'No data found'


if __name__ == '__main__':
    quiz_builder('Science: Computers', 'multiple', 'easy')
