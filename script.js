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
        themeStatus.textContent = "Dark";
    }
    updateWatchlist(); // Load watchlist on page load
};

function fetchStockData() {
    // Fetch real-time stock data from an API
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const stockSymbols = ['AAPL', 'GOOGL', 'AMZN'];
    const stockData = [];

    stockSymbols.forEach(symbol => {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const latestData = data['Time Series (5min)'];
                const latestTime = Object.keys(latestData)[0];
                const stockInfo = latestData[latestTime];
                stockData.push({
                    name: symbol,
                    price: parseFloat(stockInfo['1. open']),
                    change: parseFloat(stockInfo['4. close']) - parseFloat(stockInfo['1. open']),
                    percentChange: ((parseFloat(stockInfo['4. close']) - parseFloat(stockInfo['1. open'])) / parseFloat(stockInfo['1. open'])) * 100
                });
                updateStockTable();
            });
    });

    function updateStockTable() {
        const tableBody = document.querySelector("#portfolio tbody");
        tableBody.innerHTML = ''; // Clear existing rows
        stockData.forEach(stock => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${stock.name}</td>
                <td>$${stock.price.toFixed(2)}</td>
                <td>${stock.change > 0 ? '+' : ''}${stock.change.toFixed(2)}</td>
                <td>${stock.percentChange > 0 ? '+' : ''}${stock.percentChange.toFixed(2)}%</td>
            `;
            tableBody.appendChild(row);
        });
    }
}

function addToWatchlist(stockSymbol) {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!watchlist.includes(stockSymbol)) {
        watchlist.push(stockSymbol);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        updateWatchlist();
    }
}

function updateWatchlist() {
    const watchlistContainer = document.getElementById("watchlist");
    watchlistContainer.innerHTML = ''; // Clear existing items
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist.forEach(symbol => {
        const listItem = document.createElement("li");
        listItem.textContent = symbol;
        watchlistContainer.appendChild(listItem);
    });
}

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
