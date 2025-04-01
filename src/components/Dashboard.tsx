import React from 'react';
import Header from './Header';
import CryptoHeatmap from './CryptoHeatmap';
import TopCryptos from './TopCryptos';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid gap-6">
          <CryptoHeatmap />
          <TopCryptos />
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t mt-8">
        <p>Data provided for informational purposes only. Not financial advice.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
