const checkErrors = async (res, setter) => {
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

export default checkErrors;