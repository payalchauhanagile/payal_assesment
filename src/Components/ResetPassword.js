import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { Space, Button, Card } from "antd";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

import classes from "./ResetPassword.module.css";

const API = process.env.REACT_APP_API;

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState({});
  const [newPassword, setNewPassword] = useState({});

  const history = useHistory();

  const token = localStorage.getItem("access_token");

  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const paperStyle = { padding: 20, width: 500, margin: "100px auto" };

  const onSubmit = () => {
    var urlencoded = new URLSearchParams();
    urlencoded.append("currentPassword", Number(currentPassword));
    urlencoded.append("newPassword", newPassword);

    axios({
      method: "post",
      url: `${API}/admin/api/changePassword`,
      headers: {
        Authorization: token,
      },
      data: urlencoded,
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("password Reset Succesfully!");
        history.push("/user");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid>
          <h1>Reset password</h1>
        </Grid>
        <Card>
          <label htmlFor="currentPassword">Current password :- </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {currentPassword.length > 0 && currentPassword.length <= 6 ? (
            <p className={classes.valid}>valid</p>
          ) : (
            <p className={classes.invalid}>length sould be 6 characters</p>
          )}

          <label htmlFor="newPassword">New password :- </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {newPassword.length > 0 && currentPassword.length <= 6 ? (
            <p className={classes.valid}>valid</p>
          ) : (
            <p className={classes.invalid}>length sould be 6 characters</p>
          )}

          <Space>
            <Button type="primary" onClick={onSubmit}>
              Update
            </Button>
            <Button type="primary">
              <NavLink to="/user">Back</NavLink>
            </Button>
          </Space>
        </Card>
      </Paper>
    </Grid>
  );
};

export default ResetPassword;
