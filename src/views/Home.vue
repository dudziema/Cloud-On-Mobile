<template>
  <div class="column1" id="rectangle"><Rectangle></Rectangle></div>
  <!-- <div class="column" id="rectangle"><Rectangle></Rectangle></div> -->
  <div class="column2" id="passcode"><Passcode></Passcode></div>
  <!-- <img src="../assets/buttons/Apple button.png" /> -->
</template>

<script>
// @ is an alias to /src
import Passcode from "@/components/Passcode.vue";
import Rectangle from "../components/Rectangle.vue";

export default {
  name: "Home",
  components: {
    Passcode,
    Rectangle,
  },
};
</script>
<style scoped>
#rectangle {
  background-color: #f5faff;
}

#passcode {
  background-color: white;
  margin:0rem;

}
/* Create two equal columns that floats next to each other */
.column1 {
  float:left;
  width: 40%;
  min-height: 100%;
  margin:0;
}

.column2 {
  float: right;
  width:60%;
  min-height: 100%;
}

* {
  /* box-sizing: border-box; */
}
</style>
