'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/table/data-table';
import { Product } from '@/constants/data';
import { fetchProducts } from '@/service/product';
import { columns } from './columns';

export default function ProductTable() {
  const [data, setData] = useState<Product[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchProducts();
        if (response) {
          setData(response || []);
          setTotalData(response.length || 0);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4"></div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} totalItems={totalData} />
      )}
    </div>
  );
}
