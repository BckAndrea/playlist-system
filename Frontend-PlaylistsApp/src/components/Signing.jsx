
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "bootstrap/dist/css/bootstrap.min.css";
import './css/Auth.css';

import AuthService from "../services/AuthService";

const schema = yup.object().shape({ 
  username: yup
    .string()
    .required("Username is required!")
    .min(2, "Must be at least 2 characters!")
    .max(50, "Must be less then 50 characters!"),
  password: yup
    .string()
    .required("Password is required!")
});


const Signin = () => {
  const [responseMessage, setResponseMessage] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  })

  const doSignin = async (formData) => {
   
    try {
      const result = await AuthService.login(formData)
      setResponseMessage(result.message)
      navigate("/playlists"); //"kastas hit"
      

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <>
      <div className="col-md-12">
        <div className="card card-container rounded">
          <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" className="profile-img-card" />
          <form onSubmit={handleSubmit(doSignin)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" {...register("username")} />
              {errors?.username && <label className="error-feedback">{errors.username.message}</label>}
            </div>
           
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" {...register("password")} />
              {errors?.password && <label className="error-feedback">{errors.password.message}</label>}
            </div>
            <p></p>
            <div className="form-group">
              <button className="btn btn-primary btn-block" >
                Sign In
              </button>
            </div>
          </form>
          <p></p>
          {responseMessage && (
            <div className="alert alert-success" >
              {responseMessage}
            </div>)
          }
        </div>
      </div>
    </>
  )
}

export default Signin;