<template>
    <div v-show="isActive">
        <img  :src="url" class="affiche"/>
    </div>
</template>

<script>
export default {
  props: {
    url: String,
    isActive: Boolean,
  }
};
</script>
