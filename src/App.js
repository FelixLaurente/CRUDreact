
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Login from './Login';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import Team from './pages/Team.jsx';
import Messages from './pages/Messages';
import Support from './pages/Support';
import Register from './Register';
import { ToastContainer } from 'react-toastify';






function App() {

  return (
    
    <> 
    
    <ToastContainer></ToastContainer>
    <BrowserRouter> 
    <Navbar/>
           <Routes>
               <Route path='/'     element={<Login/>}/>
               <Route path='/login'     element={<Login/>}/>
               <Route path='/register'  element={<Register/>}/>
               <Route path='/home'      element={<Home/>}/>
               <Route path='/reports'   element={<Reports/>}/>
               <Route path='/products'  element={<Products/>}/>
               <Route path='/team'      element={<Team/>}/>
               <Route path='/messages'  element={<Messages/>}/> 
               <Route path='/support'   element={<Support/>}/>
           </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
