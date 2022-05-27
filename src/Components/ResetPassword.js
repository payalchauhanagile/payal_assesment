import React from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ResetPassword = () => {
  const token = localStorage.getItem("access_token");

  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const paperStyle = { padding: 20, width: 500, margin: "100px auto" };

  // // var requestOptions = {
  //   method: "POST",
  //   headers: myHeaders,
  //   body: urlencoded,
  //   redirect: "follow",
  // };

  const onSubmit = (values) => {
    var urlencoded = new URLSearchParams();
    urlencoded.append("currentPassword", values.password);
    urlencoded.append("newPassword", values.conformPassword);

    console.log(values);
    fetch("http://202.131.117.92:7100/admin/api/changePassword", {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password minimum length should be 6")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
  });

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid>
          <h1 style={{ textAlign: "center" }}>RESET PASSWORD</h1>
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
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <br />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default ResetPassword;
