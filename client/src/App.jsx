import React, { useEffect } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './pages/Home';
import Auth from './pages/Auth';
import InterviewPage from './pages/InterviewPage';
import InterviewHistory from './pages/InterviewHistory';
import Pricing from './pages/Pricing';
import InterviewReport from './pages/InterviewReport';
import { useDispatch } from 'react-redux';
import { setAuthLoading, setUserData } from './redux/userSlice';
import api from './utils/api';

function App(){
  const dispatch=useDispatch();

  useEffect(()=>{
    async function getUser(){
      try {
        const result=await api.get("/user/current-user");
        dispatch(setUserData(result.data));
      } catch (error) {
        dispatch(setUserData(null));
      } finally {
        dispatch(setAuthLoading(false));
      }
    }

    getUser();
  },[dispatch]);
  
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/auth",
      element:<Auth/>
    },
    {
      path:"/interview",
      element:<InterviewPage/>
    },
    {
      path:"/history",
      element:<InterviewHistory/>
    },
    {
      path:"/pricing",
      element:<Pricing/>
    },
    {
      path:"/report/:id",
      element:<InterviewReport/>
    },
  ])
  return(
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
 
