<template>
  <div id="container">

    <div class="top">
      <TOP_BAR></TOP_BAR>
    </div>

    <div class="center-div part2">

      <img src="../assets/像素_钻石.png" alt="img" class="image">

      <div id="home">

        <div class="title_box1">

          WELCOME


        </div>

        <div class="title_box2">

          START&nbsp;&nbsp;PLANNING&nbsp;&nbsp;YOUR&nbsp;&nbsp;LIFE

        </div>

        <div class="button_box">

          <el-button class="button" round text @click="this.$router.push('/calendar')">
            GET START &nbsp;
            <el-icon>
              <arrow-right-bold/>
            </el-icon>
          </el-button>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import TOP_BAR from '../components/TOP_BAR'
import {ArrowRightBold} from "@element-plus/icons-vue";

export default {
  name: "INDEX",
  data()
  {
    return {}
  },
  components:
      {
        TOP_BAR,
        ArrowRightBold,
      }
}
</script>

<style lang="less" scoped>

#home {
  position: absolute;
  display: inline-block;
  //background: red;

  height: 600px;
  width: 1000px;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
}

.title_box1 {
  font-size: 70px;
  font-weight: bold;
  color: #DEA057;

  position: absolute;
  display: inline-block;
  //background: blue;

  height: 200px;
  width: 1000px;

  text-align: center;
  line-height: 370px;
}

.title_box2 {
  font-size: 60px;
  font-weight: bold;
  color: #CE9461;

  position: absolute;
  display: inline-block;
  //background: green;

  height: 200px;
  width: 1000px;

  top: 200px;

  text-align: center;
  line-height: 200px;
}

.button_box {
  position: absolute;
  display: inline-block;
  //background: yellow;

  top: 400px;

  height: 200px;
  width: 1000px;

  text-align: center;
  line-height: 100px;
}

.button {
  width: 200px;
  height: 80px;

  background-color: #E0D8B0;

  border: none;

  font-weight: bold;
  font-size:15px;
}

.button:hover {
  background-color: #FCFFE7;
}


#container {
  position: fixed;

  background-color: #B4E197;
  background-image: url('../assets/cross.png');

  height: 100%;
  min-height: 1287px;

  width: 100%;
  min-width: 1400px;
}

.center-div {
  margin: 0 auto;
}

.image {
  position: absolute;

  transform: translate(-50%, -50%);

  left: 50%;
  top: 30%;
}

</style>