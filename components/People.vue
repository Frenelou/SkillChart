<template>
  <div id="people" v-if="peopleWithSkills.length">
    <ul>
      <li v-for="(person, index) in peopleWithSkills" :key="index">
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
    const { getPeopleWithSkills } = storeToRefs(useChartStore())

    return {
      peopleWithSkills: computed(() => getPeopleWithSkills.value),
    //   peopleWithSkills: [{ "id": 4, "title": "developer", "email": "jlaidel3@woothemes.com", "first_name": "Jessamyn", "last_name": "Laidel", "skills": [{ "name": "vue cli", "level": 3 }, { "name": "node.js", "level": 1 }, { "name": "angularjs", "level": 4 }, { "name": "underscore.js", "level": 4 }, { "name": "node.js", "level": 3 }] }, { "id": 7, "title": "designer", "email": "gshipton6@bizjournals.com", "first_name": "Gabbie", "last_name": "Shipton", "skills": [{ "name": "react router", "level": 1 }, { "name": "backbone.js", "level": 1 }, { "name": "d3.js", "level": 3 }, { "name": "django", "level": 1 }, { "name": "angularjs", "level": 3 }] }, { "id": 24, "title": "designer", "email": "kcoxhelln@sciencedirect.com", "first_name": "Kamilah", "last_name": "Coxhell", "skills": [{ "name": "react", "level": 3 }, { "name": "angularjs", "level": 1 }, { "name": "bootstrap", "level": 1 }, { "name": "sass", "level": 2 }, { "name": "react router", "level": 1 }] }]
    }
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
  overflow:auto;
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