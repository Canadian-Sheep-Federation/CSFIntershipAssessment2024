document.addEventListener('DOMContentLoaded', async function () {
  const form = document.getElementById('form');
  const quoteSelect = document.getElementById('favQuote');
  const responseList = document.getElementById('response-list');

  try {
    const response = await axios.get('https://strangerthings-quotes.vercel.app/api/quotes/10');
    const sayings = response.data;
    sayings.forEach((saying, index) => {
      const option = document.createElement('option');
      const id = index + 1;
      option.value = JSON.stringify(saying);
      option.textContent = saying.quote;
      quoteSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }

  async function getResponses() {
    const response = await axios.get('http://localhost:7894/responses');
    const responses = response.data;
    responseList.innerHTML = "";
    responses.forEach(response => {
      const li = document.createElement('li');
      li.textContent = `Name: ${response.name}, Age: ${response.age}, Quote: ${response.quote.quote} - ${response.quote.author}`;
      responseList.appendChild(li);
    });
  }

  getResponses();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    console.log(name);
    const age = document.getElementById('userAge').value;
    const selectedQuote = JSON.parse(quoteSelect.value);

    try {
      await axios.post('http://localhost:7894/submit', { name, age, quote: selectedQuote });
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  });
})