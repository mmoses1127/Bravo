import logo from "../assets/small_logo.svg";
import ContactAdd from "./ContactAdd";
import { useEffect, useState } from "react";
import InteractionIndex from "./InteractionIndex";
import Dropdown from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { fetchTiers, getUserTiers } from "../store/tiers";
import { getCurrentUser } from "../store/session";

const ContactShow = (contact = {}) => {

  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const [contentChoice, setContentChoice] = useState("contactInfo");
  const tiers = useSelector(getUserTiers(user.id));
  const [columnOrder, setColumnOrder] = useState(0);

  useEffect(() => {
    dispatch(fetchTiers());
  }, [dispatch])

  const chooseContent = (e) => {
    // setContentChoice(e);
    console.log('contentChoice', e);

  }

  return (

    <div className="flex flex-col items-center align-center w-full bg-slate-200">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row">
          <img className="w-12 h-12" src={logo} />
          <div className="flex flex-col">
            <h2>{contact.name ? contact.name : `Name`}</h2>
            <h3>{contact.title ? contact.title : `Title`}</h3>
            <h3>{contact.company ? contact.company : `Company`}</h3>
          </div>
        </div>
        <div className="flex flex-col w-1/5">
          <h4>Move to</h4>
          <Dropdown tiers={tiers} columnOrder={columnOrder} setColumnOrder={setColumnOrder}/>
        </div>
        <div className="flex flex-col jusitfy-center items-center">
          <button className="m-5">Close</button>
        </div>
      </div>
      <div className="flex flex-row justify-start w-full">
        <h4 onClick={e => console.log('sup')} className="p-8 cursor-pointer" >Contact Information</h4>
        <h4 onClick={chooseContent} className="p-8 cursor-pointer">Interaction Notes</h4>
      </div>
      {contentChoice === "contactInfo" ? <ContactAdd contact={contact}/> : <InteractionIndex contact={contact}/>}
      
    </div>
  )

}


export default ContactShow;