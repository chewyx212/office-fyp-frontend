
import { FiHome, FiShoppingCart, FiPackage, FiUsers, FiBarChart2 } from "react-icons/fi";
import { IconType } from "react-icons";
import { BiSync } from "react-icons/bi";

export interface SidebarType {
  name: string;
  link: string;
  icon: IconType;
  subNav: SubNavType[];
}
export interface SubNavType {
  name: string;
  link: string;
}

const routes: SidebarType[] = [
  { name: "Dashboard", icon: FiHome, link: "/", subNav: [] },
  {
    name: "Integration",
    icon: BiSync,
    link: "/integration",
    subNav: [],
  },
  {
    name: "Order",
    icon: FiShoppingCart,
    link: "/order",
    subNav: [
      {
        name: "All Orders",
        link: "/orders",
      },
      {
        name: "Pending Order",
        link: "/pending-order",
      },
      {
        name: "Abnormal Order",
        link: "/abnormal-order",
      },
    ],
  },
  {
    name: "Item",
    icon: FiPackage,
    link: "/item",
    subNav: [
      {
        name: "All Items",
        link: "/item",
      },
      {
        name: "Price Management",
        link: "/price-management",
      },
    ],
  },
  // {
  //   name: "Inventory",
  //   icon: FiPackage,
  //   link: "/inventory",
  //   subNav: [
  //     {
  //       name: "Inventory Management",
  //       link: "/inventory",
  //     },
  //   ],
  // },
  {
    name: "Customer",
    icon: FiUsers,
    link: "/customer",
    subNav: [],
  },
  {
    name: "Sales Report",
    icon: FiBarChart2,
    link: "/sales-report",
    subNav: [],
  },
];

export default routes;
