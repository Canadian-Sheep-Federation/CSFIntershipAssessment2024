function getCatData() {
  fetch('https://api.thecatapi.com/v1/images/search', { method: "GET" })
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .then((data) => {
      renderGalleryCard(data[0].id, data[0].url);
    });
}

function renderGalleryCard(id, image) {
  let catGallery = document.querySelector('.cat-gallery');

  let cardHTML = `
    <div class="col">
      <div class="card h-100">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${id}</h5>
          <a href="${image}" class="btn btn-outline-primary" target="_blank">View Image</a>
        </div>
      </div>
    </div>
  `;

  catGallery.innerHTML += cardHTML;
}

function submitForm() {
  const form = document.querySelector('.form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const color = document.querySelector('#color').value;
    const comment = document.querySelector('#comment').value;

    const data = {
      name: name,
      color: color,
      comment: comment
    };

    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Form submitted successfully:', data);
        alert(`Form submitted successfully. Your form ID is: ${data.id}`);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  });
}

function getFormById() {
  const formId = document.querySelector('#formId').value;

  fetch(`http://localhost:3000/${formId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Form data:', data);
      displayFormData(data);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      document.querySelector('#form-data').innerHTML = '<p>Error fetching form data</p>';
    });
}

function displayFormData(data) {
  const formDataDiv = document.querySelector('#form-data');
  if (data && Object.keys(data).length > 0) {
    formDataDiv.innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Color:</strong> ${data.color}</p>
      <p><strong>Comment:</strong> ${data.comment}</p>
    `;
  } else {
    formDataDiv.innerHTML = '<p>No form data found</p>';
  }
}

function displayFormData(data) {
  const formDataDiv = document.querySelector('#form-data');
  formDataDiv.innerHTML = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Color:</strong> ${data.color}</p>
    <p><strong>Comment:</strong> ${data.comment}</p>
  `;
}

getCatData();
submitForm();