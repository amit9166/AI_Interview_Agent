import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Step3Report from '../components/Step3Report';
import api from "../utils/api";
const InterviewReport = () => {
  const {id}=useParams();
  const [report,setReport]=useState(null);
  useEffect(()=>{
    async function fetchReport(){
      try {
        const result=await api.get(`/interview/report/${id}`);
        // console.log(result.data);
        setReport(result.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchReport();
  },[]);

  if(!report){
    return(<div className='min-h-screen flex items-center justify-center'>
      <p className='text-gray-500 text-lg'>Loading Report...</p>
    </div>)
  }
  return <Step3Report report={report}/>
}

export default InterviewReport
