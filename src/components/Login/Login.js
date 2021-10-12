import React, { useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import { set, useForm } from "react-hook-form";
import "./login.css";
import { toggleClass } from "dom-helpers";

const Login = () => {
  const {
    googleSignIn,
    err,
    setErr,
    setUser,
    auth,
    createUserWithEmail,
    updateUser,
    user,
    logInWithEmail,
  } = useAuth();
  const location = useLocation();
  const history = useHistory();
  const redirectUrl = location.state?.from || "/home";
  const [regestered, setRegestered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogle = () => {
    googleSignIn()
      .then((result) => {
        // setUser(result.user);
        // setErr("");
        setErrorMsg("");
        history.push(redirectUrl);
      })
      .catch((error) => {
        // setUser({});
        setErrorMsg(error.message);
      });
  };

  // create user with new email and passwod
  const handleNewUser = (email, password, fName) => {
    createUserWithEmail(email, password)
      .then((result) => {
        // setUser(result.user);
        // setErr("");
        updateUser({ displayName: fName });
        setErrorMsg("");
        history.push(redirectUrl);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  // log in with email function
  const hadnleEmailLogIn = (email, password) => {
    logInWithEmail(email, password)
      .then((result) => {
        // setUser(result.user);
        // setErr("");
        setErrorMsg("");
        history.push(redirectUrl);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  // code from react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (regestered) {
      hadnleEmailLogIn(data.email, data.password);
    } else {
      handleNewUser(data.email, data.password, data.fName, data.fName);
    }
  };

  const toggleRegistered = () => {
    setRegestered(!regestered);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setErrorMsg("Please fill Up Required Fields");
    } else {
      setErrorMsg("");
    }
  }, [Object.keys(errors).length]);

  return (
    <div>
      {regestered ? (
        <h1 className="text-center display-4"> Please Log In </h1>
      ) : (
        <h1 className="text-center display-4"> Please Register </h1>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        {!regestered && (
          <div>
            {" "}
            <input
              className="form-control"
              type="text"
              placeholder="First Name"
              {...register("fName", { required: true })}
            />
            <input
              className="form-control"
              type="text"
              placeholder="Last Name"
              {...register("lName", {})}
            />
            <div>
              <label className="me-3"> Gender: </label>
              <input
                className="mx-1"
                {...register("gender", { required: true })}
                type="radio"
                value="male"
              />
              <label className="me-3" htmlFor="">
                Male
              </label>
              <input
                className="mx-1"
                {...register("gender", { required: true })}
                type="radio"
                value=" female"
              />
              <label htmlFor=""> Female </label>
            </div>
            <input
              className="form-control"
              type="tel"
              placeholder="Mobile number"
              {...register("mobile", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
            />{" "}
          </div>
        )}
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            max: 19,
            min: 5,
            maxLength: 20,
          })}
        />
        {/* <input className="btn btn-outline-success" type="submit" /> Or{" "} */}

        <button className="btn btn-outline-success" type="submit">
          {" "}
          {regestered ? "Log In " : " Register"}{" "}
        </button>

        <span> Or </span>
        <button className="btn btn-outline-success" onClick={handleGoogle}>
          Sign in with Google
        </button>
        {regestered ? (
          <button onClick={toggleRegistered} className="mx-4 btn" href="">
            New User ? Register
          </button>
        ) : (
          <button onClick={toggleRegistered} className="mx-4 btn" href="">
            Already an user? Login
          </button>
        )}
      </form>

      <br />

      <p> {errorMsg || err} </p>
    </div>
  );
};

export default Login;
