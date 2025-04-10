 import React from 'react';
import { Helmet } from 'react-helmet';
import Dashboard from '@/components/Dashboard';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Overview of the application dashboard" />
      </Helmet>
      <Dashboard />
    </>
  );
};

export default Index;
  { id: 'binancecoin', rank: 3, name: 'Binance Coin', symbol: 'BNB', price: 320, change: 0.68, volume: 1900000000 },
  { id: 'solana', rank: 4, name: 'Solana', symbol: 'SOL', price: 142, change: 5.32, volume: 3700000000 },
  { id: 'ripple', rank: 5, name: 'XRP', symbol: 'XRP', price: 0.598, change: -2.34, volume: 1800000000 },
  { id: 'cardano', rank: 6, name: 'Cardano', symbol: 'ADA', price: 0.45, change: -0.85, volume: 720000000 },
  { id: 'polkadot', rank: 7, name: 'Polkadot', symbol: 'DOT', price: 6.24, change: 1.23, volume: 480000000 },
  { id: 'dogecoin', rank: 8, name: 'Dogecoin', symbol: 'DOGE', price: 0.087, change: 3.76, volume: 950000000 },
];

const TopCryptos = () => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Top Cryptocurrencies</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8 h-9 w-[180px]" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-left font-medium py-2 pl-1">#</th>
                <th className="text-left font-medium py-2">Name</th>
                <th className="text-right font-medium py-2">Price</th>
                <th className="text-right font-medium py-2">24h Change</th>
                <th className="text-right font-medium py-2 pr-1">24h Volume</th>
              </tr>
            </thead>
            <tbody>
              {topCryptos.map((crypto) => (
                <tr key={crypto.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="py-3 pl-1 text-muted-foreground">{crypto.rank}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                        {crypto.symbol.charAt(0)}
                      </div>
                      <span className="font-medium">{crypto.name}</span>
                      <span className="text-muted-foreground text-xs">{crypto.symbol}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right font-medium">${crypto.price < 1 ? crypto.price.toFixed(3) : crypto.price.toLocaleString()}</td>
                  <td className={`py-3 text-right font-medium ${crypto.change > 0 ? 'text-crypto-gain' : 'text-crypto-loss'}`}>
                    <div className="flex items-center justify-end gap-1">
                      {crypto.change > 0 ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      {crypto.change > 0 ? '+' : ''}{crypto.change}%
                    </div>
                  </td>
                  <td className="py-3 text-right font-medium pr-1">
                    ${(crypto.volume / 1000000).toFixed(1)}M
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCryptos;
