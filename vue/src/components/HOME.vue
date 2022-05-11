<template>
  <el-container id="home">
    <el-header style="height:80px;">
      <TOP_BAR></TOP_BAR>
    </el-header>
    <el-main>
      <div class="button_box">
        <el-button class="button" type="primary" round size="large" @click="goto">START</el-button>
      </div>
    </el-main>
    <el-footer>
      <!--        <div class="right"></div>-->
    </el-footer>
  </el-container>
</template>

<script>

import {useRouter} from 'vue-router';
import TOP_BAR from './TOP_BAR'

export default {
  name: "INDEX",
  data()
  {
    return {}
  },
  components:
      {
        TOP_BAR
      },
  setup()
  {
    const router = useRouter();

    function goto()
    {
      router.push("/user");
    }

    return {
      goto  //一定要要放在return里才能在模板上面使用
    }
  }
}
</script>

<style lang="less" scoped>

#home {
  * {
    margin: 0;
    padding: 0;
  }

  //background-color: #B4E197;
  background-image: linear-gradient(#E9EFC0, #4E944F);

  height: 1287px;
  min-height: 100%;

  //background-image: url('../assets/cross.png');
}

.button_box {
  width: 200px;
  height: 100px;
  //background-color:antiquewhite;
  border-radius: 5px;

  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
}

.bottom_bar {
  position: absolute;

  //background-color: #E4E9BE;

  //background-image: linear-gradient(#83BD75,#4E944F);

  width: 100%;
  height: 200px;

  bottom: 0;
}

.button {
  //background-image: linear-gradient(#83BD75,#B4E197);

  background-color: #E6BA95;

  color: #FAFDD6;

  border: 0;

  text-align: center;


  font-size: 40px;

  height: 100px;
  width: 200px
}

.button:hover {
  background-color: #FAFDD6;

  color: #E6BA95;
}

</style>