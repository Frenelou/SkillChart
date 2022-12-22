<template>
  <transition name="modal-animation">
    <div class="modal" v-show="modalActive">
      <transition name="modal-animation-inner">
        <div class="modal-inner" v-show="modalActive">

          <slot></slot>
          <button class="modal-close" @click="toggleModal"> Close </button>
        </div>
      </transition>
    </div>
  </transition>
</template>
	
<script>
import { useChartStore } from "~/store/";
import { storeToRefs } from 'pinia'

export default {

  setup() {
    const store = useChartStore();
    const { toggleModal, modalActive } = storeToRefs(store)

    return {
      toggleModal,
      modalActive
    }
  }
}
</script>
	
<style  lang="scss">
.modal {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  overflow: hidden;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);

  &-inner {
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }

  &-close {
    font-size: 1rem;
    padding: .2rem .5rem;
    cursor: pointer;
  }
}
</style>