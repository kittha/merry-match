import { useContext } from "react";
import { FormContext } from "../contexts/FormProvider";

export const useImage = () => {
  const { formData, setFormData } = useContext(FormContext);

  const handleAvatarChange = (action, avatarKey, file) => {
    const newAvatars = [...formData.avatars];
    switch (action) {
      case "add":
        newAvatars.push(file);
        break;
      case "delete":
        newAvatars.splice(avatarKey, 1);
        break;
    }
    setFormData({
      ...formData,
      avatars: [...newAvatars],
    });
  };

  const handleAvatarSwap = (fromIndex, toIndex) => {
    const updatedAvatars = [...formData.avatars];
    const temp = updatedAvatars[toIndex];
    updatedAvatars[toIndex] = updatedAvatars[fromIndex];
    updatedAvatars[fromIndex] = temp;
    setFormData({
      ...formData,
      avatars: [...updatedAvatars],
    });
  };

  const checkImage = (image) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else {
      return image.url;
    }
  };

  return {
    handleAvatarChange,
    handleAvatarSwap,
    checkImage,
  };
};
