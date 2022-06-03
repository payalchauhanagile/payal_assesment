import "./App.css";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import Login from "./pages/Login";
import UserInfo from "./pages/UserInfo";
import ViewUser from "./Components/ViewUser";
import EditUser from "./Components/EditUser";
import ResetPassword from "./Components/ResetPassword";

function App() {
  const token = localStorage.getItem("access_token");
  const email = localStorage.getItem("email");

  if (!token && !email) {
    return <Login />;
  } else {
    <UserInfo />;
  }

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/user" exact>
          <UserInfo />
        </Route>
        <Route path="/user/view/:id" exact>
          <ViewUser />
        </Route>
        <Route path="/user/edit/:id" exact>
          <EditUser />
        </Route>
        <Route path="/user/reset" exact>
          <ResetPassword />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
