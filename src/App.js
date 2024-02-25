import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
import { ToastContainer } from 'react-toastify';
import RegisterOtp from './components/registerOtp/RegisterOtp';
import Dashboard from './components/dashboard/Dashboard';
import LoginOtp from './components/loginOtp/LoginOtp';
import 'react-toastify/dist/ReactToastify.css';
import LoginWithPassword from './components/loginWithPassword/LoginWithPassword';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <NoteState>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/registerOtp" element={<RegisterOtp/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/loginOtp" element={<LoginOtp/>}/>
          <Route exact path="/loginWithPassword" element={<LoginWithPassword/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
    />
      </Router>
    </NoteState>
  );
}

export default App;
