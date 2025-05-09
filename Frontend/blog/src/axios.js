import axios from 'axios';
import { useDispatch } from 'react-redux'; 
import { signOutSuccess } from './Redux/userSlice';
const instance=axios.create({
    baseURL:'https://blog-web-1svz.onrender.com:5000'
})
export default instance

