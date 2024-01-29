import { useState } from "react";



const InteractionIndex = (contact = {}) => {

  const handleAddInteraction = () => {
    console.log('add interaction');
  }

  return (

    <div className="flex flex-col items-start w-full">
      {contact.interactions.map((interaction) => (
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <h4>{interaction.dateContacted}</h4>
            <h4>{interaction.contactMethod}</h4>
            <h4>{interaction.nextContactDate}</h4>
          </div>
          <p>{interaction.notes}</p>
        </div>
      ))}
      <div className="flex flex-row w-full justify-center">
        <div className="w-1/2 h-12 bg-white drop-shadow-lg flex flex-col jusitfy-center items-center p-3 cursor-pointer" onClick={handleAddInteraction}>
          <h4 className="">+ Add Interaction</h4>
        </div>
      </div>
    </div>

  )

}

export default InteractionIndex;