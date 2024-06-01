import React, { useState } from "react";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { toast } from "react-toastify";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSignUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Sign Up Successful", {
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: "text-[15px]",
      });
      navigate("/");
    } catch (error) {
      toast.error("Sign Up Failed", {
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        className: "text-[15px]",
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
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
      navigate("/");
    } catch (error) {
      toast.error("Registration failed, please try again");
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center">
      <div className="w-[35%] flex flex-col gap-4">
        <div className="w-[100%]">
          <h1 className={styles.title}>Create an Account</h1>
          <p className={styles.text}>
            Already a member?{" "}
            <Link className={styles.link} to="/">
              Log in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          <div className="flex flex-1 gap-4 flex-col relative">
            <input
              {...register("email", { required: "Email is required" })}
              className={`${styles.input} ${errors.email ? "border border-solid border-[#e14216]" : ""}`}
              type="email"
              placeholder="Email"
            />
            <input
            {...register("password", { required: "Password is required" })}
              className={`${styles.input} ${errors.password ? "border border-solid border-[#e14216]" : ""}`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            {showPassword ? (
              <VisibilityOffIcon
                onClick={handleClickShowPassword}
                sx={{
                  position: "absolute",
                  right: 20,
                  top: 110,
                  cursor: "pointer",
                  ":hover": { color: "#e14216" },
                }}
              />
            ) : (
              <RemoveRedEyeIcon
                onClick={handleClickShowPassword}
                sx={{
                  position: "absolute",
                  right: 20,
                  top: 110,
                  cursor: "pointer",
                  ":hover": { color: "#e14216" },
                }}
              />
            )}
          </div>
            <div className={styles.btn}>
              <button
              className="w-full h-full flex items-center justify-center"
              type="submit"
              >
                {isSubmitting ? <ButtonSpinner/> : "Sign Up"}
              </button>
            </div>
        </form>
        <div>
          <button onClick={handleSignUpWithGoogle} className={styles.btnGoogle}>
            {isSubmitting ? <ButtonSpinner/> : 
            <>
            <GoogleIcon sx={{ mr: 1 }} />
            Sign Up with Google
            </>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
