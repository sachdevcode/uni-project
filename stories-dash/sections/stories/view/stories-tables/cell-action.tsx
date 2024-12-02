'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { CopyModal } from '@/components/modal/copy-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { deleteStory } from '@/service/deleteStories';
import { Code, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface CellActionProps {
  data: any;
  story: boolean;
  fetchStories: any
}

export const CellAction: React.FC<CellActionProps> = ({ data, story, fetchStories }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCode, setOpenCode] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    if (story) {
      try {
        await deleteStory(data.id)
        fetchStories();
        setOpen(false)
        toast.success("successfully deleted")        
      } catch (error) {
        console.log("error")
        toast.error("failed to delete")
      }
    }
    
  };



  

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        title='Delete'
        description='this action will remove story'
      />
      <CopyModal
        loading={loading}
        id={data.id}
        title="Please Copy the Provided Snippet"
        description=""
        isOpen={openCode}
        onClose={() => setOpenCode(false)}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/stories/update?id=${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpenCode(true);
            }}
          >
            <Code className="mr-2 h-4 w-4" /> Code Snippet
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
