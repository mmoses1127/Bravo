export const restoreCSRF = async () => {
  let res = await csrfFetch('/api/session');
  storeCSRFToken(res);
  return res;
};

export const storeCSRFToken = (res) => {
  const token = res.headers.get('X-CSRF-Token');
  if(token) sessionStorage.setItem('X-CSRF-Token', token);
};

const csrfFetch = async (url, options = {}) => {

  options.method ||= 'GET';
  options.headers ||= {};

  if (options.method.toUpperCase() !== 'GET') {
    // options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    
    if (!options.headers["Content-Type"] && !(options.body instanceof FormData)) {
      options.headers["Content-Type"] = "application/json";
    }

    options.headers['X-CSRF-Token'] = sessionStorage.getItem("X-CSRF-Token");
  };
  const res = await fetch(url, options);

  if (res.ok) {
    return res;
  } else {
    throw res;
  };
};

export default csrfFetch;