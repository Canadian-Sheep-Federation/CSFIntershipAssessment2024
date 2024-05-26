# Assessment for Software Developer

Developed REST API on [open library](https://openlibrary.org/dev/docs/api/search).

## Usage

```bash
cd backend && npm install
npm start
```

## Demo

I provided the Postman's export file of the collection of all apis for this little assessment project, which is located at `assessment/CSF Intership Assessment 2024.postman_collection.json`.

## Endpoints

### 1. Query Books from Open Library API

`GET /books`

**Description**:

Query all books from the Open Library API which match the specified name.

**Request Parameters**:

`name` (query parameter): The name of the book to search for. Must be written in pattern of `\w+(\+\w+)*` (e.g. "How+To+Learn+JavaScript").

**Response**:

200 OK: Returns a list of books matching the search criteria.

400 Bad Request: If the name query parameter is missing.

500 Internal Server Error: If there is an error querying the Open Library API.

### 2. Create a New Comment for a Book

`POST /books/:key/comments`

**Description**:
Create a new comment under a specific book.

**Request Parameters**:

`key`: The unique key of the book.

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "content": "This is a comment."
}
```

**Response**:

201 Created: Returns the created comment.

400 Bad Request: If there is an error in the request.

### 3. Get All Comments for a Book

`GET /books/:key/comments`

**Description**:

Retrieve all comments under a specific book.

**Request Parameters**:

`key`: The unique key of the book.

**Response**:

200 OK: Returns a list of comments.

400 Bad Request: If there is an error on the server.

### 4. Get a Specific Comment by ID for a Book

`GET /books/:key/comments/:id`

**Description**:

Retrieve a specific comment by ID under a specific book.

**Request Parameters**:

`key`:The unique key of the book.

`id`: The ID of the comment.

**Response**:

200 OK: Returns the comment.

404 Not Found: If the comment is not found.

400 Bad Request: If there is an error on the server.

### 5. Update a Comment by ID for a Book

`PUT /books/:key/comments/:id`

**Description**:

Update a specific comment by ID under a specific book.

**Request Parameters**:

`key`: The unique key of the book.

`id`: The ID of the comment.

**Request Body**:

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "content": "This is an updated comment."
}
```

**Response**:

200 OK: Returns the updated comment.

404 Not Found: If the comment is not found.

400 Bad Request: If there is an error in the request.

### 6. Delete a Comment by ID for a Book

`DELETE /books/:key/comments/:id`

**Description**:

Delete a specific comment by ID under a specific book.

**Request Parameters**:

`key`: The unique key of the book.

`id`: The ID of the comment.

**Response**:

204 No Content: If the comment is successfully deleted.

404 Not Found: If the comment is not found.

400 Bad Request: If there is an error on the server.

## Bonus Points

### Discuss how the application and api could be extended and improved

1. User Authentication and Authorization: Add middleware to intercept the requests to see if the request is from a user with permission to this resourse.

2. Form Validation: Sometimes the form submission need more complicated steps to validate the request, e.g. the format of each field, the risk of injection attack, etc.

3. Version Control: APIs can be version controlled by prefixing with "/v1", "/v2" to smoothly upgrade the api while keep old api intact.

4. Database Index: Database can also be improved by adding index for some frequently selected fields. In this assesment, I use bookKey to filter comments belonging to specific book, where we can add index on bookKey to improve performace.

### Discuss how the application and api should be deployed

Some static web app can be simply deployed onto cloud providers like Vercel, but apps like this project, which includes a backend server to deal with the requests, can't easily to do so. So normally I will design the CI/CD with GtiHub Actions and AWS:

1. Containerize the project so that we can ignore the env diff from dev and prod.

2. Rough test the project (like eslint check, baseline test cases) with GitHub Actions, and if the test passes, trigger the AWS to do the final stuff.

3. AWS will fetch the project image from docker (or directly from github repo) and do the overall test (because which may be costy on computing, better to do it on an instance), then setup the env and deploy to ECS or EC2 instance (can make it more high-available with AWS cloudfrot, S3, ELB).

### Intuitive design and user interface

I usually use React or NextJS for the frontend, and form validation (with Zod) and error messages for form (with react-hook-form) are libraries commomly used to provide a more responsive UI. For this project I didn't implement a UI due to time conflict by some other stuff, but can be proved by some of my sample of work.
