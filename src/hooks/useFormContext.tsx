import { useContext } from "react";
import FormContext from "../context/FormContext";

const useFormContext: any = () => useContext(FormContext);

export default useFormContext;
