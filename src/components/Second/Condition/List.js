import React, { useContext, useEffect, useState } from 'react'
import './Condition.css'
import { useNavigate, useParams,useRoutes } from 'react-router-dom'
import axios from 'axios'
// import { contextData } from '../../../context/Context'
const List = ({question,setSol,value,setValue, count , setCount}) => {
  const [data1,setData1] = useState(JSON.parse(localStorage.getItem('Response')))
  const params = useParams()
  console.log(data1)
  useEffect(()=>{
  },[])
  // console.log(data1,JSON.parse(localStorage.getItem('Response')))
  const saveChanges=(id,data1)=>{
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        }
      }
      axios.post(`http://localhost:5000/user/${id}`,localStorage.getItem('Response'),config)
      .catch(error=>{
        console.log(error)
      })}
  const navigate = useNavigate()
  const issue = params.issue.replaceAll("_"," ")
  // console.log(data1)
  // console.log(params)
  useEffect(() => {
    const handlePopstate = () => {
      // Perform state changes here
      // For example, you can update a state variable or call a function
      setData1({...data1, sol:''})
      if(data1.questionResponse.length !== 0){
        console.log('remove')
        data1.questionResponse.pop()
      }
      localStorage.setItem('Response',JSON.stringify(data1))
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);


  const handleChange = (option)=>{
    setData1({...data1,sol:''})
    localStorage.setItem('Response',JSON.stringify(data1))
    setValue(option)
    setSol(false)
    if(option !== ''){
      // console.log(value)
      const select1 = question[issue][params.id]['options'][option]
      // console.log(select1,option)
      if(select1 !== undefined){
      // console.log(select1)
      if  (select1[0] === true){
        document.getElementById('probeButton').innerHTML = 'Submit'

        }
        else{
          document.getElementById('probeButton').innerHTML = 'Next'
        }
      }
      else{
        document.getElementById('probeButton').innerHTML = 'Next'
      }
    }
    else{
      document.getElementById('probeButton').innerHTML = 'Next'
    }
    // if (option === "yes") {
    //   setChecked({ yes: true, no: false });
    // } else {
      //   setChecked({ yes: false, no: true });
      // }
      
      
    }
    const handleBack = ()=>{
      // console.log(params.id)
      setData1({...data1, sol:'',currId:parseInt(params.id)})
      setValue('')
      document.getElementById('probeButton').innerHTML = 'Next'
      setCount(count-1)
      // if(data1.questionResponse.length !== 0){
      //   // console.log('remove')
      //   data1.questionResponse.pop()
      // }
      localStorage.setItem('Response',JSON.stringify(data1))

      window.history.go(-1)
}

const handleIndex = ()=>{
  if(value !== ''){
    const select = question[issue][params.id]['options'][value]
    if(question[issue][parseInt(params.id)]['Que'] !== undefined){
      if(data1.questionResponse.length!==0 && data1.questionResponse[data1.questionResponse.length-1].hasOwnProperty(question[issue][parseInt(params.id)]['Que'])){
        data1.questionResponse[data1.questionResponse.length-1][question[issue][parseInt(params.id)]['Que']] = value
      }
      else{
      data1.questionResponse.push({[question[issue][parseInt(params.id)]['Que']]:value})}
  }
  
  if(select !== undefined){
    
    if (select[0] === true){
      setData1({...data1,sol:question[issue][parseInt(params.id)]['options'][value][2]})
      setSol(true)
      window.scrollTo(0,9999)
    }
    else{
      setCount(count+1)
      setSol(false)
      // console.log(question[ind.issue][id.id].yes)
      // console.log(question[ind.issue][id.id].No[1])
      setData1({...data1,currId:parseInt(select[1])})
      navigate(`/${params.issue}/${parseInt(select[1])}`)
      setValue('')
    }
    localStorage.setItem('Response',JSON.stringify(data1))
    saveChanges(JSON.parse(localStorage.getItem('Response'))['case'],data1)
    
  }
}
    
  
}
  return (
    <>
    {/* {console.log(question[issue][id.id].heading)} */}
   <div className="boxContainer">
   <div className="description">
   <h2>Step {parseInt(count)+1}: {question[issue][params.id].heading}</h2>
   {question[issue][params.id].subHeading.length !==0 ?
   question[issue][params.id].subHeading.map((ele)=>{
    return(
      <>
      <h3>{ele[0]}</h3>
      <div className="ul">
        <ul>
          {ele[1].map((element,index)=>{
            return(

              <li key={index}>{element}</li>
            )
          })
   }

        </ul>
       {/* {question[id.id].Note.length !==0? <h3>Note: {question[id.id].Note}</h3>: ''}
       {question[id.id].important.length !==0? <h3>Important!: {question[id.id].important}</h3>: ''} */}
      </div>
      </>
    )
   }):
      <div className="ul">
        <ul>
          {question[issue][params.id].desc.map((element,index)=>{
            return(

              <li key={index}>{element}</li>
            )
          })
   }

        </ul>
       {/* {question[id.id].Note.length !==0? <h3>Note: {question[id.id].Note}</h3>: ''}
       {question[id.id].important.length !==0? <h3>Important!: {question[id.id].important}</h3>: ''} */}
      </div>}
   </div>
   
   <div className="question">
     <h3>Q. {question[issue][params.id].Que}</h3>
     
     <div className="answer">
  { 
  question[issue][params.id]['option'].map((key,index)=>{
  // console.log(key === value,value)
  return(
      <div className="ans" key={index}>
  <label className="rad-label">
    <input type="radio" class="rad-input"  onChange={()=>handleChange(key)} value={key} checked={value === key} name="rad" />
    <div className="rad-design"></div>
    <div className="rad-text">{key}</div>
  </label>
  </div>)
  })
}
   </div>
  <div className="button">
      <button type='button'id='probeButton' onClick={handleIndex}>Next </button>
  </div>
  <div className="button1">
      <button type='button'id='probeButton' onClick={handleBack}>Back </button>
  </div>
   </div>
   
   </div>
   
   </>
  )
}

export default List