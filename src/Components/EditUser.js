import React, { useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useParams } from "react-router";

const EditUser = () => {
  const { id } = useParams();
  console.log(id);

  // const [user, setUser] = useState([]);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    file: "",
  };
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    phone: Yup.number().required("Required"),
  });

  var myHeaders = new Headers();

  myHeaders.append(
    "Authorization",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWIwZDNhOGJlYjgyMTYzNDIzOTEwZCIsImVtYWlsIjoiYWRtaW4uaWdvdG5leHRAeW9wbWFpbC5jb20iLCJpYXQiOjE2NTMzNzYzMTd9.9KT8BQtnqjqybd3q8M6iI1jAqxL-IOjPxtLIIQdvws8"
  );
  myHeaders.append("Content-Type", "application/json");

  var formdata = new FormData();
  formdata.append("userId", "605c1011ceda1a18bd71e0f3");
  formdata.append("firstName", "Jollllly");

  const paperStyle = { padding: 20, width: 500, margin: "100px auto" };

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,

    redirect: "follow",
  };

  // console.log("user", user);

  useEffect(() => {
    fetch(`http://202.131.117.92:7100/admin/api/updateProfile`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid>
          <h1 style={{ textAlign: "center" }}>EDIT</h1>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          // onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                name="firstname"
                type="text"
                label="firstname"
                placeholder="firstname"
                helperText={<ErrorMessage name="firstname" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="lastname"
                type="text"
                label="lastname"
                placeholder="lastname"
                helperText={<ErrorMessage name="lastname" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="email"
                type="email"
                label="email"
                placeholder="email"
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="phone"
                type="number"
                label="phone"
                placeholder="phone"
                helperText={<ErrorMessage name="phone" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="profile"
                type="file"
                label="profile"
                placeholder="profile"
                helperText={<ErrorMessage name="profile" />}
              />

              <br />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default EditUser;
