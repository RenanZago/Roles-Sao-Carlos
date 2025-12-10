import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home/Home';
import EventDetails from './pages/EventDetails/EventDetails';
import Calendar from './pages/Calendar/Calendar';
import Map from './pages/Map/Map';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import AddEvent from './pages/AddEvent/AddEvent';
import './styles/base.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/evento/:id" element={<EventDetails />} />
          <Route path="/calendario" element={<Calendar />} />
          <Route path="/mapa" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/esqueci-senha" element={<ForgotPassword />} />
          <Route path="/adicionar-evento" element={<AddEvent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
