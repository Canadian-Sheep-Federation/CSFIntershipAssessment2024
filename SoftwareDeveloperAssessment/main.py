# we will be using Flask to facilitate API requests
from flask import Flask, request, jsonify, render_template, flash, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField
from wtforms.validators import DataRequired
import JikanAPI
import FormDatabaseInteractor

app = Flask(__name__)
app.config['SECRET_KEY'] = "3gJW5DrLYKZkdl2v" # for csrf validation


class Form(FlaskForm):
    first_name = StringField("Name", validators=[DataRequired()])
    birthday = DateField("Birthday", validators=[DataRequired()])
    bio = StringField("Bio")
    image = StringField("Image")  
    submit = SubmitField("Submit")


@app.route("/", methods=["GET", "POST"])
def form_page():
    first_name = None
    birthday = None
    bio = None
    characters = JikanAPI.get_characters(16498) # the characters from Attack on Titan
    form = Form()
    if form.validate_on_submit():
        first_name = form.first_name.data
        birthday = form.birthday.data.strftime("%Y-%m-%d")  # convert date to string
        bio = form.bio.data
        image = form.image.data  # Get the selected image URL
        entry_id = FormDatabaseInteractor.get_max_entry_id() + 1  # assign unique entry ID
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


# retrieve specific entry from database
@app.route("/GET/<entry_id>")
def get_entry(entry_id):
    entry = FormDatabaseInteractor.get_entry(entry_id)
    if entry:
        return jsonify(entry), 200
    return jsonify({}), 400



# retrieve all entries from database
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
        return jsonify({"entry_id": data["entry_id"]}), 200
    else:
        return jsonify({}), 400


# page responsible for viewing all entries
@app.route("/other-entries")
def other_entries_page():
    all_entries = FormDatabaseInteractor.get_all_entries()
    return render_template("other_entries.html", entries=all_entries)


if __name__ == "__main__":
    app.run(debug=True)
