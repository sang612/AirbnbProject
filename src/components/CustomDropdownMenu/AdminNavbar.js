import React from "react";
import { menuItemsAdminData } from "./menuItemAdminData ";
import MenuItems from "./MenuItems";

const AdminNavbar = () => {
  return (
    <nav>
       <ul className="menus">
        {menuItemsAdminData.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul>
    </nav>
  );
};

export default AdminNavbar;
