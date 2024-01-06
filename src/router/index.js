import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/components/MainPage";
import LoginPage from "@/components/LoginPage";
import UserLoginPage from "@/components/UserLoginPage";
import MachineLoginPage from "@/components/MachineLoginPage";
import MachineMainPage from "@/components/MachineMainPage";
import TestConnectPage from  "@/components/TestConnectPage";
import BaseDetailPage from "@/components/BaseDetailPage";
import BaseRegistrationPage from "@/components/BaseRegistrationPage";
import BillPage from "@/components/BillPage";
import CockTailCustomPage from "@/components/CockTailCustomPage";
import CockTailDetailPage from "@/components/CockTailDetailPage";
import CockTailOrderPage from "@/components/CockTailOrderPage";
import CockTailPage from "@/components/CockTailPage";
import CocktailPreviewPage from "@/components/CocktailPreviewPage";
import ErrorPage from "@/components/ErrorPage";
import PayMentPage from "@/components/PayMentPage";
import PhoneNumberInputPage from "@/components/PhoneNumberInputPage";
import UserSignUpPage from "@/components/UserSignUpPage";

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
    path: "/PayMentPage",
    name: "PayMentPage",
    component: PayMentPage,
  },

  {
    path: "/PhoneNumberInputPage",
    name: "PhoneNumberInputPage",
    component: PhoneNumberInputPage,
  },

  {
    path: "/UserSignUpPage",
    name: "UserSignUpPage",
    component: UserSignUpPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
