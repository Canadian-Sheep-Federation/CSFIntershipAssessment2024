document.addEventListener('DOMContentLoaded', () => {
    //using the public API from alpha vantage to get the latest price of the stock
    document.getElementById('fetchStock').addEventListener('click', () => {
        const stockSymbol = document.getElementById('stockSymbol').value;
        fetch(`http://localhost:5100/api/stocks/${stockSymbol}`)
            .then(response => {return response.json();})
            .then(data => {
                const latestPrice = data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]]['4. close'];
                const stockDataDiv = document.getElementById('stockData');
                stockDataDiv.innerHTML = `Latest Price: ${latestPrice}`;
            })
            .catch(error => {
                console.error('Error fetching stock data:', error);
            });
    });
    
    // create js for the form and add fetch post request to connect with the server to save data.
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();

        const stockName = document.getElementById('stockName').value;
        const orderType = document.getElementById('orderType').value;
        const number = document.getElementById('number').value;
        const expiryDate = document.getElementById('expiryDate').value;

        console.log('Form data:', { stockName, orderType, number, expiryDate });

        fetch('http://localhost:5100/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ stockName, orderType, number, expiryDate })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Order placed:', data);
            fetchResponses();
        })
        .catch(error => {
            console.error('Error placing order:', error);
        });
    });
// fetch all the orders from the server and display them.
    function fetchResponses() {
        fetch('http://localhost:5100/api/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const responsesDiv = document.getElementById('responses');
                responsesDiv.innerHTML = '';
                data.forEach(order => {
                    const div = document.createElement('div');
                    div.textContent = `All the Current Orders: ID: ${order.id}, Symbol: ${order.stockName}, Order Type: ${order.orderType}, Quantity: ${order.number}, Expiry Date: ${order.ExpiryDate}`;
                    responsesDiv.appendChild(div);
                });
            })
            .catch(error => {
                console.error('Error fetching responses:', error);
            });
    }

    document.getElementById('findOrderForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const orderId = document.getElementById('orderId').value;
    
        fetch(`http://localhost:5100/api/${orderId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched order:', data);
                displayOrder(data);
            })
            .catch(error => {
                console.error('Error fetching order:', error);
            });
    });
    // display the order details for a specific order
    function displayOrder(order) {
        const orderDetailsDiv = document.getElementById('orderDetails');
        orderDetailsDiv.innerHTML = `
            <h2>Order Details</h2>
            ID: ${order.id}, Symbol: ${order.stockName}, Order Type: ${order.orderType}, Quantity: ${order.number}, Expiry Date: ${order.ExpiryDate}
        `;
    }
    

    fetchResponses();
});
