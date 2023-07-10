import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import leftLogo from '../../image/big-logo-png.jpeg'

function Login({ setDisplay }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setDisplay("none");
  }, []);

  const WhiteBorderTextField = styled(TextField)`
    & label.Mui-focused {
      color: white;
    }
    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: white;
      }
    }
  `;

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed.");
        }
      })
      .then((data) => {
        if (data.success) {
          // console.log(data)
          navigate("/home");
          setDisplay("block");
        } else {
          setErrorMessage("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Login failed: ", error.message);
      });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.bubble1}></div>
      <div className={styles.bubble2}></div>

      <div className={styles.container}>
        <div className={styles.leftWrapper}>
          <div className={styles.leftLogo}>
            <img src={leftLogo} alt="" />
          </div>
          <div className={styles.leftContent}>
            <h2>Welcome</h2>
            <h2>to</h2>
            <h2>Blitzpath Innovations</h2>
          </div>
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.rightContent}>
            <h1>Sign in</h1>
            <div className={styles.form}>
              <TextField
                label="Sprinklr ID"
                variant="standard"
                className={styles.input}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                className={styles.input}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Button
              variant="contained"
              className={styles.continueBtn}
              endIcon={<NavigateNextIcon m={1} />}
              onClick={(e) => handleSubmit(e)}
            >
              Continue
            </Button>
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;