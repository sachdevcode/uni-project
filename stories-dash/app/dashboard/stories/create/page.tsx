import PageContainer from '@/components/layout/page-container';
import StoriesForm from '@/sections/stories/stories-form';

const Page = () => {
  return (
    <PageContainer>
      <StoriesForm title="Add New Story" type={"create"} />
    </PageContainer>
  );
};

export default Page;
