import React from "react";
import { CiSearch } from "react-icons/ci";
import { getTheme } from "../../../../config/them.config";
import DropDown from "../../../../Component/ui/DropDown";
import Button from "../../../../Component/ui/Button";

let Role = [
  "All Roles",
  "Mentor",
  "Lean Developer",
  "Mentee",
  "Observer",
  "Other",
];
let Status = ["Active", "Inactive", "Pending", "Banned", "On Bording"];

const SearchMember = () => {
  let theme = getTheme("light");
  return (
    <div
      className="bg-white w-[90%] h-[7vh] mt-[4vh] flex items-center p-3 rounded-2xl border "
      style={{
        borderColor: theme.borderColor.primary,
      }}
    >
      <div
        className="Search_Container bg-[#f8fafc] w-1/2 h-full flex items-center gap-4 px-4 border rounded-lg mr-4"
        style={{
          borderColor: theme.borderColor.primary,
          backgroundColor: theme.background.secondary,
        }}
      >
        <CiSearch />
        <input
          type="text"
          placeholder="Search Member"
          className="w-full h-full px-4 text-lg outline-none"
        />
      </div>

      <div className="DropDownContainer flex gap-3">
        <DropDown options={Role} onSelect={(option) => console.log(option)} />
        <DropDown options={Status} onSelect={(option) => console.log(option)} />
      </div>

      <Button
        text="Search"
        width="8vw"
        icon={<CiSearch />}
        onClick={() => console.log("Search Clicked")}
      />
    </div>
  );
};

export default SearchMember;
