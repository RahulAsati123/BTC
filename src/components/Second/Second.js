import React, { useContext, useEffect,useState } from 'react'
import Condition from './Condition/Condition'
import './Second.css'
import { Outlet, Route, Routes, useParams } from 'react-router-dom'
import copy from '../../image/copy.png'
// import { contextData } from '../../context/Context'
import { contextData } from '../../context/Context'

const Second = ({issues,setDisplay}) => {
    // console.log(data['brand'])
    // console.log(index)
    // useEffect(()=>{
    //   setIndex(0)
    // })
  // console.log(question);
    const data= JSON.parse(localStorage.getItem('Response'))
    setDisplay('block')
    // console.log(data)
    const id = useParams()
    const iss = id.issue.replace("_"," ")
    const handleCopy = ()=>{
        let str = ''
        navigator.clipboard.writeText("")
        data['questionResponse'].forEach(ele => {
          for (const key in ele){
            str += "Que: "+key+'\n'+"Response: "+ele[key]+'\n'
          }
        });
        if(data['sol'] !== ""){
          str += "Reference - " + data['sol']
        }
        navigator.clipboard.writeText(str)
        alert('Copied to clipboard')
      }
  return (
    <div className='container2'>
        <div className="details">
           
                  
            <div className="data">
                <h5>Brand Name: </h5>
                <h5>{data['brand']}</h5>
            </div>
            <div className="data">
                <h5>Model No: </h5>
                <h5>{data['model']}</h5>
            </div>
            <div className="data">
                <h5>Case ID: </h5>
                <h5>{data['case']}</h5>
            </div>
            <div className="data">
                <h5>Issue: </h5>
                <h5>{iss}</h5>
            </div>
            <div className="data">
                <h5>Product: </h5>
                <h5>{data['product']}</h5>
            </div>
        
    </div>
    <div className="flow">
    <div className="queContainer">
        <h2>{iss}</h2>
       <img src={copy} alt="" onClick={handleCopy} />
     </div>
        <hr />
    </div>
  
      <Condition issues={issues}/>
    <Outlet/>
  
    </div>
  )
}

export default Second