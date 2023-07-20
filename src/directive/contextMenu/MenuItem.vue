<template>
  <ul
    :class="{
      'menu-top': direction.top,
      'menu-right': direction.right,
      'menu-bottom': direction.bottom,
      'menu-left': direction.left
    }"
    @click.stop
  >
    <li
      v-for="item in menuList"
      :key="item.name"
      @click="menuClick(item)"
    >
      <span v-if="!item.isHidden">{{ item.name }}</span>
      <MenuItem
        :menu-list="item.children"
        :direction="direction"
        @close="closeMeun"
      ></MenuItem>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  menuList: {
    type: Array,
    default: () => [],
  },
  direction: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['close']);
const menuClick = (value) => {
  value.method(value.params);
  closeMeun();
};
const closeMeun = () => {
  emit('close');
};
</script>

<style lang="less" scoped>
ul {
  border-bottom: 1px solid #eee;
  border-radius: 2px;
  -moz-box-shadow: 2px 2px 8px #aaa;
  -webkit-box-shadow: 2px 2px 8px #aaa;
  box-shadow: 1px 2px 5px #aaa;
  li {
    position: relative;
    line-height: 28px;
    font-size: 12px;
    text-align: left;
    background-color: #fff;
    color: #333;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    border: 1px solid #eee;
    border-bottom: none;
    cursor: pointer;
    white-space: nowrap;
    ul {
      position: absolute;
      display: none;
    }
    .menu-top {
      top: 0;
    }
    .menu-bottom {
      bottom: 0;
    }
    .menu-left {
      left: calc(100% - 2px);
    }
    .menu-right {
      right: calc(100% - 2px);
    }
    &:hover {
      background-color: #eee;
      & > ul {
        display: block;
      }
    }
  }
}
</style>
