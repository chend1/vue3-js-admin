<template>
  <div
    class="custom-menu"
    :style="{
      top: newPosition.positionY + 'px',
      left: newPosition.positionX + 'px',
      opacity: newPosition.opacity
    }"
  >
    <div
      ref="menuRef"
      class="list"
    >
      <MenuItem
        :menu-list="menuList"
        :direction="direction"
        @close="closeMeun"
      ></MenuItem>
    </div>
  </div>
</template>

<script setup>
import {
  reactive, onMounted, watch, ref, nextTick, onBeforeUnmount,
} from 'vue';
import MenuItem from './MenuItem.vue';

const props = defineProps({
  position: {
    type: Object,
    default: () => ({}),
  },
  menuList: {
    type: Array,
    default: () => [],
  },
});
const newPosition = ref({

});
const direction = reactive({
  top: false,
  right: false,
  bottom: false,
  left: false,
});
const emit = defineEmits(['close']);
const closeMeun = () => {
  emit('close');
};
onMounted(() => {
  document.addEventListener('click', closeMeun);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', closeMeun);
});
const menuRef = ref(null);
watch(() => props.position, () => {
  setTimeout(() => {
    const position = { ...props.position };
    const width = window.outerWidth;
    const height = window.outerHeight;
    const { clientWidth, clientHeight } = menuRef.value;
    if (width - position.positionX < clientWidth) {
      position.positionX -= clientWidth;
      direction.left = false;
      direction.right = true;
    } else {
      direction.left = true;
      direction.right = false;
    }
    if (height - position.positionY < clientHeight) {
      position.positionY -= clientHeight;
      direction.top = false;
      direction.bottom = true;
    } else {
      direction.top = true;
      direction.bottom = false;
    }
    newPosition.value = position;
    nextTick(() => {
      newPosition.value.opacity = 1;
    });
  });
}, { deep: true, immediate: true });

</script>

<style lang="less" scoped>
.custom-menu {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
  opacity: 0;
}
</style>
