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

  const checkNoNull = () => {
    const {
      name,
      birthday,
      country,
      city,
      username,
      email,
      password,
      confirmPassword,
      sexualIdentity,
      sexualPreference,
      racialPreference,
      meetingInterest,
      hobbies,
      avatars,
    } = formData;

    if (
      name === "" ||
      birthday === "" ||
      country === "" ||
      city === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      sexualIdentity === "" ||
      sexualPreference === "" ||
      racialPreference === "" ||
      meetingInterest === "" ||
      hobbies.length === 0 ||
      Object.values(avatars).filter((avatar) => avatar !== null).length < 2
    ) {
      alert(
        "Please complete all answers and ensure you have at least 2 photos!"
      );
      return false;
    }

    if (username.length <= 5) {
      alert("Username must be at least 6 characters");
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email must be valid");
      return false;
    }

    if (calculateAge(birthday) < 18) {
      alert("You must be at least 18 years old");
      return false;
    }

    return true;
  };

  const [step, setStep] = useState(1);

  const handleNext = (e) => {
    if (step < 3) {
      e.preventDefault();
      setStep(step + 1);
    }
  };

  const handleBack = (e) => {
    if (step > 1) {
      e.preventDefault();
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkNoNull()) {
      return setStep(1);
    }

    console.log("Form Data Submitted: ", formData);

    try {
      await register(formData);
      console.log("Registration successful");

      setFormData({
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
