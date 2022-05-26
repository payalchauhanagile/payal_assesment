import React from "react";
import { useParams } from "react-router";

const EditUser = () => {
  const { id } = useParams();
  console.log(id);
  return <div>EditUser</div>;
};

export default EditUser;
