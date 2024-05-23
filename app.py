from flask import Flask, request, render_template, redirect, url_for
import pickle
import requests

app = Flask(__name__)

# Calls the Public Quiz API to compile questions returns JSON
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
                id = category
        base += f'&category={category}'
    if difficulty != 'Any Difficulty':
        base += f'&difficulty={difficulty.lower()}'
    if q_type != 'Any Type':
        if q_type == 'Multiple Choice':
            q_type = 'multiple'
        else:
            q_type = 'boolean'
        base += f'&type={q_type.lower()}'
    response = requests.get(base)
    return response.json()


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get('name')
    category = request.form.get('trivia_category')
    q_type = request.form.get('question_type')
    difficulty = request.form.get('difficulty')

    try:
        dct = pickle.load(open('model.pkl', 'rb'))
        dct[len(dct) + 1] = {'name': name, 'category': category, 'q_type': q_type, 'difficulty': difficulty}
        pickle.dump(dct, open('model.pkl', 'wb'))
    except FileNotFoundError:
        dct = {1: {'name': name, 'category': category, 'q_type': q_type, 'difficulty': difficulty}}
        pickle.dump(dct, open('model.pkl', 'wb'))

    qs = quiz_builder(category, q_type, difficulty)['results']
    return render_template('game.html', name=name, category=category, q_type=q_type, difficulty=difficulty,
                           questions=qs, index=0, feedback=None)

@app.route('/get', defaults={'index': None})
@app.route('/get/<int:index>')
def get(index):
    try:
        dct = pickle.load(open('model.pkl', 'rb'))
    except FileNotFoundError:
        if index is None:
            return "No entries are in the database."
        else:
            return f"Less than {index} entries are in the database."

    if index is None:
        return dct
    elif index in dct:
        return dct[index]
    else:
        return f"No entry found for index {index}."
@app.route('/game/<int:index>', methods=['POST'])
def game(index):
    questions = eval(
        request.form.get('questions'))  # This is generally not recommended, use safer methods in production.
    name = request.form.get('name')
    category = request.form.get('category')
    q_type = request.form.get('q_type')
    difficulty = request.form.get('difficulty')
    user_answer = request.form.get('answer')
    correct_answer = request.form.get('correct_answer')

    if request.form.get('feedback') == '1':
        is_correct = user_answer == correct_answer
        feedback = 'Correct!' if is_correct else f'Wrong! The correct answer was: {correct_answer}'
        return render_template('game.html', name=name, category=category, q_type=q_type, difficulty=difficulty,
                               questions=questions, index=index, feedback=feedback)

    if index + 1 < len(questions):
        next_index = index + 1
    else:
        return render_template('end.html', feedback=None, correct=None, questions=questions, index=index)

    return render_template('game.html', name=name, category=category, q_type=q_type, difficulty=difficulty,
                           questions=questions, index=next_index, feedback=None)


if __name__ == '__main__':
    app.run(debug=True)
