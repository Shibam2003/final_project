// Login.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  background-image: url("cyber_login.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  background: rgba(0, 0, 0, 0.85);
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 360px;
  color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #0d6efd;
  font-weight: 700;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  input {
    width: 100%;
    padding: 0.7rem;
    border: none;
    border-radius: 8px;
    background: #222;
    color: #fff;
    outline: none;
    font-size: 0.9rem;
    transition: all 0.3s ease-in-out;

    &:focus {
      background: #333;
      border: 1px solid #0d6efd;
    }
  }
`;

const ErrorText = styled.div`
  color: #ff4d4d;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #0d6efd;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1.5rem;
  font-size: 1rem;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #0a58ca;
  }
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // const handleSubmit = (values) => {
  //   // Retrieve stored email and password from localStorage
  //   const storedEmail = localStorage.getItem("userEmail"); // NEW LINE
  //   const storedPassword = localStorage.getItem("userPassword"); // NEW LINE

  //   // Check if entered email and password match the stored values
  //   if (values.email === storedEmail && values.password === storedPassword) {
  //     // NEW LINE
  //     alert(`Welcome, ${username}!`);
  //     navigate("/welcome");
  //   } else {
  //     alert("Invalid email or password.");
  //   }
  // };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        values
      );
      localStorage.setItem("username", response.data.user.username);
      alert("Login successful!");
      navigate("/dash_board");
    } catch (error) {
      alert(error.response?.data?.message || "Error logging in.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <FormGroup>
                <label>Email</label>
                <Field type="email" name="email" placeholder="Enter Email" />
                <ErrorMessage name="email" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                />
                <ErrorMessage name="password" component={ErrorText} />
              </FormGroup>

              <div style={{ textAlign: "right", marginBottom: "1rem" }}>
                <a
                  href="/forgot_password"
                  style={{ color: "#0d6efd", fontSize: "0.875rem" }}
                >
                  Forgot Password?
                </a>
              </div>

              <Button type="submit">Login</Button>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Container>
  );
};

export default Login;
