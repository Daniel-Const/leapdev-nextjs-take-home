import { MoonIcon, SunIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export const ThemeSwitch = ({
  isDarkMode,
  toggle,
}: {
  isDarkMode: boolean;
  toggle: () => void;
}) => {
  return (
    <div className="inline-flex items-center gap-2">
      <Switch id="dark-mode-switch" onClick={() => toggle()} />
      <Label htmlFor="dark-mode-switch">
        <span className="sr-only">Toggle switch</span>
        {isDarkMode ? (
          <MoonIcon className="size-4 text-white" aria-hidden="true" />
        ) : (
          <SunIcon className="size-4" aria-hidden="true" />
        )}
      </Label>
    </div>
  );
};
