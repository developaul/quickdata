import { ThemePicker } from "@/components";

export const Header = () => {
  return (
    <header className="flex flex-col items-center justify-between ">
      <div className="max-w-4xl w-full flex items-center justify-end p-4">
        <ThemePicker />
      </div>
    </header>
  );
};
