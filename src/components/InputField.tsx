import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const InputField = ({ id, label, placeholder }: any) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} placeholder={placeholder} />
    </div>
  );
};
