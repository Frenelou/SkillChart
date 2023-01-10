import { defineStore } from 'pinia'
import axios from 'axios';

import { countLowerLevelChildren } from '../utils'

const dataPath = process.env.NODE_ENV === 'production' ? '/SkillChart/data/' : '/data/'

export const useChartStore = defineStore('chart', {
  state: () => ({
    skills: {},
    people: [],
    selectedSkills: [],
    lowerLevelChildrenCount: 0,
    currentUserId: 1,
    modalActive: false,
  }),
  actions: {
    fetchData() {
      const people = axios.get(`${dataPath}/people.json`).then(res => res.data)
      const skills = axios.get(`${dataPath}/skills.json`).then(res => res.data)
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
    setSkills(skills) {
      this.skills = skills
    },
    setSelectedSkills(skills) {
      console.log('setSelectedSkills', skills);
      this.selectedSkills = skills
    },
    toggleModal() {
      this.modalActive = !this.modalActive
    },
    setCurrentUserId(id) {
      this.currentUserId = id
    }
  },
  getters: {
    getPeopleWithSkills: state => {
      const { people, skills } = state
      if (!state.selectedSkills.length) return []
      else return people.filter(person =>
        state.selectedSkills.every(skill => person.skills.map(s => s.name).includes(skill)))
    },
    getLowerLevelChildrenCount: state => countLowerLevelChildren(state.skills),
    getUserInfo: state => state.people ? state.people.find(person => person.id === state.currentUserId) : null,

  }
})