import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState,useEffect, useContext } from "react";


import Header from "./components/Home/Header/Header";
import Second from "./components/Second/Second";
// import Condition from "./components/Second/Condition/Condition";
import Login from "./components/Login/login";
import Context, { contextData } from "./context/Context";
function App() {
  const [question,setQuestion] = useState()
  useEffect(() => {fetchData();}, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-data");
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setQuestion(data[0])
        localStorage.setItem('data',JSON.stringify(data[0]))
      
      } else {
        console.error("Failed to fetch questions data");
      } 
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [issue, setIssue] = useState("");
  const [display, setDisplay] = useState("none");
  
  return (
    <>
    {/* <Context> */}
    <Router>
        <Header display={display} />
        
        <Routes>
          <Route
            path="/home"
            element={<Home setIssue={setIssue} setDisplay={setDisplay} />}
          />
          <Route path="/" element={<Login setDisplay={setDisplay} />} />
          <Route
            path="/:issue/:id"
            element={<Second  setDisplay={setDisplay} issues={issue}/>}
          />
          
        </Routes>
      </Router>
      {/* </Context> */}
    </>
  );
}

export default App;
