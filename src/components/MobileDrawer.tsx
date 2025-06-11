
import React from 'react';
import { SkipWithPrice } from '../types/skip';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from './ui/drawer';
import { Button } from './ui/button';
import FeatureTags from './FeatureTags';

interface MobileDrawerProps {
  skip: SkipWithPrice | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (skip: SkipWithPrice) => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  skip,
  isOpen,
  onClose,
  onSelect
}) => {
  if (!skip) return null;

  const imageUrl = `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-background">
        <DrawerHeader className="text-left">
          <DrawerTitle>{skip.size} Yard Skip Details</DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 pb-4 space-y-6">
          {/* Image */}
          <div className="relative h-48 overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={`${skip.size} Yard Skip`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="200" y="150" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="20"%3ESkip Image%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>

          {/* Price and Details */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-600">
                £{skip.finalPrice}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                £{skip.price_before_vat}
              </span>
            </div>
            
            <div className="space-y-2">
              <p className="text-muted-foreground">
                {skip.hire_period_days} day hire period
              </p>
              <p className="text-muted-foreground">
                Delivery to {skip.postcode}
              </p>
              <p className="text-muted-foreground">
                VAT included ({skip.vat}%)
              </p>
            </div>

            <FeatureTags skip={skip} showAll={true} />

            {/* Additional Details */}
            <div className="space-y-2 p-4 bg-muted rounded-lg">
              <h4 className="font-medium">Additional Information</h4>
              {skip.transport_cost && (
                <p className="text-sm text-muted-foreground">
                  Transport cost: £{skip.transport_cost}
                </p>
              )}
              {skip.per_tonne_cost && (
                <p className="text-sm text-muted-foreground">
                  Per tonne cost: £{skip.per_tonne_cost}
                </p>
              )}
            </div>
          </div>
        </div>

        <DrawerFooter>
          <Button
            onClick={() => {
              onSelect(skip);
              onClose();
            }}
            className="w-full"
            size="lg"
          >
            Select This Skip
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full">
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
