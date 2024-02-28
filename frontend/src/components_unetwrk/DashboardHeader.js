import { openInNewTab } from "./Utils";
import { useState } from "react";


const DashboardHeader = ({filterText, setFilterText}) => {

  const [showAccountMenu, setShowAccountMenu] = useState(false);


  const handleUpdateFilter = (e) => {
    setFilterText(e.target.value);
  }

  return (

    <div className="flex flex-row w-full justify-between items-center py-3 px-8">
      <div className="flex flex-row w-1/4">
        <input className="drop-shadow bg-white border-none h-8" type="text" placeholder=" Filter" value={filterText} onChange={handleUpdateFilter} />
      </div>
      <div className="flex flex-row w-1/4">
        <button className="bg-brand-primary rounded-3xl"><i className="fa-solid fa-bell text-2xl text-white p-3"></i></button>
      </div>
      <div className="flex flex-row w-1/4">
        <button onClick={e => openInNewTab(e, "https://chromewebstore.google.com/category/extensions")} className="rounded border-2 border-brand-primary p-2 text-brand-primary">Get Chrome Extension</button>
      </div>
      <div className="flex flex-row w-1/5">
        <div onClick={e => setShowAccountMenu(!showAccountMenu)} className="drop-shadow-lg bg-white border-none h-10 w-full cursor-pointer z-50 rounded">
          <div className='flex flex-row w-full justify-between p-3'>
            <h4>My Account</h4>
            <i className="fa-solid fa-angle-down"></i>
          </div>
          { showAccountMenu && 
          <ul className='dropdown-list z-50 w-full rounded'>
          <li className="dropdown-item z-50 position-absolute h-10 p-3 bg-white w-full hover:bg-background-secondary hover: border-brand-primary hover:border-2">Settings</li>
          <li className="dropdown-item z-50 position-absolute h-10 p-3 bg-white w-full hover:bg-background-secondary hover: border-brand-primary hover:border-2">Account</li>
          <li className="dropdown-item z-50 position-absolute h-10 p-3 bg-white w-full hover:bg-background-secondary hover: border-brand-primary hover:border-2">Log Out</li>
          </ul> }     
        </div>
      </div>
    </div>

  )

}

export default DashboardHeader;