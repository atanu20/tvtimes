import React from 'react';
import { seatList } from '../../data/fdata';
import ButtonList from './ButtonList';

const ButtonLists = ({ setButList, butList }) => {
  return (
    <>
      <div className="button__grid">
        {seatList?.map((val, ind) => (
          <ButtonList no={val.no} setButList={setButList} butList={butList} />
        ))}
      </div>
    </>
  );
};

export default ButtonLists;
