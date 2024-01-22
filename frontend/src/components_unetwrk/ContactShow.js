import logo from "../assets/small_logo.svg";
import ContactAdd from "./ContactAdd";
import { useState } from "react";
import InteractionIndex from "./InteractionIndex";

const ContactShow = (contact) => {

  const [contentChoice, setContentChoice] = useState("contactInfo");

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
            <h2>Bob Morgan</h2>
            <h3>CEO</h3>
            <h3>Google</h3>
          </div>
        </div>
        <div className="flex flex-col">
          <p>Move to</p>
          <button>Column Name</button>
        </div>
        <div className="flex flex-col jusitfy-center items-center">
          <button className="m-5">Close</button>
        </div>
      </div>
      <div className="flex flex-row justify-start w-full">
        <h4 onclick={e => console.log('sup')} className="p-8 cursor-pointer" >Contact Information</h4>
        <h4 onclick={chooseContent} className="p-8 cursor-pointer">Interaction Notes</h4>
      </div>
      {contentChoice === "contactInfo" ? <ContactAdd contact={contact}/> : <InteractionIndex contact={contact}/>}
      
    </div>
  )

}


export default ContactShow;