<script setup>
import { ref } from 'vue';
// 记录胜出的棋子
const chessPieces = ref('');
const squaress = ref(Array(9).fill(''));
// 记录下棋过程
const recordList = ref([]);
const countReocrd = ref([]);
// 记录次数
const count = ref(0);
// 是否点击记录
const recordIndex = ref(-1);
// 游戏点击
const handleClick = (index) => {
  if (recordIndex.value !== -1) {
    recordList.value.splice(recordIndex.value + 1, recordList.value.length);
    chessPieces.value = '';
    countReocrd.value.slice(recordIndex.value + 1, countReocrd.value.length);
    count.value = countReocrd.value[recordIndex.value];
    recordIndex.value = -1;
  }
  if (squaress.value[index] || chessPieces.value) {
    return;
  }
  count.value += 1;
  const nextSquaress = squaress.value.slice();
  nextSquaress[index] = count.value % 2 === 0 ? 'o' : 'x';
  recordList.value.push(nextSquaress);
  countReocrd.value.push(count.value);
  squaress.value = nextSquaress;
  judge();
};
// 判断输赢
const judge = () => {
  const nextSquaress = squaress.value;
  const winType = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winType.length; i++) {
    const [a, b, c] = winType[i];
    if (
      nextSquaress[a]
      && nextSquaress[a] === nextSquaress[b]
      && nextSquaress[a] === nextSquaress[c]
    ) {
      chessPieces.value = nextSquaress[a];
    }
  }
  return '';
};
// 返回当前记录
const handleRecordClick = (item, index) => {
  if (item === -1) {
    recordIndex.value = -1;
    chessPieces.value = '';
    recordList.value = [];
    countReocrd.value = [];
    count.value = 0;
    squaress.value = Array(9).fill('');
    return;
  }
  recordIndex.value = index;
  squaress.value = item;
};
</script>

<template>
  <div class="ticktactoe">
    <h2 v-if="!chessPieces">
      当前落子方:{{ count % 2 === 0 ? 'x' : 'o' }}
    </h2>
    <h2 v-else>
      胜利方:{{ chessPieces }}
    </h2>
    <div class="box">
      <div class="game">
        <div
          v-for="(item, index) in squaress"
          :key="index"
          class="square"
          @click="handleClick(index)"
        >
          {{ item }}
        </div>
      </div>
      <div class="opertaion">
        <p>落子记录，点击对应记录恢复</p>
        <ul>
          <li @click="handleRecordClick(-1)">
            重新开始
          </li>
          <li
            v-for="(item, index) in recordList"
            :key="index"
            @click="handleRecordClick(item, index)"
          >
            #记录 {{ index + 1 }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@squareColor: #555;
.ticktactoe {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 30px;
  h2 {
    line-height: 50px;
    color: #333;
    font-size: 20px;
  }
  .box {
    display: flex;
  }
  .game {
    width: 152px;
    height: 152px;
    border-top: 1px solid @squareColor;
    border-left: 1px solid @squareColor;
    display: flex;
    flex-wrap: wrap;
    margin: 30px 80px;
    .square {
      width: 50px;
      height: 50px;
      line-height: 50px;
      border-right: 1px solid @squareColor;
      border-bottom: 1px solid @squareColor;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      font-size: 30px;
      color: #222;
    }
  }
  .opertaion {
    width: 300px;
    p {
      width: 100%;
      font-size: 18px;
      line-height: 35px;
    }
    ul {
      li {
        width: 100%;
        line-height: 26px;
        cursor: pointer;
        &:hover {
          color: #4790ee;
        }
      }
    }
  }
}
</style>
