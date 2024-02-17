const UpdateEmail = ({email, setShowUpdateEmail}) => {

  const [newEmail, setNewEmail] = useState(email);

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    console.log('set email to', newEmail);
    // dispatch(updateEmail(newEmail));

  }

  return (

    <div className="flex flex-col items-center justify-center">
      <p>Update email address</p>
      <p>We'll send the confirmation email to the email address.</p>
      <p>You will also use it to log in.</p>
      <input className="drop-shadow bg-white border-none h-8 mb-5" type="text" value={newEmail} onChange={e => setNewEmail(e.target.value)}/>
      <div>
        <button onClick={e => setShowUpdateEmail(false)} className="bg-white rounded p-2 text-brand-primary w-full">Cancel</button>
        <button onClick={handleUpdateEmail} className="bg-brand-primary rounded p-2 text-white w-full">Update email address</button>
      </div>
    </div>

  )

} 

export default UpdateEmail;