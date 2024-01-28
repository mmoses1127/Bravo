import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Dropdown = ({tiers = [], columnOrder, setColumnOrder}) => {

  const matchTier = (columnOrder) => {
    if (columnOrder) {
      const targetTier = tiers.filter(tier => tier.id === columnOrder);
      setTargetTier(targetTier);
    }
  };

  const [showMenu, setShowMenu] = useState(false);
  console.log('tiers', {tiers}.tiers);
  const [targetTier, setTargetTier] = useState(columnOrder ? matchTier(columnOrder) : []);


  useEffect(() => {
    setTargetTier(matchTier(columnOrder));
  }, [columnOrder])

  

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false)
  };

  const handleChooseTier = (e) => {
    e.preventDefault();
    console.log('set column');
    setColumnOrder(e.target.value);
  }



  return (
    <div onMouseEnter={openMenu} onMouseLeave={closeMenu} className="profile-drop-down, nav-dropdown">
      <div className='flex flex-row w-full justify-between'>
        <h4>{targetTier.length ? targetTier[0].name : `Select Column`}</h4>
        <i className="fa-solid fa-angle-down"></i>
      </div>
      <ul className='dropdown-list'>
      {showMenu && tiers.map(tier => (
          <li key={tier.id} className="dropdown-item" onClick={handleChooseTier}>{tier.name}</li>
      ))}
      </ul>      
    </div>

  );
};

export default Dropdown;