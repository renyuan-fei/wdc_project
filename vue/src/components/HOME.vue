<template>
  <div id="home">
    <el-container>
      <el-header>
        <div></div>
      </el-header>
      <el-main>
        <div class="button_box">
          <el-button class="button" type="primary" round size="large" @click="goto">START</el-button>
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';

export default {
  name: "INDEX",
  data()
  {
    return {
      data: 'INDEX',
    }
  },
  setup()
  {
    const router = useRouter();

    function goto()
    {
      router.push("/login");
    }

    return {
      goto  //一定要要放在return里才能在模板上面使用
    }
  }
}
</script>

<style lang="less" scoped>

#home {
  background-color: darkseagreen;

  height: 1287px;

  background-image: url('../assets/cross.png');

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

  .button {
    text-align: center;


    font-size: 40px;

    height: 100px;
    width: 200px
  }
}

</style>