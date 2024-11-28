import PageContainer from '@/components/layout/page-container';
import StoriesForm from '@/sections/stories/stories-form';

const Page = ({searchParams}: {searchParams:{id?:string}}) => {
  return (
    <PageContainer>
      <StoriesForm id={searchParams?.id} title="Update your Story" type={"update"} />
    </PageContainer>
  );
};

export default Page;
