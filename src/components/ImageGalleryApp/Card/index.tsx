const Card = ({ image }: any) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <img className='w-full' src={image.src.large} alt={image.alt} />
      <div className='px-6 py-4'>
        <p className='text-gray-700 text-base'>
          Photographer: {image.photographer}
        </p>
      </div>
    </div>
  );
};

export default Card;
