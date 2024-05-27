async function fetchData(searchType, stockID, display) {
    try {
        console.log(`https://api.coincap.io/v2/${searchType}/${stockID}`);
        const url = `https://api.coincap.io/v2/${searchType}/${stockID}`;
        const response = await fetch(url);
        console.log('Fetching Responce: ', response);
        if (!response.ok) {
            throw new Error(`Could not fetch resource: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const dataValue = data.data;
        const stockInfoDiv = document.getElementById(display);
        html = ``;
            Object.entries(dataValue).forEach(([key, value]) => {
                html += `<h1>${key}: ${value}</h1>`;
                stockInfoDiv.innerHTML = html;
            });
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function storeFormData(){
    //receive stored items from localStorage
    var users = JSON.parse(localStorage.getItem('User')) || [];
    var stock = JSON.parse(localStorage.getItem('Stock')) || [];
    var amount = JSON.parse(localStorage.getItem('Amount')) || [];

    console.log('Before:', users, stock, amount);

    // Push additional form values to each array
    users.push(document.getElementById('formName').value);
    stock.push(document.getElementById('formStock').value);
    amount.push(document.getElementById('formAmount').value);

    // Store the updated arrays back into localStorage
    localStorage.setItem('User', JSON.stringify(users));
    localStorage.setItem('Stock', JSON.stringify(stock));
    localStorage.setItem('Amount', JSON.stringify(amount));
    window.location.href='index.html';

}