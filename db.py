
#connects to database.db, create the table.
# run this file in terminal so that the tabke is created.
import sqlite3

conn = sqlite3.connect('database.db')
print("database is opened successfully")

conn.execute('''
CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT
)
''')
print("Table is created")
conn.close()