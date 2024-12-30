// Signup.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// update for database
import axios from "axios";

const Container = styled.div`
  background-image: url("cyber-background.jpg");
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

  input,
  select {
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

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  purpose: Yup.string().required("Purpose of use is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  // const handleSubmit = (values) => {
  //   localStorage.setItem("username", values.username);
  //   // Add these lines to store the email and password in localStorage
  //   localStorage.setItem("userEmail", values.email); // NEW LINE
  //   localStorage.setItem("userPassword", values.password); // NEW LINE
  //   alert("Signup Successful!");
  //   navigate("/login");
  // };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        values
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error signing up.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Signup</Title>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            purpose: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <FormGroup>
                <label>Username</label>
                <Field name="username" placeholder="Enter Username" />
                <ErrorMessage name="username" component={ErrorText} />
              </FormGroup>

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

              <FormGroup>
                <label>Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <ErrorText>{errors.confirmPassword}</ErrorText>
                ) : (
                  touched.confirmPassword && (
                    <ErrorText style={{ color: "#4caf50" }}>
                      Password matched
                    </ErrorText>
                  )
                )}
              </FormGroup>

              <FormGroup>
                <label>Purpose of Use</label>
                <Field as="select" name="purpose">
                  <option value="" label="Select purpose" />
                  <option value="normal" label="Normal" />
                  <option value="professional" label="Professional" />
                </Field>
                <ErrorMessage name="purpose" component={ErrorText} />
              </FormGroup>

              <div style={{ textAlign: "right", marginBottom: "1rem" }}>
                <a
                  href="/forgot_password"
                  style={{ color: "#0d6efd", fontSize: "0.875rem" }}
                >
                  Forgot Password?
                </a>
              </div>

              <Button type="submit">Sign Up</Button>
              <Button type="button" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Container>
  );
};

export default Signup;
