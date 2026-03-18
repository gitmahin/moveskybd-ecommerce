import { SearchBox } from "./SearchBox";
import { MainMenu } from "./MainMenu";
import { Logo } from "./Logo";
import { HeaderIconActions } from "./HeaderIconActions";

export const Header = () => {
  return (
    <div className="w-full fixed top-0 left-0 h-[64px] bg-white border flex justify-between items-center px-5">
      <div className="flex justify-start items-center gap-5">
        <Logo />
        <MainMenu />
      </div>
      <div className="flex justify-center items-center gap-5">
        <SearchBox />
        <HeaderIconActions />
      </div>
    </div>
  );
};
