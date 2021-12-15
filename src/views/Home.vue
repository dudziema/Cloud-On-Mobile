<template>
  <div class="column" id="rectangle"><Rectangle></Rectangle></div>
  <!-- <div class="column" id="rectangle"><Rectangle></Rectangle></div> -->
  <div class="column" id="passcode"><Passcode></Passcode></div>
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
}
/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 40%;
  min-height: 100%;
}

* {
  box-sizing: border-box;
}
</style>
