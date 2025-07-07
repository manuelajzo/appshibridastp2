import './App.css';
import Games from './components/Games';
import DlcList from './components/DlcList';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/dlcs" element={<DlcList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
}

export default App;
