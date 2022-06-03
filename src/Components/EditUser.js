import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { useParams } from "react-router";
import { Card, Button, Space } from "antd";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API;

const EditUser = () => {
  const [firstName, setFirstName] = useState({});
  const [lastName, setLastName] = useState({});
  const [email, setEmail] = useState({});
  const [phone, setPhone] = useState({});
  const [photo, setPhoto] = useState({});
  const { id } = useParams();

  const paperStyle = { padding: 20, width: 400, margin: "100px auto" };

  const history = useHistory();

  function handleChange(e) {
    console.log(e.target.files);
    setPhoto(URL.createObjectURL(e.target.files[0]));
  }

  console.log("🚀 ~ file: EditUser.js ~ line 68 ~ onSubmit ~ photo", photo);

  var myHeaders = new Headers();
  const token = localStorage.getItem("access_token");

  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("userId", id);

  useEffect(() => {
    fetch(`${API}/admin/api/getUserProfile`, {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    })
      .then((response) => response.json())
      .then((result) => {
        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);
        setEmail(result.data.email);
        setPhone(result.data.phoneNumber);
        setPhoto(result.data.profilePicture);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const onSubmit = async () => {
    console.log(firstName, lastName, email, photo, phone);

    var myHeaders1 = new Headers();

    myHeaders1.append("Authorization", token);
    myHeaders1.append("Content-Type", "application/json");

    var formdata = new FormData();
    formdata.append("userId", id);
    formdata.append("firstName", firstName);
    formdata.append("lastName", lastName);
    formdata.append("email", email);
    formdata.append("phoneNumber", phone);
    formdata.append("profilePicture", photo);

    axios({
      method: "post",
      url: `${API}/admin/api/updateProfile`,
      headers: {
        Authorization: token,
      },
      data: formdata,
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("user updated succesfully!");
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
          <h1>User Edit</h1>
        </Grid>
        <Card>
          <label htmlFor="firstname">firstname : </label> <br />
          <input
            type="text"
            name="firstName"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <br />
          {firstName === "" ? (
            <p style={{ color: "red" }}>firstname is required!</p>
          ) : (
            ""
          )}
          <label htmlFor="lastname">lastname :</label> <br />
          <input
            type="text"
            name="lastName"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <br />
          {lastName === "" ? (
            <p style={{ color: "red" }}>lastname is required!</p>
          ) : (
            ""
          )}
          <label htmlFor="email">email : </label> <br />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          {email === "" ? (
            <p style={{ color: "red" }}>email is required!</p>
          ) : (
            ""
          )}
          <label htmlFor="phone">phone :</label> <br />
          <input
            type="number"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <br />
          {phone === "" ? (
            <p style={{ color: "red" }}>phone number is required!</p>
          ) : (
            ""
          )}
          <label htmlFor="image">photo :</label>
          <br />
          <div>
            <input type="file" onChange={handleChange} />
            <img src={photo} height="100px" width="100px" />
          </div>
          <br />
          <br />
          {photo === "" ? (
            <p style={{ color: "red" }}>photo is required!</p>
          ) : (
            ""
          )}
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
