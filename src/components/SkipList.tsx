
import React, { useState } from 'react';
import { SkipWithPrice } from '../types/skip';
import SkipCard from './SkipCard';
import { Button } from './ui/button';
import ComparisonModal from './ComparisonModal';
import { useMediaQuery } from '../hooks/useMediaQuery';
import MobileDrawer from './MobileDrawer';

interface SkipListProps {
  skips: SkipWithPrice[];
  selectedSkip: SkipWithPrice | null;
  onSelectSkip: (skip: SkipWithPrice) => void;
}

const SkipList: React.FC<SkipListProps> = ({ skips, selectedSkip, onSelectSkip }) => {
  const [compareSkips, setCompareSkips] = useState<SkipWithPrice[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [detailSkip, setDetailSkip] = useState<SkipWithPrice | null>(null);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleAddToCompare = (skip: SkipWithPrice) => {
    if (compareSkips.find(s => s.id === skip.id)) {
      setCompareSkips(compareSkips.filter(s => s.id !== skip.id));
    } else if (compareSkips.length < 3) {
      setCompareSkips([...compareSkips, skip]);
    }
  };

  const handleViewDetails = (skip: SkipWithPrice) => {
    setDetailSkip(skip);
    setShowMobileDrawer(true);
  };

  return (
    <>
      {/* Compare Controls */}
      {compareSkips.length > 0 && (
        <div className="bg-card rounded-lg border p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Compare ({compareSkips.length}/3):</span>
            <div className="flex gap-2">
              {compareSkips.map((skip) => (
                <span
                  key={skip.id}
                  className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm flex items-center gap-1"
                >
                  {skip.size}Y
                  <button
                    onClick={() => handleAddToCompare(skip)}
                    className="ml-1 hover:bg-primary/80 rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCompareSkips([])}
            >
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => setShowComparison(true)}
              disabled={compareSkips.length < 2}
            >
              Compare
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skips.map((skip, index) => (
          <div key={skip.id} className="relative group">
            <SkipCard
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onSelect={onSelectSkip}
              onViewDetails={isMobile ? handleViewDetails : undefined}
            />
            
            {/* Compare Checkbox */}
            <div className="absolute top-4 left-4 z-20">
              <label className="flex items-center gap-2 bg-white/90 rounded px-2 py-1 text-xs font-medium cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  checked={compareSkips.some(s => s.id === skip.id)}
                  onChange={() => handleAddToCompare(skip)}
                  className="rounded"
                />
                Compare
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {skips.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0118 12a8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8c2.027 0 3.9.757 5.291 2.009z" />
            </svg>
            <h3 className="text-lg font-medium mb-2">No skips found</h3>
            <p>Try adjusting your filters to see more options.</p>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      <ComparisonModal
        skips={compareSkips}
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        onSelectSkip={onSelectSkip}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        skip={detailSkip}
        isOpen={showMobileDrawer}
        onClose={() => setShowMobileDrawer(false)}
        onSelect={onSelectSkip}
      />
    </>
  );
};

export default SkipList;
