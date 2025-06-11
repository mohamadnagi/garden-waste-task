
import { useState, useMemo } from 'react';
import { SkipWithPrice } from '../types/skip';

export const useSkipFilters = (skips: SkipWithPrice[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1200]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('size');

  const filteredAndSortedSkips = useMemo(() => {
    let filtered = skips.filter(skip => {
      // Search filter
      if (searchQuery && !skip.size.toString().includes(searchQuery)) {
        return false;
      }

      // Price filter
      if (skip.finalPrice < priceRange[0] || skip.finalPrice > priceRange[1]) {
        return false;
      }

      // Feature filters
      if (selectedFeatures.includes('Road Placement') && !skip.allowed_on_road) {
        return false;
      }
      if (selectedFeatures.includes('Heavy Waste') && !skip.allows_heavy_waste) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.finalPrice - b.finalPrice;
        case 'price-desc':
          return b.finalPrice - a.finalPrice;
        case 'size':
        default:
          return a.size - b.size;
      }
    });

    return filtered;
  }, [skips, searchQuery, priceRange, selectedFeatures, sortBy]);

  const maxPrice = useMemo(() => 
    Math.max(...skips.map(skip => skip.finalPrice), 1200)
  , [skips]);

  return {
    filteredSkips: filteredAndSortedSkips,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    selectedFeatures,
    setSelectedFeatures,
    sortBy,
    setSortBy,
    maxPrice
  };
};
