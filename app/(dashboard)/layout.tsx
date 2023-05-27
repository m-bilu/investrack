import Menu from '@/components/navigation/Menu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='mb-28 2xl:mb-40'>
      <Menu />

      <div className='mt-32 xl:ml-[300px]'>
        <div className='mx-5 xs:mx-7 xl:mx-10 3xl:mx-auto 3xl:max-w-[1000px]'>
          {children}
        </div>
      </div>
    </main>
  );
}
