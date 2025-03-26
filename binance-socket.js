// Binance WebSocket handler
let binanceSocket = null;

function connectBinanceWebSocket() {
    // Close any existing connection
    if (binanceSocket !== null) {
        binanceSocket.close();
    }

    // Connect to Binance WebSocket for BTC/USDT ticker
    binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

    binanceSocket.onopen = function() {
        console.log('Connected to Binance WebSocket');
        document.getElementById('btc-price').textContent = 'Connected, waiting for data...';
    };

    binanceSocket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        updateBTCPrice(data);
    };

    binanceSocket.onclose = function() {
        console.log('Disconnected from Binance WebSocket');
        // Try to reconnect after 5 seconds
        setTimeout(connectBinanceWebSocket, 5000);
    };

    binanceSocket.onerror = function(error) {
        console.error('WebSocket Error:', error);
        document.getElementById('btc-price').textContent = 'Error connecting to Binance';
    };

    // Set up ping/pong to keep connection alive
    setInterval(function() {
        if (binanceSocket && binanceSocket.readyState === WebSocket.OPEN) {
            // Send empty pong frame
            binanceSocket.send(JSON.stringify({ pong: new Date().getTime() }));
        }
    }, 15000); // Send pong every 15 seconds
}

function updateBTCPrice(data) {
    const btcPriceElement = document.getElementById('btc-price');
    const price = parseFloat(data.c).toFixed(2); // Current price
    const priceChange = parseFloat(data.p).toFixed(2); // Price change
    const percentChange = parseFloat(data.P).toFixed(2); // Percent change

    // Format with color based on price change
    const changeColor = priceChange >= 0 ? 'green' : 'red';
    const changeSymbol = priceChange >= 0 ? '▲' : '▼';
    
    btcPriceElement.innerHTML = `
        <div class="price-container">
            <span class="current-price">${price}</span>
            <span class="price-change" style="color: ${changeColor}">
                ${changeSymbol} ${Math.abs(priceChange)} (${percentChange}%)
            </span>
            <div class="update-time">Last updated: ${new Date().toLocaleTimeString()}</div>
        </div>
    `;
}

// Connect when the page loads
document.addEventListener('DOMContentLoaded', connectBinanceWebSocket);

// Reconnect when the page becomes visible again
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible' && 
        (binanceSocket === null || binanceSocket.readyState !== WebSocket.OPEN)) {
        connectBinanceWebSocket();
    }
});
