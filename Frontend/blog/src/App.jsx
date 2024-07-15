import Header from './Components/Header/Header'
import './App.css'
import Home from './Components/Home/Home'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
function App() {

  return (
    <>
 <Router>
 <Header/>
  <Routes>
  <Route path='/' element={<Home/>} />
  </Routes>
 </Router>

    </>
  )
}

export default App
