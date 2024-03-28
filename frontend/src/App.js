import Login from "./Login";
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDetails from "./UserDetails/UserDetails";
import Signup from "./SIgnup";
// import FailedLogin from "./FailedLogin/FailedLogin";

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/user' element={<UserDetails />} />
          {/* <Route path="/fail" element={<FailedLogin />} /> */}
        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;
