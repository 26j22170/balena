import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const { user, status, msg}= useSelector( state => state.users)
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


//Handle form submission
  const loginHandler = (e) => {
    e.preventDefault();
    const userData = {email, password}
    dispatch(login(userData))
    setJustLoggedIn(true);
  }

  useEffect(() => {
    if (status === "success") {
      alert("Logged in successfully!");
      navigate("/");
      setJustLoggedIn(false);
    }
  }, [status, navigate, justLoggedIn]);

  return (
    <div>
      <h2 className="kicker">Login</h2>

      <div className="form-panel">
        <form onSubmit={loginHandler}>

          <div className="field">
            <label>Email</label>
            <input onChange ={(e) => setemail(e.target.value)} />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" onChange ={(e) => setpassword(e.target.value)} />
          </div>
      
          <button type="submit" className="btn">Login</button>

          <Link to="/signup" className="btn secondary">Switch to Register</Link>
          <h6>Server response:{msg} - {user?.firstName} {user?.lastName} - {status}</h6>
        </form>
      </div>
    </div>
  );
}

export default Login;
