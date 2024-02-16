import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/components/MainPage";
import LoginPage from "@/components/LoginPage";
import UserLoginPage from "@/components/UserLoginPage";
import MachineLoginPage from "@/components/MachineLoginPage";
import MachineMainPage from "@/components/MachineMainPage";
import TestConnectPage from "@/components/TestConnectPage";
import BaseDetailPage from "@/components/BaseDetailPage";
import BaseRegistrationPage from "@/components/BaseRegistrationPage";
import BillPage from "@/components/BillPage";
import CockTailCustomPage from "@/components/CockTailCustomPage";
import CockTailDetailPage from "@/components/CockTailDetailPage";
import CockTailOrderPage from "@/components/CockTailOrderPage";
import CockTailPage from "@/components/CockTailPage";
import CocktailPreviewPage from "@/components/CocktailPreviewPage";
import ErrorPage from "@/components/ErrorPage";
import PaymentsPage from "@/components/PaymentsPage";
import UserSignUpPage from "@/components/UserSignUpPage";
import UserRegisterPage from "@/components/UserRegisterPage";
import MachineRegisterPage from "@/components/MachineRegisterPage";
import CocktailMainPage from "@/components/CocktailMainPage";
import PhoneNumberPage from "@/components/PhoneNumberPage";
import CocktailMachinePreviewPage from "@/components/CocktailMachinePreviewPage";
import OrderPage from "@/components/OrderPage";
import StuffRegistrationPage from "@/components/StuffRegistrationPage";
import CocktailDetailModal from "@/components/modal/CocktailDetailModal";
import OrderConnectPage from "@/components/OrderConnectPage";
import CocktailMakePage from "@/components/CocktailMakePage";
import CocktailMakeProcessPage from "@/components/CocktailMakeProcessPage";
import MachineMainIPRegisterPage from "@/components/MachineMainIPRegisterPage";

const routes = [
  {
    path: "/machine/ip",
    name: "MachineMainIPRegisterPag",
    component: MachineMainIPRegisterPage,
  },

  {
    path: "/cocktail/make/process",
    name: "CocktailMakeProcessPage",
    component: CocktailMakeProcessPage,
  },

  {
    path: "/cocktail/make",
    name: "CocktailMakePage",
    component: CocktailMakePage,
  },

  {
    path: "/cocktail/order/connect",
    name: "OrderConnectPage",
    component: OrderConnectPage,
  },

  {
    path: "/Cocktail/Modal",
    name: "CocktailDetailModal",
    component: CocktailDetailModal,
  },
  { path: "/", name: "MainPage", component: MainPage },
  { path: "/login", name: "LoginPage", component: LoginPage },
  {
    path: "/login/user",
    name: "UserLoginPage",
    component: UserLoginPage,
  },

  {
    path: "/StuffRegistrationPage",
    name: "StuffRegistrationPage",
    component: StuffRegistrationPage,
  },

  {
    path: "/OrderPage",
    name: "OrderPage",
    component: OrderPage,
  },

  {
    path: "/login/machine",
    name: "MachineLoginPage",
    component: MachineLoginPage,
  },
  {
    path: "/machine",
    name: "MachineMainPage",
    component: MachineMainPage,
  },

  {
    path: "/TestConnectPage",
    name: "TestConnectPage",
    component: TestConnectPage,
  },

  {
    path: "/BaseDetailPage",
    name: "BaseDetailPage",
    component: BaseDetailPage,
  },

  {
    path: "/BaseRegistrationPage",
    name: "BaseRegistrationPage",
    component: BaseRegistrationPage,
  },

  {
    path: "/BillPage",
    name: "BillPage",
    component: BillPage,
  },

  {
    path: "/CockTailCustomPage",
    name: "CockTailCustomPage",
    component: CockTailCustomPage,
  },

  {
    path: "/CockTailDetailPage",
    name: "CockTailDetailPage",
    component: CockTailDetailPage,
  },

  {
    path: "/CockTailOrderPage",
    name: "CockTailOrderPage",
    component: CockTailOrderPage,
  },

  {
    path: "/CockTailPage",
    name: "CockTailPage",
    component: CockTailPage,
  },

  {
    path: "/CocktailPreviewPage",
    name: "CocktailPreviewPage",
    component: CocktailPreviewPage,
  },

  {
    path: "/ErrorPage",
    name: "ErrorPage",
    component: ErrorPage,
  },

  {
    path: "/UserSignUpPage",
    name: "UserSignUpPage",
    component: UserSignUpPage,
  },
  {
    path: "/register/user",
    name: "UserRegisterPage",
    component: UserRegisterPage,
  },

  {
    path: "/register/machine",
    name: "MachineRegisterPage",
    component: MachineRegisterPage,
  },

  {
    path: "/cocktail/main",
    name: "CocktailMainPage",
    component: CocktailMainPage,
  },

  {
    path: "/cocktail/payment",
    name: "PaymentPage",
    component: PaymentsPage,
  },

  {
    path: "/cocktail/phoneNumber",
    name: "PhoneNumberPage",
    component: PhoneNumberPage,
  },

  {
    path: "/cocktail/bill",
    name: "BillPage",
    component: BillPage,
  },

  {
    path: "/CocktailMachinePreviewPage",
    name: "CocktailMachinePreviewPage",
    component: CocktailMachinePreviewPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
