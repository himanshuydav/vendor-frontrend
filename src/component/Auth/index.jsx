import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

// import { loginUser } from "../../redux/Slice/Login";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Icon from "@mdi/react";

import { mdiRefresh } from "@mdi/js";

import logo from "../../add-on/assets/images/streamlogo1.png";

import "bootstrap/dist/css/bootstrap.min.css";

import "../../add-on/assets/css/style.css";

import "../../add-on/assets/css/style.css.map";

import "../../add-on/assets/css/styleDup.css";

import { login } from "../../redux/auth/authSlice";

import Loader from "../common/Loader";
import { toast } from "react-toastify";

const LoginComp = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const [loginDetails, setLoginDetails] = useState({
    email: "",

    password: "",
  });

  const [captcha, setCaptcha] = useState("");

  const [captchaInput, setCaptchaInput] = useState("");

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const generateCaptcha = () => {
    const characters = "abc123";

    let result = "";

    const charactersLength = characters.length;

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // console.log(user.role,"login check");

  const handleChange = (type, value) => {
    setLoginDetails({
      ...loginDetails,

      [type]: value,
    });
  };

  const checkLogin = (e) => {
    e.preventDefault();

    if (captcha === captchaInput) {
      // dispatch(loginUser(loginDetails));
      if(loginDetails?.userType){
       
          dispatch(login(loginDetails));
          setError("");
         
         
      }
      else{
        setError("please select usertpe");
      }
     
    } else if (captchaInput === "") {
      setError("captcha is rquired");

      generateCaptcha();

      setCaptchaInput("");
    } else if (!captchaInput === "captcha") {
      setError("Fill correct captcha");

      generateCaptcha();

      setCaptchaInput("");
    } else {
      setError("Invalid captcha.");

      generateCaptcha();

      setCaptchaInput("");
    }
  };

  const handleRefreshCaptcha = () => {
    generateCaptcha();
    setCaptchaInput("");
  };

  useEffect(() => {
      if(isError){
        toast.error("input login id and password not match")
      }
  
     if (user?.role === "Vendor") {
      navigate("/vendor-dashboard");
     }

    if (user?.role === "Staff") {
      if (user?.roles[0].RoleName === "Admin Executive") {
        navigate("/staff-dashboard");
      }

      if (user?.roles[0].RoleName === "Admin Executive") {
        navigate("/staff-dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Loader isLoading={isLoading} />

      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth login-screen">
          <div className="background col-lg-12">
            <div className="row flex-grow">
              <div className="col-lg-4 ">
                <div className="auth-form-light text-left p-4">
                  <div className="brand-logo">
                    <img src={logo} alt="Logo" />
                  </div>

                  <div
                    id="errorDiv"
                    className={
                      error ? "alert alert-danger alert-dismissible" : "d-none"
                    }
                  >
                    {error}
                  </div>

                  <form className="pt-3" id="form_id">
                    <div className="form-group">
                      <div className="custom-radio-group row btn-transparent rowsize">
                        <div className=" col-lg-4 col-md-4  login-width-small-screen ">
                          <button disabled>
                            <div className="row ">
                              <div className=" col-lg-2 col-md-2 col-sm-2">
                                <input
                                  className="radio-input"
                                  type="radio"
                                  name="userType"
                                  id="Vendor"
                                  value="Vendor"
                                  checked={loginDetails.userType === "Vendor"}
                                  onChange={(e) =>
                                    handleChange("userType", e.target.value)
                                  }
                                  required
                                />
                              </div>

                              <div className=" col-lg-2  col-md-2 col-sm-2 ">
                                <label
                                  className="radio-label radio-size"
                                  htmlFor="Vendor"
                                 >
                                  Vendor
                                </label>
                              </div>
                            </div>
                          </button>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-4 login-width-small-screen">
                          <button disabled>
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sm-2">
                                <input
                                  className="radio-input"
                                  type="radio"
                                  name="userType"
                                  id="Staff"
                                  value="Staff"
                                  checked={loginDetails.userType === "Staff"}
                                  onChange={(e) =>
                                    handleChange("userType", e.target.value)
                                  }
                                  required
                                />
                              </div>

                              <div className="col-lg-2 col-md-2 col-sm-2">
                                <label
                                  className="radio-label radio-size"
                                  htmlFor="Staff"
                                >
                                  Staff
                                </label>
                              </div>
                            </div>
                          </button>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-4 login-width-small-screen">
                          <button disabled>
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sm-">
                                <input
                                  className="radio-input"
                                  type="radio"
                                  name="userType"
                                  id="Finance"
                                  value="Finance"
                                  checked={loginDetails.userType === "Finance"}
                                  onChange={(e) =>
                                    handleChange("userType", e.target.value)
                                  }
                                  required
                                />
                              </div>

                              <div className="col-lg-2 col-md-2 col-sm-">
                                <label
                                  className="radio-label  radio-size"
                                  htmlFor="Finance"
                                >
                                  Finance
                                </label>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="form-group sizeinput">
                      <div>
                        <input
                          required
                          type="email"
                          name="email"
                          className="form-control common-form-control"
                          placeholder="username@streamssolutions.com"
                          value={loginDetails.email}
                          autoComplete="off"
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group input-div">
                      <div className="input-group">
                        <input
                          required
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="form-control common-form-control border0"
                          id="password"
                          placeholder="Password"
                          value={loginDetails.password}
                          autoComplete="off"
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                        />

                        <div
                          className="input-group-addon eye-div "
                          onClick={togglePasswordVisibility}
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row ml0 ">
                      <div className="col-md-6 refresh_btn">
                        <input
                          required
                          id="captcha"
                          className="form-control common-form-control"
                          value={captcha}
                          autoComplete="off"
                          disabled
                        />

                        <Icon
                          path={mdiRefresh}
                          size={1}
                          onClick={handleRefreshCaptcha}
                        />
                      </div>

                      <div className="col-md-6 size ">
                        <input
                          type="text"
                          id="captchatext"
                          className="form-control common-form-control"
                          placeholder="Enter Captcha"
                          name="captchaInput"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        className="form-control form-control-custom"
                        id="myButton"
                        type="submit"
                      >
                        <button
                          type="submit"
                          id="succesBTN"
                          className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                          onClick={checkLogin}
                        >
                          SIGN IN
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComp;
