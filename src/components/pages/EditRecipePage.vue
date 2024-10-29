<template>
  <main>
    <div class="container-md my-5 py-5">
      <recipe-form v-if="detailData && !isLoading" :isEdit="true"></recipe-form>
    </div>
  </main>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import RecipeForm from "../recipeForm/RecipeForm.vue";

const store = useStore();
const route = useRoute();

const detailData = ref(null);
const isLoading = ref(false);
onMounted(async () => {
  isLoading.value = true;
  try {
    const recipeId = route.params.id;
    await store.dispatch("recipe/getRecipeDetail", recipeId);
    detailData.value = store.state.recipe.recipeDetail;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>
