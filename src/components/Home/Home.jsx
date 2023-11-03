import React, { useEffect, useState } from 'react';

const Home = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetch('./allImage.json')
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
      });
  }, []);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, toIndex) => {
    e.preventDefault();

    const fromIndex = e.dataTransfer.getData('index');
    const newData = [...allData];
    const [draggedItem] = newData.splice(fromIndex, 1);
    newData.splice(toIndex, 0, draggedItem);

    setAllData(newData);
  };

  return (
    <div className='mx-2 md:mx-4 lg:mx-8 my-2 md:my-4 lg:my-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-2 gap-4'>
      <div className='col-span-2 row-span-2'>
        {allData.slice(0, 1).map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, 0)}
            onDrop={(e) => handleDrop(e, 0)}
            className='border-2 border-slate-400 rounded-lg'
          >
            <img src={item.image} alt='' className='w-full rounded-lg' />
          </div>
        ))}
      </div>
      {allData.slice(1, allData.length).map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index + 1)}
          onDragOver={(e) => handleDragOver(e, index + 1)}
          onDrop={(e) => handleDrop(e, index + 1)}
          className='border-2 border-slate-400 rounded-lg'
        >
          <img src={item.image} alt='' className='w-full rounded-lg' />
        </div>
      ))}
    </div>
  );
};

export default Home;
