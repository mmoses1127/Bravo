const PasswordRequirements = ({password}) => {

  const hasUpperCase = (str) => {
    return (/[A-Z]/.test(str));
  }

  const hasLowerCase = (str) => {
    return (/[a-z]/.test(str));
  }

  const hasNumber = (str) => {
    return (/[0-9]/.test(str));
  }

  const hasEightChars = (str) => {
    return (str.length >= 8);
  }



  return (

    <div className="w-full flex flex-col justify-start items-start">
      <div className="flex flex-row w-full">
        <p className={hasUpperCase(password) ? 'text-green-400' : ''}>1 uppercase </p>
        {hasUpperCase(password) && <i className="fa-solid fa-check text-green-400 ml-2"></i>}
      </div>
      <div className="flex flex-row w-full">
        <p className={hasLowerCase(password) ? 'text-green-400' : ''} >1 lowercase</p>
        {hasLowerCase(password) && <i className="fa-solid fa-check text-green-400 ml-2"></i>}
      </div>
      <div className="flex flex-row w-full">
        <p className={hasNumber(password) ? 'text-green-400' : ''}>1 number</p>
        {hasNumber(password) && <i className="fa-solid fa-check text-green-400 ml-2"></i>}
      </div>
      <div className="flex flex-row w-full">
        <p className={hasEightChars(password) ? 'text-green-400' : ''}>Minimum 8 characters</p>
        {hasEightChars(password) && <i className="fa-solid fa-check text-green-400 ml-2"></i>}
      </div>
    </div>

  )

}

export default PasswordRequirements;