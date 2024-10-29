<template>
  <main>
    <div class="container-md my-5 py-5">
      <div class="row my-4">
        <div class="col-12 col-sm-2"></div>
        <recipe-detail></recipe-detail>
        <div class="col-12 col-sm-2"></div>
      </div>
    </div>
  </main>
</template>
<script setup>
import RecipeDetail from "../detail/RecipeDetail.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

onMounted(() => {
  console.log("recipe id from route:", route.params.id);
  store.dispatch("recipe/getRecipeDetail", route.params.id);
});
</script>
