import './App.css';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Feed from './pages/Feed';
import SignIn from './pages/SignIn';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
