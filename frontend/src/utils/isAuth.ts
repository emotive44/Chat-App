const isAuth = (): boolean => {
  if(localStorage.getItem('uid')) {
    return true;
  } else {
    return false;
  }
}

export default isAuth;
