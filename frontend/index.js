const apiUrl = 'http://localhost:3200/products';

// Fetch and display all products
async function fetchProducts() {
    const response = await fetch(apiUrl);
    const result = await response.json();
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const products = result.data ? result.data.products : [];

    if (products.length === 0) {
        productList.innerHTML = '<p>No products found.</p>';
    } else {
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product');
            productItem.innerHTML = `
                <strong>Product ID:</strong> ${product._id} <br>
                <strong>Name:</strong> ${product.name} <br>
                <strong>Quantity:</strong> ${product.quantity}
            `;
            productList.appendChild(productItem);
        });
    }
}

// Add new product
document.getElementById('add-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = document.getElementById('productName').value;
    const quantity = document.getElementById('productQuantity').value;

    const response = await fetch(`${apiUrl}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, quantity })
    });

    const data = await response.json();
    if (data.data && data.data.product) {
        alert('Product added successfully');
        fetchProducts();
        form.reset(); // Reset the form inputs
    } else {
        alert('Error adding product');
    }
});

// Update product quantity
document.getElementById('update-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const id = document.getElementById('updateProductId').value;
    const number = document.getElementById('updateQuantity').value;

    const response = await fetch(`${apiUrl}/${id}/update_quantity?number=${number}`, {
        method: 'POST',
    });

    const data = await response.json();
    if (data.data && data.data.product) {
        alert('Quantity updated successfully');
        fetchProducts();
        form.reset(); // Reset the form inputs
    } else {
        alert('Error updating quantity');
    }
});

// Delete product
document.getElementById('delete-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const id = document.getElementById('deleteProductId').value;

    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    if (data.data && data.data.message === 'Product deleted') {
        alert('Product deleted successfully');
        fetchProducts();
        form.reset(); // Reset the form inputs
    } else {
        alert('Error deleting product');
    }
});

// Initial fetch of products when the page loads
fetchProducts();
