import requests
from flask import Flask, request, jsonify, render_template, flash, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField
from wtforms.validators import DataRequired
import JikanAPI

import FormDatabaseInteractor

app = Flask(__name__)
app.config['SECRET_KEY'] = "3gJW5DrLYKZkdl2v" # for csrf validation

entry_counter = FormDatabaseInteractor.get_max_entry_id() + 1 # used to generate unique ids


class Form(FlaskForm):
    first_name = StringField("Name", validators=[DataRequired()])
    birthday = DateField("Birthday", validators=[DataRequired()])
    bio = StringField("Bio")
    image = StringField("Image")  # Add image field to the form
    submit = SubmitField("Submit")


@app.route("/", methods=["GET", "POST"])
def form_page():
    global entry_counter
    first_name = None
    birthday = None
    bio = None
    characters = JikanAPI.get_characters(16498)
    form = Form()
    if form.validate_on_submit():
        first_name = form.first_name.data
        birthday = form.birthday.data.strftime("%Y-%m-%d")  # Convert date to string
        bio = form.bio.data
        image = form.image.data  # Get the selected image URL
        entry_id = entry_counter  # Assign unique entry ID
        entry_counter += 1  # Increment counter for next submission
        data = {
            "entry_id": entry_id,
            "first_name": first_name,
            "birthday": birthday,
            "bio": bio,
            "image": image
        }
        print(data["entry_id"], data["first_name"], data["birthday"], data["bio"], data["image"])
        FormDatabaseInteractor.create_database()
        FormDatabaseInteractor.insert_entry(data["entry_id"], data["first_name"], data["birthday"],
                                            data["bio"], data["image"])
        flash("Form submitted successfully!", "success")
        return redirect(url_for("form_page"))
    return render_template("form.html", first_name=first_name, birthday=birthday,
                           bio=bio, characters=characters, form=form)
@app.route("/GET/<entry_id>")
def get_entry(entry_id):
    entry = FormDatabaseInteractor.get_entry(entry_id)
    if entry:
        return jsonify(entry), 200
    return jsonify({}), 400


@app.route("/GET/")
def get_all_entries():
    entry = FormDatabaseInteractor.get_all_entries()
    if entry:
        return jsonify(entry), 200
    return jsonify({}), 400


@app.route("/POST/", methods=["POST"])
def insert_entry():
    data = request.get_json()
    status = FormDatabaseInteractor.insert_entry(data["entry_id"], data["first_name"],
                                                 data["birthday"], data["bio"], data["image"])
    if status == "Success":
        code = 200
    else:
        code = 400
    return jsonify({f"entry_{data["entry_id"]}": status}), code


@app.route("/other-entries")
def other_entries_page():
    all_entries = FormDatabaseInteractor.get_all_entries()
    return render_template("other_entries.html", entries=all_entries)


if __name__ == "__main__":
    app.run(debug=True)
