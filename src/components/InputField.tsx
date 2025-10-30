import { ChangeEventHandler } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type InputTypes = "text" | "number" | "textarea";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  containerClassName?: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string | number;
  step?: number;
  type?: InputTypes;
  required?: boolean;
}

export const InputField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  step = 1,
  required = false,
}: InputFieldProps) => {
  return (
    <div>
      <Label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={3}
          placeholder={placeholder}
          required={required}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      ) : (
        <Input
          id={id}
          value={value}
          type={type}
          step={step}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      )}
    </div>
  );
};
