import "./App.css";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import Login from "./pages/Login";
import UserInfo from "./pages/UserInfo";
import ViewUser from "./Components/ViewUser";
import EditUser from "./Components/EditUser";

function App() {
  const Token = localStorage.getItem("access_token");
  if (!Token) {
    return <Login />;
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
        <Route path="/user/delete/:id" exact>
          <EditUser />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
