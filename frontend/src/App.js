import Login from "./Login";
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDetails from "./UserDetails/UserDetails";
import Signup from "./Signup";
import AuthCheck from "./AuthCheck";

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes >
          <Route path='/login' element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/' element={<AuthCheck Component={UserDetails} />} />
          {/* <Route path="/fail" element={<FailedLogin />} /> */}
        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;
