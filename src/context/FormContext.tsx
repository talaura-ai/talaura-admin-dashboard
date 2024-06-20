import { createContext, useState } from "react";

const FormContext = createContext({});

export interface IFormProvider {
  children: any;
}

const FormProvider: React.FC<IFormProvider> = ({ children }) => {
  const steps = {
    0: "Create Assessment",
    1: "Test Module",
    2: "Review",
  };

  const [data, setData] = useState<any>({});
  const [page, setPage] = useState(2);

  const handleChange = (e: {
    target: { type: any; name: any; checked: any; value: any };
  }) => {
    const type = e.target.type;

    const name = e.target.name;

    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { ...requiredInputs } = data;

  const canSubmit =
    [...Object.values(requiredInputs)].every(Boolean) &&
    page === Object.keys(steps).length - 1;

  const canNextPage1 = Object.keys(data)
    .map((key) => data[key])
    .every(Boolean);

  const canNextPage2 = Object.keys(data)
    .map((key) => data[key])
    .every(Boolean);

  const disablePrev = page === 1;

  const disableNext =
    page === Object.keys(steps).length - 1 ||
    (page === 0 && !canNextPage1) ||
    (page === 1 && !canNextPage2);

  const prevHide = page === 1 && "remove-button";

  const nextHide = page === Object.keys(steps).length - 1 && "remove-button";

  const submitHide = page !== Object.keys(steps).length - 1 && "remove-button";

  return (
    <FormContext.Provider
      value={{
        steps,
        page,
        setPage,
        data,
        setData,
        canSubmit,
        handleChange,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider };

export default FormContext;
