import Table from '@/components/UI/Table';
import { TableItemType } from '@/constants/types';

export default function Profile({ profile }: { profile: TableItemType[] }) {
  return (
    <section className='mb-18 2xl:mb-24'>
      <h2 className='mb-4 text-2xl font-semibold text-white md:mb-8 2xl:text-3xl'>
        Profile
      </h2>
      <Table items={profile} />
    </section>
  );
}
