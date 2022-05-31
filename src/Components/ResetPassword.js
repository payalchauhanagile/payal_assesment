import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { Space, Button, Card } from "antd";
import { NavLink } from "react-router-dom";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState({});
  const [newPassword, setNewPassword] = useState({});

  const token = localStorage.getItem("access_token");

  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const paperStyle = { padding: 20, width: 500, margin: "100px auto" };

  const onSubmit = () => {
    console.log("result", currentPassword, newPassword);
    var urlencoded = new URLSearchParams();
    urlencoded.append("currentPasswor", "123456");
    urlencoded.append("newPassword", newPassword);
    fetch("http://202.131.117.92:7100/admin/api/changePassword", {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setCurrentPassword(result.data.currentPassword);
        setNewPassword(result.data.newPassword);
      })
      .catch((error) => console.log("error", error));
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
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="newPassword">New password :- </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <br />
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
