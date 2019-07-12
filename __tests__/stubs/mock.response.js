module.exports = () => {
  const res = {};
  res.status = (code) => {
    // chane status to the code passed
    res.status = code;
    
    // return response object
    return res;
  };
  res.json = (obj) => {
    // remove json and status from object if found
    delete obj.json;
    delete obj.status;

    // go over all object
    Object.keys(obj).forEach(i => res[i] = obj[i]);

    // return response object
    return res;
  };
  // retunr response object
  return res;
};