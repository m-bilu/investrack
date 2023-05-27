import Table from '@/components/UI/Table';
import { TableItemType } from '@/constants/types';

export default function Summary({ summary }: { summary: TableItemType[] }) {
  return (
    <section className='mb-18 2xl:mb-24'>
      <h2 className='mb-4 text-2xl font-semibold text-white md:mb-8 2xl:text-3xl'>
        Summary
      </h2>
      <Table items={summary} />
    </section>
  );
}
