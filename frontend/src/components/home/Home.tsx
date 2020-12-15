import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';


interface HomeProps {
  isAuth: boolean;
}

const Home: FC<HomeProps> = ({ isAuth }) => {
  if(!isAuth) {
    return <Redirect to='/login' />
  }
  return (
    <div>Home</div>
  )
}

export default Home;
