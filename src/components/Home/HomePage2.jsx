import  { useEffect, useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import './Home.css'


const Home = () => {
  const [allData, setAllData] = useState([]);
  console.log(allData);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [checkedItems, setCheckedItems] = useState(
    Array(allData.length).fill(false)
  );

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

  const handleDragOver = (e) => {
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

  const toggleChecked = (fileId) => {
    setCheckedItems((prevState) => {
      const newState = [...prevState];
      const index = allData.findIndex((item) => item.id === fileId);
      newState[index] = !newState[index];
      if (newState[index]) {
        setSelectedFiles((prevSelected) => [...prevSelected, fileId]);
      } else {
        setSelectedFiles((prevSelected) =>
          prevSelected.filter((id) => id !== fileId)
        );
      }
      return newState;
    });
  };

  const deleteSelectedFiles = () => {
    setAllData((prevData) =>
      prevData.filter((item) => !selectedFiles.includes(item.id))
    );
    setSelectedFiles([]);
    setCheckedItems(Array(allData.length).fill(false)); 
  };

  // Add file with generate a uniqe id
const isIdUnique = (id, data) => data.some((item) => item.id === id);

const generateUniqueId = (data, maxNum = 10) => {
  for (let i = 0; i < maxNum; i++) {
    const potentialId = `${Math.random()
      .toString(2)
      .substr(2, 3)}_${Date.now()}`;
    if (!isIdUnique(potentialId, data)) {
      console.log(potentialId);
      return potentialId;
    }
  }
  // console.log('not generate a unique ID.');
  return null;
};

const handleAddImage = (e) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];

    const uniqueId = generateUniqueId(allData);

    if (uniqueId) {
      const myData = {
        id: uniqueId,
        image: URL.createObjectURL(file),
      };
      setAllData([...allData, myData]);
    }
  }
};

  return (
    <div className='my-2 md:my-4 lg:my-8'>
      <div>
        <div className='flex justify-between items-center mx-2 md:mx-4 lg:mx-8'>
          <div>
            <p className='text-2xl font-semibold'>
              {selectedFiles.length === 0 ? 'Gallery' : ''}
            </p>
            {selectedFiles.length > 0 && (
              <p className='text-2xl font-semibold'>
                {selectedFiles.length > 1
                  ? `${selectedFiles.length} Files Selected`
                  : `${selectedFiles.length} File Selected`}
              </p>
            )}
          </div>
          {selectedFiles.length > 0 && (
            <button
              className='text-xl font-semibold text-red-400 hover:text-red-600 hover:underline rounded-lg px-3 py-1'
              onClick={deleteSelectedFiles}
            >
              {selectedFiles.length > 1 ? 'Delete files' : 'Delete file'}
            </button>
          )}
        </div>
        <div className='mt-1 md:mt-2 lg:mt-5 mb-4 md:mb-7 lg:mb-10 border-b border-slate-200'></div>
      </div>
      <div className='mx-2 md:mx-4 lg:mx-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-2 gap-4'>
        <div className='group border col-span-2 row-span-2'>
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
                className='absolute top-2 left-2 lg:top-4 lg:left-4 w-5 h-5 lg:w-6 lg:h-6 rounded-lg opacity-0 group-hover:opacity-100 checked:opacity-100'
                type='checkbox'
                checked={checkedItems[0]}
                onChange={() => toggleChecked(item.id)}
              />
            </div>
          ))}
        </div>
        {allData.slice(1, allData?.length).map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index + 1)}
            onDragOver={(e) => handleDragOver(e, index + 1)}
            onDragEnter={(e) => handleDragEnter(e, index + 1)}
            onDrop={(e) => handleDrop(e, index + 1)}
            className={`relative w-full group row-span-1 checked:opacity-50 cursor border md:border-2 border-slate-400 rounded-lg bg-opacity-0 hover:bg-opacity-80 bg-zinc-600 ${
              isBeingDragged(index + 1) ? 'dragging' : ''
            }`}
          >
            <img
              src={item.image}
              alt=''
              className={`w-full object-contain rounded-md group-hover:opacity-40 duration-200 ${
                isBeingDragged(index + 1) ? 'dragging-image' : ''
              } ${checkedItems[index + 1] ? 'opacity-40' : ''}`}
            />
            <input
              className='absolute top-2 left-2 lg:top-4 lg:left-4 w-5 h-5 lg:w-6 lg:h-6 rounded-lg opacity-0 group-hover:opacity-100 checked:opacity-100'
              type='checkbox'
              checked={checkedItems[index + 1]}
              onChange={() => toggleChecked(item.id)}
            />
          </div>
        ))}
        {/* Add file input */}
        {
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
              className='file-label sm:my-12 my-14 md:my-16 lg:max-h-full flex flex-col justify-center items-center cursor-pointer gap-2 md:gap-4'
            >
              <BsCardImage className='text-xl md:text-2xl' />
              <span className='font-semibold'>Add Images</span>
            </label>
          </div>
        }
      </div>
    </div>
  );
};

export default Home;
