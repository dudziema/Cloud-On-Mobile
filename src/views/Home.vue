<template>
  <div class="message-to-user">
    <Rectangle></Rectangle>>
    <Passcode></Passcode>
  </div>
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
* {
  width: 90rem;
  height: 64rem;
  background: #ffffff;
  position: relative;
}
</style>
