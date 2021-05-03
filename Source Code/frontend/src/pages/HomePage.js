import React, { useEffect, useState } from 'react';
// redux imports
import { useDispatch, useSelector } from 'react-redux';
import OwnerHome from '../components/OwnerHome';
import PlayerHome from '../components/PlayerHome';

// landing page containing all users complains
// and user can comment on each other's complaints
const HomePage = () => {
  // const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {

  // }, []);

  return (
    <section>
      {userInfo && userInfo.isOwner && <OwnerHome />}
      {userInfo ? userInfo.isOwner ? '' : <PlayerHome /> : <PlayerHome />}
    </section>
  );
};

export default HomePage;
