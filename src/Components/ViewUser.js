import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Grid, Paper } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Card } from "antd";

const API = process.env.REACT_APP_API;

const ViewUser = () => {
  const [user, setUser] = useState({});

  const paperStyle = { padding: 20, width: 400, margin: "100px auto" };
  const { id } = useParams();

  var myHeaders = new Headers();
  const token = localStorage.getItem("access_token");

  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("userId", id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${API}/admin/api/getUserProfile`, requestOptions)
      .then((response) => response.text())
      .then((result) => setUser(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid>
          <h2>User Detail</h2>
        </Grid>
        <Card>
          <ul>
            <li>
              {
                <img
                  src={user?.data?.profilePicture}
                  style={{ height: "100px", width: "100px" }}
                />
              }
            </li>
            <br />
            <li>id:- {user?.data?._id}</li>
            <br />
            <li>email:- {user?.data?.email}</li>
            <br />
            <li>firstname:- {user?.data?.firstName}</li>
            <br />
            <li>lastname:- {user?.data?.lastName}</li>
            <br />
            <li>phone:- {user?.data?.phoneNumber}</li>
            <br />
            <li>birthdate:- {user?.data?.birthday}</li>
            <br />
          </ul>

          <button>
            <NavLink to="/user">Back</NavLink>
          </button>
        </Card>
      </Paper>
    </Grid>
  );
};

export default ViewUser;
