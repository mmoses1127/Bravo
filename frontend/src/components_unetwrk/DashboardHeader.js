import { openInNewTab } from "./Utils";


const DashboardHeader = () => {

return (

  <div className="flex flex-row w-full justify-between items-center py-3 px-8">
    <div className="flex flex-row w-1/4">
      <input className="drop-shadow bg-white border-none h-8" type="text" placeholder=" Filter" />
    </div>
    <div className="flex flex-row w-1/4">
      <button className="bg-brand-primary rounded-3xl"><i className="fa-solid fa-bell text-2xl text-white p-3"></i></button>
    </div>
    <div className="flex flex-row w-1/4">
      <button onClick={e => openInNewTab(e, "https://chromewebstore.google.com/category/extensions")} className="rounded border-2 border-brand-primary p-2 text-brand-primary">Get Chrome Extension</button>
    </div>
    <div className="flex flex-row w-1/4">
      <button>My Account</button>
    </div>
  </div>

)

}

export default DashboardHeader;