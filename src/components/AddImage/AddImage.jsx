import React from 'react';
import { BsCardImage } from 'react-icons/bs';

const AddImage = ({ handleAddImage }) => {
  return (
    <div className='border md:border-2 row-span-1 border-slate-400 rounded-lg border-dotted flex items-center justify-center'>
      <input
        type='file'
        id='file-input'
        name='file'
        accept='.jpg, .jpeg, .png, .pdf, .doc, .docx'
        className='file-input'
        style={{ display: 'none' }}
        onChange={(e) => handleAddImage(e)}
      />
      <label
        htmlFor='file-input'
        className='file-label sm:my-12 my-14 md:my-14 lg:max-h-full flex flex-col justify-center items-center cursor-pointer gap-2 md:gap-4'
      >
        <BsCardImage className='text-xl md:text-2xl' />
        <span className='font-semibold'>Add Images</span>
      </label>
    </div>
  );
};

export default AddImage;