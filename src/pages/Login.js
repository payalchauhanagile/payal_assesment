import React from "react";
import { Grid, Paper, TextField, Button, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const history = useHistory();
  const paperStyle = {
    padding: 20,
    width: 350,
    height: 300,
    margin: "100px auto",
  };
  const headerStyle = { margin: 0 };

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string()
      .min(6, "Password minimum length should be 6")
      .required("Required"),
  });

  const onSubmit = (values) => {
    // console.log(values);

    axios
      .post(`http://202.131.117.92:7100/admin/auth/login`, values)

      .then((res) => {
        localStorage.setItem("access_token", res.data.data["access_token"]);
        localStorage.setItem("email", res.data.data["email"]);
        history.push("/user");
        console.log(res);
      })
      .catch((err) => {
        console.error(err.response.data);
        if (err instanceof Response) {
          switch (err.status) {
            case 401:
              throw new Error("Invalid login credentials");
            /* ... */
            default:
              throw new Error(
                `Unknown server error occured: ${err.statusText}`
              );
          }
        }
      });
  };

  return (
    <>
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Login</h2>
          </Grid>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  helperText={<ErrorMessage name="email" />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  helperText={<ErrorMessage name="password" />}
                />
                <br />
                <br />
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
