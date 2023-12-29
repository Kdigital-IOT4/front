import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/components/MainPage";
import LoginPage from "@/components/LoginPage";
import UserLoginPage from "@/components/UserLoginPage";
import MachineLoginPage from "@/components/MachineLoginPage";
import MachineMainPage from "@/components/MachineMainPage";
import MenuPage from "@/components/MenuPage";

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
    path: "/Menu",
    name: "MenuPage",
    component: MenuPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;