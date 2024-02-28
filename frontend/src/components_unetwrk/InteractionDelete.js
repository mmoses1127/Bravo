import { useDispatch } from "react-redux";
import { deleteInteraction } from "../store/interactions";


const InteractionDelete = ({interaction, setShowInteractionDelete}) => {

  const dispatch = useDispatch();

  const handleDeleteContact = e => {
    e.preventDefault();  
    if (interaction.id) dispatch(deleteInteraction(interaction.id));
    setShowInteractionDelete(false);
  }

  const handleCancel = e => {
    e.preventDefault();
    setShowInteractionDelete(false);
    console.log('cancel');
  }

  return (

    <div className="flex flex-col justify-start bg-slate-200 p-5 h-full min-w-[500px] rounded border-2 border-brand-primary">
      <p className="text-3xl pr-20">Discard Interaction Notes?</p>
      <p>All interaction information will be lost.</p>
      <p>The interaction will be removed from your timeline.</p>
      <div className="flex flex-row justify-end">
        <button className="rounded border-brand-primary border-2 p-2 m-3" onClick={handleCancel}>Cancel</button>
        <button className="rounded bg-brand-primary text-white p-2 m-3" onClick={handleDeleteContact}>Discard Interaction</button>
      </div>
    </div>

  )
}

export default InteractionDelete;