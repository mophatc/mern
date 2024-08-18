import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import About from './pages/About'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
export default function App() {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/sign-in' element={<Signin />}></Route>
    <Route path='/sign-up' element={<SignUp/>}></Route>
    <Route path='/about' element={<About />}></Route>
    <Route element={<PrivateRoute />}>
    <Route path='/profile' element={<Profile />}/>
    </Route>
   </Routes>   
   </BrowserRouter>
  )
}
