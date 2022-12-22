<template>
  <div>
    <div class="info" v-if="userInfo">
      <div class="info__header">
        <h2>{{ userInfo.first_name }} {{ userInfo.last_name }}</h2>
        <h3>{{ userInfo.title }}</h3>
      </div>
      <div class="info__body">
        <ul>
          <li v-for="(skill, index) in userInfo.skills" :key="index">
            <span>{{ skill }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
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
      userInfo: computed(() => getUserInfo.value)
    }
  }
}
</script>
	
<style scoped>

</style>