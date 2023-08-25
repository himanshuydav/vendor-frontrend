import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import ScreenLogo from "../../assets/images/streamlogoNew.png";
import Icon from "@mdi/react";
import { mdiCloseCircleOutline, mdiRefresh } from "@mdi/js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../redux/auth/authSlice";
import Loader from "../common/Loader";
import { Helmet } from "react-helmet";

const NewLoginPage = () => {
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
      if (loginDetails?.userType) {
        if (loginDetails?.email !== "" && loginDetails?.password) {
          dispatch(login(loginDetails));
          setError("");
        } else {
          setError("please enter username and password!");
        }
      } else {
        setError("Please select any user type!");
      }
    } else if (
      !loginDetails.userType &&
      !loginDetails?.email !== "" &&
      !loginDetails?.password &&
      captchaInput === ""
    ) {
      setError("All fields are required!");
    } else if (captchaInput === "") {
      setError("Captcha is required!");

      // generateCaptcha();

      setCaptchaInput("");
    } else if (!captchaInput === "captcha") {
      setError("Fill correct captcha");
      // generateCaptcha();

      setCaptchaInput("");
    } else {
      setError("Invalid captcha.");
      // generateCaptcha();
      setCaptchaInput("");
    }
  };

  const handleRefreshCaptcha = () => {
    generateCaptcha();
    setCaptchaInput("");
  };

  useEffect(() => {
    if (isError) {
      setError("Incorrect login details, try again!");
    }
    if (user?.role === "Vendor") {
      navigate("/vendor-dashboard");
    }
    if (user?.role === "Finance") {
      navigate("/");
    }

    if (user?.role === "Staff") {
      if (user?.roles[0].RoleName === "Admin Executive") {
        navigate("/");
      } else {
        navigate("/");
      }
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleError = () => {
    setError(false);
  };
  const handleCopyCutPaste = (event) => {
    event.preventDefault();
    return false;
  };

  useEffect(() => {
    const captchaInput = document.getElementById("captchatext");
    captchaInput.addEventListener("copy", handleCopyCutPaste);
    captchaInput.addEventListener("cut", handleCopyCutPaste);
    captchaInput.addEventListener("paste", handleCopyCutPaste);

    return () => {
      captchaInput.removeEventListener("copy", handleCopyCutPaste);
      captchaInput.removeEventListener("cut", handleCopyCutPaste);
      captchaInput.removeEventListener("paste", handleCopyCutPaste);
    };
  }, []);

  return (
    <>
     <Loader isLoading={isLoading} />
      <Helmet>
        <title>Vendor Portal || Login</title>
      </Helmet>
     <div className="container-fluid new-page-body-wrapper new-full-page-wrapper">
      <div className="new-login-screen">
        <div className="row">
          <div className="col-8">
            <div className="login-screen-details">
              <img src={ScreenLogo} alt="" />
              <div className="login-titles">
                <h3>AP Automation</h3>
                <div className="border-line"></div>
                <p className="title-two">
                The responsibility of the accounts payable (AP) process involves the settlement of payments to vendors for the goods and services procured by the organization. 
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="login-form-details">
              <div>
                <div
                  id="errorDiv"
                  className={
                    error ? "alert alert-danger alert-dismissible" : "d-none"
                  }
                >
                  <button className="delete-btn" onClick={()=>handleError()}>
                    <Icon path={mdiCloseCircleOutline} size={1} />
                  </button>
                  {error}
                </div>
              </div>

              <h3>Sign In </h3>
              <span>Please Sign in to continue to your account.</span>
              <div className="form-fileds">
                <form action="">
                  <div className="radio-button">
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        id="vendor"
                        name="userType"
                        className="radio-input"
                        value="Vendor"
                        checked={loginDetails.userType === "Vendor"}
                        onChange={(e) =>
                          handleChange("userType", e.target.value)
                        }
                        required
                      />

                      <label htmlFor="vendor" className="radio-label cursor-pointer">
                        Vendor
                      </label>
                    </div>

                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        id="Staff"
                        name="userType"
                        className="radio-input "
                        value="Staff"
                        checked={loginDetails.userType === "Staff"}
                        onChange={(e) =>
                          handleChange("userType", e.target.value)
                        }
                        required
                      />

                      <label htmlFor="Staff" className="radio-label cursor-pointer">
                        Associate
                      </label>
                    </div>

                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        id="Finance"
                        name="userType"
                        className="radio-input"
                        value="Finance"
                        checked={loginDetails.userType === "Finance"}
                        onChange={(e) =>
                          handleChange("userType", e.target.value)
                        }
                        required
                      />

                      <label htmlFor="Finance" className="radio-label cursor-pointer">
                        Finance
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1" >Username</label>
                    <input
                      type="email"
                      class="form-control email-inupt"
                      id="exampleInputEmail1"
                      name="email"
                      value={loginDetails.email}
                      autoComplete="off"
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group ">
                    <label for="exampleInputEmail1">Password</label>
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
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-1 ">
                    <label for="exampleInputEmail1">Enter Captcha</label>

                    <div className="signin-cstm-form ">
                      <input
                        type="captcha"
                        className="inputclass captchaColor form-control common-form-control text-right"
                        placeholder="captcha"
                        id="captcha"
                        value={captcha}
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <div className="input-group inputcaptcha">
                      <input
                        type="text"
                        id="captchatext"
                        className="form-control "
                        placeholder="Enter Captcha"
                        name="captchaInput"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        autoComplete="off"
                        required
                      />

                      <div className="input-group-append">
                        <span
                          className="input-group-text fa-custome cursor-pointer"
                          id="refresh-captcha"
                        >
                          <Icon
                            path={mdiRefresh}
                            size={1}
                            onClick={handleRefreshCaptcha}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="succesBTN"
                    className="signin-btn"
                    onClick={checkLogin}
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    </>
  );
};

export default NewLoginPage;
