import React from "react";
import { Card } from "antd";
import { useParams } from "react-router";

const EditUser = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Card>
        <div>EditUser</div>
        <form>
          <label htmlFor="firstname">firstname:- </label>
          <input type="text" id="firstname" />
        </form>
      </Card>
    </>
  );
};

export default EditUser;
