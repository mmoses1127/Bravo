import { useState } from "react";
import { useSelector } from "react-redux";
import { getContactInteractions } from "../store/interactions";
import InteractionShow from "./InteractionShow";



const InteractionIndex = ({contact, interactions, setShowAddContact}) => {

  const [showNewInteraction, setShowNewInteraction] = useState(false);

  const handleAddInteraction = () => {
    console.log('add interaction');
  }

  return (

    <div className="w-full">
      <button className="w-full bg-green-900 text-white mb-5" onClick={e => setShowNewInteraction(true)}>+ Add Interaction</button>
      {(interactions.length || showNewInteraction) && 
      <div className="flex flex-col items-start w-full bg-green-100 p-3 overflow-auto">
        {showNewInteraction && <InteractionShow setShowNewInteraction={setShowNewInteraction} contact={contact} startOpen="true"/>}
        {interactions.map((interaction) => (
          <InteractionShow key={interaction.id} interaction={interaction} contact={contact} setShowNewInteraction={setShowNewInteraction} startOpen="false"/>
        ))}
      </div>
      }
    </div>

  )

}

export default InteractionIndex;