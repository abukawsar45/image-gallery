import React from 'react';

const OtherImage = ({ item, handleDragOver, handleDragLeave, handleDrop }) => {
  console.log(item);
  const { id, image } = item || {};
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className='border-2 border-slate-400 rounded-lg'
    >
      <img src={image} alt='' className='w-full rounded-lg' />
    </div>
  );
};

export default OtherImage;