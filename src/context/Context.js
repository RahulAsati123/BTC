import React,{createContext, useState,useEffect} from 'react'

export const contextData = createContext(null)
function Context({children}) {
  const [data1, setData1] = useState({
    brand: "Dell",
    currId:0,
    model: "",
    issues: "",
    product: "",
    case: "",
    questionResponse: [],
    sol:''
  });
  return (
    <contextData.Provider value={{data1,setData1}}>{children}</contextData.Provider>
  )
}

export default Context