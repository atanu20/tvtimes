import React, { useEffect } from 'react';
import { useState } from 'react';

const ButtonList = ({ bookedList, no, butList, setButList }) => {
  const [sta, setSta] = useState(false);
  //   const { butList, setButList } = useContext(DataContext);
  //   console.log('calling');
  //   useEffect(() => {
  //     if (butList.includes(no)) {
  //       setSta(true);
  //     }
  //   }, [butList]);

  const onClickBut = (val) => {
    if (!butList.includes(val)) {
      setButList([...butList, val]);
    }

    // console.log(butList);
  };
  return (
    <>
      <button
        type="button"
        className={
          butList.includes(no) || bookedList?.seatBooked?.includes(no)
            ? 'small__btn__booked'
            : 'small__btn'
        }
        onClick={() => onClickBut(no)}
        disabled={butList.includes(no) || bookedList?.seatBooked?.includes(no)}
      >
        {no}
      </button>
    </>
  );
};

export default ButtonList;
