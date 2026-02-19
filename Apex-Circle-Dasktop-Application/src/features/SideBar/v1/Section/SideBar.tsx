
import { getTheme } from "../../../../config/them.config";
import SideBarLink from "../Components/SideBarLink";
import {
  MdCalendarToday,
  MdDashboard,
  MdGroup,
  MdSettings,
  MdWork,
} from "react-icons/md";

const SideBar = () => {
  let theme = getTheme("light");

  return (
    <div
      className="sidebar w-[25%] lg:w-[18%] h-screen flex flex-col border-r "
      style={{
        borderColor: theme.borderColor.primary,
        background: theme.background.primary,
      }}
    >
      <div
        className="sidebar-header p-4 border-b flex h-[15%] w-full items-center justify-center gap-1  border-t-2"
        style={{ borderColor: theme.borderColor.primary }}
      >
        {/* <img src="https://media.licdn.com/dms/image/v2/D4E0BAQF1PHwKK_ViDg/img-crop_100/B4EZnsRhrXIIAM-/0/1760605642362?e=1772668800&v=beta&t=zHdmlHtd1gM7B8bS-OHUtzOdNnWiJXSb_k-nPrlHtHg" alt="Apex Circle Logo" className="w-15 h-15 mb-2" /> */}

        <div
          className="Circle w-[2.5rem] h-[2.5rem] rounded-full"
          style={{ background: theme.textColor.tersiary }}
        ></div>

        <h1
          className="font-bold h-full text-center text-[1.40em] leading-0"
          style={{
            color: theme.textColor.tersiary,
            fontFamily: theme.fontFamily.primary,
          }}
        >
          Apex Circle
        </h1>
      </div>
      <div className="sidebar-content flex flex-col gap-3 p-4 h-full w-full ">
        {/* Sidebar content goes here */}
        <h1>Operations</h1>
        <SideBarLink icon={<MdDashboard />} text="Dashboard" />
        <SideBarLink icon={<MdWork />} text="Projects" />
        <SideBarLink icon={<MdGroup />} text="Teams"  link="/member"/>
        <SideBarLink icon={<MdCalendarToday />} text="Calendar" />
        <SideBarLink icon={<MdSettings />} text="Settings" />
      </div>
    </div>
  );
};

export default SideBar;
