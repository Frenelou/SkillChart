<template>
  <Modal v-if="userInfo">
    <template v-slot:header>
      <h2>{{ userInfo.first_name }} {{ userInfo.last_name }}
        <span>{{ userInfo.title }}</span>
      </h2>
    </template>
    <template v-slot:body>
      <TreeChart/>
      <ul>
        <li v-for="({ name, level }, index) in userInfo.skills" :key="index">
          <span>{{ name }} {{ level }}</span>
        </li>
      </ul>
    </template>
  </Modal>

</template>
	
<script>
import { computed } from "vue";
import { useChartStore } from "~/store/";
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const store = useChartStore();
    const { getUserInfo } = storeToRefs(store)
    return {
      userInfo: computed(() => getUserInfo?.value)
    }
  }
}
</script>
	
<style scoped>
span {
  display: block;
  color: darkgrey;
  font-size: 1.2rem;
}
</style>