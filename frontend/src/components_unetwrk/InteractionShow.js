import { useState } from "react";

const emptyInteraction = {
  dateContacted: new Date(),
  contactMethod: "",
  notes: "",
  nextContactDate: new Date()
}

const InteractionShow = (interaction = emptyInteraction) => {


  const [dateContacted, setDateContacted] = useState(contact.dateContacted);
  const [contactMethod, setContactMethod] = useState(contact.contactMethod);
  const [notes, setNotes] = useState(contact.notes);
  const [nextContactDate, setNextContactDate] = useState(contact.nextContactDate);

  return (

    <div className="flex flex-col items-start">
      <div className="flex flex-row">
        <label htmlFor="dateContacted">Date contacted</label>
        <input className='drop-shadow bg-white border-none h-8' type="date" id="dateContacted" value={dateContacted} onChange={(e) => setDateContacted(e.target.value)} />
        <label htmlFor="contactMethod">Date contacted</label>
        <input className='drop-shadow bg-white border-none h-8' type="text" id="contactMethod" value={contactMethod} onChange={(e) => setContactMethod(e.target.value)} />
        <label htmlFor="nextContactDate">Date contacted</label>
        <input className='drop-shadow bg-white border-none h-8' type="date" id="nextContactDate" value={nextContactDate} onChange={(e) => setNextContactDate(e.target.value)} />
      </div>
      <div className="flex flex-col w-1/2">
        <label htmlFor="notes">Notes</label>
        <textarea className='drop-shadow bg-white border-none h-40 w-full text-left resize-none' type="textarea" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <p>{notes.length} / 500</p>
      </div>
    </div>

  )

}

export default InteractionShow;