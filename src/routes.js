import DetailPage from "./components/pages/DetailPage.vue";
import HomePage from "./components/pages/HomePage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import UserPage from "./components/pages/UserPages.vue";
import Cookies from "js-cookie";
import { store } from "./store/index";
import NewRecipePage from "./components/pages/NewRecipePage.vue";
import EditRecipePage from "./components/pages/EditRecipePage.vue";

export const routes = [
  {
    path: "/recipe/edit/:id",
    name: "editPage",
    component: EditRecipePage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" });
    },
  },
  {
    path: "/",
    name: "homePage",
    component: HomePage,
    beforeEnter: () => {
      checkAuth();
    },
  },
  {
    path: "/user/:component",
    name: "userPage",
    component: UserPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" });
    },
  },
  {
    path: "/new-recipe",
    name: "newRecipePage",
    component: NewRecipePage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" });
    },
  },
  { path: "/signup", name: "signupPage", component: SignupPage },
  { path: "/login", name: "loginPage", component: LoginPage },
  { path: "/recipe/:id", name: "detailPage", component: DetailPage },
];

const checkAuth = () => {
  const jwtCookie = Cookies.get("jwt");
  const expirationDate = Cookies.get("tokenExpirationDate");
  const userId = Cookies.get("UID");

  if (!jwtCookie || !expirationDate) return false;

  if (new Date().getTime() < +expirationDate) {
    store.commit("auth/setToken", {
      idToken: jwtCookie,
      expiresIn: expirationDate,
    });
    store.dispatch("auth/getUser", userId);
    return true;
  }

  store.commit("auth/setUserLogout");
  return false;
};
