'use client';
import { DataTable } from '@/components/ui/table/data-table';
import { Colum } from './columns';
import { useEffect, useState } from 'react';
import { fetchStories } from '@/service/getStories';
export default function StoriesTable({
}: {
}) {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState();

  const Stories = async () => {
    try {
      const res = await  fetchStories();
      setResponse(res?.stories)
    } catch (error) {
      console.log(error)
    }
  }

  const column = Colum(Stories)


  useEffect(()=> {
    Stories();
  }, [])
  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
      </div>
      {response && 
      <DataTable columns={column} data={response} totalItems={response.length} />
      }
    </div>
  );
}