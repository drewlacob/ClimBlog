import React from 'react';

import { UserContext } from '../UserContext';
import GuestHome from '../components/GuestHome';
import Feed from './Feed';

const Home = () => {
  const { isLoggedIn } = React.useContext(UserContext);
  const [isLoggedInValue] = isLoggedIn;

  return (
    <div>
      {!isLoggedInValue && <GuestHome />}
      {isLoggedInValue && <Feed />}
    </div>
  );
};

export default Home;
