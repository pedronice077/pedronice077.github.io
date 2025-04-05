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
    // Create a table row element
    const row = document.createElement('tr');

    // Create and populate the first cell
    const symbolCell = document.createElement('td');
    symbolCell.textContent = coin.symbol.replace("USDT", "");
    row.appendChild(symbolCell);

    // Create and populate the second cell
    const priceCell = document.createElement('td');
    priceCell.textContent = `$${parseFloat(coin.price).toFixed(2)}`;
    row.appendChild(priceCell);

    // Append the row to the table body
    tableBody.appendChild(row);
});
