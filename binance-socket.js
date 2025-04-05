<script src="binance-socket.js"></script>
document.addEventListener('DOMContentLoaded', () => {
    const symbols = ['btcusdt', 'ethusdt', 'bnbusdt', 'solusdt'];
    const sockets = {};

    function connectToWebSocket(symbol) {
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`);

        socket.onopen = () => {
            console.log(`Connected to Binance WebSocket for ${symbol}`);
            updateStatus(symbol, 'Connected, waiting for data...');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            updatePrice(data, symbol);
        };

        socket.onclose = () => {
            console.log(`Disconnected from Binance WebSocket for ${symbol}`);
            updateStatus(symbol, 'Disconnected, attempting to reconnect...');
            setTimeout(() => connectToWebSocket(symbol), 5000);
        };

        socket.onerror = (error) => {
            console.error(`WebSocket Error for ${symbol}:`, error);
            updateStatus(symbol, 'Error connecting to Binance');
        };

        sockets[symbol] = socket;
    }

    function updateStatus(symbol, status) {
        const priceElement = document.getElementById(`${symbol}-price`);
        if (priceElement) {
            priceElement.textContent = status;
        }
    }

    function updatePrice(data, symbol) {
        const priceElement = document.getElementById(`${symbol}-price`);
        if (!priceElement) return;

        const price = parseFloat(data.c).toFixed(2);
        const priceChange = parseFloat(data.p).toFixed(2);
        const percentChange = parseFloat(data.P).toFixed(2);

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

    function connectBinanceWebSocket() {
        symbols.forEach(symbol => connectToWebSocket(symbol));
    }

    connectBinanceWebSocket();

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            symbols.forEach(symbol => {
                if (!sockets[symbol] || sockets[symbol].readyState !== WebSocket.OPEN) {
                    connectToWebSocket(symbol);
                }
            });
        }
    });
});
