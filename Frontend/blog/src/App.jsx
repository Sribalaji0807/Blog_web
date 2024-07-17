import Header from './Components/Header/Header'
import './App.css'
import Home from './Components/Home/Home'
import FooterComponent from './Components/Footer/Footer'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Signin from './Components/Sigin/Signin'
function App() {

  return (
    <>
 <Router>
 <Header/>
  <Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/signin' element={<Signin />} />
  </Routes>
  <FooterComponent />
 </Router>

    </>
  )
}

export default App
