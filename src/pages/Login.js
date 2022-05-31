// import React from "react";
// import { Grid, Paper, TextField, Button, Avatar } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// const Login = () => {
//   const history = useHistory();
//   const paperStyle = {
//     padding: 20,
//     width: 350,
//     height: 300,
//     margin: "100px auto",
//   };
//   const headerStyle = { margin: 0 };

//   const initialValues = {
//     email: "",
//     password: "",
//   };
//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Enter valid email").required("Required"),
//     password: Yup.string()
//       .min(6, "Password minimum length should be 6")
//       .required("Required"),
//   });

//   const onSubmit = (values) => {
//     // console.log(values);

//     axios
//       .post(`http://202.131.117.92:7100/admin/auth/login`, values)

//       .then((res) => {
//         localStorage.setItem("access_token", res.data.data["access_token"]);
//         localStorage.setItem("email", res.data.data["email"]);
//         history.push("/user");
//         console.log(res);
//       })
//       .catch((err) => {
//         console.error(err.response.data);
//         if (err instanceof Response) {
//           switch (err.status) {
//             case 401:
//               throw new Error("Invalid login credentials");
//             /* ... */
//             default:
//               throw new Error(
//                 `Unknown server error occured: ${err.statusText}`
//               );
//           }
//         }
//       });
//   };

//   return (
//     <>
//       <Grid>
//         <Paper style={paperStyle}>
//           <Grid align="center">
//             <Avatar>
//               <LockOutlinedIcon />
//             </Avatar>
//             <h2 style={headerStyle}>Login</h2>
//           </Grid>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={onSubmit}
//           >
//             {(props) => (
//               <Form>
//                 <Field
//                   as={TextField}
//                   fullWidth
//                   name="email"
//                   label="Email"
//                   placeholder="Enter your email"
//                   helperText={<ErrorMessage name="email" />}
//                 />
//                 <Field
//                   as={TextField}
//                   fullWidth
//                   name="password"
//                   type="password"
//                   label="Password"
//                   placeholder="Enter your password"
//                   helperText={<ErrorMessage name="password" />}
//                 />
//                 <br />
//                 <br />
//                 <Button type="submit" variant="contained" color="primary">
//                   Login
//                 </Button>
//               </Form>
//             )}
//           </Formik>
//         </Paper>
//       </Grid>
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

// import classes from "./Login.module.css";
// import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";

// const API = process.env.REACT_APP_API;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px 0",
    justifyContent: "center",
  },

  paper: {
    margin: theme.spacing(5, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "80%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  console.log("login", email, password);

  // const history = useHistory();

  async function loginUser(userdata) {
    return fetch(`http://202.131.117.92:7100/admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    }).then((data) => data.json());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
    });
    console.log("response", response);
    if ("access_token" in response.data) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("access_token", response.data["access_token"]);
        localStorage.setItem("email", response.data["email"]);
        window.location.href = "/user";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={5} component={Paper} elevation={12} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email"
                onChange={(e) => setemail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
