<template>
  <div class="col-12 col-sm-8">
    <div v-if="recipeDetail">
      <!-- <h2>{{ recipeDetail.name }}</h2> -->
      <recipe-description
        :description="recipeDetail.description"
      ></recipe-description>
      <recipe-ingredients
        :ingredients="recipeDetail.ingredients"
      ></recipe-ingredients>
      <recipe-directions
        :directions="recipeDetail.directions"
      ></recipe-directions>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import RecipeDescription from "./RecipeDescription.vue";
import RecipeDirections from "./RecipeDirections.vue";
import RecipeIngredients from "./RecipeIngredients.vue";
const store = useStore();
const recipeDetail = computed(() => store.state.recipe.recipeDetail);
const route = useRoute();
onMounted(async () => {
  console.log("recipe id from route", route.params.id);
  await store.dispatch("recipe/getRecipeDetail", route.params.id);
});
</script>
