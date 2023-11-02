import React, { useEffect, useState } from 'react';
import LargeImage from '../LargeImage/LargeImage';
import OtherImage from '../OtherImage/OtherImage';


const Home = () => {
  const[allData, setAllData] = useState([]);

  useEffect(() => {
    fetch("./allImage.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAllData(data);
      });
  }, []);
  return (
    <div className='mx-2 md:mx-4 lg:mx-8 my-2 md:my-4 lg:my-8 grid grid-cols-5 grid-rows-2 gap-4'>
      <div className='col-span-2 row-span-2'>
        {allData.slice(0, 1).map((item) => (
          <LargeImage key={item?.id} item={item} />
        ))}
      </div>
      {allData.slice(1, allData.length).map((item) => (
        <OtherImage key={item?.id} item={item} />
      ))}
    </div>
  );
};

export default Home;