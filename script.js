const darkModeToggle = document.getElementById("dark-mode-toggle");
const themeStatus = document.getElementById("theme-status");

darkModeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    document.querySelector("header").classList.toggle("dark-mode");
    document.querySelector("section").classList.toggle("dark-mode");
    document.querySelector("footer").classList.toggle("dark-mode");

    // Update theme status text
    themeStatus.textContent = document.body.classList.contains("dark-mode") ? "Dark" : "Light";

    // Save theme preference to local storage
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

window.onload = function() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.querySelector("header").classList.add("dark-mode");
        document.querySelector("section").classList.add("dark-mode");
        document.querySelector("footer").classList.add("dark-mode");
        themeStatus.textContent = "Dark";
    }
    
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear();
    
    // Initialize watchlist
    updateWatchlist();
    
    // Fetch stock data on page load
    fetchStockData();
};

function fetchStockData() {
    // For demo purposes, use hardcoded data instead of API call
    // In production, you would use a real API key and fetch live data
    const stockData = [
        { name: 'AAPL', price: 173.57, change: 2.35, percentChange: 1.37 },
        { name: 'GOOGL', price: 134.99, change: -0.59, percentChange: -0.44 },
        { name: 'AMZN', price: 127.74, change: 0.96, percentChange: 0.76 },
        { name: 'MSFT', price: 338.11, change: 3.27, percentChange: 0.98 },
        { name: 'TSLA', price: 214.65, change: -3.89, percentChange: -1.78 }
    ];
    
    updateStockTable(stockData);
    
    // Refresh data every 60 seconds
    setTimeout(fetchStockData, 60000);
}

function updateStockTable(stockData) {
    const tableBody = document.querySelector('#portfolio tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    
    stockData.forEach(stock => {
        const row = document.createElement('tr');
        
        // Determine color based on change
        const changeColor = stock.change >= 0 ? 'green' : 'red';
        const changeSymbol = stock.change >= 0 ? '▲' : '▼';
        
        row.innerHTML = `
            <td>${stock.name}</td>
            <td>${stock.price.toFixed(2)}</td>
            <td style="color: ${changeColor}">${changeSymbol} ${Math.abs(stock.change).toFixed(2)}</td>
            <td style="color: ${changeColor}">${changeSymbol} ${Math.abs(stock.percentChange).toFixed(2)}%</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Watchlist functionality
const watchlistItems = JSON.parse(localStorage.getItem('watchlist')) || [];

document.getElementById('add-to-watchlist').addEventListener('click', function() {
    const stockInput = document.getElementById('stock-input');
    const stockSymbol = stockInput.value.trim().toUpperCase();
    
    if (stockSymbol && !watchlistItems.includes(stockSymbol)) {
        watchlistItems.push(stockSymbol);
        localStorage.setItem('watchlist', JSON.stringify(watchlistItems));
        updateWatchlist();
        stockInput.value = '';
    }
});

function updateWatchlist() {
    const watchlistElement = document.getElementById('watchlist');
    const emptyMessage = document.getElementById('empty-watchlist-message');
    
    if (watchlistItems.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }
    
    emptyMessage.style.display = 'none';
    watchlistElement.innerHTML = '';
    
    watchlistItems.forEach(symbol => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${symbol}</span>
            <button class="remove-btn" data-symbol="${symbol}">Remove</button>
        `;
        watchlistElement.appendChild(listItem);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const symbol = this.getAttribute('data-symbol');
            const index = watchlistItems.indexOf(symbol);
            if (index !== -1) {
                watchlistItems.splice(index, 1);
                localStorage.setItem('watchlist', JSON.stringify(watchlistItems));
                updateWatchlist();
            }
        });
    });
}

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formStatus = document.getElementById('form-status');
    formStatus.textContent = 'Sending message...';
    
    // Simulate form submission
    setTimeout(() => {
        formStatus.textContent = 'Message sent successfully!';
        document.getElementById('contact-form').reset();
    }, 1500);
});
function fetchFinancialNews() {
    // Fetch financial news from an API
    const newsContainer = document.getElementById("news-container");
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    fetch(`https://newsapi.org/v2/everything?q=stocks&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const newsArticles = data.articles;
            newsArticles.forEach(article => {
                const newsItem = document.createElement("div");
                newsItem.innerHTML = `<a href="${article.url}">${article.title}</a>`;
                newsContainer.appendChild(newsItem);
            });
        });
}

// Form validation for contact form
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const formStatus = document.getElementById("form-status");

    if (name && email && message) {
        // Here you can add code to send the form data to a server
        formStatus.textContent = "Message sent successfully!";
        formStatus.style.color = "green";
        contactForm.reset(); // Reset the form
    } else {
        formStatus.textContent = "Please fill in all fields.";
        formStatus.style.color = "red";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.querySelector("footer p span#current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
