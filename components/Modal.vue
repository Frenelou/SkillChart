<template>
  <transition name="modal-animation">
    <div class="modal-overlay" v-show="modalActive">
      <transition name="modal-animation-inner">
        <div class="modal-inner" v-show="modalActive">
          <div class="modal-header">
            <slot name="header" />
            <button class="modal-close" @click="toggleModal"> x </button>
          </div>
          <div class="modal-body">
            <slot name="body" />
          </div>
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
  &-header {
    padding: 10px;
    border-bottom: 1px solid #ccc;

  }

  &-body {
    padding: 10px;
  }

  &-footer {
    padding: 10px;
    border-top: 1px solid #ccc;
  }

  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9998;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-inner {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 1000px;
    height: 100%;
    max-height: 500px;
    overflow: auto;
    position: relative;
    z-index: 9999;
  }

  &-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: #ccc;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #000;
    }
  }
}
</style>