import logo from "../assets/small_logo.svg";
import ContactShow from "./ContactShow";

const ContactAdd = () => {

  return (

    <div className="flex flex-col items-center align-center w-full">
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
        <h4 className="p-8" >Contact Information</h4>
        <h4 className="p-8">Interaction Notes</h4>
      </div>
      <ContactShow/>
    </div>
  )

}


export default ContactAdd;