import { useEffect, useRef, useReducer } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Countrydata from "/src/mock-city/Countrydata.json";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authentication';

const initialState = {
  state: [],
  name: "",
  birthday: "",
  country: "",
  city: "",
  username: "",
  email: "",
  selectDate: null,
  sexualIdentity: "",
  sexualPreference: "",
  racialPreference: "",
  meetingInterest: "",
  hobbies: [],
  inputValue: "",
  bio: "",
  isPopupOpen: false,
  isDeleteConfirmationOpen: false,
  avatars: {
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  }
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        ...action.payload
      };
    case 'SET_AVATARS':
      return {
        ...state,
        avatars: {
          image1: action.payload[0],
          image2: action.payload[1],
          image3: action.payload[2],
          image4: action.payload[3],
          image5: action.payload[4],
        }
      };
    case 'SET_IS_POPUP_OPEN':
      return {
        ...state,
        isPopupOpen: action.payload
      };
    case 'SET_IS_DELETE_CONFIRMATION_OPEN':
      return {
        ...state,
        isDeleteConfirmationOpen: action.payload
      };
    default:
      return state;
  }
};

export const useProfileData = () => {
  const [profileData, dispatch] = useReducer(profileReducer, initialState);

  //const { state: userState } = useAuth();
  const datePickerRef = useRef(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles/${userId}`
      );
      dispatch({
        type: 'SET_PROFILE',
        payload: {
          name: result.data.name,
          country: result.data.location,
          city: result.data.city,
          username: result.data.username,
          email: result.data.email,
          birthday: result.data.date_of_birth,
          sexualIdentity: result.data.sexual_identities,
          sexualPreference: result.data.sexual_preferences,
          racialPreference: result.data.racial_preferences,
          meetingInterest: result.data.meeting_interests,
          hobbies: result.data.hobbies,
        }
      });
      dispatch({
        type: 'SET_AVATARS',
        payload: result.data.avatars
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserProfile = async () => {
    try {
      const updatedData = {
        name: profileData.name,
        location: profileData.country,
        city: profileData.city,
        username: profileData.username,
        email: profileData.email,
        date_of_birth: profileData.birthday,
        sexual_identities: profileData.sexualIdentity,
        sexual_preferences: profileData.sexualPreference,
        racial_preferences: profileData.racialPreference,
        meeting_interests: profileData.meetingInterest,
        hobbies: profileData.hobbies,
        avatars: [
          profileData.avatars.image1,
          profileData.avatars.image2,
          profileData.avatars.image3,
          profileData.avatars.image4,
          profileData.avatars.image5,
        ],
      };

      const result = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles/${userId}`, updatedData
      );
      dispatch({
        type: 'SET_PROFILE',
        payload: {
          name: result.data.name,
          country: result.data.location,
          city: result.data.city,
          username: result.data.username,
          email: result.data.email,
          birthday: result.data.date_of_birth,
          sexualIdentity: result.data.sexual_identities,
          sexualPreference: result.data.sexual_preferences,
          racialPreference: result.data.racial_preferences,
          meetingInterest: result.data.meeting_interests,
          hobbies: result.data.hobbies,
        }
      });
      dispatch({
        type: 'SET_AVATARS',
        payload: result.data.avatars
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles/${userId}`
      );
      dispatch({
        type: 'SET_PROFILE',
        payload: initialState
      });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCountry = (e) => {
    const getCountryId = e.target.value;
    const getStateData = Countrydata.find(
      (country) => country.country_name === getCountryId
    ).states;
    dispatch({
      type: 'SET_PROFILE',
      payload: {
        state: getStateData,
        country: getCountryId
      }
    });
  };

  const handleState = (e) => {
    const city = e.target.value;
    dispatch({
      type: 'SET_PROFILE',
      payload: {
        city: city
      }
    });
  };

  const handleInputChange = (event) => {
    dispatch({
      type: 'SET_PROFILE',
      payload: {
        inputValue: event.target.value
      }
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && profileData.hobbies.length <= 9) {
      event.preventDefault();
      const newHobbies = [...profileData.hobbies, profileData.inputValue];
      dispatch({
        type: 'SET_PROFILE',
        payload: {
          hobbies: newHobbies,
          inputValue: ""
        }
      });
    }
  };

  const deleteHobby = (index) => {
    const newHobbies = [...profileData.hobbies];
    newHobbies.splice(index, 1);
    dispatch({
      type: 'SET_PROFILE',
      payload: {
        hobbies: newHobbies
      }
    });
  };

  const handleFileChange = (event, avatarKey) => {
    const selectedFile = event.target.files[0];
    dispatch({
      type: 'SET_AVATARS',
      payload: {
        [avatarKey]: selectedFile
      }
    });
    event.target.value = null;
  };

  const handleDeleteClick = (avatarKey) => {
    dispatch({
      type: 'SET_AVATARS',
      payload: {
        [avatarKey]: null
      }
    });
  };

  const handleDragStart = (event, avatarKey) => {
    event.dataTransfer.setData("avatarKey", avatarKey);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetAvatarKey) => {
    const sourceAvatarKey = event.dataTransfer.getData("avatarKey");
    if (sourceAvatarKey !== targetAvatarKey) {
      const updatedAvatars = {
        ...profileData.avatars,
        [targetAvatarKey]: profileData.avatars[sourceAvatarKey],
        [sourceAvatarKey]: profileData.avatars[targetAvatarKey]
      };
      dispatch({
        type: 'SET_AVATARS',
        payload: updatedAvatars
      });
    }
  };

  const openPopup = () => {
    dispatch({
      type: 'SET_IS_POPUP_OPEN',
      payload: true
    });
  };

  const closePopup = () => {
    dispatch({
      type: 'SET_IS_POPUP_OPEN',
      payload: false
    });
  };

  const openDeleteConfirmation = () => {
    dispatch({
      type: 'SET_IS_DELETE_CONFIRMATION_OPEN',
      payload: true
    });
  };
  
  const closeDeleteConfirmation = () => {
    dispatch({
      type: 'SET_IS_DELETE_CONFIRMATION_OPEN',
      payload: false
    });
  };
  

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true); // Open the date picker programmatically
    }
  };

  const checkImage = (image) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else if (typeof image === "string") {
      return image;
    }
    return ""; // Return an empty string or handle unexpected cases if necessary
  };

  return {
    ...profileData,
    updateUserProfile,
    handleCountry,
    handleState,
    handleInputChange,
    handleKeyDown,
    deleteHobby,
    handleFileChange,
    handleDeleteClick,
    handleDragStart,
    handleDragOver,
    handleDrop,
    openPopup,
    closePopup,
    handleIconClick,
    checkImage,
    datePickerRef,
    handleDeleteProfile,
    openDeleteConfirmation,
    closeDeleteConfirmation,
  };
};
