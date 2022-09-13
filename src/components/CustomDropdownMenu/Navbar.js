import React from "react";
import { menuItemsData } from "./menuItemData";
import MenuItems from "./MenuItems";

const Navbar = () => {
  return (
    <nav>
       <ul className="menus">
        {menuItemsData.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
