import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/UserSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch();
  const { user, status, msg } = useSelector((state) => state.users);
  const { isAdmin, isLogin} = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    if(isAdmin){
      navigate("/admin");
    }
    else if(isLogin){
      navigate("/home");
    }
  }, [isAdmin, isLogin])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };
  const goToLogin = () => {
    navigate("/login"); // navigate to signup page
  };

  return (
    <div>
      <h2 className="kicker">Register</h2>

      <div className="form-panel">
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="field">
            <label htmlFor="fname">First Name</label>
            <input
              id="fname"
              aria-label="fname"
              {...register("firstName")}
            />
            <h4>{errors.firstName?.message}</h4>
          </div>

          <div className="field">
            <label htmlFor="lname">Last Name</label>
            <input
              id="lname"
              aria-label="lname"
              {...register("lastName")}
            />
            <h4>{errors.lastName?.message}</h4>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              aria-label="email"
              {...register("email")}
            />
            <h4>{errors.email?.message}</h4>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              aria-label="password"
              type="password"
              {...register("password")}
            />
            <h4>{errors.password?.message}</h4>
          </div>

          <div className="field">
            <label htmlFor="confpass">Confirm Password</label>
            <input
              id="confpass"
              aria-label="confpass"
              type="password"
              {...register("confirmPassword")}
            />
            <h4>{errors.confirmPassword?.message}</h4>
          </div>

          <button type="submit" className="btn">
            Register
          </button>

          <Link to="/login" className="btn secondary" onClick={goToLogin}>
            Switch to Login
          </Link>

          <h6>{status}</h6>
          <h6>{user?.name}</h6>
          <h6>{user?.email}</h6>
          <h6>{msg}</h6>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
