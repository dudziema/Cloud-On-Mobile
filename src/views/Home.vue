<template>
  <div class="container">
    <div class="column1" id="rectangle"><Rectangle></Rectangle></div>
    <div class="column2" id="passcode"><Passcode></Passcode></div>
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
@media screen and (min-width: 0px) and (max-width: 576px) {
  #rectangle {
    width: 0px;
  }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
  #rectangle {
    width: 0px;
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  #rectangle {
    width: 0px;
  }
}
@media screen and (min-width: 992px) and (max-width: 1200px) {
  #rectangle {
    width: 0px;
  }
  #passcode {
    background-color: white;
    margin: 0rem;
  }
}
@media screen and (min-width: 1200px) {
  #rectangle {
    background-color: #f5faff;
  }
  #passcode {
    background-color: white;
    margin: 0rem;
  }
  .column1 {
    float: left;
    width: 40%;
    min-height: 100%;
    margin: 0;
  }

  .column2 {
    float: right;
    width: 60%;
    min-height: 100%;
  }
}

/* Create two equal columns that floats next to each other */
</style>
