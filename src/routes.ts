// import
import DashboardPage from "pages/dashboard/DashboardPage";

import OnboardingPage from "pages/onboarding/OnboardingPage";
import { FiHome, FiShoppingCart, FiPackage, FiDollarSign, FiUsers } from "react-icons/fi";
import { IconType } from "react-icons";
import ProfilePage from "pages/profile/ProfilePage";
import IntegrationPage from "pages/integration/IntegrationPage";
import AddStorePage from "pages/integration/AddStorePage";
import OrdersPage from "pages/order/OrdersPage";
import PendingOrderPage from "pages/order/PendingOrderPage";
import AbnormalOrderPage from "pages/order/AbnormalOrderPage";
import ItemPage from "pages/items/ItemPage";
import AddItemPage from "pages/items/AddItemPage";
import PriceMangementPage from "pages/items/PriceMangementPage";
import OrderSettingPage from "pages/settings/orderSetting/OrderSettingPage";
import CustomerPage from "pages/customer/CustomerPage";
import AddCustomerPage from "pages/customer/AddCustomerPage";
import InventoryPage from "pages/inventory/InventoryPage";
import CustomerGroupPage from "pages/customer/CustomerGroupPage";
import SalesReportPage from "pages/sales-report/SalesReportPage";
import DeskPage from "pages/desk/DeskPage";
import AddDeskPage from "pages/desk/AddDeskPage";
export interface routeType {
  path: string;
  name: string;
  category?: string;
  icon?: IconType;
  component?: any;
  showNav: boolean;
  showSide: boolean;
  views?: routeType[];
  layout: string;
}

const routes: routeType[] = [
  // DASHBOARD
  {
    path: "/",
    name: "Dashboard",
    icon: FiHome,
    component: DashboardPage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  // ONBOARDING
  {
    path: "/onboarding",
    name: "On Board",
    component: OnboardingPage,
    showNav: false,
    showSide: false,
    layout: "",
  },

  // PROFILE
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  {
    path: "/desk",
    name: "Desk",
    component: DeskPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/add-desk",
    name: "Add Desk",
    component: AddDeskPage,
    showNav: true,
    showSide: true,
    layout: "/desk",
  },

  // ADD STORE
  {
    path: "/integration",
    name: "Integration",
    component: IntegrationPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/add-store",
    name: "Add Store",
    component: AddStorePage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  // ORDER
  {
    path: "/orders",
    name: "Orders",
    icon: FiShoppingCart,
    component: OrdersPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/pending-order",
    name: "Pending Order",
    icon: FiShoppingCart,
    component: PendingOrderPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/abnormal-order",
    name: "Abnormal Order",
    icon: FiShoppingCart,
    component: AbnormalOrderPage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  // ITEM
  {
    path: "/item",
    name: "Item",
    icon: FiPackage,
    component: ItemPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/add-item",
    name: "Add Item",
    component: AddItemPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/price-management",
    name: "Price Management",
    icon: FiDollarSign,
    component: PriceMangementPage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  // INVENTORY
  {
    path: "/inventory",
    name: "Inventory",
    icon: FiPackage,
    component: InventoryPage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  // CUSTOMER
  {
    path: "/customer",
    name: "Customer",
    icon: FiUsers,
    component: CustomerPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/add-customer",
    name: "Add Customer",
    icon: FiUsers,
    component: AddCustomerPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
  {
    path: "/customer-group",
    name: "Customer Group",
    component: CustomerGroupPage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  // Sales Report
  {
    path: "/report",
    name: "Report",
    component: SalesReportPage,
    showNav: true,
    showSide: true,
    layout: "",
  },

  // SETTINGS
  {
    path: "/order-setting",
    name: "Order Setting",
    component: OrderSettingPage,
    showNav: true,
    showSide: true,
    layout: "",
  },
];
export default routes;
