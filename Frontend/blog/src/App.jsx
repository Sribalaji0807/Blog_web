import Header from './Components/Header/Header'
import './App.css'
import Home from './Components/Home/Home'
import FooterComponent from './Components/Footer/Footer'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Signin from './Components/Sigin/Signin'
import Login from './Components/Sigin/Login'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Dashboard/Dashboard'
function App() {

  return (
    <>
 <Router>
 <Header/>
  <Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/signin' element={<Signin />} />
  <Route path='/login' element={<Login/>} />
  <Route element={<PrivateRoute/>}>
<Route path='/dashboard' element={<Dashboard/>}/>
  </Route>
  </Routes>
  <FooterComponent />
 </Router>

    </>
  )
}

export default App
