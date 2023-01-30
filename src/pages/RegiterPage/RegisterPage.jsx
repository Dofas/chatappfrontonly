import React, { useState } from "react";
import "./register-page.scss";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../utils/UserService/UserService";
import { validateSpecSymbols } from "../../components/ui-components/TeamsListComponent/AddTeamModalComponent/AddTeamModal";
import ErrorElement from "./ErrorElement";
import RegisterPageImageBackground from "../../assets/images/register-page-image-background.svg";
import InputWithoutBorder from "../../components/ui-components/InputComponents/InputWithoutBorder/InputWithoutBorder";
import InputWithBorderBottom from "../../components/ui-components/InputComponents/InputWithBorderBottom/InputWithBorderBottom";
import InputWithFullBorder from "../../components/ui-components/InputComponents/InputWithFullBorder/InputWithFullBorder";
import RadioButton from "../../components/ui-components/RadioButtonComponent/RadioButton";
import CheckBox from "../../components/ui-components/CheckBoxComponent/CheckBox";
import FileInput from "../../components/ui-components/FileInputComponent/FileInput";
import PopupDatePicker from "../../components/ui-components/DatePickerComponent/PopupDatePicker";
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

  return (
    <div className="register-page-container">
      <div>
        <div className="register-page-inner-container">
          <div>
            <div className="position-relative">
              <InputWithoutBorder
                id="register-page-first-name"
                value={firstName}
                onChange={setFirstName}
                labelText="Enter first name:"
                testId="firstName"
              />
              {isError.firstNameError && (
                <ErrorElement text="Field is required" />
              )}
            </div>
            <div className="position-relative">
              <InputWithoutBorder
                id="register-page-last-name"
                value={lastName}
                onChange={setLastName}
                labelText="Enter last name:"
                testId="lastName"
              />
              {isError.lastNameError && (
                <ErrorElement text="Field is required" />
              )}
            </div>
            <div className="position-relative">
              <InputWithBorderBottom
                id="register-page-address"
                value={location}
                onChange={setLocation}
                labelText="Enter address:"
                testId="address"
              />
              {isError.locationError && (
                <ErrorElement text="Field is required" />
              )}
            </div>
            <div className="position-relative">
              <InputWithBorderBottom
                id="register-page-nickname"
                value={nickName}
                onChange={setNickName}
                labelText="Enter nickname:"
                testId="nickName"
              />
              {isError.nickNameError && (
                <ErrorElement text="Field is incorrect" />
              )}
            </div>
            <div className="position-relative">
              <InputWithBorderBottom
                id="register-page-email"
                value={email}
                onChange={setEmail}
                labelText="Enter email:"
                testId="email"
              />
              {isError.emailError && <ErrorElement text="Field is incorrect" />}
            </div>
            <div className="position-relative">
              <InputWithBorderBottom
                id="register-page-phone"
                value={number}
                onChange={setNumber}
                labelText="+38-XXX-XXX-XXXX:"
                testId="phone"
              />
              {isError.numberError && (
                <ErrorElement text="Field is incorrect" />
              )}
            </div>
          </div>
          <div>
            <div className="register-page-date-picker-container">
              <PopupDatePicker
                value={dateOfBirthday}
                onChange={setDateOfBirthday}
                text="Enter your date of birth"
              />
              {isError.dateOfBirthdayError && (
                <ErrorElement text="Field is incorrect" />
              )}
            </div>
            <div className="register-page-gender-container">
              <div>Choose gender:</div>
              <div>
                <RadioButton
                  value="Male"
                  checked={gender === "Male"}
                  onChange={setGender}
                  labelText="Male"
                />
                <RadioButton
                  value="Female"
                  checked={gender === "Female"}
                  onChange={setGender}
                  labelText="Female"
                />
              </div>
              {isError.genderError && <ErrorElement text="Field is required" />}
            </div>
            <div className="register-page-file-container">
              <FileInput
                text={file?.name ?? "Choose avatar:"}
                onChange={setFile}
                testId="file"
              />
              {isError.fileError && <ErrorElement text="Field is required" />}
            </div>
            <div className="register-page-language-container">
              <div>Choose languages:</div>
              <div>
                <CheckBox
                  checked={languages.includes("Ukrainian")}
                  onChange={changeLanguages}
                  value="Ukrainian"
                  labelText="Ukrainian"
                />
                <CheckBox
                  checked={languages.includes("English")}
                  onChange={changeLanguages}
                  value="English"
                  labelText="English"
                />
              </div>
              {isError.languagesError && (
                <ErrorElement text={"Field is required"} />
              )}
            </div>
            <div>
              <div className="position-relative">
                <InputWithFullBorder
                  id="register-page-password"
                  value={password}
                  onChange={setPassword}
                  labelText="Enter password:"
                  testId="password"
                  className="register-page-password-input"
                  type="password"
                />
              </div>
            </div>
            <div className="register-page-password-container">
              <InputWithFullBorder
                id="register-page-confirm-password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                labelText="Enter confirm password:"
                testId="confirmPassword"
                className="register-page-password-input"
                type="password"
              />
              {isError.passwordError && (
                <ErrorElement text="Incorrect passwords" />
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
