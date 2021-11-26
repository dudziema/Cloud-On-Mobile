<template>
  <div class="message-to-user">
    <h1>Please, enter the passcode from your phone here:</h1>
    <Passcode></Passcode>
  </div>
</template>

<script>
// @ is an alias to /src
import Passcode from "@/components/Passcode.vue";

export default {
  name: "Home",
  components: {
    Passcode,
  },
};
</script>
