import React from 'react';
import { Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 sm:p-6 border-b">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <Bitcoin size={32} className="text-yellow-500" />
        <h1 className="text-2xl font-bold">Crypto Overview</h1>
      </div>
      
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center">
          <span className="text-muted-foreground mr-2">Market Cap:</span>
          <span className="font-medium">$1.24T</span>
        </div>
        <div className="flex items-center">
          <span className="text-muted-foreground mr-2">24h Vol:</span>
          <span className="font-medium">$48.8B</span>
        </div>
        <div className="flex items-center">
          <span className="text-muted-foreground mr-2">BTC Dominance:</span>
          <span className="font-medium">52.3%</span>
          <TrendingUp size={16} className="ml-1 text-crypto-gain" />
        </div>
      </div>
    </header>
  );
};

export default Header;									
