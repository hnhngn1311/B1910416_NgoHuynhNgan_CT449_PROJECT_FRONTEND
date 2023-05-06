<template>
  <div class="wrapper">
    <Sidebar />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import Sidebar from '@/views/admin/components/Sidebar.vue'
import { RouterView } from 'vue-router'

export default {
  components: { Sidebar, RouterView }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100vw;
}

main {
  width: calc(100vw - 180px);
  background-color: rgba(0, 0, 0, 0.1);
  overflow: scroll;
  max-height: 100vh;
  padding: 1rem;
}
main::-webkit-scrollbar {
  display: none;
}
</style>
