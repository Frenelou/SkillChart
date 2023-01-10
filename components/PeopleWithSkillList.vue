<template>
  <div id="people" v-if="peopleWithSkills.length">
    <ul>
      <li v-for="(person, index) in peopleWithSkills" :key="index" @click="showPersonInfo(person.id)">
        <div class="avatar">
        </div>
        <div class="info">
          <div class="name">{{ person.first_name }} {{ person.last_name }}</div>
          <div class="title">{{ person.title }}</div>
          <div class="email">{{ person.email }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
	
<script>
import { watch, ref, computed, onMounted } from "vue";
import { useChartStore } from "~/store/";
import { storeToRefs } from 'pinia'
export default {
  setup() {
    const { getPeopleWithSkills, toggleModal, setCurrentUserId } = storeToRefs(useChartStore())

    return {
      peopleWithSkills: computed(() => getPeopleWithSkills.value),
      setCurrentUserId,
      toggleModal
    }
  },
  methods: {
    showPersonInfo: function (id) {
      this.setCurrentUserId(id);
      this.toggleModal();
    },
  }
}
</script>
	
<style lang="scss">
#people {
  width: 100%;
  max-width: 400px;
  height: calc(100% - 20px);
  margin: 0 auto;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: block;
  overflow: auto;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 10px;
  right: 10px;

}

ul {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #ccc;
      margin-right: 1rem;
    }

    .info {
      .name {
        font-weight: bold;
      }

      .title {
        font-size: 0.8rem;
      }

      .email {
        font-size: 0.8rem;
      }
    }
  }
}
</style>