export default function Description({ description }: { description: string }) {
  return (
    <section className='mb-18 2xl:mb-24'>
      <h2 className='mb-2 text-2xl font-semibold text-white 2xl:mb-4 2xl:text-3xl'>
        Description
      </h2>
      <p className='text-base leading-loose text-blue1'>{description}</p>
    </section>
  );
}
