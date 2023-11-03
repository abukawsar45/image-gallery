import React, { useEffect, useState } from 'react';

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  

  useEffect(() => {
    fetch('./allImage.json')
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        setCheckedItems(Array(data.length).fill(false));
      });
  }, []);


  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, toIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      const newData = [...allData];
      const [draggedItem] = newData.splice(draggedIndex, 1);
      newData.splice(toIndex, 0, draggedItem);
      setAllData(newData);
      setDraggedIndex(toIndex);
    }
  };

  const handleDrop = (e, toIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      const newData = [...allData];
      const [draggedItem] = newData.splice(draggedIndex, 1);
      newData.splice(toIndex, 0, draggedItem);
      setAllData(newData);
      setDraggedIndex(null);
    }
  };

  const isBeingDragged = (index) => draggedIndex === index;

  const toggleChecked = (index) => {
    setCheckedItems((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className='my-2 md:my-4 lg:my-8'>
      <div>
        <div className='flex justify-between items-center mx-2 md:mx-4 lg:mx-8'>
          <div className=''>
            <p className='text-2xl font-semibold'>
              { checkedItems.filter((isChecked) => isChecked).length < 1
                ? 'Gallery'
                : '' }
            </p>
            {checkedItems.includes(true) ? (
              <p className='text-2xl font-semibold'>
                {checkedItems.filter((isChecked) => isChecked).length > 1
                  ? `${
                      checkedItems.filter((isChecked) => isChecked).length
                    } Files Selected`
                  : `${
                      checkedItems.filter((isChecked) => isChecked).length
                    } File Selected`}
              </p>
            ) : null}
          </div>
          {checkedItems.includes(true) ? (
            <button className='text-xl font-semibold text-red-400 hover:text-red-600 hover:underline rounded-lg px-3 py-1'>
              {checkedItems.filter((isChecked) => isChecked).length > 1
                ? 'Delete Files'
                : 'Delete File'}
            </button>
          ) : null}
        </div>
        <div className='mt-1 md:mt-2 lg:mt-5 mb-4 md:mb-7 lg:mb-10 border-b border-slate-200'></div>
      </div>
      <div className='mx-2 md:mx-4 lg:mx-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-2 gap-4'>
        <div className='group col-span-2 row-span-2'>
          {allData.slice(0, 1).map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, 0)}
              onDragEnter={(e) => handleDragEnter(e, 0)}
              onDrop={(e) => handleDrop(e, 0)}
              className={`relative group checked:opacity-50 cursor border md:border-2 border-slate-400 rounded-lg bg-opacity-0 hover:bg-opacity-80 bg-zinc-600 ${
                isBeingDragged(0) ? 'dragging' : ''
              }`}
            >
              <img
                src={item.image}
                alt=''
                className={`w-full rounded-md group-hover:opacity-40 duration-200 ${
                  isBeingDragged(0) ? 'dragging-image' : ''
                } ${checkedItems[0] ? 'opacity-40' : ''}`}
              />
              <input
                className='absolute top-2 left-2 lg:top-4 lg:left-4 w-5 h-5 lg:w-6 lg:h-6 rounded-lg  opacity-0 group-hover:opacity-100 checked:opacity-100 '
                type='checkbox'
                checked={checkedItems[0]}
                onChange={() => toggleChecked(0)}
              />
            </div>
          ))}
        </div>
        {allData.slice(1, allData.length).map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index + 1)}
            onDragOver={(e) => handleDragOver(e, index + 1)}
            onDragEnter={(e) => handleDragEnter(e, index + 1)}
            onDrop={(e) => handleDrop(e, index + 1)}
            className={`relative group checked:opacity-50 cursor border md:border-2 border-slate-400 rounded-lg bg-opacity-0  hover:bg-opacity-80 bg-zinc-600 ${
              isBeingDragged(index + 1) ? 'dragging' : ''
            }`}
          >
            <img
              src={item.image}
              alt=''
              className={`w-full rounded-md group-hover:opacity-40 duration-200 ${
                isBeingDragged(0) ? 'dragging-image' : ''
              }  ${checkedItems[index + 1] ? 'opacity-40' : ''} `}
            />
            <input
              className='absolute top-2 left-2 lg:top-4 lg:left-4 w-5 h-5 lg:w-6 lg:h-6 rounded-lg opacity-0 group-hover:opacity-100 checked:opacity-100'
              type='checkbox'
              checked={checkedItems[index + 1]}
              onChange={() => toggleChecked(index + 1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
