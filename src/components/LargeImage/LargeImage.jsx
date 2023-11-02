import React from 'react';

const LargeImage = ({item}) => {
  console.log(item);
  const { id, image } = item || {};
  return (
    <div className='border-2 border-slate-400 rounded-lg'>
      <img src={image} alt='' className='w-full' />
    </div>
  );
};

export default LargeImage;