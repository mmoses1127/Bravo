import emptyPic from "../assets/profile_pic_empty.svg";
import uploadIcon from "../assets/upload_icon.svg";
import ContactUpdate from "./ContactUpdate";
import { useEffect, useState } from "react";
import InteractionIndex from "./InteractionIndex";
import Dropdown from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { fetchTiers, getUserTiers } from "../store/tiers";
import { getCurrentUser } from "../store/session";
import { fetchInteractions, getContactInteractions } from "../store/interactions";
import Timeline from "./Timeline";

const CONTACT_INFO_TEXT = "Contact Information";
const INTERACTION_NOTES_TEXT = "Interaction Notes";
const UNDERLINE_STYLE = "cursor-pointer border-solid border-b-4 border-green-900 m-5";
const NON_UNDERLINE_STYLE = "cursor-pointer m-5";

const ContactShow = ({contact = {}, setShowContactShow, order}) => {

  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const tiers = useSelector(getUserTiers(user.id));
  const interactions = useSelector(getContactInteractions(contact.id));
  const [columnOrder, setColumnOrder] = useState(contact.columnOrder ? contact.columnOrder : order);
  const [contentChoice, setContentChoice] = useState(CONTACT_INFO_TEXT);

  useEffect(() => {
    dispatch(fetchTiers());
    dispatch(fetchInteractions());
  }, [dispatch])

  const chooseContent = (e) => {
    setContentChoice(e.target.innerText);
  }

  const handleUploadImage = (e) => {
    e.preventDefault();
    console.log('uploading image');
  }

  return (

    <div className="flex flex-row items-start justify-center w-full bg-background-disabled p-5 h-full min-w-[1000px] min-h-[500px]">     
      <div className="flex flex-col items-center align-center bg-slate-200 p-5 h-full w-3/4 b-r-1 border-solid border-brand-primary">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row w-2/3">
            <div className="flex flex-row items-center jusitfy-center relative">
              <img onClick={handleUploadImage} className="w-14 h-14 m-5 cursor-pointer" src={emptyPic} />
              <img className="w-6 h-6 m-5 absolute right-0 bottom-0" src={uploadIcon} />
            </div>
            <div className="flex flex-col justify-evenly">
              <h2>{contact.firstName ? contact.firstName + ' ' + contact.lastName : `Name`}</h2>
              <h3>{contact.title ? contact.title : `Title`}</h3>
              <h3>{contact.company ? contact.company : `Company`}</h3>
            </div>
          </div>
          <div className="flex flex-col">
            <button className="border-brand-primary text-brand-primary rounded border-2 p-2 mb-3" onClick={setShowContactShow}>Close</button>
            <Dropdown tiers={tiers} columnOrder={columnOrder} setColumnOrder={setColumnOrder}/>
          </div>
        </div>
        <div className="flex flex-row justify-start w-full">
          <div className={contentChoice === CONTACT_INFO_TEXT ? '' : ''}>
            <h4 onClick={chooseContent} className={contentChoice === CONTACT_INFO_TEXT ? UNDERLINE_STYLE : NON_UNDERLINE_STYLE}>Contact Information</h4>
          </div>
          <div>
            <h4 onClick={chooseContent} className={contentChoice === INTERACTION_NOTES_TEXT ? UNDERLINE_STYLE : NON_UNDERLINE_STYLE}>Interaction Notes</h4>
          </div>
        </div>
        {contentChoice === CONTACT_INFO_TEXT ? <ContactUpdate contact={contact} setShowContactShow={setShowContactShow} columnOrder={columnOrder}/> : <InteractionIndex interactions={interactions} setShowAddContact={setShowContactShow} contact={contact} />}
      </div>
      <Timeline contact={contact}/>
    </div>
  )

}


export default ContactShow;