const API_URL = "https://api.binance.com/api/v3/ticker/price";

async function fetchCryptoData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Select specific coins
        const coins = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"];
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

// Refresh every 5 seconds
setInterval(fetchCryptoData, 5000);

// Load data when page opens
fetchCryptoData();
