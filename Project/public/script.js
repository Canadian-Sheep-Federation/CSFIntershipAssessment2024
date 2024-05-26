document.getElementById('cat-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const statusCode = document.getElementById('status-code').value;
  const catImageUrl = `/query?status-code=${statusCode}`;
  const catImage = document.getElementById('cat-image');
  catImage.src = catImageUrl;
  catImage.style.display = 'block';

  const commentForm = document.getElementById('comment-form');
  commentForm.style.display = 'block';

  commentForm.onsubmit = async function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const comment = document.getElementById('comment').value;
      const response = await fetch('/comments', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ statusCode, name, comment })
      });
      const result = await response.json();
      console.log(`Comment added with ID: ${result.id}`);
      displayComments(result.comments);
  };

  fetch(`/comments?status-code=${statusCode}`)
      .then(response => response.json())
      .then(data => displayComments(data.comments));
});

document.getElementById('fetch-all-comments').addEventListener('click', function() {
  document.getElementById('all-comments-container').style.display = 'block';
  document.getElementById('single-comment-container').style.display = 'none';
  fetch('/comments/all')
      .then(response => response.json())
      .then(data => displayAllComments(data.comments));
});

document.getElementById('fetch-comment-by-id').addEventListener('click', function() {
  document.getElementById('single-comment-container').style.display = 'block';
  document.getElementById('all-comments-container').style.display = 'none';
  const commentId = document.getElementById('comment-id').value;
  fetch(`/comments/${commentId}`)
      .then(response => response.json())
      .then(data => displaySingleComment(data.comment));
});

// async function deleteComment(commentId) {
//   await fetch(`/comments/${commentId}`, { method: 'DELETE' });
//   document.getElementById('fetch-all-comments').click();
// }


// After searching a Status Code Cat.
// Display all the comments for that specific Status Code Cat
function displayComments(comments) {
  const commentsContainer = document.getElementById('comments-container');
  commentsContainer.innerHTML = '';
  comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment';
      commentDiv.innerHTML = `
          <div style="display:flex">
            <img src="./media/user.png" alt="${comment.name}">
            <strong>ID ${comment.id} - ${comment.name}</strong>: ${comment.comment} (Status Code: ${comment.status_code})
          </div>
      `;
      commentsContainer.appendChild(commentDiv);
  });
}

// Display all the comments currently stored in the DB
function displayAllComments(comments) {
  const allCommentsContainer = document.getElementById('all-comments-container');
  allCommentsContainer.innerHTML = '<h2>All Comments</h2>';
  comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment';
      commentDiv.innerHTML = `
          <div style="display:flex">
            <img src="./media/user.png" alt="${comment.name}">
            <strong>ID ${comment.id} - ${comment.name}</strong>: ${comment.comment} (Status Code: ${comment.status_code})
          </div>
      `;
      allCommentsContainer.appendChild(commentDiv);
  });
}

// Display Single comment searched by ID stored in the DB
function displaySingleComment(comment) {
  const singleCommentContainer = document.getElementById('single-comment-container');
  singleCommentContainer.innerHTML = `
      <h2>Comment ID ${comment.id}</h2>
      <div class="comment">
        <div style="display:flex">
          <img src="./media/user.png" alt="${comment.name}">
          <strong>ID ${comment.id} - ${comment.name}</strong>: ${comment.comment} (Status Code: ${comment.status_code})
        </div>
        </div>
        `;
        // <img src="./media/delete-icon.png" class="delete-btn" onclick="deleteComment(${comment.id})" alt="Delete">
}
