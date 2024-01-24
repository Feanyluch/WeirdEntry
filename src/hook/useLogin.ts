import { useState, useEffect } from "react";
// import { useAuth } from "./useAuth";
// import { adminLogin } from "./useLitmus";

export const useLogin = () => {
  const [first_name, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("")
  //
  const [last_name, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("")
   //
   const [address, setAddress] = useState("");
   const [addressError, setAddressError] = useState("")
   //
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  //
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");
  //
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  //
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //
  const [password_confirmation, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //
  const [rememberMe, setRememberMe] = useState(false);

  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isCityFocused, setIsCityFocused] = useState(false);
  const [isStateFocused, setIsStateFocused] = useState(false);
  const [isAddressFocused, setIsAddressFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  // const { login } = useAuth({
  //   middleware: "guest",
  //   redirectIfAuthenticated: "/user/dashboard",
  // });

  const handleFirstNameBlur = () => {
    if (!first_name) {
      setFirstNameError("First Name field is required")
    } else{
      setFirstNameError('')
    }
    setIsFirstNameFocused(false)
  }

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
    if (!first_name) {
      setFirstNameError("First Name field is required")
    } else{
      setFirstNameError('')
    }
  }

  const handleLastNameBlur = () => {
    if (!last_name) {
      setLastNameError("Last Name field is required")
    } else{
      setLastNameError('')
    }
    setIsLastNameFocused(false)
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
    if (!last_name) {
      setLastNameError("Last Name field is required")
    } else{
      setLastNameError('')
    }
  }

  const handleCityBlur = () => {
    if (!city) {
      setCityError("City field is required")
    } else{
      setCityError('')
    }

    setIsCityFocused(false);
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
    if (!city) {
      setCityError("City field is required")
    } else{
      setCityError('')
    }
  }

  const handleStateBlur = () => {
    if (!state) {
      setStateError("State field is required")
    } else{
      setStateError('')
    }

    setIsStateFocused(false)
  }

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
    if (!state) {
      setStateError("State field is required")
    } else{
      setStateError('')
    }
  }

  const handleAddressBlur = () => {
    if (!address) {
      setAddressError("Address field is required")
    } else{
      setAddressError('')
    }

    setIsAddressFocused(false)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
    if (!first_name) {
      setAddressError("Address field is required")
    } else{
      setAddressError('')
    }
  }

  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }

    setIsEmailFocused(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    if (!newEmail) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!/\d/.test(password)) {
      setPasswordError("Password must contain at least one number");
    } else if (!/[@$!%*#?&]/.test(password)) {
      setPasswordError("Password must contain at least one symbol (@ $ ! % * # ? &)");
    } else {
      setPasswordError("");
    }

    setIsPasswordFocused(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!newPassword) {
      setPasswordError("Password is required");
    } else if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!/\d/.test(newPassword)) {
      setPasswordError("Password must contain at least one number");
    } else if (!/[@$!%*#?&]/.test(newPassword)) {
      setPasswordError("Password must contain at least one symbol (@ $ ! % * # ? &)");
    } else {
      setPasswordError("");
    }
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordBlur = () => {
    if (!password_confirmation) {
      setConfirmPasswordError("Confirm Password required")
    }
    else if (password_confirmation !== password) {
      setConfirmPasswordError("Confirm Passwords do not match");
    }
    else if (password_confirmation.length < 8) {
      setConfirmPasswordError("Confirm Password must be at least 8 characters");
    } else {
      setConfirmPasswordError("");
    }

    setIsConfirmPasswordFocused(false);
  };

  const handleConfirmPassword = () => {
    if (password_confirmation !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }

  useEffect(() => {
    handleConfirmPassword()
  }, [password_confirmation])

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
    
    handleConfirmPassword()
  };

  const handleShowConfirmPasswordClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    // console.dir(email, password, rememberMe);
    // return;

    // login({
    //   email,
    //   password,
    //   remember: rememberMe,
    //   // setErrors,
    //   // setStatus,
    // });
  };

  useEffect(() => {
    //     adminLogin(setEmail, setPassword, setRememberMe);
  }, []);

  return {
    last_name,
    setLastName,
    first_name,
    setFirstName,
    city,
    setCity,
    cityError,
    setCityError,
    state,
    setState,
    stateError,
    setStateError,
    address,
    setAddress,
    addressError,
    setAddressError,
    lastNameError,
    firstNameError,
    setLastNameError,
    setFirstNameError,
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    password_confirmation,
    setConfirmPassword,
    passwordError,
    setPasswordError,
    confirmPasswordError,
    setConfirmPasswordError,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    rememberMe,
    setRememberMe,
    isFirstNameFocused,
    setIsFirstNameFocused,
    isLastNameFocused,
    setIsLastNameFocused,
    isCityFocused,
    setIsCityFocused,
    isStateFocused,
    setIsStateFocused,
    isAddressFocused,
    setIsAddressFocused,
    isPasswordFocused,
    setIsPasswordFocused,
    isConfirmPasswordFocused,
    setIsConfirmPasswordFocused,
    isEmailFocused,
    setIsEmailFocused,
    //
    handleCityChange,
    handleCityBlur,
    handleStateBlur,
    handleStateChange,
    handleAddressBlur,
    handleAddressChange,
    handleLastNameBlur,
    handleFirstNameBlur,
    handleEmailBlur,
    handlePasswordBlur,
    handleSubmit,
    handleLastNameChange,
    handleFirstNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleShowPasswordClick,
    handleConfirmPasswordBlur,
    handleConfirmPasswordChange,
    handleShowConfirmPasswordClick,
  };
};