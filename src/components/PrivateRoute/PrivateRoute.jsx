import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { travleContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
  const [, logInUser] = useContext(travleContext);

  const { email } = logInUser;
  console.log("I am from user private", logInUser.email);
  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
          email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/logIn",
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
