'use client';
import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';



export const Colum = (stories : any) => {
   const  columns: ColumnDef<any>[] = [

    {
      accessorKey: 'title',
      header: 'Title'
    },
    {
      accessorKey: 'description',
      header: 'DESCRIPTION'
    },
    {
      id: 'actions',
      cell: ({ row,   }) => <CellAction data={row.original} story={true} fetchStories={stories}/>
    }
   ]
   return columns
}

