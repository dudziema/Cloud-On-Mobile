<template>
  <div class="image">
    <SadPig class="pig" />
    <div class="title">Something went wrong :(</div>
    <div class="explanation">
      There was a problem with connection with the mobile app.
    </div>
    <div class="instruction">Please, try again.</div>
    <button @click="goBack()"><div class="go-back">Go Back</div></button>
  </div>
</template>
<script>
import SadPig from "../components/SadPig.vue";

export default {
  name: "ErrorScreen",
  components: {
    SadPig,
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "Home",
      });
    },
  },
};
</script>
<style scoped>
.image {
  position: absolute;
}
.title {
  font-family: PoppinsBold;
  font-style: normal;
  font-weight: 600;
  align-content: center;
  display: flex;
  align-items: center;
  text-align: center;

  letter-spacing: 1px;
}
.instruction,
.explanation {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;

  color: #0c0c0c;
  opacity: 0.8;
}

/* Responsive design */

@media screen and (min-width: 0px) and (max-width: 576px) {
  .image {
    left: calc(50% - 250px / 2);
    top: 15vh;
    width: 250px;
  }
  .pig {
    width: 250px;
  }
  .title {
    font-size: 1rem;
    width: 70vw;
    height: 40px;
    left: calc(50% - 30rem / 2);
    margin-top: 1rem;
  }
    .instruction,
  .explanation {
    width: 80vw;
    height: 3vh;
    font-size: 0.6rem;
  }
    .explanation {
    margin-left: -2rem;
  }
  .instruction {
    margin-left:5rem;
    width:7rem;
  }
    button {
    border: 2px solid #0e70f1;
    box-sizing: border-box;
    border-radius: 12px;
    width: 80px;
    height: 56px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    background-color: transparent;
    margin-left: 5rem;
    margin-top: 2rem;
  }
}
@media screen and (min-width: 577px) {
  .image {
    left: calc(50% - 350px / 2);
    top: 15vh;
    width: 350px;
  }
  .title {
    font-size: 25px;
    width: 540px;
    height: 40px;
    left: calc(50% - 540px / 2);
    margin-top: 3rem;
  }
  .instruction,
  .explanation {
    width: 540px;
    height: 30px;
    font-size: 16px;
  }
  .explanation {
    margin-top: 1rem;
    margin-left: -4rem;
  }
  .instruction {
    margin-left: 6rem;
  }
  button {
    border: 2px solid #0e70f1;
    box-sizing: border-box;
    border-radius: 12px;
    width: 116px;
    height: 56px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    background-color: transparent;
    margin-left: 6rem;
    margin-top: 2rem;
  }
  .go-back {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px 10px;
    color: #0e70f1;
  }
}
</style>
