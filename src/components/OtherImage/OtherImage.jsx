import React from 'react';

const OtherImage = ({
  item,
  index,
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDrop,
  isBeingDragged,
  checkedItems,
  toggleChecked,
}) => {
  // console.log(toggleChecked);
  const { id, image } = item || {};
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, index + 1)}
      onDragOver={(e) => handleDragOver(e, index + 1)}
      onDragEnter={(e) => handleDragEnter(e, index + 1)}
      onDrop={(e) => handleDrop(e, index + 1)}
      className={`relative w-full group row-span-1 checked:opacity-50 cursor-pointer border md:border-2 border-slate-400 duration-700 rounded-lg bg-opacity-0 hover:bg-opacity-80 bg-zinc-600 ${
        isBeingDragged(index + 1)
          ? 'transform scale-105 md:scale-110 lg:scale-125 transition-transform'
          : ''
      }`}
    >
      <img
        src={image || 'https://i.ibb.co/zHcQDGn/headphone.webp'}
        alt={image}
        className={`w-full object-contain rounded-md group-hover:opacity-40 ${checkedItems[index + 1] ? 'opacity-40' : ''}`}
        onError={(e) => {
          e.target.src = 'https://i.ibb.co/zHcQDGn/headphone.webp';
        }}
      />

      <input
        className='absolute top-2 left-2 lg:top-4 lg:left-4 w-5 h-5 lg:w-6 lg:h-6 cursor-pointer rounded-lg opacity-0 group-hover:opacity-100 checked:opacity-100'
        type='checkbox'
        checked={checkedItems[index + 1]}
        onChange={() => toggleChecked(id)}
      />
    </div>
  );
};

export default OtherImage;
