import React, { useContext } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import logo from '../../../image/Blitzpath logo- Copy.png'
import { contextData } from '../../../context/Context'
function Header({display}) {
  // const {question} = useContext(contextData)
  return (
    <header className='header' style={{display:display}}>
        <div className="container">
        <div className="title1">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="title">
          <Link to='/home'><h3>Blitzpath Tech Console</h3></Link>
          </div>
          </div>
        <div className="list">
            <ul>
                <li>Known Issues</li>
                <li>Articles</li>
            </ul>
        </div>
        </div>
    </header>
  )
}

export default Header
