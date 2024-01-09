import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/components/MainPage";
import LoginPage from "@/components/LoginPage";
import UserLoginPage from "@/components/UserLoginPage";
import MachineLoginPage from "@/components/MachineLoginPage";
import MachineMainPage from "@/components/MachineMainPage";
import TestConnectPage from "@/components/TestConnectPage";
import UserRegisterPage from "@/components/UserRegisterPage";
import MachineRegisterPage from "@/components/MachineRegisterPage";
import CocktailMainPage from "@/components/CocktailMainPage";
import PaymentPage from "@/components/PaymentPage";
import PhoneNumberPage from "@/components/PhoneNumberPage";
import BillPage from "@/components/BillPage";

const routes = [
  { path: "/", name: "MainPage", component: MainPage },
  { path: "/login", name: "LoginPage", component: LoginPage },
  {
    path: "/login/user",
    name: "UserLoginPage",
    component: UserLoginPage,
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
    component: PaymentPage,
  },

  {
    path: "/cocktail/phoneNumber",
    name: "PhoneNumberPage",
    component: PhoneNumberPage,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
