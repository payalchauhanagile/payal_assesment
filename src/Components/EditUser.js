import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";

import { useParams } from "react-router";
import { Card, Button, Space } from "antd";
import { NavLink } from "react-router-dom";

const EditUser = () => {
  const [firstName, setFirstName] = useState({});
  const [lastName, setLastName] = useState({});
  const [email, setEmail] = useState({});
  const [phone, setPhone] = useState({});
  const [photo, setPhoto] = useState({});

  const { id } = useParams();
  console.log(id);

  var myHeaders = new Headers();

  myHeaders.append(
    "Authorization",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWIwZDNhOGJlYjgyMTYzNDIzOTEwZCIsImVtYWlsIjoiYWRtaW4uaWdvdG5leHRAeW9wbWFpbC5jb20iLCJpYXQiOjE2NTMzNzYzMTd9.9KT8BQtnqjqybd3q8M6iI1jAqxL-IOjPxtLIIQdvws8"
  );
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("userId", id);

  useEffect(() => {
    fetch(`http://202.131.117.92:7100/admin/api/getUserProfile`, {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    })
      .then((response) => response.json())
      .then((result) => {
        // setUser(result);
        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);
        setEmail(result.data.email);
        setPhone(result.data.phoneNumber);
        setPhoto(result.data.profilePicture);

        console.log("result", result.data.firstName);
      })
      .catch((error) => console.log("error", error));
  }, []);

  // console.log("user", user);

  const paperStyle = { padding: 20, width: 400, margin: "100px auto" };

  const onSubmit = async () => {
    console.log(firstName, lastName, email, photo, phone);

    const token = localStorage.getItem("access_token");

    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var formdata = new FormData();
    formdata.append("userId", id);
    formdata.append("firstName", firstName);
    formdata.append("lastName", lastName);
    formdata.append("email", email);
    formdata.append("phoneNumber", phone);

    fetch(`http://202.131.117.92:7100/admin/api/updateProfile`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    })
      .then((response) => response.json())
      .then((result) => console.log(result.data))
      .catch((error) => console.log("error", error));
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid>
          <h1>User Edit</h1>
        </Grid>
        <Card>
          <label htmlFor="profile">photo : </label>
          <br />
          <input
            type="image"
            src={photo}
            height="100px"
            onSelect={(e) => setPhoto(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="firstname">firstname : </label> <br />
          <input
            type="text"
            name="firstName"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="lastname">lastname :</label> <br />
          <input
            type="text"
            name="lastName"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="email">email : </label> <br />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="phone">phone :</label> <br />
          <input
            type="number"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <br />
          <Space>
            <Button type="submit" onClick={onSubmit}>
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

export default EditUser;
