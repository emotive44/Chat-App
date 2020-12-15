interface IRes {
  userId: string;
  name: string;  
}

const setStorage = (res: IRes) => {
  const { userId, name } = res;

  localStorage.setItem('uid', userId);
  localStorage.setItem('uname', name);
}

export default setStorage;
