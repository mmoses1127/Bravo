export const hasUpperCase = (str) => {
  return (/[A-Z]/.test(str));
}

export const hasLowerCase = (str) => {
  return (/[a-z]/.test(str));
}

export const hasNumber = (str) => {
  return (/[0-9]/.test(str));
}

export const hasEightChars = (str) => {
  return (str.length >= 8);
}


const PasswordRequirements = ({password, submitted}) => {

  const alertTextColor = (submitted, checker, password) => {
    console.log('submitted', submitted, 'checker', checker(password), 'password', password)
    if (checker(password)) {
      return 'text-success-green';
    } else {
      if (!checker(password)) {
        if (submitted) {
          return 'text-error-red';
        } else {
          console.log('reddddd')
          return 'text-primary';
        }
      }
    }
  }

  return (

    <div className="w-full flex flex-col justify-start items-start mb-3">
      <div className="flex flex-row w-full">
        <p className={alertTextColor(submitted, hasUpperCase, password)}>1 uppercase </p>
        {hasUpperCase(password) && <i className="fa-solid fa-check text-success-green ml-2"></i>}
      </div>
      <div className="flex flex-row w-full">
        <p className={alertTextColor(submitted, hasLowerCase, password)} >1 lowercase</p>
        {hasLowerCase(password) && <i className="fa-solid fa-check text-success-green ml-2"></i>}
      </div>
      <div className="flex flex-row w-full">
        <p className={alertTextColor(submitted, hasNumber, password)}>1 number</p>
        {hasNumber(password) && <i className="fa-solid fa-check text-success-green ml-2"></i>}
      </div>
      <div className="flex flex-row w-full">
        <p className={alertTextColor(submitted, hasEightChars, password)}>Minimum 8 characters</p>
        {hasEightChars(password) && <i className="fa-solid fa-check text-success-green ml-2"></i>}
      </div>
    </div>

  )

}

export default PasswordRequirements;