import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import Search from './pages/Search'
import Listing from './pages/Listing'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'


function App() {

  return (
    <>
    <Header/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/create-listing' element={<CreateListing />} />    
        <Route path='/update-listing/:listingId' element={<UpdateListing />} />    

    </Routes>
    </>
  )
}

export default App
