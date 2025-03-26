// Binance WebSocket handler
let binanceSocket = null;

function connectBinanceWebSocket() {
    // Close any existing connection
    if (binanceSocket !== null) {
        binanceSocket.close();
    }

    // Connect to Binance WebSocket for multiple tickers
    connectToWebSocket('btcusdt');
    connectToWebSocket('ethusdt');
    connectToWebSocket('bnbusdt');
    connectToWebSocket('solusdt');
}

function connectToWebSocket(symbol) {
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`);

    socket.onopen = function() {
        console.log(`Connected to Binance WebSocket for ${symbol}`);
        document.getElementById(`${symbol}-price`).textContent = 'Connected, waiting for data...';
    };

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        updatePrice(data, symbol);
    };

    socket.onclose = function() {
        console.log(`Disconnected from Binance WebSocket for ${symbol}`);
        // Try to reconnect after 5 seconds
        setTimeout(() => connectToWebSocket(symbol), 5000);
    };

    socket.onerror = function(error) {
        console.error(`WebSocket Error for ${symbol}:`, error);
        document.getElementById(`${symbol}-price`).textContent = 'Error connecting to Binance';
    };
}

function updatePrice(data, symbol) {
    const priceElement = document.getElementById(`${symbol}-price`);
    const price = parseFloat(data.c).toFixed(2); // Current price
    const priceChange = parseFloat(data.p).toFixed(2); // Price change
    const percentChange = parseFloat(data.P).toFixed(2); // Percent change

    // Format with color based on price change
    const changeColor = priceChange >= 0 ? 'green' : 'red';
    const changeSymbol = priceChange >= 0 ? '▲' : '▼';
    
    priceElement.innerHTML = `
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
