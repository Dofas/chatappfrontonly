import React, { useState } from "react";
import "./register-page.scss";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../utils/UserService/UserService";
import { validateSpecSymbols } from "../../components/ui-components/TeamsListComponent/AddTeamModalComponent/AddTeamModal";
import ErrorElement from "./ErrorElement";

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
  const [languages, setLanguages] = useState("");
  const [isError, setIsError] = useState(noErrorState);
  const [isUserExist, setIsUserExist] = useState(false);
  const navigate = useNavigate();

  function validateDateOfBirthday(dateOfBirthday) {
    return (
      String(dateOfBirthday)
        .toLowerCase()
        .match(
          /January \d{1,2} \d{4}|February \d{1,2} \d{4}|March \d{1,2} \d{4}|April \d{1,2} \d{4}|May \d{1,2} \d{4}|June \d{1,2} \d{4}|July \d{1,2} \d{4}|August \d{1,2} \d{4}|September \d{1,2} \d{4}|October \d{1,2} \d{4}|November \d{1,2} \d{4}|December \d{1,2} \d{4}$/gim
        )?.[0]?.length === dateOfBirthday.length
    );
  }

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
      !validateDateOfBirthday(dateOfBirthday) ||
      password !== confirmPassword ||
      !gender ||
      !languages
    ) {
      setIsError({
        firstNameError: !firstName,
        lastNameError: !lastName,
        locationError: !location,
        nickNameError: !nickName || !validateSpecSymbols(nickName),
        emailError: !validateEmail(email),
        numberError: !validateNumber(number),
        dateOfBirthdayError: !validateDateOfBirthday(dateOfBirthday),
        passwordError: !password || password !== confirmPassword,
        genderError: !gender,
        fileError: !file,
        languagesError: !languages,
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
      dateOfBirthday,
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

  return (
    <div className="register-page-container">
      <div className="register-page-inner-container">
        <div>
          <div>
            <div>Enter first name:</div>
            <input
              data-testid="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {isError.firstNameError && (
              <ErrorElement text={"Field is required"} />
            )}
          </div>
          <div>
            <div>Enter last name:</div>
            <input
              data-testid="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {isError.lastNameError && (
              <ErrorElement text={"Field is required"} />
            )}
          </div>
          <div>
            <div>Enter address:</div>
            <input
              data-testid="address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {isError.locationError && (
              <ErrorElement text={"Field is required"} />
            )}
          </div>
          <div>
            <div>Enter nickname:</div>
            <input
              data-testid="nickName"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
            {isError.nickNameError && (
              <ErrorElement text={"Field is incorrect"} />
            )}
          </div>
          <div>
            <div>Enter email:</div>
            <input
              data-testid="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isError.emailError && <ErrorElement text={"Field is incorrect"} />}
          </div>
          <div>
            <div>Enter phone number in format +38-XXX-XXX-XXXX:</div>
            <input
              data-testid="phone"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            {isError.numberError && (
              <ErrorElement text={"Field is incorrect"} />
            )}
          </div>
        </div>
        <div>
          <div>
            <div>Enter date of birth in format January 1 2022:</div>
            <input
              data-testid="dob"
              value={dateOfBirthday}
              onChange={(e) => setDateOfBirthday(e.target.value)}
            />
            {isError.dateOfBirthdayError && (
              <ErrorElement text={"Field is incorrect"} />
            )}
          </div>
          <div>
            <div>Enter gender:</div>
            <input
              data-testid="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            {isError.genderError && <ErrorElement text={"Field is required"} />}
          </div>
          <div>
            <div>Enter file image:</div>
            <input
              data-testid="file"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {isError.fileError && <ErrorElement text={"Field is required"} />}
          </div>
          <div>
            <div>Enter languages seperated by coma:</div>
            <input
              data-testid="languages"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
            />
            {isError.emailError && <ErrorElement text={"Field is required"} />}
          </div>
          <div>
            <div>Enter password:</div>
            <input
              value={password}
              data-testid="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div>Enter confirm password:</div>
            <input
              value={confirmPassword}
              data-testid="confirmPassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {isError.passwordError && (
              <ErrorElement text={"Incorrect passwords"} />
            )}
          </div>
        </div>
      </div>
      <div>
        <button onClick={onSubmit}>Register</button>
        <span className="register-page-login-text">Have an account</span>
        <button onClick={() => navigate("/chatapp/login")}>Login</button>
        {isUserExist && (
          <div style={{ color: "red" }}>
            User with this nickname already exist
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
