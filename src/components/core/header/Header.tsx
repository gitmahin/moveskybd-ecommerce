import { SearchBox } from "./SearchBox";
import { MainMenu } from "./MainMenu";
import { Logo } from "../Logo";
import { HeaderIconActions } from "./HeaderIconActions";
import { PrimaryLayout } from "../Layouts";

export const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 h-[64px] bg-white  px-4 z-50">
      <PrimaryLayout className="flex justify-between items-center h-full">
        <div className="flex justify-start items-center gap-5">
          <Logo />
          <MainMenu />
        </div>
        <div className="flex justify-center items-center gap-5">
          <SearchBox />
          <HeaderIconActions />
        </div>
      </PrimaryLayout>
    </header>
  );
};
