document.getElementById('searchForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const brand = document.getElementById('brand').value;
    const category = document.getElementById('category').value;
    const tag = document.getElementById('tag').value;

    let query = '/api/products?';

    if (brand) {
        query += `brand=${brand}&`;
    }
    if (category) {
        query += `category=${category}&`;
    }
    if (tag) {
        query += `tag_list=${tag}&`;
    }

    console.log('Query:', query);  // Debugging line

    try {
        const response = await fetch(query);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        console.log('Products:', products);  // Debugging line
        displayProducts(products);

        if (products.length === 0) {
            document.getElementById('suggestionFormContainer').style.display = 'block';
        } else {
            document.getElementById('suggestionFormContainer').style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching products:', error);  // Debugging line
        alert('Error fetching products');
    }
});

document.getElementById('suggestionForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const suggestionNumber = document.getElementById('suggestionNumber').value;
    const suggestedName = document.getElementById('suggestedName').value;
    const suggestedDescription = document.getElementById('suggestedDescription').value;

    const suggestionData = {
        suggestion_number: suggestionNumber,
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        suggested_name: suggestedName,
        suggested_description: suggestedDescription
    };

    try {
        const response = await fetch('/api/user-input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(suggestionData)
        });
        const result = await response.json();
        if (result.error) {
            alert(result.error);
        } else {
            alert('Suggestion submitted successfully');
            document.getElementById('viewSuggestionContainer').style.display = 'block';
        }
    } catch (error) {
        alert('Error submitting suggestion');
    }
});

document.getElementById('viewSuggestionForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const suggestionNumber = document.getElementById('searchSuggestionNumber').value;

    try {
        const response = await fetch(`/api/user-input/${suggestionNumber}`);
        const suggestion = await response.json();

        if (suggestion) {
            document.getElementById('detailBrand').textContent = suggestion.brand || 'N/A';
            document.getElementById('detailCategory').textContent = suggestion.category || 'N/A';
            document.getElementById('detailSuggestedDescription').textContent = suggestion.suggested_description || 'N/A';

            document.getElementById('suggestionDetails').style.display = 'block';
            document.getElementById('allSuggestions').style.display = 'none';
        } else {
            alert('Suggestion not found');
            document.getElementById('suggestionDetails').style.display = 'none';
        }
    } catch (error) {
        alert('Error fetching suggestion');
        document.getElementById('suggestionDetails').style.display = 'none';
    }
});

document.getElementById('showAllSuggestions').addEventListener('click', async function () {
    try {
        const response = await fetch('/api/user-input');
        const suggestions = await response.json();

        const tbody = document.getElementById('allSuggestionsBody');
        tbody.innerHTML = ''; // Clear previous suggestions

        suggestions.forEach(suggestion => {
            const row = document.createElement('tr');

            const numberCell = document.createElement('td');
            numberCell.textContent = suggestion.suggestion_number;
            row.appendChild(numberCell);

            const brandCell = document.createElement('td');
            brandCell.textContent = suggestion.brand || 'N/A';
            row.appendChild(brandCell);

            const categoryCell = document.createElement('td');
            categoryCell.textContent = suggestion.category || 'N/A';
            row.appendChild(categoryCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = suggestion.suggested_description || 'N/A';
            row.appendChild(descriptionCell);

            tbody.appendChild(row);
        });

        document.getElementById('suggestionDetails').style.display = 'none';
        document.getElementById('allSuggestions').style.display = 'block';
    } catch (error) {
        alert('Error fetching all suggestions');
        document.getElementById('allSuggestions').style.display = 'none';
    }
});

function displayProducts(products) {
    const container = document.getElementById('products');
    container.innerHTML = ''; // Clear previous results

    if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4 mb-4';

        const card = document.createElement('div');
        card.className = 'card h-100';

        const img = document.createElement('img');
        img.src = product.image_link;
        img.className = 'card-img-top';
        img.alt = product.name;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = product.name;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';

        // Handling null values to display "N/A"
        const brand = product.brand || 'N/A';
        const price = product.price ? `${product.price} ${product.price_sign || ''}` : 'N/A';
        const category = product.category || 'N/A';
        const description = product.description || 'N/A';

        cardText.innerHTML = `
            <strong>Brand:</strong> ${brand}<br>
            <strong>Price:</strong> ${price !== 'null ' ? price : 'N/A'}<br>
            <strong>Category:</strong> ${category}<br>
            ${description}
        `;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(img);
        card.appendChild(cardBody);
        productDiv.appendChild(card);
        container.appendChild(productDiv);
    });
}

