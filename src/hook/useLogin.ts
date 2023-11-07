import { useState, useEffect } from "react";
// import { useAuth } from "./useAuth";
// import { adminLogin } from "./useLitmus";

export const useLogin = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("")
  //
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  //
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //
  const [rememberMe, setRememberMe] = useState(false);

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  // const { login } = useAuth({
  //   middleware: "guest",
  //   redirectIfAuthenticated: "/user/dashboard",
  // });

  const handleNameBlur = () => {
    if (!name) {
      setNameError("Name is required")
    } else{
      setNameError('')
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (!name) {
      setNameError("Name is required")
    } else{
      setNameError('')
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
    if (!confirmPassword) {
      setConfirmPasswordError("Password required")
    }
    else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    }
    else if (confirmPassword.length < 8) {
      setConfirmPasswordError("Password must be at least 8 characters");
    } else {
      setConfirmPasswordError("");
    }

    setIsConfirmPasswordFocused(false);
  };

  const handleConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }

  useEffect(() => {
    handleConfirmPassword()
  }, [confirmPassword])

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
    name,
    setName,
    nameError,
    setNameError,
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    confirmPassword,
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
    isNameFocused,
    setIsNameFocused,
    isPasswordFocused,
    setIsPasswordFocused,
    isConfirmPasswordFocused,
    setIsConfirmPasswordFocused,
    isEmailFocused,
    setIsEmailFocused,
    //
    handleNameBlur,
    handleEmailBlur,
    handlePasswordBlur,
    handleSubmit,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleShowPasswordClick,
    handleConfirmPasswordBlur,
    handleConfirmPasswordChange,
    handleShowConfirmPasswordClick,
  };
};