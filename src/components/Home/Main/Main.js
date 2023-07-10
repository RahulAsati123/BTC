import React, { useContext, useEffect, useState } from 'react';
import './Main.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select'
import { lazy } from 'react';
import { contextData } from '../../../context/Context';

function Main({ setIssue}) {
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  // const listIssue = [{label:'No power',value:'No power'},{label:'No power Desktop',value:'No power Desktop'},{label:'No post',value:'No post'},{label:'No Boot',value:'No Boot'},{label:'AC Adapter',value:'AC Adapter'},{label:'Slow Performance',value:'Slow Performance'}]
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if(name == 'issues'){
      value = value.replaceAll(' ', '_')
    }
    // console.log(data)
    setData1({ ...data1, [name]: value });
  };
  
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
  const Support = () => {
    setIssue(data1.issues);

    if (data1.brand === '' || data1.issues === '' || data1.model === '' || data1.case === '') {
      alert('Please provide details');
    } else {
      axios.post('http://localhost:5000/submit-data', data1)
        .then(response => {
          // Handle the response from the Flask app if needed
          if (response.data['success']) {
            if(response.data['issue'] === ""){
              setData1({...data1})
            }
            else{
              const list = document.getElementById('issuesSelect')
              for (let i = 0;i<list.length;i++){
                console.log(list[i])
              }
              setData1({...data1,issues:response.data['issue']})
            }
            localStorage.removeItem('Response')
            localStorage.setItem('Response',JSON.stringify(data1))
            navigate(`/${data1.issues}/${response.data['id']}`);
            // return response.json();
          } 
          else{
            alert(response.data['message'])
          }
        })
        .catch(error => {
          console.error('Error submitting data:', error);
        });
    }
  };

  return (
    <div className="mainContainer">
      <div className='container1'>
        <div className="form">
          <div className="form-group">
            <label htmlFor="brandSelect"><h5>Brand Name:</h5></label>
            <div className="drop">
              <Form.Select size="lg" name='brand' onChange={handleChange} className='form-control' id="brandSelect">
                <option defaultValue>Dell</option>
              </Form.Select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="productSelect"><h5>Product group:</h5></label>
            <div className="drop">
              <Form.Select size="lg" name='product' onChange={handleChange} style={{backgroundColor: "#e5e5e5"}} id="productSelect">
                <option defaultValue>select</option>
                <option>Inspiron Desktop</option>
                <option>Inspiron Notebook</option>
                <option>Vostro Desktop</option>
                <option>Vostro Notebook</option>
                <option>Monitor</option>
                <option>peripherals</option>
              </Form.Select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="modelInput"><h5>Model Number:</h5></label>
            <input type="text" className="form-control" id="modelInput" name='model' onChange={handleChange} placeholder="Enter Model No." />
          </div>
          <div className="form-group">
            <label htmlFor="caseInput"><h5>Case Id:</h5></label>
            <input type="text" className="form-control" id="caseInput" name='case' onChange={handleChange} placeholder="Enter Case Id" />
          </div>
          <div className="form-group">
            <label htmlFor="issuesSelect"><h5>Issue:</h5></label>
            <div className="drop">
              <Form.Select size="lg" name='issues' onChange={handleChange} style={{backgroundColor: "#e5e5e5"}} id="issuesSelect">
                
                <option defaultValue>select</option>
                <option>No power</option>
                <option>No power Desktop</option>
                <option>No post</option>
                <option>No Boot</option>
                <option>AC Adapter</option>
                <option>Slow Performance</option>
                {/* <option>Touchpad not working</option>
                <option>Black screen issue</option>
                <option>Overheating</option> */}
              </Form.Select>
            </div>
          </div>
          <div className="form-group">
            <div className="buttons">
              <Button style={{backgroundColor: "rgb(8, 213, 240)"}} onClick={Support}>Go With Premium Support</Button>
              <Button  style={{backgroundColor: "rgb(8, 213, 240)"}} onClick={Support}>Go With Basic Support</Button>
            </div>
          </div>
        </div>
      </div>

      <section></section>
    </div>
  );
}

export default Main;
