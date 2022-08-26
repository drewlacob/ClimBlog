import './App.css';

import { Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Feed from './pages/Feed';
import SignIn from './pages/SignIn/SignIn';
import Footer from './components/Footer';
import Register from './pages/Register';

import { UserProvider } from './UserContext';

//setup axios
//page transitions https://www.youtube.com/watch?v=YxLMAk2H3ns&ab_channel=CodeSnap
//on scroll easy fade up https://www.youtube.com/watch?v=JcHLxzrsRS4&ab_channel=Arslan

function App() {
  return (
    <UserProvider>
    <div className="page-container">
      <Navbar/>
      <div className="content-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer/>
    </div>
    </UserProvider>
  );
}

export default App;
