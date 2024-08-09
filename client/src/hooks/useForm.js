import { useContext } from "react";
import { FormContext } from "../contexts/FormProvider";

export const useForm = () => useContext(FormContext);
