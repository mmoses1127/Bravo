import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../store/contacts";
import { checkErrors } from "./Utils";


const Dropdown = ({tiers = [], columnOrder, setColumnOrder, contact}) => {

  const dispatch = useDispatch();
  
  const matchTier = (columnOrder) => {
    if (columnOrder != undefined) {
      const targetTier = tiers.filter(tier => tier.position === columnOrder);
      return targetTier[0];
    }
  };
  
  const [errors, setErrors] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [targetTier, setTargetTier] = useState(columnOrder != undefined ? matchTier(columnOrder) : []);
    
  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false)
  };

  const handleChooseTier = async e => {
    e.preventDefault();
    let targetPosition = parseInt(e.target.getAttribute('position'));
    
    await dispatch(updateContact({...contact, column_order: targetPosition}))
    .catch(async (res) => checkErrors(res, setErrors));
    if (!errors.length) {
      setColumnOrder(targetPosition);
      setTargetTier(matchTier(targetPosition));
      closeMenu();
    } else {
      alert([errors[0].message]);
    }
  }


  return (
    <div onClick={e => setShowMenu(!showMenu)} className="drop-shadow-lg bg-white border-none h-10 w-full cursor-pointer z-50">
      <div className='flex flex-row w-full justify-between p-3'>
        <h4>{targetTier.name}</h4>
        <i className="fa-solid fa-angle-down"></i>
      </div>
      <ul className='dropdown-list z-50 w-full'>
      {showMenu && tiers.map(tier => (
          <li key={tier.id} position={tier.position} className="dropdown-item z-50 position-absolute h-10 p-3 bg-white w-full hover:bg-background-secondary hover: border-brand-primary hover:border-2" onClick={handleChooseTier}>{tier.name}</li>
      ))}
      </ul>      
    </div>

  );
};

export default Dropdown;