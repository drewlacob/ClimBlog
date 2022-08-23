import './App.css';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Feed from './pages/Feed';
import SignIn from './pages/SignIn/SignIn';
import Footer from './components/Footer';

import { UserProvider } from './UserContext';
//https://tanarindev.medium.com/how-to-easily-store-and-display-user-images-in-react-68962e16fe49
//https://github.com/audiolion/react-auth-provider

//todo: commit current changes with sign in page
// now working on context and logged in status throughout application
// try to do it with states in app and functions here and then passing them down to components
// then move to useContext as shown in video below as that is probably better
//https://www.youtube.com/watch?v=5LrDIWkK_Bc&ab_channel=WebDevSimplified
//rewatch this video and then create userContext

function App() {
  return (
    <UserProvider>
    <div className="page-container">
      <Navbar />
      <div className="content-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
      <Footer/>
    </div>
    </UserProvider>
  );
}

export default App;
