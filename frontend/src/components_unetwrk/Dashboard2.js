import KanbanBoard from "./KanbanBoard";

const Dashboard2 = () => {

  return (

    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row w-1/4">
          <input type="text" placeholder="Filter" />
        </div>
        <div className="flex flex-row w-1/4">
          <button><i className="fa-solid fa-bell"></i></button>
        </div>
        <div className="flex flex-row w-1/4">
          <button>My Account</button>
        </div>
      </div>
      <KanbanBoard/>
    </div>

  )

}

export default Dashboard2;