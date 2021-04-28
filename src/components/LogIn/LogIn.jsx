import React, { useContext, useRef, useState } from "react";
import "./LogIn.css";
import { useHistory, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./app.config";
import { Link } from "react-router-dom";
import { travleContext } from "../../App";

firebase.initializeApp(firebaseConfig);
const LogIn = () => {
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();

  const [newUser, setNewUser] = useState(false);
  const [, logInUser, setLogInUser] = useContext(travleContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // Hendel Email and password Sign up
  const onSubmit = (data) => {
    if (newUser) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          // const user = userCredential.user;
          updateUserName(data.username);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const userError = { ...logInUser };
          userError.error = errorMessage;
          setLogInUser(userError);
        });
    }

    // User logIn
    if (!newUser) {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setLogInUser(user);
          history.replace(from);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const userError = { ...logInUser };
          userError.error = errorMessage;
          setLogInUser(userError);
        });
    }
  };

  // Update profile Name

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    })
    .then(() => {
      setLogInUser(user);
      history.replace(from);
      console.log("I am from update ", user);
    })
    .catch((error) => {
      console.log(error.message);
    });
  };

  // Hendel google signIn
  const hendelSignInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(GoogleProvider)
      .then((result) => {
        const user = result.user;
        setLogInUser(user);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const userError = { ...logInUser };
        userError.error = errorMessage;
        setLogInUser(userError);
      });
  };

  return (
    <div className="col-md-6" id="login-box">
      <h1>{newUser ? "Sign up" : "Log In"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {newUser && (
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            ref={register({ required: true })}
          />
        )}
        {errors.username && (
          <span className="text-danger">Name is required</span>
        )}

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && (
          <span className="text-danger">Email is required</span>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={register({
            required: "You must specify a password",
            minLength: {
              value: 6,
              message:
                  "Password must have at least 6 characters, here Minimum 1 number value",
            },

            maxLength: 12,
            pattern: /(?=.*[0-9])/i,
          })}
        />
        {errors.password && (
            <span className="text-danger">
                {errors.password.message}
            </span>
        )}
        {newUser && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            ref={register({
              validate: (value) =>
                  value === password.current ||
                  "The passwords do not match",
            })}
          />
        )}
        {errors.confirmPassword && (
          <span className="text-danger">
              {errors.confirmPassword.message}
          </span>
        )}
        {newUser ? (
            <input type="submit" name="signup_submit" value="Sign Up" />
        ) : (
            <input type="submit" name="logIn_submit" value="Log In" />
        )}
      </form>
      {!newUser && (
        <p>
            New member?{" "}
            <Link onClick={() => setNewUser(true)}>Register</Link> here
        </p>
      )}
      <button
        onClick={hendelSignInWithGoogle}
        className="social-signin google"
      >
          Log in with Google+
      </button>
    </div>
  );
};
export default LogIn;
