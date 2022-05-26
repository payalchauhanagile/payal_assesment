import React from "react";
import { Card } from "antd";
import { useParams } from "react-router";

const EditUser = () => {
  const { id } = useParams();
  console.log(id);

  var myHeaders = new Headers();

  myHeaders.append(
    "Authorization",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWIwZDNhOGJlYjgyMTYzNDIzOTEwZCIsImVtYWlsIjoiYWRtaW4uaWdvdG5leHRAeW9wbWFpbC5jb20iLCJpYXQiOjE2NTMzNzYzMTd9.9KT8BQtnqjqybd3q8M6iI1jAqxL-IOjPxtLIIQdvws8"
  );
  myHeaders.append("Content-Type", "application/json");

  var formdata = new FormData();
  formdata.append("userId", id);
  // formdata.append("firstName", "Jollllly");
  // formdata.append("lastName", "Parrrrker");
  // formdata.append("birthday", "02-02-2001");
  // formdata.append("phoneNumber", "9928881828");
  // formdata.append("profilePicture", fileInput.files[0], "user-male.png");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch("http://202.131.117.92:7100/admin/api/updateProfile", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  return (
    <>
      <Card
        style={{
          alignItems: "center",
          height: "400px",
          width: "400px",
          marginTop: "100px",
          marginLeft: "200px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>EditUser</h1>
        <form>
          <label htmlFor="firstname">firstname:- </label>
          <input type="text" id="firstname" />
          <br />
          <br />
          <label htmlFor="lastname">lastname:- </label>
          <input type="text" id="lastname" />
          <br />
          <br />
          <label htmlFor="email">email:- </label>
          <input type="email" id="email" />
          <br />
        </form>
      </Card>
    </>
  );
};

export default EditUser;
