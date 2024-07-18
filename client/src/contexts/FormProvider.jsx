import React, { createContext, useState } from "react";
import { useAuth } from "./authentication";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    country: "",
    city: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    sexualIdentity: "",
    sexualPreference: "",
    racialPreference: "",
    meetingInterest: "",
    hobbies: [],
    avatars: {
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
    },
  });

  const { register } = useAuth();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const addHobby = (hobby) => {
    setFormData({ ...formData, hobbies: [...formData.hobbies, hobby] });
  };

  const deleteHobby = (index) => {
    const newHobbies = [...formData.hobbies];
    newHobbies.splice(index, 1);
    setFormData({ ...formData, hobbies: newHobbies });
  };

  const handleAvatarChange = (avatarKey, file) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      avatars: {
        ...prevFormData.avatars,
        [avatarKey]: file,
      },
    }));
  };

  const deleteAvatar = (avatarKey) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      avatars: {
        ...prevFormData.avatars,
        [avatarKey]: null,
      },
    }));
  };

  const handleAvatarSwap = (sourceAvatarKey, targetAvatarKey) => {
    const updatedAvatars = { ...formData.avatars };
    const temp = updatedAvatars[targetAvatarKey];
    updatedAvatars[targetAvatarKey] = updatedAvatars[sourceAvatarKey];
    updatedAvatars[sourceAvatarKey] = temp;
    setFormData({ ...formData, avatars: updatedAvatars });
  };

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const checkNoNullPage1 = () => {
    const {
      name,
      birthday,
      country,
      city,
      username,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      name === "" ||
      birthday === "" ||
      country === "" ||
      city === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please complete all required fields on step 1!");
      return false;
    }

    if (username.length <= 5) {
      alert("Username must be at least 6 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email must be valid");
      return false;
    }
    if (calculateAge(birthday) < 18) {
      alert("You must be at least 18 years old");
      return false;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password need to match");
      return false;
    }
    return true;
  };

  const checkNoNullPage2 = () => {
    const {
      sexualIdentity,
      sexualPreference,
      racialPreference,
      meetingInterest,
      hobbies,
    } = formData;

    if (
      sexualIdentity.trim() === "" ||
      sexualPreference.trim() === "" ||
      racialPreference.trim() === "" ||
      hobbies.length === 0 ||
      meetingInterest.trim() === ""
    ) {
      alert("Please complete all required fields on step 2!");
      return false;
    }

    return true;
  };

  const [step, setStep] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();

    let isValid = false;

    switch (step) {
      case 1:
        isValid = checkNoNullPage1();
        break;
      case 2:
        isValid = checkNoNullPage2();
        break;
      default:
        isValid = true;
        break;
    }

    if (isValid && step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = (e) => {
    if (step > 1) {
      e.preventDefault();
      setStep(step - 1);
    }
  };

  const checkNoNullPage3 = () => {
    const { avatars } = formData;

    if (Object.values(avatars).filter((avatar) => avatar !== null).length < 2) {
      alert("Please upload at least 2 profile pictures");
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkNoNullPage3()) {
      return false;
    }

    console.log("Form Data Submitted: ", formData);

    try {
      const sentFormData = new FormData();

      sentFormData.append("name", formData.name);
      sentFormData.append("date_of_birth", formData.birthday);
      sentFormData.append("location", formData.country);
      sentFormData.append("city", formData.city);
      sentFormData.append("username", formData.username);
      sentFormData.append("email", formData.email);
      sentFormData.append("password", formData.password);
      sentFormData.append("confirmPassword", formData.confirmPassword);
      sentFormData.append("sexual_identities", formData.sexualIdentity);
      sentFormData.append("sexual_preferences", formData.sexualPreference);
      sentFormData.append("racial_preferences", formData.racialPreference);
      sentFormData.append("meeting_interests", formData.meetingInterest);

      for (var i = 0; i < formData.hobbies.length; i++) {
        sentFormData.append("hobbies[]", formData.hobbies[i]);
      }
      for (let avatarKey in formData.avatars) {
        sentFormData.append("avatar", formData.avatars[avatarKey]);
      }
      console.log(sentFormData);

      await register(sentFormData);
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        handleChange,
        addHobby,
        deleteHobby,
        handleAvatarChange,
        deleteAvatar,
        handleAvatarSwap,
        handleSubmit,
        handleBack,
        handleNext,
        step,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
