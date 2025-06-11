
import React from 'react';
import { SkipWithPrice } from '../types/skip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

interface ComparisonModalProps {
  skips: SkipWithPrice[];
  isOpen: boolean;
  onClose: () => void;
  onSelectSkip: (skip: SkipWithPrice) => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({
  skips,
  isOpen,
  onClose,
  onSelectSkip
}) => {
  const features = [
    { key: 'size', label: 'Size (Yards)' },
    { key: 'finalPrice', label: 'Price (£)' },
    { key: 'hire_period_days', label: 'Hire Period (Days)' },
    { key: 'allowed_on_road', label: 'Road Placement' },
    { key: 'allows_heavy_waste', label: 'Heavy Waste' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle>Compare Skip Sizes</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 border-b font-medium">Feature</th>
                {skips.map((skip) => (
                  <th key={skip.id} className="text-center p-4 border-b">
                    <div className="space-y-2">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                        <span className="text-blue-600 font-bold">{skip.size}Y</span>
                      </div>
                      <span className="text-sm font-medium">{skip.size} Yard Skip</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.key} className="border-b">
                  <td className="p-4 font-medium">{feature.label}</td>
                  {skips.map((skip) => (
                    <td key={skip.id} className="p-4 text-center">
                      {feature.key === 'allowed_on_road' || feature.key === 'allows_heavy_waste' ? (
                        <span className={`inline-block w-3 h-3 rounded-full ${
                          skip[feature.key as keyof SkipWithPrice] ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                      ) : feature.key === 'finalPrice' ? (
                        <span className="font-bold text-blue-600">£{skip[feature.key as keyof SkipWithPrice]}</span>
                      ) : (
                        skip[feature.key as keyof SkipWithPrice]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-4 font-medium">Action</td>
                {skips.map((skip) => (
                  <td key={skip.id} className="p-4 text-center">
                    <Button
                      onClick={() => {
                        onSelectSkip(skip);
                        onClose();
                      }}
                      className="w-full"
                    >
                      Select
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComparisonModal;
