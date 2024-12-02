import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import WidgetListing from './stories-table';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Stories', link: '/dashboard/stories' }
];
const StoriesViewPage = () => {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex justify-between">
          <Heading title={'Stories'} description={''} />
          <Link
            href={'/dashboard/stories/create'}
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Story
          </Link>
        </div>
        <Separator />
        <WidgetListing />
      </div>
    </PageContainer>
  );
};

export default StoriesViewPage;
