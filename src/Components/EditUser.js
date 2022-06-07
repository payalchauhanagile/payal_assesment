import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { useParams } from "react-router";
import { Card, Button, Space } from "antd";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import classes from "./EditUser.module.css";

const API = process.env.REACT_APP_API;

const EditUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const paperStyle = { padding: 20, width: 400, margin: "100px auto" };

  const history = useHistory();

  const setImageHadler = () => {
    var imagefile = document.querySelector("#editImage");
    if (!imagefile.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
      return false;
    }
    setProfile(imagefile.files[0]);
  };

  var myHeaders = new Headers();
  const token = localStorage.getItem("access_token");

  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("userId", id);

  useEffect(() => {
    setLoading(true);

    fetch(`${API}/admin/api/getUserProfile`, {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    })
      .then((response) => response.json())
      .then((result) => {
        setError(null);

        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);
        setEmail(result.data.email);
        setPhone(result.data.phoneNumber);
        setProfile(result.data.profilePicture);
        setBirthdate(result.data.birthday);
      })
      .catch((error) => setError(error.message));
    setLoading(false);
  }, []);

  const onSubmit = async () => {
    var formdata = new FormData();
    formdata.append("userId", id);
    formdata.append("firstName", firstName);
    formdata.append("lastName", lastName);
    formdata.append("email", email);
    formdata.append("phoneNumber", phone);
    formdata.append("birthday", birthdate);
    if (isImageUploaded) {
      formdata.append("profilePicture", profile);
    }

    axios({
      method: "post",
      url: `${API}/admin/api/updateProfile`,
      headers: {
        Authorization: token,
      },
      data: formdata,
    })
      .then(function (response) {
        JSON.stringify(response.data);
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
        <div className={classes.layout}>
          {loading ? (
            <p>Loading....</p>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <Card>
              <label htmlFor="profile">profile :</label>
              <br />
              <div>
                <img
                  src={profile}
                  alt="user profile"
                  height="100px"
                  width="100px"
                />
                <div>
                  <input
                    type="file"
                    name="profile"
                    id="editImage"
                    placeholder="Please enter user profile"
                    onChange={() => {
                      setImageHadler();
                      setIsImageUploaded(true);
                    }}
                  />
                </div>
              </div>
              <br />
              {profile === "" ? (
                <p className={classes.invalid}>photo is required!</p>
              ) : (
                ""
              )}
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
                <p className={classes.invalid}>firstname is required!</p>
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
                <p className={classes.invalid}>lastname is required!</p>
              ) : (
                ""
              )}
              <label htmlFor="email">email : </label> <br />
              <input
                type="email"
                name="email"
                id="email"
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              {email === "" ? (
                <p className={classes.invalid}>email is required!</p>
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
                <p className={classes.invalid}>phone number is required!</p>
              ) : (
                ""
              )}
              <label htmlFor="image">Birthdate</label>
              <br />
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                value={moment(birthdate).format("YYYY-MM-DD")}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
              <br />
              {birthdate === "" ? (
                <p className={classes.invalid}>birthdate is required!</p>
              ) : (
                ""
              )}
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
          )}
        </div>
      </Paper>
    </Grid>
  );
};

export default EditUser;
