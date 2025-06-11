import React, { useState } from 'react';
import { SkipWithPrice } from '../types/skip';
import { useSkips } from '../hooks/useSkips';
import { useSkipFilters } from '../hooks/useSkipFilters';
import SkipList from './SkipList';
import SelectedSkipSummary from './SelectedSkipSummary';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import FilterControls from './FilterControls';
import ProgressIndicator from './ProgressIndicator';
import { 
  Recycle, 
  Truck, 
  Package, 
  MapPin, 
  Trash2, 
  Container, 
  FileCheck, 
  Calendar, 
  CreditCard 
} from 'lucide-react';

const SkipSelector: React.FC = () => {
  const { skips, loading, error } = useSkips();
  const [selectedSkip, setSelectedSkip] = useState<SkipWithPrice | null>(null);
  
  const {
    filteredSkips,
    setSearchQuery,
    setPriceRange,
    setSelectedFeatures,
    setSortBy,
    maxPrice
  } = useSkipFilters(skips);

  const handleSelectSkip = (skip: SkipWithPrice) => {
    setSelectedSkip(skip);
  };

  const handleContinue = () => {
    console.log('Continuing with skip:', selectedSkip);
    alert(`Proceeding with ${selectedSkip?.size} Yard Skip for £${selectedSkip?.finalPrice}`);
  };

  const progressSteps = [
    { label: 'Postcode', icon: <MapPin className="w-3 h-3 md:w-5 md:h-5" /> },
    { label: 'Waste Type', icon: <Trash2 className="w-3 h-3 md:w-5 md:h-5" /> },
    { label: 'Select Skip', icon: <Container className="w-3 h-3 md:w-5 md:h-5" /> },
    { label: 'Permit Check', icon: <FileCheck className="w-3 h-3 md:w-5 md:h-5" /> },
    { label: 'Choose Date', icon: <Calendar className="w-3 h-3 md:w-5 md:h-5" /> },
    { label: 'Payment', icon: <CreditCard className="w-3 h-3 md:w-5 md:h-5" /> }
  ];
  const currentStep = 2;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 h-60 md:w-80 md:h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 md:w-80 md:h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative warm-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="flex justify-center items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-3 md:p-4 bg-primary/10 rounded-2xl border border-primary/20">
                <Recycle className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <div className="p-3 md:p-4 bg-accent/10 rounded-2xl border border-accent/20">
                <Truck className="w-6 h-6 md:w-8 md:h-8 text-accent" />
              </div>
              <div className="p-3 md:p-4 bg-primary/10 rounded-2xl border border-primary/20">
                <Package className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text animate-fade-in font-display">
              SkipHire Pro
            </h1>
            
            <div className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in font-medium space-y-2">
              <p>Professional waste management solutions</p>
              <p className="text-sm md:text-base">NR32, Lowestoft • Reliable service • Competitive pricing</p>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-accent/10 border border-accent/20 rounded-full text-accent font-medium text-sm md:text-base">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              Available Now
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-6 md:py-12">
        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={progressSteps.length}
          steps={progressSteps}
        />

        {loading && <LoadingSpinner />}
        
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={() => window.location.reload()} 
          />
        )}
        
        {!loading && !error && skips.length > 0 && (
          <>
            <div className="text-center mb-8 md:mb-12 space-y-3 md:space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                Available Skip Sizes
              </h2>
              <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto font-medium text-sm md:text-base px-4">
                Choose from our range of skip sizes. All prices include VAT, delivery, and collection.
              </p>
            </div>
            
            {/* Filter Controls */}
            <FilterControls
              onSearch={setSearchQuery}
              onPriceFilter={setPriceRange}
              onFeatureFilter={setSelectedFeatures}
              onSort={setSortBy}
              maxPrice={maxPrice}
            />
            
            {/* Results Count */}
            <div className="mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg font-medium text-sm modern-shadow">
                <span className="text-accent">●</span> {filteredSkips.length} of {skips.length} skips available
              </div>
            </div>
            
            <SkipList
              skips={filteredSkips}
              selectedSkip={selectedSkip}
              onSelectSkip={handleSelectSkip}
            />
          </>
        )}
      </div>

      {/* Selected Skip Summary */}
      {selectedSkip && (
        <SelectedSkipSummary
          selectedSkip={selectedSkip}
          onContinue={handleContinue}
        />
      )}

      {/* Bottom Padding when summary is shown */}
      {selectedSkip && <div className="h-24 md:h-32" />}
    </div>
  );
};

export default SkipSelector;
