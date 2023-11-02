import React from 'react';

const OtherImage = ({ item }) => {
  console.log(item);
  const { id, image } = item || {};
  return (
    <div className='border-2 border-slate-400 rounded-lg'>
      <img src={image} alt='' className='w-full rounded-lg' />
    </div>
  );
};

export default OtherImage;