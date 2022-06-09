import React, { useState } from "react";
import { Avatar, Button, TextField, Paper, Grid } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";

const API = process.env.REACT_APP_API;

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

  async function loginUser(userdata) {
    return fetch(`${API}/admin/auth/login`, {
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
