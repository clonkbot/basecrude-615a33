import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simulated real-time prices with realistic fluctuations
const generatePrice = (base: number, volatility: number) => {
  const change = (Math.random() - 0.5) * volatility;
  return base + change;
};

interface PriceData {
  current: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume: string;
}

interface NewsItem {
  id: string;
  source: string;
  handle: string;
  content: string;
  time: string;
  engagement: string;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    source: 'X',
    handle: '@OilPriceNews',
    content: 'BREAKING: OPEC+ announces production cuts of 1.5M barrels/day effective next month. Crude futures surge in after-hours trading. $OIL $WTI',
    time: '2m ago',
    engagement: '2.4K',
  },
  {
    id: '2',
    source: 'X',
    handle: '@CommodityWatch',
    content: 'Brent crude pushes past $82 as Middle East tensions escalate. Analysts predict further upside momentum. #CrudeOil #Energy',
    time: '8m ago',
    engagement: '1.8K',
  },
  {
    id: '3',
    source: 'X',
    handle: '@GoldSilverRep',
    content: 'Gold holds steady above $2,400 as investors seek safe-haven assets amid uncertainty. $GOLD continues to attract institutional flows.',
    time: '15m ago',
    engagement: '956',
  },
  {
    id: '4',
    source: 'X',
    handle: '@EnergyIntel',
    content: 'US Strategic Petroleum Reserve at lowest levels since 1984. Refinery capacity constraints add to supply concerns. $OIL rally may have legs.',
    time: '22m ago',
    engagement: '3.1K',
  },
  {
    id: '5',
    source: 'X',
    handle: '@MarketPulse',
    content: 'Crude oil technical analysis: Cup and handle pattern forming on weekly charts. Target: $95. Key support at $78.50. $WTI $CRUDE',
    time: '31m ago',
    engagement: '1.2K',
  },
  {
    id: '6',
    source: 'X',
    handle: '@PetroleumDaily',
    content: 'Libya production outages remove 300K bpd from global supply. Nigerian output also under pressure. Tight market conditions persist.',
    time: '45m ago',
    engagement: '876',
  },
];

function App() {
  const [oilPrice, setOilPrice] = useState<PriceData>({
    current: 82.47,
    change: 1.23,
    changePercent: 1.51,
    high24h: 83.12,
    low24h: 80.89,
    volume: '847.2M',
  });

  const [goldPrice, setGoldPrice] = useState<PriceData>({
    current: 2412.80,
    change: -8.40,
    changePercent: -0.35,
    high24h: 2428.50,
    low24h: 2398.20,
    volume: '312.5M',
  });

  const [isPulsing, setIsPulsing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const updatePrices = useCallback(() => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 300);

    setOilPrice(prev => {
      const newPrice = generatePrice(prev.current, 0.15);
      const change = newPrice - (prev.current - prev.change);
      return {
        current: Math.round(newPrice * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round((change / (prev.current - prev.change)) * 10000) / 100,
        high24h: Math.max(prev.high24h, newPrice),
        low24h: Math.min(prev.low24h, newPrice),
        volume: prev.volume,
      };
    });

    setGoldPrice(prev => {
      const newPrice = generatePrice(prev.current, 3.5);
      const change = newPrice - (prev.current - prev.change);
      return {
        current: Math.round(newPrice * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round((change / (prev.current - prev.change)) * 10000) / 100,
        high24h: Math.max(prev.high24h, newPrice),
        low24h: Math.min(prev.low24h, newPrice),
        volume: prev.volume,
      };
    });

    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    const interval = setInterval(updatePrices, 3000);
    return () => clearInterval(interval);
  }, [updatePrices]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative">
      {/* Industrial texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Diagonal grid lines */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            #c9851a 40px,
            #c9851a 41px
          )`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-[#c9851a]" />
                <div className="absolute inset-1 md:inset-2 rounded-full bg-gradient-to-br from-[#c9851a] to-[#5c3a0a]" />
                <div className="absolute inset-2 md:inset-3 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                  <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#c9851a] animate-pulse" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bebas tracking-wider text-white">
                  BASE<span className="text-[#c9851a]">CRUDE</span>
                </h1>
                <p className="text-[10px] md:text-xs text-gray-500 font-mono tracking-widest uppercase">
                  Real-Time Commodity Intelligence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isPulsing ? 'bg-green-400' : 'bg-green-500'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-400">LIVE</span>
              </div>
              <div className="text-xs font-mono text-gray-500 hidden sm:block">
                Updated: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        {/* Price Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          {/* OIL - Primary Card */}
          <motion.div
            className="lg:col-span-2 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1208] via-[#0f0f0f] to-[#0a0a0a] rounded-xl md:rounded-2xl" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c9851a]/5 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#c9851a] via-[#8b5a00] to-transparent" />

            <div className="relative p-4 md:p-6 lg:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-0">
                <div>
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#c9851a]/20 flex items-center justify-center">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-[#c9851a]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 5 3 7l3 5 3-5c1.5-2 3-4.5 3-7 0-3.5-2.5-6-6-6zm0 8.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 5.5 12 5.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-bebas tracking-wide text-[#c9851a]">CRUDE OIL</h2>
                      <p className="text-[10px] md:text-xs font-mono text-gray-500">$OIL / WTI</p>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={oilPrice.current}
                      initial={{ opacity: 0.5, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-4"
                    >
                      <div className="flex items-baseline gap-2 md:gap-3">
                        <span className="text-5xl md:text-6xl lg:text-7xl font-bebas tracking-tight text-white">
                          ${oilPrice.current.toFixed(2)}
                        </span>
                        <span className="text-base md:text-lg font-mono text-gray-500">/bbl</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`flex items-center gap-1 px-2 md:px-3 py-1 rounded-md ${
                      oilPrice.change >= 0
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      <span className="font-mono text-sm md:text-base font-bold">
                        {oilPrice.change >= 0 ? '+' : ''}{oilPrice.change.toFixed(2)}
                      </span>
                      <span className="font-mono text-xs md:text-sm">
                        ({oilPrice.changePercent >= 0 ? '+' : ''}{oilPrice.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                    <span className="text-xs font-mono text-gray-500">24h</span>
                  </div>
                </div>

                {/* Mini Chart Visualization */}
                <div className="flex-1 md:max-w-xs">
                  <div className="h-24 md:h-32 flex items-end gap-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#c9851a] to-[#c9851a]/40 rounded-t"
                        initial={{ height: 0 }}
                        animate={{ height: `${30 + Math.random() * 70}%` }}
                        transition={{ duration: 0.5, delay: i * 0.03 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-[#1a1a1a]">
                <div>
                  <p className="text-[10px] md:text-xs font-mono text-gray-500 mb-1">24H HIGH</p>
                  <p className="text-base md:text-lg font-mono text-white">${oilPrice.high24h.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-mono text-gray-500 mb-1">24H LOW</p>
                  <p className="text-base md:text-lg font-mono text-white">${oilPrice.low24h.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-mono text-gray-500 mb-1">VOLUME</p>
                  <p className="text-base md:text-lg font-mono text-white">{oilPrice.volume}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* GOLD Card */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1708] via-[#0f0f0f] to-[#0a0a0a] rounded-xl md:rounded-2xl" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#ffd700] via-[#daa520] to-transparent" />

            <div className="relative p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#ffd700]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#ffd700]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bebas tracking-wide text-[#ffd700]">GOLD</h2>
                  <p className="text-[10px] md:text-xs font-mono text-gray-500">$GOLD / XAU</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={goldPrice.current}
                  initial={{ opacity: 0.5, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-bebas tracking-tight text-white">
                      ${goldPrice.current.toFixed(2)}
                    </span>
                    <span className="text-sm font-mono text-gray-500">/oz</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${
                goldPrice.change >= 0
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-red-500/10 text-red-400'
              }`}>
                <span className="font-mono text-sm font-bold">
                  {goldPrice.change >= 0 ? '+' : ''}{goldPrice.change.toFixed(2)}
                </span>
                <span className="font-mono text-xs">
                  ({goldPrice.changePercent >= 0 ? '+' : ''}{goldPrice.changePercent.toFixed(2)}%)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#1a1a1a]">
                <div>
                  <p className="text-[10px] md:text-xs font-mono text-gray-500 mb-1">24H HIGH</p>
                  <p className="text-sm md:text-base font-mono text-white">${goldPrice.high24h.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-mono text-gray-500 mb-1">24H LOW</p>
                  <p className="text-sm md:text-base font-mono text-white">${goldPrice.low24h.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Live News Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h2 className="text-xl md:text-2xl font-bebas tracking-wide text-white">LIVE NEWS</h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-[#1a1a1a] to-transparent" />
            <span className="text-xs font-mono text-gray-500">FROM X</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {mockNews.map((news, index) => (
              <motion.article
                key={news.id}
                className="relative group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#c9851a]/0 to-[#c9851a]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-[#111111] rounded-lg p-3 md:p-4 border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs md:text-sm font-mono text-[#c9851a] truncate">{news.handle}</span>
                        <span className="text-[10px] md:text-xs font-mono text-gray-500">{news.time}</span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed line-clamp-3">
                        {news.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2 md:mt-3">
                        <span className="text-[10px] md:text-xs font-mono text-gray-500 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {news.engagement}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1a1a1a] mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
          <p className="text-center text-xs font-mono text-gray-600">
            Requested by <span className="text-gray-500">@ehkkkow</span> · Built by <span className="text-gray-500">@clonkbot</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
