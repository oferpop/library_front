const API_URL = 'http://127.0.0.1:5000';

function showAddBook() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Add Book</h2>
        <form onsubmit="addBook(event)">
            <input type="text" id="bookName" placeholder="Book Name" required>
            <input type="text" id="bookAuthor" placeholder="Author" required>
            <input type="number" id="bookYear" placeholder="Year Published" required>
            <select id="bookType" required>
                <option value="1">Type 1 (10 days)</option>
                <option value="2">Type 2 (5 days)</option>
                <option value="3">Type 3 (2 days)</option>
            </select>
            <button type="submit">Add Book</button>
        </form>
    `;
}

async function addBook(event) {
    event.preventDefault();
    const book = {
        name: document.getElementById('bookName').value,
        author: document.getElementById('bookAuthor').value,
        year_published: parseInt(document.getElementById('bookYear').value),
        type: parseInt(document.getElementById('bookType').value)
    };
    try {
        const response = await axios.post(`${API_URL}/books`, book);
        alert(response.data.message);
    } catch (error) {
        alert('Error adding book');
    }
}

function showAddCustomer() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Add Customer</h2>
        <form onsubmit="addCustomer(event)">
            <input type="text" id="customerName" placeholder="Customer Name" required>
            <input type="text" id="customerCity" placeholder="City" required>
            <input type="number" id="customerAge" placeholder="Age" required>
            <button type="submit">Add Customer</button>
        </form>
    `;
}

async function addCustomer(event) {
    event.preventDefault();
    const customer = {
        name: document.getElementById('customerName').value,
        city: document.getElementById('customerCity').value,
        age: parseInt(document.getElementById('customerAge').value)
    };
    try {
        const response = await axios.post(`${API_URL}/customers`, customer);
        alert(response.data.message);
    } catch (error) {
        alert('Error adding customer');
    }
}

function showLoanBook() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Loan Book</h2>
        <form onsubmit="loanBook(event)">
            <input type="number" id="customerId" placeholder="Customer ID" required>
            <input type="number" id="bookId" placeholder="Book ID" required>
            <button type="submit">Loan Book</button>
        </form>
    `;
}

async function loanBook(event) {
    event.preventDefault();
    const loan = {
        cust_id: parseInt(document.getElementById('customerId').value),
        book_id: parseInt(document.getElementById('bookId').value)
    };
    try {
        const response = await axios.post(`${API_URL}/loans`, loan);
        alert(response.data.message);
    } catch (error) {
        alert('Error loaning book');
    }
}

function showReturnBook() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Return Book</h2>
        <form onsubmit="returnBook(event)">
            <input type="number" id="returnBookId" placeholder="Book ID" required>
            <button type="submit">Return Book</button>
        </form>
    `;
}

async function returnBook(event) {
    event.preventDefault();
    const bookId = parseInt(document.getElementById('returnBookId').value);
    try {
        const response = await axios.post(`${API_URL}/loans/return`, { book_id: bookId });
        alert(response.data.message);
    } catch (error) {
        alert('Error returning book');
    }
}

async function displayBooks() {
    const content = document.getElementById('content');
    try {
        const response = await axios.get(`${API_URL}/books`);
        const books = response.data;
        content.innerHTML = `
            <h2>Books</h2>
            <ul>
                ${books.map(book => `<li>${book.name} by ${book.author} (${book.year_published})</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        content.innerHTML = '<p>Error fetching books</p>';
    }
}

async function displayCustomers() {
    const content = document.getElementById('content');
    try {
        const response = await axios.get(`${API_URL}/customers`);
        const customers = response.data;
        content.innerHTML = `
            <h2>Customers</h2>
            <ul>
                ${customers.map(customer => `<li>${customer.name} from ${customer.city}, age ${customer.age}</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        content.innerHTML = '<p>Error fetching customers</p>';
    }
}

async function displayLoans() {
    const content = document.getElementById('content');
    try {
        const response = await axios.get(`${API_URL}/loans`);
        const loans = response.data;
        content.innerHTML = `
            <h2>Loans</h2>
            <ul>
                ${loans.map(loan => `<li>Customer ID: ${loan.cust_id}, Book ID: ${loan.book_id}, Loan Date: ${loan.loan_date}, Return Date: ${loan.return_date || 'Not returned'}</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        content.innerHTML = '<p>Error fetching loans</p>';
    }
}

async function displayLateLoans() {
    const content = document.getElementById('content');
    try {
        const response = await axios.get(`${API_URL}/loans/late`);
        const lateLoans = response.data;
        content.innerHTML = `
            <h2>Late Loans</h2>
            <ul>
                ${lateLoans.map(loan => `<li>Customer ID: ${loan.cust_id}, Book ID: ${loan.book_id}, Loan Date: ${loan.loan_date}, Expected Return Date: ${loan.return_date}</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        content.innerHTML = '<p>Error fetching late loans</p>';
    }
}

function showFindBook() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Find Book</h2>
        <form onsubmit="findBook(event)">
            <input type="text" id="bookSearchName" placeholder="Book Name" required>
            <button type="submit">Find Book</button>
        </form>
        <div id="searchResults"></div>
    `;
}

async function findBook(event) {
    event.preventDefault();
    const bookName = document.getElementById('bookSearchName').value;
    const searchResults = document.getElementById('searchResults');
    try {
        const response = await axios.get(`${API_URL}/books/search?name=${encodeURIComponent(bookName)}`);
        const books = response.data;
        searchResults.innerHTML = `
            <h3>Search Results</h3>
            <ul>
                ${books.map(book => `<li>${book.name} by ${book.author} (${book.year_published})</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        searchResults.innerHTML = '<p>Error searching for books</p>';
    }
}

function showFindCustomer() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Find Customer</h2>
        <form onsubmit="findCustomer(event)">
            <input type="text" id="customerSearchName" placeholder="Customer Name" required>
            <button type="submit">Find Customer</button>
        </form>
        <div id="searchResults"></div>
    `;
}

async function findCustomer(event) {
    event.preventDefault();
    const customerName = document.getElementById('customerSearchName').value;
    const searchResults = document.getElementById('searchResults');
    try {
        const response = await axios.get(`${API_URL}/customers/search?name=${encodeURIComponent(customerName)}`);
        const customers = response.data;
        searchResults.innerHTML = `
            <h3>Search Results</h3>
            <ul>
                ${customers.map(customer => `<li>${customer.name} from ${customer.city}, age ${customer.age}</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        searchResults.innerHTML = '<p>Error searching for customers</p>';
    }
}

function showRemoveBook() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Remove Book</h2>
        <form onsubmit="removeBook(event)">
            <input type="number" id="removeBookId" placeholder="Book ID" required>
            <button type="submit">Remove Book</button>
        </form>
    `;
}

async function removeBook(event) {
    event.preventDefault();
    const bookId = document.getElementById('removeBookId').value;
    try {
        const response = await axios.delete(`${API_URL}/books/${bookId}`);
        alert(response.data.message);
    } catch (error) {
        alert('Error removing book');
    }
}

function showRemoveCustomer() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Remove Customer</h2>
        <form onsubmit="removeCustomer(event)">
            <input type="number" id="removeCustomerId" placeholder="Customer ID" required>
            <button type="submit">Remove Customer</button>
        </form>
    `;
}

async function removeCustomer(event) {
    event.preventDefault();
    const customerId = document.getElementById('removeCustomerId').value;
    try {
        const response = await axios.delete(`${API_URL}/customers/${customerId}`);
        alert(response.data.message);
    } catch (error) {
        alert('Error removing customer');
    }
}