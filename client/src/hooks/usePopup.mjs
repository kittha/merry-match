import { useRef, useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  },
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_AVATARS":
      return {
        ...state,
        avatars: {
          image1: action.payload[0],
          image2: action.payload[1],
          image3: action.payload[2],
          image4: action.payload[3],
          image5: action.payload[4],
        },
      };
    case "SET_IS_POPUP_OPEN":
      return {
        ...state,
        isPopupOpen: action.payload,
      };
    case "SET_IS_DELETE_CONFIRMATION_OPEN":
      return {
        ...state,
        isDeleteConfirmationOpen: action.payload,
      };
    default:
      return state;
  }
};

export const usePopup = () => {
  const [profileData, dispatch] = useReducer(profileReducer, initialState);

  //const { state: userState } = useAuth();
  const datePickerRef = useRef(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles/${userId}`
      );
      dispatch({
        type: "SET_PROFILE",
        payload: initialState,
      });
      navigate("/login");
    } catch (error) {
      // console.error(error);
    }
  };

  const openPopup = () => {
    dispatch({
      type: "SET_IS_POPUP_OPEN",
      payload: true,
    });
  };

  const closePopup = () => {
    dispatch({
      type: "SET_IS_POPUP_OPEN",
      payload: false,
    });
  };

  const openDeleteConfirmation = () => {
    dispatch({
      type: "SET_IS_DELETE_CONFIRMATION_OPEN",
      payload: true,
    });
  };

  const closeDeleteConfirmation = () => {
    dispatch({
      type: "SET_IS_DELETE_CONFIRMATION_OPEN",
      payload: false,
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
    openPopup,
    closePopup,
    handleIconClick,
    checkImage,
    handleDeleteProfile,
    openDeleteConfirmation,
    closeDeleteConfirmation,
  };
};
