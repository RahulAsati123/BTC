import React, { useEffect } from 'react'
import Header from './Header/Header'
import Main from './Main/Main'
import './Home.css'

const Home = ({setIssue,index,setIndex,setDisplay}) => {
  useEffect(()=>{

    setDisplay('block')
  })
  return (
    <div className='Home'>
        {/* <Header/> */}
        <Main setIssue={setIssue} index={index} setIndex={setIndex}/>
    </div>
  )
}

export default Home