import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Grid, Paper } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const ViewUser = () => {
  const paperStyle = { padding: 20, width: 300, margin: "100px auto" };

  const { id } = useParams();
  console.log(id);
  const [user, setUser] = useState({});

  // const location = useLocation();
  // console.log(location);

  console.log("user", user);

  var myHeaders = new Headers();
  const token = localStorage.getItem("access_token");

  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("userId", "626795fd302b8542b79afe2c");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`http://202.131.117.92:7100/admin/api/getUserProfile`, requestOptions)
      .then((response) => response.text())
      .then((result) => setUser(result))
      .catch((error) => console.log("error", error));
  }, []);

  console.log("user", user);
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid>
          <h2>User Data </h2>
        </Grid>
        <ul>
          <li>id:{id.firstName}</li>
          <li>email:{user.email}</li>
          <li>firstname:{user.firstName}</li>
          <li>lastname:{user.lastName}</li>
          <li>phone:{user.phoneNumber}</li>
          <li>birthdate:{user.birthdate}</li>
        </ul>

        {/* {user.map((result) => (
          <ul>
            <li>id:{result._id}</li>
            <li>email:{result.email}</li>
          </ul>
        ))} */}
        <button>
          <NavLink to="/user">Back</NavLink>
        </button>
      </Paper>
    </Grid>
  );
};

export default ViewUser;
