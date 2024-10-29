import axios from "axios";
import RecipeDetail from "../components/detail/RecipeDetail.vue";

export default {
  namespaced: true,
  state() {
    return {
      recipes: [],
      recipeDetail: {},
    };
  },
  getters: {},
  mutations: {
    setNewRecipe(state, payload) {
      state.recipes.push(payload);
    },
    setRecipeData(state, recipes) {
      state.recipes = recipes;
    },
    // setRecipeDetail(state, payload) {
    //   state.recipeDetail = payload;
    // },
    setRecipeDetail(state, payload) {
      state.recipeDetail = {
        ...payload,
        ingredients: payload.ingredients || [],
        directions: payload.directions || [],
      };
    },
  },
  actions: {
    async updateRecipe({ dispatch, rootState }, { id, newRecipe }) {
      const updatedRecipe = {
        ...newRecipe,
        username: rootState.auth.userLogin.username,
      };
      try {
        const { data } = await axios.put(
          `https://vue-js-project-351d2-default-rtdb.firebaseio.com/recipes/${id}.json?auth=${rootState.auth.token}`,
          updatedRecipe
          // username: rootState.auth.userLogin.username
        );
        dispatch("getRecipeData");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteRecipe({ dispatch, rootState }, payload) {
      try {
        const { data } = await axios.delete(
          `https://vue-js-project-351d2-default-rtdb.firebaseio.com/recipes/${payload}.json?auth=${rootState.auth.token}`
        );
        await dispatch("getRecipeData");
      } catch (error) {
        console.log(error);
      }
    },
    async addNewRecipe({ commit, rootState }, payload) {
      const newData = {
        ...payload,
        username: rootState.auth.userLogin.username,
        createdAt: Date.now(),
        likes: ["null"],
        userId: rootState.auth.userLogin.userId,
      };
      try {
        const { data } = await axios.post(
          `https://vue-js-project-351d2-default-rtdb.firebaseio.com/recipes.json?auth=${rootState.auth.token}`,
          newData
        );

        commit("setNewRecipe", { id: data.name, ...newData });
      } catch (error) {
        console.log(error);
      }
    },
    async getRecipeData({ commit }) {
      try {
        const { data } = await axios.get(
          "https://vue-js-project-351d2-default-rtdb.firebaseio.com/recipes.json"
        );
        const arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] });
        }
        commit("setRecipeData", arr);
      } catch (error) {
        console.log("Error Fetching Recipe Data", error);
      }
    },
    async getRecipeDetail({ commit }, payload) {
      try {
        const { data } = await axios.get(
          `https://vue-js-project-351d2-default-rtdb.firebaseio.com/recipes/${payload}.json`
        );
        commit("setRecipeDetail", data);
        return data;
      } catch (error) {
        console.log(data);
        z;
        console.log("Recipe Detail", error);
      }
    },
  },
};
