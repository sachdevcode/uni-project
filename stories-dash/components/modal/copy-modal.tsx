'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Copy } from 'lucide-react';

interface CopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  title: string;
  description: string;
  id: string;
}

export const CopyModal: React.FC<CopyModalProps> = ({
  isOpen,
  onClose,
  loading,
  id,
  title = 'Copy the Code',
  description = 'Copy provided below code'
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCopy = () => {
    const inputElement = document.getElementById('link') as HTMLInputElement;
    if (inputElement) {
      inputElement.select();
      document.execCommand('copy');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset the success state after 2 seconds
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            defaultValue={`<div id="root" data-event="bubble" data-accountID=${id}></div>`}
            readOnly
          />
        </div>
        <Button type="button" size="sm" className="px-3" onClick={handleCopy}>
          <span className="sr-only">Copy</span>
          <Copy />
          {copySuccess && <span className="ml-2 text-green-500">Copied!</span>}
        </Button>
      </div>
    </Modal>
  );
};
