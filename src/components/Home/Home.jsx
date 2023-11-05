import { useEffect, useState } from 'react';
import LargeImage from '../LargeImage/LargeImage';
import OtherImage from '../OtherImage/OtherImage';
import AddImage from '../AddImage/AddImage';

const Home = () => {
  const [allData, setAllData] = useState([]);
  // console.log(allData);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    Array(allData.length).fill(false)
  );

  // --------console part---------
  // console.log(isDragging);

  useEffect(() => {
    fetch('./allImage.json')
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        setCheckedItems(Array(data.length).fill(false));
      });
  }, []);

  // -----------------drag method start------------
  // drag start
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
    setDraggedIndex(index);
    // setIsDragging(true);
  };

  // drag over or end
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    //  setDraggedIndex(null);
    setIsDragging(false);
  };

  // drag running
  const handleDragEnter = (e, toIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      const newData = [...allData];
      const [draggedItem] = newData.splice(draggedIndex, 1);
      newData.splice(toIndex, 0, draggedItem);
      setAllData(newData);
      setDraggedIndex(toIndex);
      setIsDragging(true);
    }
  };

  // drop capture
  const handleDrop = (e, toIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      const newData = [...allData];
      const [draggedItem] = newData.splice(draggedIndex, 1);
      newData.splice(toIndex, 0, draggedItem);
      setAllData(newData);
      // setDraggedIndex(null);
      setIsDragging(false);
    }
  };
  // -----------------drag method end----------------------------------

  const isBeingDragged = (index) => isDragging && draggedIndex === index;

  // check button toggle
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

  // handle delete button
  const deleteSelectedFiles = () => {
    setAllData((prevData) =>
      prevData.filter((item) => !selectedFiles.includes(item.id))
    );
    setSelectedFiles([]);
    setCheckedItems(Array(allData.length).fill(false));
  };

  // -----------------Add file---------------

  // ---------check id---------------
  const isIdUnique = (id, data) => data.some((item) => item.id === id);

  // -------generate uniqe id-------
  const generateUniqueId = (data, maxNum = 10) => {
    for (let i = 0; i < maxNum; i++) {
      const potentialId = `${Math.random()
        .toString(2)
        .substr(2, 3)}_${Date.now()}`;
      if (!isIdUnique(potentialId, data)) {
        // console.log(potentialId);
        return potentialId;
      }
    }
    // console.log('not generate a unique ID.');
    return null;
  };

  // handle add with onchange
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
    <div className='my-2 md:my-4 lg:my-8 mx-auto max-w-[1920px]'>
      <div>
        {/* headter text and selected file and delete button */}
        <div className='flex justify-between items-center mx-2 md:mx-4 lg:mx-8'>
          <div>
            <p className='text-2xl font-semibold'>
              {selectedFiles.length === 0 ? 'Gallery' : ''}
            </p>
            {selectedFiles.length > 0 && (
              <p className='text-2xl font-semibold flex items-center'>
                <input
                  className=' w-5 h-5 lg:w-6 lg:h-6 mr-2 cursor-pointer rounded-lg'
                  type='checkbox'
                  checked
                />
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
      <div className='mx-2 md:mx-4 lg:mx-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-2 gap-4 md:gap-7 lg:gap-9'>
        {/* large image */}
        {allData.slice(0, 1).map((item, index) => (
          <LargeImage
            key={item.id}
            item={item}
            index={index}
            draggable
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragEnter={handleDragEnter}
            handleDrop={handleDrop}
            isBeingDragged={isBeingDragged}
            checkedItems={checkedItems}
            toggleChecked={toggleChecked}
          />
        ))}

        {/* other image */}
        {allData.slice(1, allData?.length).map((item, index) => (
          <OtherImage
            key={item.id}
            item={item}
            index={index}
            draggable
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragEnter={handleDragEnter}
            handleDrop={handleDrop}
            isBeingDragged={isBeingDragged}
            checkedItems={checkedItems}
            toggleChecked={toggleChecked}
          />
        ))}
        {/* Add file input */}
        {<AddImage handleAddImage={handleAddImage} />}
      </div>
    </div>
  );
};

export default Home;
