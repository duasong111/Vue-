<template>
  <div class="tags">
    <el-tag v-for="(tag, index) in tags" :key="tag.name" :closable="tag.name !== 'home'"
      :effect="route.name === tag.name ? 'dark' : 'plain'" @click="handleMenu(tag)" @close="handleClose(tag, index)">{{
        tag.label }}</el-tag>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useAllDataStore } from '../stores';

const store = useAllDataStore()
const tags = computed(() => store.state.tags)
const route = useRoute()
const router = useRouter()

const handleMenu = (tag) => {
  router.push(tag.name)
  store.selectMenu(tag)
}
const handleClose = (tag, index) => {
  store.undateTags(tag)
  if (tag.name != route.name) return

  if (index === store.state.tags.length) {
    store.selectMenu(tags.value[index - 1])
    route.push(tags.value[index - 1].name)
  } else {
    store.selectMenu(tags.value[index])
    route.push(tags.value[index].name)
  }
}
</script>
<style lange="less" scoped>
.tags {
  margin: 5px 5px;
}

el-tag {
  margin-right: 10px;
}
</style>