import React, { useEffect, useState } from "react";


const Dropdown = ({tiers = [], columnOrder, setColumnOrder}) => {

  
  const matchTier = (columnOrder) => {
    if (columnOrder != undefined) {
      const targetTier = tiers.filter(tier => tier.position === columnOrder);
      
      return targetTier[0];
    }
  };
  
  const [showMenu, setShowMenu] = useState(false);
  const [targetTier, setTargetTier] = useState(columnOrder ? matchTier(columnOrder) : []);
  
  console.log('targetTier', targetTier);
  console.log('columnOrder', columnOrder);
  
  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false)
  };

  const handleChooseTier = (e) => {
    e.preventDefault();
    let targetPosition = parseInt(e.target.getAttribute('position'));
    setColumnOrder(targetPosition);
    setTargetTier(matchTier(targetPosition));
    closeMenu();
  }


  return (
    <div onMouseEnter={openMenu} onMouseLeave={closeMenu} className="drop-shadow-lg bg-white border-none h-10 p-3">
      <div className='flex flex-row w-full justify-between'>
        <h4>{targetTier.name ? targetTier.name : `Select Column`}</h4>
        <i className="fa-solid fa-angle-down"></i>
      </div>
      <ul className='dropdown-list z-50'>
      {showMenu && tiers.map(tier => (
          <li key={tier.id} position={tier.position} className="dropdown-item z-50 position-absolute" onClick={handleChooseTier}>{tier.name}</li>
      ))}
      </ul>      
    </div>

  );
};

export default Dropdown;