import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Grid, Paper } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Card } from "antd";
import axios from "axios";

import classes from "./ViewUser.module.css";

const API = process.env.REACT_APP_API;

const ViewUser = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const paperStyle = { padding: 20, width: 400, margin: "100px auto" };
  const { id } = useParams();

  const token = localStorage.getItem("access_token");

  var urlencoded = new URLSearchParams();
  urlencoded.append("userId", id);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "post",
      url: `${API}/admin/api/getUserProfile`,
      headers: {
        Authorization: token,
      },
      data: urlencoded,
    })
      .then(function (response) {
        JSON.stringify(response.data);
        setUser(response.data);
      })
      .catch(function (error) {
        setError(true);
      });
    setIsLoading(false);
  }, []);

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid>
          <h2>User Detail</h2>
        </Grid>
        <Card>
          {error && <p style={{ color: "red" }}>something went wrong!</p>}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              <li>
                {
                  <img
                    src={user?.data?.profilePicture}
                    className={classes.profile}
                  />
                }
              </li>
              <br />
              <li>id:- {user?.data?._id}</li>
              <br />

              <li>Firstname:- {user?.data?.firstName}</li>
              <br />
              <li>Lastname:- {user?.data?.lastName}</li>
              <br />
              <li>Email:- {user?.data?.email}</li>
              <br />
              <li>Phone Number :- {user?.data?.phoneNumber}</li>
              <br />
              <li>Birthday:- {user?.data?.birthday}</li>
              <br />
              <li>Skill Points:- {user?.data?.skillPoints}</li>
              <br />
            </ul>
          )}

          <button>
            <NavLink to="/user">Back</NavLink>
          </button>
        </Card>
      </Paper>
    </Grid>
  );
};

export default ViewUser;
