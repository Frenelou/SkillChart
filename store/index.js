import { defineStore } from 'pinia'
import axios from 'axios';

export const useChartStore = defineStore('chart', {
  state: () => ({
    skills: {},
    people: [],
    selectedSkills: []
  }),
  actions: {
    fetchData() {
      const people = axios.get(`/data/people.json`).then(res => res)
      const skills = axios.get(`/data/skills.json`).then(res => res.data)
        .then((result) => addTechType(result))

      Promise.all([skills, people]).then((values) => {
        this.skills = values[0];
        this.people = values[1];
      });

      const addTechType = (node) => {
        node.children?.forEach((child) => {
          child.techType = child.techType || node.techType
          addTechType(child);
        });
        return node
      };
    },
    setSkills(state, skills) {
      state.skills = skills
    },
    setSelectedSkills(state, skills) {
      console.log('setSelectedSkills', skills);
      state.selectedSkills = skills
    },
    setPeople(state, people) {
      state.people = people
    }
  },
  getters: {
    getPeopleWithSkills: state => {
      const { people, skills } = state
      if (!state.selectedSkills.length) return []
      else return people.filter(person =>
        state.selectedSkills.every(skill => person.skills.includes(skill)))
    }
  }
})