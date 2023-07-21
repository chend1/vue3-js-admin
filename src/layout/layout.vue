<script setup>
import { Operation, ArrowDown, ArrowRight } from '@element-plus/icons-vue';
import { useMainStore } from '@/store';
import { ref, computed } from 'vue';

import MenuItem from './components/MenuItem.vue';

const baseStore = useMainStore();
const isCollapse = ref(false);

// 面包屑
const linkList = computed(() => baseStore.linkList);

// 退出登录
const logOutClick = () => {
  baseStore.logOut();
};
// 链接跳转
const linkClick = (link) => {
  baseStore.deleteLink(link);
};
</script>

<template>
  <div class="layout">
    <div
      class="aside"
      :class="{ collapse: isCollapse }"
    >
      <div class="title">
        <div class="logo">
          <img
            src=""
            alt="后台管理系统"
            title="后台管理系统"
          />
        </div>
        <span
          v-show="!isCollapse"
          style="white-space: nowrap"
        >后台管理系统</span>
      </div>
      <div class="menu-wrap">
        <el-menu
          :default-active="$route.path"
          class="menu-list el-menu-vertical-demo"
          :collapse="isCollapse"
          :router="true"
        >
          <template
            v-for="item in baseStore.menuList.filter(item => item.status === 1)"
            :key="item.path"
          >
            <MenuItem :menu-info="item"></MenuItem>
          </template>
        </el-menu>
      </div>
    </div>
    <div class="article">
      <div class="head">
        <div class="menu">
          <div
            class="icon"
            @click="isCollapse = !isCollapse"
          >
            <el-icon><Operation /></el-icon>
          </div>
          <div class="list">
            <el-breadcrumb :separator-icon="ArrowRight">
              <el-breadcrumb-item
                v-for="item in linkList"
                :key="item.path"
                :to="{ path: item.path }"
                :class="{active: $route.path === item.path}"
                @click="linkClick(item)"
              >
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <div class="user-info">
          <el-dropdown>
            <div class="info">
              <div class="avatar">
                <img
                  :src="baseStore.userInfo.avatar"
                  alt=""
                />
              </div>
              <div class="name">
                {{ baseStore.userInfo.name }}
              </div>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="linkClick">
                  关于我们
                </el-dropdown-item>
                <el-dropdown-item @click="logOutClick">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100vh;
  display: flex;
  .aside {
    width: 250px;
    transition: all 0.3s;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    background-color: #192430;
    color: #fff;
    .title {
      width: 100%;
      height: 55px;
      display: flex;
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0 15px;
      .logo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #fff;
        margin-right: 8px;
        img {
          width: 100%;
        }
      }
    }
    .menu-wrap {
      .menu-list {
        border-right: none;
        --el-menu-bg-color: #192430;
        --el-menu-text-color: #ffffff;
        --el-menu-hover-bg-color: #306bff81;
      }
      :deep(.el-menu-item.is-active) {
        background-color: #306bff;
        color: #fff;
      }
    }
  }
  .collapse {
    width: 64px;
    .title {
      padding: 0;
      .logo {
        margin: 0 auto;
      }
    }
  }
  .article {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    // background-color: yellowgreen;
    .head {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      .menu {
        font-size: 20px;
        color: #333;
        cursor: pointer;
        display: flex;
        align-items: center;

        .icon {
          &:hover {
            color: #4694fa;
          }
        }
        .list {
          margin-left: 15px;
          .active{
            :deep(.is-link){
              color: #4694fa;
            }
          }
        }
      }
      .user-info {
        .info {
          display: flex;
          align-items: center;
          cursor: pointer;
          outline: none;
          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #fff;
            margin-right: 5px;
            img {
              width: 100%;
            }
          }
          .name {
            margin-right: 8px;
          }
        }
      }
    }
    .content {
      flex: 1;
      width: 100%;
      background-color: #eee;
      box-sizing: border-box;
      padding: 8px;
      overflow: hidden;
    }
  }
}
</style>
