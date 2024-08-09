import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "../hooks/connectProfile.mjs";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const initialData = {
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
    avatars: [],
    bio: "",
  };
  const [formData, setFormData] = useState(initialData);

  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const resetForm = () => {
    setFormData(initialData);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const addHobby = (hobby) => {
    if (formData.hobbies.includes(hobby)) {
      alert("This hobby is already added.");
      return;
    }
    setFormData({ ...formData, hobbies: [...formData.hobbies, hobby] });
  };

  const deleteHobby = (index) => {
    const newHobbies = [...formData.hobbies];
    newHobbies.splice(index, 1);
    setFormData({ ...formData, hobbies: newHobbies });
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

  const validatePage1 = () => {
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
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!birthday) newErrors.birthday = "Birthday is required";
    if (!country) newErrors.country = "Location is required";
    if (!city) newErrors.city = "City is required";
    if (!username) newErrors.username = "Username is required";
    if (username && username.length <= 5)
      newErrors.username = "Username must be at least 6 characters";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) newErrors.email = "Email is required";
    if (email && !emailRegex.test(email))
      newErrors.email = "Email must be valid";
    if (!token) {
      // console.log(token);
      if (!password) newErrors.password = "Password is required";
      if (password && password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (password !== confirmPassword)
        newErrors.confirmPassword = "Passwords must match";
    }
    if (calculateAge(birthday) < 18)
      newErrors.birthday = "You must be at least 18 years old";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePage2 = () => {
    const {
      sexualIdentity,
      sexualPreference,
      racialPreference,
      meetingInterest,
      hobbies,
    } = formData;
    const newErrors = {};

    if (!sexualIdentity)
      newErrors.sexualIdentity = "Sexual Identity is required";
    if (!sexualPreference)
      newErrors.sexualPreference = "Sexual Preference is required";
    if (!racialPreference)
      newErrors.racialPreference = "Racial Preference is required";
    if (!meetingInterest)
      newErrors.meetingInterest = "Meeting Interest is required";
    if (hobbies.length === 0)
      newErrors.hobbies = "At least one hobby is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePage3 = () => {
    const { avatars } = formData;
    const newErrors = {};

    if (Object.values(avatars).filter((avatar) => avatar !== null).length < 2) {
      newErrors.avatars = "Please upload at least 2 profile pictures";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [step, setStep] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();

    let isValid = false;

    switch (step) {
      case 1:
        isValid = validatePage1();
        break;
      case 2:
        isValid = validatePage2();
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

  const handleSubmit = async (e, userId) => {
    e.preventDefault();

    if (!validatePage1() || !validatePage2() || !validatePage3()) {
      return true;
    }

    console.log("Form Data Submitted: ", formData);

    setLoading(true);

    const sentFormData = new FormData();

    sentFormData.append("name", formData.name);
    sentFormData.append("birthday", formData.birthday);
    sentFormData.append("country", formData.country);
    sentFormData.append("city", formData.city);
    sentFormData.append("username", formData.username);
    sentFormData.append("email", formData.email);
    sentFormData.append("password", formData.password);
    sentFormData.append("confirmPassword", formData.confirmPassword);
    sentFormData.append("sexualIdentity", formData.sexualIdentity);
    sentFormData.append("sexualPreference", formData.sexualPreference);
    sentFormData.append("racialPreference", formData.racialPreference);
    sentFormData.append("meetingInterest", formData.meetingInterest);
    sentFormData.append("bio", formData.bio);

    for (let i = 0; i < formData.hobbies.length; i++) {
      sentFormData.append("hobbies[]", formData.hobbies[i]);
    }

    for (let avatarKey in formData.avatars) {
      let avatar = formData.avatars[avatarKey];
      // console.log(avatar);
      if (avatar instanceof File) {
        sentFormData.append("avatar", avatar);
      } else if (avatar) {
        // console.log({ [avatarKey]: avatar });
        sentFormData.append("avatar", JSON.stringify({ [avatarKey]: avatar }));
      }
    }

    // for (const pair of sentFormData.entries()) {
    //   if (pair[0] === "avatar") {
    //     console.log(pair[1]);
    //   }
    // }

    try {
      if (userId) {
        await updateProfile(userId, sentFormData);
        console.log("Updated Profile successful");
      } else {
        await register(sentFormData);
        resetForm();
        setStep(1);
        console.log("Registration successful");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        errors,
        setFormData,
        resetForm,
        handleChange,
        calculateAge,
        addHobby,
        deleteHobby,
        handleSubmit,
        handleBack,
        handleNext,
        step,
        loading,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
