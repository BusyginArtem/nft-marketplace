import React from "react";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

import Input from "./input";

type FormInputProps = React.ComponentProps<"input"> & {
  error?: FieldError;
};

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(({ error, ...props }, ref) => {
  console.log(error);

  return (
    <div>
      <Input className={clsx({ "focus-visible:outline-red-400": !!error?.message })} ref={ref} {...props} />

      <span className='text-red-400 text-xs h-4 inline-block'>{error?.message ? error.message : ""}</span>
    </div>
  );
});
FormInput.displayName = "FormInput";

export default FormInput;
