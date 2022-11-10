import React, { useState } from "react";
import "./register-page.css";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../utils/UserService/UserService";
import { validateSpecSymbols } from "../../components/ui-components/TeamsListComponent/AddTeamModalComponent/AddTeamModal";

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
  const [isError, setIsError] = useState(false);
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
      !(password === confirmPassword) ||
      !gender ||
      !languages
    ) {
      setIsError(true);
      return false;
    }
    setIsError(false);
    return true;
  };

  const onSubmit = async () => {
    if (!isValidateFields()) {
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

    await UserService.createUser(userInfo);
    socket.current.emit("register-user", {
      ...userInfo,
      status: "online",
      avatar: "",
      file: "",
    });
    localStorage.setItem(nickName.toString(), "auth");
    navigate(`/chatapp/messages/${nickName}`);
  };

  return (
    <div className="register-page-container">
      <div>
        <div>Enter first name:</div>
        <input
          data-testid="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <div>Enter last name:</div>
        <input
          data-testid="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <div>Enter address:</div>
        <input
          data-testid="address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <div>Enter nickName:</div>
        <input
          data-testid="nickName"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
      </div>
      <div>
        <div>Enter email:</div>
        <input
          data-testid="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div>Enter phone number in format +38-XXX-XXX-XXXX:</div>
        <input
          data-testid="phone"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div>
        <div>Enter date of birth in format January 1 2022:</div>
        <input
          data-testid="dob"
          value={dateOfBirthday}
          onChange={(e) => setDateOfBirthday(e.target.value)}
        />
      </div>
      <div>
        <div>Enter gender:</div>
        <input
          data-testid="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>
      <div>
        <div>Enter file image:</div>
        <input
          data-testid="file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div>
        <div>Enter languages seperated by coma:</div>
        <input
          data-testid="languages"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
        />
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
      </div>
      <button onClick={onSubmit}>Register</button>
      {isError && <div style={{ color: "red" }}>You failed) refill fields</div>}
      <span style={{ color: "green", fontSize: 22, marginTop: 30 }}>
        Have an account
      </span>
      <button onClick={() => navigate("/chatapp/login")}>Login</button>
    </div>
  );
};

export default RegisterPage;
