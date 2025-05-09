import { useEffect,useState } from "react"
import axiosInstance from "./axios";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "./Redux/userSlice";
import { useNavigate } from "react-router-dom";
export const useAxios=()=>{

      const [unauthorized, setUnauthorized] = useState(false);
      const dispatch = useDispatch();
      const navigate=useNavigate();
    

    useEffect(() => {
        const resInterceptor = (response) => response;
    
        const errInterceptor = (error) => {
          if (error.response && error.response.status === 401) {
            setUnauthorized(true);
            dispatch(signOutSuccess());
            navigate('/');
            
          }
          return Promise.reject(error);
        };
    
        const interceptor = axiosInstance.interceptors.response.use(resInterceptor, errInterceptor);
    
        return () => {
          axiosInstance.interceptors.response.eject(interceptor);
        };
      }, []);
    
      return { unauthorized };

}
