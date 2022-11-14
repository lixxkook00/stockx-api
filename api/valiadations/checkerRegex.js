
exports.onlyLettersAndNumbers = (str) => {
    return /^[A-Za-z0-9]*$/.test(str);
}  

exports.haveNumber = (str) => {
    return str.match( /\d+/g );
}   

exports.onlyLettersAndSpaces = (str) => {
  return /^[A-Za-z\s]*$/.test(str);
}

exports.checkerPassword = (str) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(str);
}