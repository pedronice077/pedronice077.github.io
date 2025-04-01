import React, { useState } from 'react';
};

const timeFrames = ['1h', '24h', '7d', '30d'];

const CryptoHeatmap = () => {
  const [timeFrame, setTimeFrame] = useState('24h');
  
  // Function to determine color intensity based on percentage change
  const getColorClass = (change: number) => {
    if (change > 10) return 'bg-crypto-gain-strong text-white';
    if (change > 3) return 'bg-crypto-gain text-white';
    if (change > 0) return 'bg-crypto-gain-light text-crypto-bg-dark';
    if (change > -3) return 'bg-crypto-loss-light text-crypto-bg-dark';
    if (change > -10) return 'bg-crypto-loss text-white';
    return 'bg-crypto-loss-strong text-white';
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Market Heatmap</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              {timeFrame}
              <ChevronDown size={16} className="ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {timeFrames.map((tf) => (
              <DropdownMenuItem key={tf} onClick={() => setTimeFrame(tf)}>
                {tf}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex flex-wrap">
          {cryptoData.map((crypto) => (
            <div key={crypto.id} className={`${sizeClasses[crypto.size as keyof typeof sizeClasses]} p-1`}>
              <div 
                className={`${getColorClass(crypto.change)} h-full rounded-md p-3 flex flex-col justify-between transition-all hover:scale-[1.02]`}
              >
                <div className="flex justify-between items-start">
                  <div className="font-medium">{crypto.symbol}</div>
                  <div className={`text-xs font-bold ${crypto.change > 0 ? 'text-inherit' : 'text-inherit'}`}>
                    {crypto.change > 0 ? '+' : ''}{crypto.change}%
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="text-xs text-opacity-80">{crypto.name}</div>
                  <div className="font-bold text-sm">
                    ${crypto.price < 1 ? crypto.price.toFixed(3) : crypto.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoHeatmap;
