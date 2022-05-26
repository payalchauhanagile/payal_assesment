import React from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const DeleteUser = () => {
  const history = useHistory();
  const { id } = useParams();
  console.log(id);
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

  fetch("http://202.131.117.92:7100/admin/api/deleteUser", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      // console.log(result)
      alert("user delete succesfully", result);
      history.push("/user");
    })
    .catch((error) => console.log("error", error));
  return <div>DeleteUser</div>;
};

export default DeleteUser;
