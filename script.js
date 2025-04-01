// Add this at the beginning of your script
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
async function fetchCryptoData() {
    try {
        showLoading('crypto-data');
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
        showError("Failed to fetch cryptocurrency data. Please try again later.");
    }
}
