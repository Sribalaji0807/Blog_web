import Header from './Components/Header/Header'
import './App.css'
import Home from './Components/Home/Home'
import FooterComponent from './Components/Footer/Footer'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Signin from './Components/Sigin/Signin'
import Login from './Components/Sigin/Login'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Dashboard/Dashboard'
import CreatePost from './Components/Post/CreatePost'
import AdminPrivateRoute from './Components/AdminPrivateRoute'
import UpdatePost from './Components/Post/UpdatePost'
import PostPage from './Components/Post/PostPage'
import ScrollToTop from './Components/ScrollToTop'
import SearchComp from './Components/Home/SearchComp'
import About from './Components/About'
function App() {

  return (
    <>
 <Router>
  <ScrollToTop/>
 <Header/>
  <Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/about' element={<About/>
  }/>
  <Route path='/signin' element={<Signin />} />
  <Route path='/login' element={<Login/>} />
  <Route path='/search' element={<SearchComp/>} />
  <Route element={<PrivateRoute/>}>
<Route path='/dashboard' element={<Dashboard/>}/>
  </Route>
  <Route element={<AdminPrivateRoute/>}>
    <Route path='/create-post' element={<CreatePost/>}/>
    <Route path='/update-post/:postId' element={<UpdatePost/>}/>

  </Route>
  <Route path='/post/:postSlug' element={<PostPage/>} />
  </Routes>
  <FooterComponent />
 </Router>

    </>
  )
}

export default App
