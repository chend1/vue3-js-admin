<script setup>
import { ref } from 'vue';
// 棋盘坐标
const xList = ref([...Array(40).keys()]);
const yList = ref([...Array(40).keys()]);
// 落子
const chessPieces = ref([]);
// 落子次数
const count = ref(0);
// 胜利方
const winType = ref('');
// 记录落子
const recordList = ref([]);
// 棋盘点击
const handleClick = (x, y) => {
  if ((chessPieces.value[x] && chessPieces.value[x][y]) || winType.value) {
    return;
  }
  if (!chessPieces.value[x]) {
    chessPieces.value[x] = [];
  }
  recordList.value.push({
    list: chessPieces.value,
    count: count.value,
  });
  count.value += 1;
  const nextChessPieces = JSON.parse(JSON.stringify(chessPieces.value));
  nextChessPieces[x][y] = count.value % 2 === 0 ? 'black' : 'white';
  chessPieces.value = nextChessPieces;
  const result = judge({ x, y });
  winType.value = result ? chessPieces.value[x][y] : '';
  console.log(winType.value);
};

// 判断赢的方式有哪些
const judge = (val) => {
  let result = true;
  result = checkX(val) || checkY(val) || checkDiagonal(val);
  return result;
};
// 判断横坐标是否连续
const checkX = (val) => {
  const { x, y } = val;
  let flag = 1;
  if (
    chessPieces.value[x + 1]
    && chessPieces.value[x + 1][y] === chessPieces.value[x][y]
  ) {
    flag += 1;
    if (
      chessPieces.value[x + 2]
      && chessPieces.value[x + 2][y] === chessPieces.value[x][y]
    ) {
      flag += 1;
      if (
        chessPieces.value[x + 3]
        && chessPieces.value[x + 3][y] === chessPieces.value[x][y]
      ) {
        flag += 1;
        if (
          chessPieces.value[x + 4]
          && chessPieces.value[x + 4][y] === chessPieces.value[x][y]
        ) {
          flag += 1;
        }
      }
    }
  }
  if (flag === 5) {
    return true;
  }
  if (
    chessPieces.value[x - 1]
    && chessPieces.value[x - 1][y] === chessPieces.value[x][y]
  ) {
    flag += 1;
    if (flag === 5) {
      return true;
    }
    if (
      chessPieces.value[x - 2]
      && chessPieces.value[x - 2][y] === chessPieces.value[x][y]
    ) {
      flag += 1;
      if (flag === 5) {
        return true;
      }
      if (
        chessPieces.value[x - 3]
        && chessPieces.value[x - 3][y] === chessPieces.value[x][y]
      ) {
        flag += 1;
        if (flag === 5) {
          return true;
        }
        if (
          chessPieces.value[x - 4]
          && chessPieces.value[x - 4][y] === chessPieces.value[x][y]
        ) {
          flag += 1;
          if (flag === 5) {
            return true;
          }
        }
      }
    }
  }
  return false;
};
// 判断纵坐标是否连续
const checkY = (val) => {
  const { x, y } = val;
  let flag = 1;
  if (
    chessPieces.value[x][y + 1]
    && chessPieces.value[x][y + 1] === chessPieces.value[x][y]
  ) {
    flag += 1;
    if (
      chessPieces.value[x][y + 2]
      && chessPieces.value[x][y + 2] === chessPieces.value[x][y]
    ) {
      flag += 1;
      if (
        chessPieces.value[x][y + 3]
        && chessPieces.value[x][y + 3] === chessPieces.value[x][y]
      ) {
        flag += 1;
        if (
          chessPieces.value[x][y + 4]
          && chessPieces.value[x][y + 4] === chessPieces.value[x][y]
        ) {
          flag += 1;
        }
      }
    }
  }
  if (flag === 5) {
    return true;
  }
  if (
    chessPieces.value[x][y - 1]
    && chessPieces.value[x][y - 1] === chessPieces.value[x][y]
  ) {
    flag += 1;
    if (flag === 5) {
      return true;
    }
    if (
      chessPieces.value[x][y - 2]
      && chessPieces.value[x][y - 2] === chessPieces.value[x][y]
    ) {
      flag += 1;
      if (flag === 5) {
        return true;
      }
      if (
        chessPieces.value[x][y - 3]
        && chessPieces.value[x][y - 3] === chessPieces.value[x][y]
      ) {
        flag += 1;
        if (flag === 5) {
          return true;
        }
        if (
          chessPieces.value[x][y - 4]
          && chessPieces.value[x][y - 4] === chessPieces.value[x][y]
        ) {
          flag += 1;
          if (flag === 5) {
            return true;
          }
        }
      }
    }
  }
  return false;
};
// 判断对角是否连续
const checkDiagonal = (val) => {
  const { x, y } = val;
  let flag = 1;
  if (
    chessPieces.value[x + 1]
    && chessPieces.value[x + 1][y + 1] === chessPieces.value[x][y]
  ) {
    flag += 1;
    if (
      chessPieces.value[x + 2]
      && chessPieces.value[x + 2][y + 2] === chessPieces.value[x][y]
    ) {
      flag += 1;
      if (
        chessPieces.value[x + 3]
        && chessPieces.value[x + 3][y + 3] === chessPieces.value[x][y]
      ) {
        flag += 1;
        if (
          chessPieces.value[x + 4]
          && chessPieces.value[x + 4][y + 4] === chessPieces.value[x][y]
        ) {
          flag += 1;
        }
      }
    }
  }
  if (flag === 5) {
    return true;
  }
  if (
    chessPieces.value[x - 1]
    && chessPieces.value[x - 1][y - 1] === chessPieces.value[x][y]
  ) {
    flag += 1;
    if (
      chessPieces.value[x - 2]
      && chessPieces.value[x - 2][y - 2] === chessPieces.value[x][y]
    ) {
      flag += 1;
      if (
        chessPieces.value[x - 3]
        && chessPieces.value[x - 3][y - 3] === chessPieces.value[x][y]
      ) {
        flag += 1;
        if (
          chessPieces.value[x - 4]
          && chessPieces.value[x - 4][y - 4] === chessPieces.value[x][y]
        ) {
          flag += 1;
        }
      }
    }
  }
  if (flag === 5) {
    return true;
  }
  flag = 1;
  if (
    chessPieces.value[x + 1]
    && chessPieces.value[x + 1][y - 1] === chessPieces.value[x][y]
  ) {
    flag += 1;
    if (
      chessPieces.value[x + 2]
      && chessPieces.value[x + 2][y - 2] === chessPieces.value[x][y]
    ) {
      flag += 1;
      if (
        chessPieces.value[x + 3]
        && chessPieces.value[x + 3][y - 3] === chessPieces.value[x][y]
      ) {
        flag += 1;
        if (
          chessPieces.value[x + 4]
          && chessPieces.value[x + 4][y - 4] === chessPieces.value[x][y]
        ) {
          flag += 1;
        }
      }
    }
  }
  if (flag === 5) {
    return true;
  }
  if (
    chessPieces.value[x - 1]
    && chessPieces.value[x - 1][y + 1] === chessPieces.value[x][y]
  ) {
    flag += 1;
    if (
      chessPieces.value[x - 2]
      && chessPieces.value[x - 2][y + 2] === chessPieces.value[x][y]
    ) {
      flag += 1;
      if (
        chessPieces.value[x - 3]
        && chessPieces.value[x - 3][y + 3] === chessPieces.value[x][y]
      ) {
        flag += 1;
        if (
          chessPieces.value[x - 4]
          && chessPieces.value[x - 4][y + 4] === chessPieces.value[x][y]
        ) {
          flag += 1;
        }
      }
    }
  }
  if (flag === 5) {
    return true;
  }
  return false;
};
// 上一步
const goBackClick = () => {
  const record = recordList.value.pop();
  console.log(record);
  chessPieces.value = record.list;
  count.value = record.count;
};
// 重新开始游戏
const resetClick = () => {
  winType.value = '';
  count.value = 0;
  chessPieces.value = [];
  recordList.value = [];
};
</script>

<template>
  <div class="gomoku">
    <div class="games-box">
      <div class="game-head">
        <div>游戏规则</div>
        <p>
          白子先走，黑子后走，水平，垂直，2条对角线，共4个方向率先完成五子连续落子方胜出
        </p>
      </div>
      <div class="checker">
        <div
          v-for="row in xList"
          :key="row + 'row'"
          class="row"
        >
          <div
            v-for="col in yList"
            :key="col + 'col'"
            class="col"
          >
            <span
              :class="chessPieces[col] ? chessPieces[col][row] : 'none'"
              @click="handleClick(col, row)"
            ></span>
          </div>
        </div>
      </div>
    </div>
    <div class="opertaion">
      <h3>棋盘信息：</h3>
      <div class="option">
        <div class="label">
          棋盘大小：
        </div>
        <div class="value">
          {{ xList.length }}*{{ yList.length }}
        </div>
      </div>
      <div class="option">
        <div class="label">
          下步落子：
        </div>
        <div class="value chessman">
          <span :class="count % 2 === 0 ? 'white' : 'black'"></span>
        </div>
      </div>
      <div
        v-if="!winType && recordList.length"
        class="option"
      >
        <div class="label">
          落子有悔：
        </div>
        <div class="value">
          <div
            class="regret"
            @click="goBackClick"
          >
            上一步
          </div>
        </div>
      </div>
      <div
        v-if="winType"
        class="option"
      >
        <div
          class="label"
          style="color: #ff0000"
        >
          胜利方：
        </div>
        <div class="value chessman">
          <span :class="winType"></span>
        </div>
      </div>
      <div
        v-if="recordList.length"
        class="option"
      >
        <div
          class="btn"
          @click="resetClick"
        >
          重新开始
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@squareColor: #555;
.gomoku {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  .game-head {
    width: 100%;
    div {
      line-height: 30px;
      font-size: 18px;
      font-weight: 700;
    }
    p {
      font-size: 14px;
      color: #e68d3b;
      margin-bottom: 10px;
    }
  }
  .checker {
    background-color: #bbb;
  }
  .row {
    width: 100%;
    display: flex;
    align-items: center;

    .col {
      width: 20px;
      height: 20px;
      font-size: 12px;
      text-align: center;
      line-height: 20px;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        position: absolute;
        top: 9.5px;
        left: 0;
        background-color: @squareColor;
      }
      &::before {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 9.5px;
        background-color: @squareColor;
      }
      span {
        position: relative;
        z-index: 999;
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        cursor: pointer;
      }
      .white {
        background-color: #fff;
        -webkit-box-shadow: 0.01rem 0.01rem 0.1rem rgba(0, 0, 0, 0.5),
          0 0 0.05rem rgba(240, 240, 240, 0.5),
          0.05rem 0.05rem 0.01rem rgba(255, 255, 255, 0.15) inset,
          0.1rem 0.1rem 0.1rem rgba(255, 255, 255, 0.05) inset,
          -0.05rem -0.05rem 0.25rem rgba(0, 0, 0, 0.15) inset,
          -0.1rem -0.1rem 0.35rem rgba(0, 0, 0, 0.05) inset;
        box-shadow: 0.01rem 0.01rem 0.1rem rgba(0, 0, 0, 0.5),
          0 0 0.05rem rgba(240, 240, 240, 0.5),
          0.05rem 0.05rem 0.01rem rgba(255, 255, 255, 0.15) inset,
          0.1rem 0.1rem 0.1rem rgba(255, 255, 255, 0.05) inset,
          -0.05rem -0.05rem 0.25rem rgba(0, 0, 0, 0.15) inset,
          -0.1rem -0.1rem 0.35rem rgba(0, 0, 0, 0.05) inset;
      }
      .black {
        background-color: #222;
        -webkit-box-shadow: 0.01rem 0.01rem 0.1rem rgba(0, 0, 0, 0.5),
          0 0 0.05rem rgba(240, 240, 240, 0.5),
          0.05rem 0.05rem 0.01rem rgba(255, 255, 255, 0.15) inset,
          0.1rem 0.1rem 0.1rem rgba(255, 255, 255, 0.05) inset,
          -0.05rem -0.05rem 0.25rem rgba(0, 0, 0, 0.15) inset,
          -0.1rem -0.1rem 0.35rem rgba(0, 0, 0, 0.05) inset;
        box-shadow: 0.01rem 0.01rem 0.1rem rgba(0, 0, 0, 0.5),
          0 0 0.05rem rgba(240, 240, 240, 0.5),
          0.05rem 0.05rem 0.01rem rgba(255, 255, 255, 0.15) inset,
          0.1rem 0.1rem 0.1rem rgba(255, 255, 255, 0.05) inset,
          -0.05rem -0.05rem 0.25rem rgba(0, 0, 0, 0.15) inset,
          -0.1rem -0.1rem 0.35rem rgba(0, 0, 0, 0.05) inset;
      }
    }
  }
  .opertaion {
    width: 300px;
    margin: 0 30px;
    .option {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .label {
        width: 100px;
      }
      .chessman {
        width: 40px;
        height: 40px;
        border: 1px solid #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ddd;
        position: relative;
        span {
          display: inline-block;
          position: relative;
          z-index: 9;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          -webkit-box-shadow: 0.01rem 0.01rem 0.1rem rgba(0, 0, 0, 0.5),
            0 0 0.05rem rgba(240, 240, 240, 0.5),
            0.05rem 0.05rem 0.01rem rgba(255, 255, 255, 0.15) inset,
            0.1rem 0.1rem 0.1rem rgba(255, 255, 255, 0.05) inset,
            -0.05rem -0.05rem 0.25rem rgba(0, 0, 0, 0.15) inset,
            -0.1rem -0.1rem 0.35rem rgba(0, 0, 0, 0.05) inset;
          box-shadow: 0.01rem 0.01rem 0.1rem rgba(0, 0, 0, 0.5),
            0 0 0.05rem rgba(240, 240, 240, 0.5),
            0.05rem 0.05rem 0.01rem rgba(255, 255, 255, 0.15) inset,
            0.1rem 0.1rem 0.1rem rgba(255, 255, 255, 0.05) inset,
            -0.05rem -0.05rem 0.25rem rgba(0, 0, 0, 0.15) inset,
            -0.1rem -0.1rem 0.35rem rgba(0, 0, 0, 0.05) inset;
        }
        .white {
          background-color: #fff;
        }
        .black {
          background-color: #222;
        }
      }
      .btn{
        width: 80px;
        line-height: 30px;
        text-align: center;
        background-color: #498df1;
        color: #fff;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
      }
      .regret{
        text-decoration: dashed;
        color: #e68d3b;
        cursor: pointer;
        &:hover{
          color: #ff0000;
        }
      }
    }
  }
}
</style>
