import DashboardHeader from "./DashboardHeader";
import KanbanBoard from "./KanbanBoard";
import { useState } from "react";

const Dashboard2 = () => {

  const [filterText, setFilterText] = useState('');

  return (

    <div className="flex flex-col w-full">
      <DashboardHeader filterText={filterText} setFilterText={setFilterText}/>
      <KanbanBoard filterText={filterText}/>
    </div>

  )

}

export default Dashboard2;