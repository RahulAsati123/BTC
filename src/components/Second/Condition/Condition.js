import React, { useContext, useState } from 'react'
import './Condition.css'
import List from './List'
import { useParams } from 'react-router-dom'
import { contextData } from '../../../context/Context'
const Condition = ({issues}) => {
  const [sol, setSol] = useState(false)
  // const [ans, setAns] = useState('')
  const [count,setCount] = useState(0)
  const [value, setValue] = useState('')
  // console.log(id.id,question.length)
  const i = useParams()
  // console.log(question[i.issue][parseInt(i.id)].yes[2])
  const issu = i.issue.replaceAll("_"," ")
  
  // const [question1,setQuestion1] = useState()
  
  const question1 = JSON.parse(localStorage.getItem('data'))
  return (
    <>
    
    <div className="section">
    <div className='condition'> 
                    <List question={question1}   count={count}  value={value} setValue= {setValue} setCount={setCount} issues={issues} setSol={setSol}/>
    </div>
   
   
    </div>
    <div className="solution" style={{display:sol?'block': 'none'}}>
    <h2>Reference</h2>
    {/* {console.log(value)} */}
    <h3>{value!=="" && question1[issu][parseInt(i.id)]['options'][value]!==undefined? question1[issu][parseInt(i.id)]['options'][value][2]:''}</h3>
   </div>
   <div style={{height:'20px'}}></div>
   </>
  )
}

export default Condition