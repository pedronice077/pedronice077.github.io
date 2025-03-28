const API_URL = "https://api.binance.com/api/v3/ticker/price";
const FOREX_API_URL = "https://api.exchangerate-api.com/v4/latest/USD"; // Example API for forex data
const NEWS_API_URL = "https://newsapi.org/v2/everything?q=crypto&apiKey=YOUR_API_KEY"; // Example API for news
const ECONOMIC_CALENDAR_API_URL = "https://api.economiccalendar.com/v1/events"; // Example API for economic calendar

const ADDITIONAL_COINS = ["ETHUSDT", "BNBUSDT", "SOLUSDT"]; // Additional cryptocurrencies

async function fetchCryptoData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Select specific coins
        const coins = ["BTCUSDT", ...ADDITIONAL_COINS]; // Include additional coins
        const filteredData = data.filter(coin => coins.includes(coin.symbol));

        const tableBody = document.getElementById("crypto-data");
        tableBody.innerHTML = ""; // Clear previous data

        filteredData.forEach(coin => {
            const row = `<tr>
                <td>${coin.symbol.replace("USDT", "")}</td>
                <td>$${parseFloat(coin.price).toFixed(2)}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

setInterval(fetchCryptoData, 5000);
setInterval(fetchForexData, 60000); // Refresh forex data every 60 seconds
setInterval(fetchNews, 300000); // Refresh news every 5 minutes
setInterval(fetchEconomicCalendar, 3600000); // Refresh economic calendar every hour

setInterval(fetchCryptoData, 5000);

async function fetchForexData() {
    try {
        const response = await fetch(FOREX_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const forexDataDiv = document.getElementById("forex-data");
        forexDataDiv.innerHTML = ""; // Clear previous data

        // Display forex data (example for USD to EUR)
        const usdToEur = data.rates.EUR;
        forexDataDiv.innerHTML += `<p>1 USD = ${usdToEur} EUR</p>`;
    } catch (error) {
        console.error("Error fetching forex data:", error);
    }
}

async function fetchNews() {
    try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const newsContentDiv = document.getElementById("news-content");
        newsContentDiv.innerHTML = ""; // Clear previous news

        data.articles.forEach(article => {
            newsContentDiv.innerHTML += `<h3>${article.title}</h3><p>${article.description}</p>`;
        });
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

async function fetchEconomicCalendar() {
    try {
        const response = await fetch(ECONOMIC_CALENDAR_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const calendarDataDiv = document.getElementById("calendar-data");
        calendarDataDiv.innerHTML = ""; // Clear previous calendar events

        data.events.forEach(event => {
            calendarDataDiv.innerHTML += `<p>${event.date}: ${event.title}</p>`;
        });
    } catch (error) {
        console.error("Error fetching economic calendar:", error);
    }
}

// Load data when page opens
fetchCryptoData();
fetchForexData();
fetchNews();
fetchEconomicCalendar();
