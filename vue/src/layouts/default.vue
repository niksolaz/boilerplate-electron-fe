<template>
  <div>
    <main>
      <slot />
    </main>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const isShow = ref(false);

onMounted(() => {
  isShow.value = true;
  console.log(isShow.value)
});

</script>
