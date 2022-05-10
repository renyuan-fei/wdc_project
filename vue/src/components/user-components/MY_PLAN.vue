<template>
  <span>
<!--    <el-button @click="is_add = !is_add">切换(临时)</el-button>-->
    <el-card v-show="!is_add" id="my_plan">

    <template #header>
      <div class="card-header">

        <span style="font-weight: bold;"> MY  PLAN </span>

        <el-button circle class="button" @click="is_add = !is_add">
          <el-icon><plus/></el-icon>
        </el-button>

      </div>
    </template>



    </el-card>
    <ADD_EVENT v-show="is_add" :data="is_add" @changedata="change_data"></ADD_EVENT>
  </span>

</template>

<script>
import ADD_EVENT from './ADD_EVENT'

export default {
  name: "MY_PLAN",
  data()
  {
    return {
      is_add: false,
      tableData: []

    }
  },
  components:
      {
        ADD_EVENT
      },
  methods:
      {
        change_data(params)
        {
          console.log(params)
          console.log(this.is_add)
          this.is_add = params
        }
      },
}
</script>

<style lang="less" scoped>

#my_plan {
  margin: 0;
  padding: 0;

  width: 800px;
  height: 900px;

  border-radius: 20px;

  text-align: center;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

</style>