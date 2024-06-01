import React from "react";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";

import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
function Login() {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      toast.success("Sign In Successful", {
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: "text-[15px]",
      });
      reset();
      navigate('/chat')
    } catch (error) {
      toast.error("Sign In Failed",);
    }
  };

  const Login = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Sign Up Successful", {
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: "text-[15px]",
      });
      reset();
      navigate('/chat')
    } catch (error) {
      toast.error("Registration failed, please try again");
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center">
      <div className="w-[35%] flex flex-col gap-4">
        <div className="w-[100%]">
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.text}>
            New here?{" "}
            <Link className={styles.link} to="/create_account">
              Sign Up
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(Login)} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={`${styles.input} ${
              errors.email ? "border border-solid border-[#e14216]" : ""
            }`}
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className={`${styles.input} ${
              errors.password ? "border border-solid border-[#e14216]" : ""
            }`}
          />
          <div className={styles.btn}>
            <button className="w-full h-full flex items-center justify-center" type="submit">
              {isSubmitting ? <ButtonSpinner /> : "Login"}
            </button>
          </div>
        </form>
        <div>
          <button onClick={signInWithGoogle} className={styles.btnGoogle}>
            {isSubmitting ? <ButtonSpinner/> : 
            <>
            <GoogleIcon sx={{ mr: 1 }} />
            Sign In with Google
            </>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
