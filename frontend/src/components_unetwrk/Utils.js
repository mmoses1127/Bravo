export const checkErrors = async (res, setter) => {
  let data;
  try {
    // .clone() essentially allows you to read the response body twice
    data = await res.clone().json();
  } catch {
    data = await res.text(); // Will hit this case if the server is down
  }
  if (data?.errors) setter(data.errors);
  else if (data) setter([data]);
  else setter([res.statusText]);
};

export const openInNewTab = (e, url) => {
  e.stopPropagation();
  const fullUrl = url.includes('https://') ? url : 'https://' + url;
  const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null;
}

export const validInputs = (password, confirmPassword, name) => {
  let errors = [];
  if (!hasUpperCase(password)) errors.push('');
  if (!hasLowerCase(password)) errors.push('');
  if (!hasNumber(password)) errors.push('');
  if (!hasEightChars(password)) errors.push('');
  if (password !== confirmPassword) errors.push('Passwords must match.');
  if (name && !name.length) errors.push('Name cannot be empty.');
  return errors;
}

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

export const isEmail = emailAdress => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailAdress.match(regex) ? true : false; 
}