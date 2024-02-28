import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContactInteractions } from "../store/interactions";
import InteractionShow from "./InteractionShow";


const InteractionIndex = ({contact, interactions}) => {

  const dispatch = useDispatch();
  // const interactions = useSelector(getContactInteractions(contact.id));
  const [showNewInteraction, setShowNewInteraction] = useState(false);

  const handleAddInteraction = () => {
    console.log('add interaction');
  }

  return (

    <div className="w-full p-3">
      <button className="w-full bg-bp5 text-white mb-5 h-10 rounded" onClick={e => setShowNewInteraction(true)}>+ Add Interaction</button>
      {(interactions.length || showNewInteraction) && 
      <div className="flex flex-col items-start w-full bg-green-100 overflow-auto">
        {showNewInteraction && <InteractionShow setShowNewInteraction={setShowNewInteraction} contact={contact} startOpen={true}/>}
        {interactions.map((interaction) => (
          <InteractionShow key={interaction.id} interaction={interaction} contact={contact} setShowNewInteraction={setShowNewInteraction} startOpen={false}/>
        ))}
      </div>
      }
    </div>

  )

}

export default InteractionIndex;