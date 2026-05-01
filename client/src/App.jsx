import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './pages/Home';
import Auth from './pages/Auth';
import InterviewPage from './pages/InterviewPage';
import InterviewHistory from './pages/InterviewHistory';
import Pricing from './pages/Pricing';
import InterviewReport from './pages/InterviewReport';

function App(){
  
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
 