<template>
  <el-container id="calendar-container">
    <el-header style="height:80px">
      <TOP_BAR></TOP_BAR>
    </el-header>
    <el-main>

      <el-card class="calendar">

        <template #header>
          Calendar
        </template>


      </el-card>

    </el-main>
  </el-container>
</template>

<script>
import TOP_BAR from './TOP_BAR'

export default {
  name: "CALENDAR",
  components:
      {
        TOP_BAR
      }
}
</script>

<style lang="less" scoped>

* {
  margin: 0;
  padding: 0;
}

#calendar-container {
  background-color: #B4E197;
  background-image: url('../assets/cross.png');
  height: 1297px;
}

.calendar {
  width: 1000px;
  height: 900px;

  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  border-radius: 20px;

  text-align: center;

  .card-header {
    justify-content: space-between;
    align-items: center;

    color: #E6BA95;
    font-weight: bold;
    font-size: 40px;
  }
}

</style>