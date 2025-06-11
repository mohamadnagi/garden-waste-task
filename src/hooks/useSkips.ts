
import { useState, useEffect } from 'react';
import { Skip, SkipWithPrice } from '../types/skip';

export const useSkips = (postcode: string = 'NR32', area: string = 'Lowestoft') => {
  const [skips, setSkips] = useState<SkipWithPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For demo purposes, using mock data since the API might not be accessible
        // In production, replace this with the actual API call
        const mockData: Skip[] = [
          {
            "id": 17933,
            "size": 4,
            "hire_period_days": 14,
            "transport_cost": null,
            "per_tonne_cost": null,
            "price_before_vat": 278,
            "vat": 20,
            "postcode": "NR32",
            "area": "",
            "forbidden": false,
            "created_at": "2025-04-03T13:51:46.897146",
            "updated_at": "2025-04-07T13:16:52.813",
            "allowed_on_road": true,
            "allows_heavy_waste": true
          },
          {
            "id": 17934,
            "size": 6,
            "hire_period_days": 14,
            "transport_cost": null,
            "per_tonne_cost": null,
            "price_before_vat": 305,
            "vat": 20,
            "postcode": "NR32",
            "area": "",
            "forbidden": false,
            "created_at": "2025-04-03T13:51:46.897146",
            "updated_at": "2025-04-07T13:16:52.992",
            "allowed_on_road": true,
            "allows_heavy_waste": true
          },
          {
            "id": 17935,
            "size": 8,
            "hire_period_days": 14,
            "transport_cost": null,
            "per_tonne_cost": null,
            "price_before_vat": 375,
            "vat": 20,
            "postcode": "NR32",
            "area": "",
            "forbidden": false,
            "created_at": "2025-04-03T13:51:46.897146",
            "updated_at": "2025-04-07T13:16:53.171",
            "allowed_on_road": true,
            "allows_heavy_waste": true
          },
          {
            "id": 17936,
            "size": 10,
            "hire_period_days": 14,
            "transport_cost": null,
            "per_tonne_cost": null,
            "price_before_vat": 400,
            "vat": 20,
            "postcode": "NR32",
            "area": "",
            "forbidden": false,
            "created_at": "2025-04-03T13:51:46.897146",
            "updated_at": "2025-04-07T13:16:53.339",
            "allowed_on_road": false,
            "allows_heavy_waste": false
          },
          {
            "id": 17937,
            "size": 12,
            "hire_period_days": 14,
            "transport_cost": null,
            "per_tonne_cost": null,
            "price_before_vat": 439,
            "vat": 20,
            "postcode": "NR32",
            "area": "",
            "forbidden": false,
            "created_at": "2025-04-03T13:51:46.897146",
            "updated_at": "2025-04-07T13:16:53.516",
            "allowed_on_road": false,
            "allows_heavy_waste": false
          },
          {
            "id": 17938,
            "size": 14,
            "hire_period_days": 14,
            "transport_cost": null,
            "per_tonne_cost": null,
            "price_before_vat": 470,
            "vat": 20,
            "postcode": "NR32",
            "area": "",
            "forbidden": false,
            "created_at": "2025-04-03T13:51:46.897146",
            "updated_at": "2025-04-07T13:16:53.69",
            "allowed_on_road": false,
            "allows_heavy_waste": false
          }
        ];

        // Calculate final price including VAT
        const skipsWithPrice: SkipWithPrice[] = mockData.map(skip => ({
          ...skip,
          finalPrice: Math.round(skip.price_before_vat * (1 + skip.vat / 100))
        }));

        setSkips(skipsWithPrice);
      } catch (err) {
        setError('Failed to fetch skip data. Please try again.');
        console.error('Error fetching skips:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, [postcode, area]);

  return { skips, loading, error };
};
