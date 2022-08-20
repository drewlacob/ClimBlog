import './App.css';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Feed from './pages/Feed';
import SignIn from './pages/SignIn';
import Footer from './components/Footer';
//https://tanarindev.medium.com/how-to-easily-store-and-display-user-images-in-react-68962e16fe49

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <div className="inner-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
