import React, { useState } from "react";
import "./register-page.scss";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../utils/UserService/UserService";
import { validateSpecSymbols } from "../../components/ui-components/TeamsListComponent/AddTeamModalComponent/AddTeamModal";
import ErrorElement from "./ErrorElement";
import RegisterPageImageBackground from "../../assets/images/register-page-image-background.svg";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const noErrorState = {
  firstNameError: false,
  lastNameError: false,
  locationError: false,
  nickNameError: false,
  emailError: false,
  numberError: false,
  dateOfBirthdayError: false,
  passwordError: false,
  genderError: false,
  fileError: false,
  languagesError: false,
};

const RegisterPage = ({ socket }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dateOfBirthday, setDateOfBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [isError, setIsError] = useState(noErrorState);
  const [isUserExist, setIsUserExist] = useState(false);
  const navigate = useNavigate();

  function validateNumber(number) {
    return (
      String(number)
        .toLowerCase()
        .match(
          /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        )?.[0]?.length === number.length
    );
  }

  const validateEmail = (email) => {
    return (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )?.[0]?.length === email.length
    );
  };

  const isValidateFields = () => {
    if (
      !firstName ||
      !lastName ||
      !location ||
      !validateSpecSymbols(nickName) ||
      !nickName ||
      !file ||
      !validateEmail(email) ||
      !validateNumber(number) ||
      !dateOfBirthday ||
      password !== confirmPassword ||
      !gender ||
      !languages.length
    ) {
      setIsError({
        firstNameError: !firstName,
        lastNameError: !lastName,
        locationError: !location,
        nickNameError: !nickName || !validateSpecSymbols(nickName),
        emailError: !validateEmail(email),
        numberError: !validateNumber(number),
        dateOfBirthdayError: !dateOfBirthday,
        passwordError: !password || password !== confirmPassword,
        genderError: !gender,
        fileError: !file,
        languagesError: !languages.length,
      });
      return false;
    }
    setIsError({ ...noErrorState });
    return true;
  };

  const onSubmit = () => {
    if (!isValidateFields()) {
      setIsUserExist(false);
      return;
    }
    const userInfo = {
      firstName,
      lastName,
      location,
      nickName,
      email,
      number,
      dateOfBirthday: format(dateOfBirthday, "PPP"),
      password,
      gender,
      languages,
      file,
    };

    UserService.createUser(userInfo)
      .then(() => {
        setIsUserExist(false);
        socket.current.emit("register-user", {
          ...userInfo,
          status: "online",
          avatar: "",
          file: "",
        });
        localStorage.setItem(nickName.toString(), "auth");
        navigate(`/chatapp/messages/${nickName}`);
      })
      .catch(() => setIsUserExist(true));
  };

  const changeLanguages = (newLanguage) => {
    let newLanguages;

    if (languages.includes(newLanguage)) {
      newLanguages = languages.filter((language) => language !== newLanguage);
    } else {
      newLanguages = [...languages, newLanguage];
    }

    setLanguages(newLanguages);
  };

  console.log(dateOfBirthday);
  return (
    <div className="register-page-container">
      <div>
        <div className="register-page-inner-container">
          <div>
            <div className="input-container-text-only">
              <input
                data-testid="firstName"
                id="register-page-first-name"
                placeholder="&nbsp;"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="register-page-first-name">
                Enter first name:
              </label>
              {isError.firstNameError && (
                <ErrorElement text={"Field is required"} />
              )}
            </div>
            <div className="input-container-text-only">
              <input
                data-testid="lastName"
                id="register-page-last-name"
                placeholder="&nbsp;"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="register-page-last-name">Enter last name:</label>
              {isError.lastNameError && (
                <ErrorElement text={"Field is required"} />
              )}
            </div>
            <div className="input-container-border-bottom">
              <input
                data-testid="address"
                id="register-page-address"
                placeholder="&nbsp;"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <label htmlFor="register-page-address">Enter address:</label>
              <span className="input-border" />
              {isError.locationError && (
                <ErrorElement text={"Field is required"} />
              )}
            </div>
            <div className="input-container-border-bottom">
              <input
                data-testid="nickName"
                id="register-page-nickname"
                placeholder="&nbsp;"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
              <label htmlFor="register-page-nickname">Enter nickname:</label>
              <span className="input-border" />
              {isError.nickNameError && (
                <ErrorElement text={"Field is incorrect"} />
              )}
            </div>
            <div className="input-container-border-bottom">
              <input
                data-testid="email"
                id="register-page-email"
                placeholder="&nbsp;"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="register-page-email">Enter email:</label>
              <span className="input-border" />
              {isError.emailError && (
                <ErrorElement text={"Field is incorrect"} />
              )}
            </div>
            <div className="input-container-border-bottom">
              <input
                data-testid="phone"
                id="register-page-phone"
                placeholder="&nbsp;"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <label htmlFor="register-page-phone">+38-XXX-XXX-XXXX:</label>
              <span className="input-border" />
              {isError.numberError && (
                <ErrorElement text={"Field is incorrect"} />
              )}
            </div>
          </div>
          <div>
            <div className="date-picker-container">
              <DayPicker
                mode="single"
                selected={dateOfBirthday}
                onSelect={setDateOfBirthday}
                showOutsideDays
                fixedWeeks
                footer={
                  !!dateOfBirthday
                    ? `Pick ${format(dateOfBirthday, "PPP")}`
                    : "Enter your date of birth"
                }
              />
              {isError.dateOfBirthdayError && (
                <ErrorElement text={"Field is incorrect"} />
              )}
            </div>
            <div className="register-page-gender-container">
              <div>Choose gender:</div>
              <div>
                <div>
                  <label className="label-radio-button">
                    <input
                      type="radio"
                      value="Male"
                      checked={gender === "Male"}
                      className="input-radio-button"
                      onChange={(event) => setGender(event.target.value)}
                    />
                    <span className="radio-button" />
                  </label>
                  <span onClick={() => setGender("Male")}>Male</span>
                </div>
                <div>
                  <label className="label-radio-button">
                    <input
                      type="radio"
                      value="Female"
                      checked={gender === "Female"}
                      className="input-radio-button"
                      onChange={(event) => setGender(event.target.value)}
                    />
                    <span className="radio-button" />
                  </label>
                  <span onClick={() => setGender("Female")}>Female</span>
                </div>
              </div>
              {isError.genderError && (
                <ErrorElement text={"Field is required"} />
              )}
            </div>
            <div className="register-page-file-container">
              <div className="register-page-file-wrapper">
                <button className="register-page-file-button">
                  {file?.name ?? "Choose avatar:"}
                </button>
                <input
                  data-testid="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="register-page-file-input"
                />
              </div>
              {isError.fileError && <ErrorElement text={"Field is required"} />}
            </div>
            <div className="register-page-language-container">
              <div>Choose languages:</div>
              <div>
                <div>
                  <div>
                    <label className="register-page-checkbox-label">
                      <input
                        type="checkbox"
                        checked={languages.includes("Ukrainian")}
                        value="Ukrainian"
                        onChange={(event) =>
                          changeLanguages(event.target.value)
                        }
                        className="register-page-checkbox-input"
                      />
                      <span className="register-page-checkbox" />
                    </label>
                  </div>
                  <span onClick={() => changeLanguages("Ukrainian")}>
                    Ukrainian
                  </span>
                </div>
                <div>
                  <div>
                    <label className="register-page-checkbox-label">
                      <input
                        type="checkbox"
                        checked={languages.includes("English")}
                        value="English"
                        onChange={(event) =>
                          changeLanguages(event.target.value)
                        }
                        className="register-page-checkbox-input"
                      />
                      <span className="register-page-checkbox" />
                    </label>
                  </div>
                  <span onClick={() => changeLanguages("English")}>
                    English
                  </span>
                </div>
              </div>
              {isError.languagesError && (
                <ErrorElement text={"Field is required"} />
              )}
            </div>
            <div>
              <div className="input-container-border-full">
                <input
                  value={password}
                  data-testid="password"
                  id="register-page-password"
                  className="register-page-password-input"
                  placeholder="&nbsp;"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="register-page-password">Enter password:</label>
                <span className="input-border-full" />
              </div>
            </div>
            <div className="register-page-password-container">
              <div className="input-container-border-full">
                <input
                  value={confirmPassword}
                  data-testid="confirmPassword"
                  id="register-page-confirm-password"
                  placeholder="&nbsp;"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="register-page-confirm-password">
                  Enter confirm password:
                </label>
                <span className="input-border-full" />
              </div>
              {isError.passwordError && (
                <ErrorElement text={"Incorrect passwords"} />
              )}
            </div>
          </div>
        </div>
        <div>
          <button onClick={onSubmit}>Create account</button>
          <div className="register-page-login-redirect">
            <span className="register-page-login-text">
              Already have an account ?
            </span>
            <button onClick={() => navigate("/chatapp/login")}>Log in</button>
            {isUserExist && (
              <div style={{ color: "red" }}>
                User with this nickname already exist
              </div>
            )}
          </div>
        </div>
      </div>
      <img
        src={RegisterPageImageBackground}
        alt="register-img"
        className="register-page-image-background"
      />
    </div>
  );
};

export default RegisterPage;
