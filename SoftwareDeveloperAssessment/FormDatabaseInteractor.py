# we will use sqlite3 for database management
import sqlite3  


def close_database(cursor, connection):
    if cursor:
        cursor.close()
    if connection:
        connection.close()


def create_database():
    connection, cursor = None, None
    try:
        # connect to the database and create cursor
        connection = sqlite3.connect("FormDatabase.db")
        cursor = connection.cursor()

        # create a table
        cursor.execute("""CREATE TABLE IF NOT EXISTS form (
                                entry_id INTEGER PRIMARY KEY,
                                first_name TEXT NOT NULL, 
                                birthday DATE NOT NULL, 
                                bio TEXT, 
                                image TEXT NOT NULL)""")
        print("FormDatabase.db created or already exists")

    except sqlite3.Error:
        print("Failed to create FormDatabase.db")
    finally:
        close_database(cursor, connection)


"""
    Precondition: entry_ id is an integer, first_name is a string, birthday is a string of form YYYY/MM/DD, 
                    bio is a string, image is the url of an image, FormDatabase.db already exists
    Postcondition: inserts the entry into FormDatabase.db             
"""
def insert_entry(entry_id, first_name, birthday, bio, image):
    connection, cursor = None, None
    try:
        # connect to the database
        connection = sqlite3.connect("FormDatabase.db")
        cursor = connection.cursor()

        # insert entry into database
        cursor.execute("INSERT INTO form VALUES (?, ?, ?, ?, ?)",
                       (entry_id, first_name, birthday, bio, image))
        connection.commit()
        print("Entry inserted")
        return "Successfully inserted"

    except sqlite3.Error:
        print("Failed to insert entry")
        return "Failed to insert"
    finally:
        close_database(cursor, connection)


def get_entry(entry_id):
    connection, cursor = None, None
    try:
        # connect to the database and create cursor
        connection = sqlite3.connect("FormDatabase.db")
        cursor = connection.cursor()

        # get data corresponding to entry_id
        cursor.execute("SELECT * FROM form WHERE entry_id = ?", (entry_id,))
        print(f"Retrieved entry with id {entry_id}")

        # get and return entry
        keys = [column[0] for column in cursor.description]
        values = cursor.fetchone()
        return dict(zip(keys, values))

    except sqlite3.Error:
        print("Failed to get entry")
    finally:
        close_database(cursor, connection)


def get_all_entries():
    connection, cursor = None, None
    try:
        # connect to the database and create cursor
        connection = sqlite3.connect("FormDatabase.db")
        cursor = connection.cursor()

        # get all data
        cursor.execute("SELECT * FROM form")
        print("All entries retrieved")

        # return all data
        keys = [column[0] for column in cursor.description]
        all_entries = cursor.fetchall()
        res_dict = {}
        for entry in all_entries: # for every entry, we add it to res_dict
            new_entry = dict(zip(keys, entry))
            res_dict[f"entry_{entry[0]}"] = new_entry
        return res_dict

    except sqlite3.Error:
        print("Failed to get all entries")
    finally:
        close_database(cursor, connection)


def get_max_entry_id():
    connection, cursor = None, None
    try:
        # connect to the database and create cursor
        connection = sqlite3.connect("FormDatabase.db")
        cursor = connection.cursor()

        # query to get the maximum entry_id
        cursor.execute("SELECT MAX(entry_id) FROM form")
        max_entry_id = cursor.fetchone()[0]

        # if max_entry_id is None (no entries), return 0, otherwise return the value
        return max_entry_id if max_entry_id is not None else 0

    except sqlite3.Error:
        return 0  # Return 0 in case of failure
    finally:
        close_database(cursor, connection)


"""
    Some testing
"""
if __name__ == "__main__":
    create_database()
    insert_entry(0, "Chris", "2003/01/03", "Hello world!", "tests/eren.jpg")
    print(get_entry(0))
    insert_entry(1, "Bob", "2004/04/07", "Bob's bio", "tests/eren.jpg")
    insert_entry(2, "Rob", "2005/09/15", "Rob's bio", "tests/eren.jpg")
    insert_entry(3, "Santa", "0300/12/25", "Happy holidays", "tests/santa.jpg")
    print(get_all_entries())
