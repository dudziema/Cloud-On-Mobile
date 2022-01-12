<template>
  <div class="container">
    <div class="enter">Enter the access code</div>
    <div class="instruction">
      To connect with your device, please enter the access code displayed in the
      mobile app.
    </div>

    <div class="passcode-inputs" id="passcode">
      <input
        class="input-first"
        id="input0"
        v-on:keyup="inputenter(0)"
        type="text"
        maxlength="1"
      />
      <input
        class="input"
        id="input1"
        v-on:keyup="inputenter(1)"
        type="text"
        maxlength="1"
      />
      <input
        class="input"
        id="input2"
        v-on:keyup="inputenter(2)"
        type="text"
        maxlength="1"
      />
      <input
        class="input"
        id="input3"
        v-on:keyup="inputenter(3)"
        type="text"
        maxlength="1"
      />
      <input
        class="input"
        id="input4"
        v-on:keyup="inputenter(4)"
        type="text"
        maxlength="1"
      />
      <input
        class="input-last"
        id="input5"
        v-on:keyup="inputenter(5)"
        type="text"
        maxlength="1"
      />
      <br />
      <div class="info">Where can I get the access code?</div>
    </div>

    <div class="button-position">
      <router-link
        style="text-decoration: none; color: inherit"
        to="/phoneFiles"
        ><button
          :class="{ button: isComplete, disabledButton: !isComplete }"
          v-on:click="send()"
        >
          <span class="connect">Connect</span>
        </button>
      </router-link>
      <router-view />
    </div>

    <div class="stores">
      <br />
      <Playstore class="google-button" /><img :src="image" /><Appstore
        class="appstore-button"
      /><img :src="image" />
    </div>
  </div>
</template>

<script>
import Appstore from "./Appstore.vue";
import Playstore from "./Playstore.vue";
import InProgress from "@/assets/images/inprogress.png";

export default {
  components: {
    Appstore,
    Playstore,
  },
  data() {
    return {
      image: InProgress,
      isComplete: false,
    };
  },
  methods: {
    changeButton() {
      this.isComplete = true;
    },

    inputenter() {
      if (this.isPasscode()) {
        this.isComplete = true;
      } else {
        this.isComplete = false;
      }
    },
    isPasscode() {
      const inputs = document.querySelectorAll("#passcode > *[id]");
      var isAnyEmpty = false;
      if (inputs.length == 0) {
        isAnyEmpty = true;
      }
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
          isAnyEmpty = true;
        }
      }
      return !isAnyEmpty;
    },

    send() {
      let code = "";
      let myNodeList = document.querySelectorAll("#passcode > *[id]");
      for (let i = 0; i < myNodeList.length; i++) {
        code += myNodeList[i].value;
      }
      code = parseInt(code);
      let msg = { type: "web-loging-with-code", code: code };
      this.$webSocketsSend(msg);
    },
    connect() {
      this.$webSocketsConnect();
    },
    // disconnect() {
    //   this.$webSocketsDisconnect();
    // },
  },
  mounted: function () {
    this.connect();
    const inputs = document.querySelectorAll("#passcode > *[id]");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
          inputs[i].value = "";
          if (i !== 0) {
            inputs[i - 1].focus();
            event.preventDefault();
          }
        } else {
          if (i === inputs.length - 1 && inputs[i].value !== "") {
            return;
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            inputs[i].value = event.key;
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          }
        }
      });
    }
  },

  computed: {},
};
</script>
<style scoped>
@media screen and (min-width: 0px) and (max-width: 576px) {
  .enter {
    grid-column: 1 / 12;
    font-size: 24px;
    text-align: center;
    justify-content: center;
    display: flex;
    align-self: end;
    margin-top: 4rem;
  }
  .instruction {
    font-size: 16px;
    grid-column: 2/ 10;
    text-align: center;
  }
  .passcode-inputs {
    align-self: start;
    grid-column: 2/ 12;
  }
  .input,
  .input-first,
  .input-last {
    height: 12vw;
    width: 9vw;
  }
  .input {
    margin: 1vh;
  }
  .input-first {
    margin: 1vh;
  }
  .input-last {
    margin: 1vh;
  }
  .info {
    grid-column: 1 / 12;
    margin-left: 1.5rem;
  }
  .button-position {
    grid-column: 1 / 12;
    margin-top: 5vw;
    justify-content: center;
    display: flex;
  }
  .button {
    width: 0px;
  }
  .disabledButton {
    width: 118px;
  }
  .stores {
    grid-column: 1/10;
    align-self: center;
    align-items: center;
  }
  .appstore-button {
    grid-column: 10/10;
    width: 20vw;
    margin-left: 10vw;
  }
  .google-button {
    grid-column: 4/5;
    margin-left: 3rem;
    width: 20vw;
  }
  img {
    width: 5vw;
    height: 5vw;
    padding-left: 1rem;
    opacity: 0.5;
    padding-bottom: 1rem;
  }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
  .enter {
    grid-column: 3 / 9;
    font-size: 36px;
    align-self: end;

    text-align: center;
  }
  .instruction {
    align-items: center;
    grid-column: 3 /9;
    text-align: center;
    font-size: 16px;
  }
  .passcode-inputs {
    margin-top: 1vw;
    grid-column: 3 /12;
    margin-left: 2vw;
    width: 600px;
    align-items: center;
  }
  .input,
  .input-first,
  .input-last {
    height: 61px;
    width: 64px;
  }
  .input {
    margin: 5px;
  }
  .input-first {
    margin: 10px;
    margin-left: 0vw;
  }
  .input-last {
    margin: 10px;
    margin-right: 0vw;
  }
  .info {
    grid-column: 3/ 10;
  }
  .button-position {
    grid-column: 3 / 9;
    align-self: end;
    margin-top: 3vw;
    margin-left: 2vw;
  }
  .button {
    width: 444px;
  }
  .disabledButton {
    width: 444px;
  }
  .stores {
    grid-column: 3/10;
    align-self: end;

    margin-left: 2vw;
  }
  .appstore-button {
    grid-column: 10/10;
    width: 10vw;
    margin-left: 5vw;
  }
  .google-button {
    grid-column: 4/6;
    margin-left: 0rem;
    width: 10vw;
  }
  img {
    width: 5vw;
    height: 5vw;
    padding-left: 1rem;
    opacity: 0.5;
    padding-bottom: 1rem;
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .enter {
    grid-column: 3 / 9;
    font-size: 36px;
    align-self: end;

    text-align: center;
  }
  .instruction {
    align-items: center;
    grid-column: 3 /9;
    text-align: center;
    font-size: 16px;
  }
  .passcode-inputs {
    margin-top: 1vw;
    grid-column: 3 /12;
    margin-left: 2vw;
    width: 600px;
    align-items: center;
  }
  .input,
  .input-first,
  .input-last {
    height: 61px;
    width: 64px;
  }
  .input {
    margin: 10px;
  }
  .input-first {
    margin: 10px;
    margin-left: 0vw;
  }
  .input-last {
    margin: 10px;
    margin-right: 0vw;
  }
  .info {
    grid-column: 3/ 10;
  }
  .button-position {
    grid-column: 3 / 9;
    align-self: end;
    margin-top: 3vw;
    margin-left: 2vw;
  }
  .button {
    width: 500px;
  }
  .disabledButton {
    width: 500px;
  }
  .stores {
    grid-column: 3/9;
    align-self: end;

    margin-left: 2vw;
  }
  .appstore-button {
    grid-column: 6/10;
    width: 10vw;
    margin-left: 3vw;
  }
  .google-button {
    grid-column: 4/6;
    margin-left: 0rem;
    width: 10vw;
  }
  img {
    width: 5vw;
    height: 5vw;
    padding-left: 1rem;
    opacity: 0.5;
    padding-bottom: 1rem;
  }
}
@media screen and (min-width: 992px) and (max-width: 1200px) {
  .enter {
    grid-column: 4 / 9;
    font-size: 36px;
    align-self: end;

    text-align: center;
  }
  .instruction {
    align-items: center;
    grid-column: 4 /9;
    text-align: center;
    font-size: 16px;
  }
  .passcode-inputs {
    margin-top: 1vw;
    grid-column: 4 /12;
    margin-left: 2vw;
    width: 600px;
    align-items: center;
  }
  .input,
  .input-first,
  .input-last {
    height: 61px;
    width: 64px;
  }
  .input {
    margin: 10px;
  }
  .input-first {
    margin: 10px;
    margin-left: 0vw;
  }
  .input-last {
    margin: 10px;
    margin-right: 0vw;
  }
  .info {
    grid-column: 4 / 10;
  }
  .button-position {
    grid-column: 4 / 9;
    align-self: end;
    margin-top: 3vw;
    margin-left: 2vw;
  }
  .button {
    width: 500px;
  }
  .disabledButton {
    width: 500px;
  }
  .stores {
    grid-column: 4/9;
    align-self: end;

    margin-left: 2vw;
  }
  .appstore-button {
    grid-column: 10/10;
    width: 11vw;
    margin-left: 2vw;
  }
  .google-button {
    grid-column: 4/5;
    margin-left: 3rem;
    width: 11vw;
  }
  img {
    width: 5vw;
    height: 5vw;
    padding-left: 1rem;
    opacity: 0.5;
    padding-bottom: 1rem;
  }
}
@media screen and (min-width: 1200px) {
  .enter {
    grid-column: 3 / 6;
    font-size: 230%;
    align-self: end;
    margin-top: 6vw;
  }
  .instruction {
    font-size: 1rem;
    grid-column: 3 / 9;
    width: 445px;
  }
  .passcode-inputs {
    align-self: start;
    grid-column: 3 / 12;
    width: 445px;
  }
  .input,
  .input-first,
  .input-last {
    height: 61px;
    width: 64px;
  }
  .input {
    margin: 5px;
  }
  .input-first {
    margin-right: 5px;
    margin-left: 0vw;
  }
  .input-last {
    margin-left: 5px;
    margin-right: 0vw;
  }
  .info {
    grid-column: 3 / 7;
  }
  .button-position {
    grid-column: 3 / 12;
    margin-top: 10px;
  }
  .button {
    width: 435px;
  }
  .disabledButton {
    width: 435px;
  }
  .stores {
    grid-column: 3/9;
    align-self: end;

    margin-left: 2vw;
  }
  .appstore-button {
    grid-column: 6/10;
    width: 7vw;
    margin-left: 3vw;
  }
  .google-button {
    grid-column: 4/6;
    margin-left: 0rem;
    width: 7vw;
  }
  img {
    width: 2vw;
    height: 2vw;
    padding-left: 1rem;
    opacity: 0.5;
    padding-bottom: 1rem;
  }
}

.container {
  display: grid;
  grid-template: repeat(5, 1fr) / repeat(10, 1fr);
  grid-gap: 3px;
}

.enter {
  /* Enter the access code */
  white-space: nowrap;

  /* Heading/Web */
  font-family: "SF-Pro-Text";
  font-style: normal;
  font-weight: 600;

  line-height: 3rem;

  letter-spacing: -0.019rem;
  color: #0c0c0c;
}

.instruction {
  /* To connect with your device, please enter the access code displayed in the mobile app. */

  margin-right: auto;
  /* Body/16/Regular */
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;

  line-height: 1.5rem;
  letter-spacing: 0.003rem;
  color: #0c0c0c;
  opacity: 0.8;
}

.passcode-inputs {
  white-space: nowrap;

  text-overflow: ellipsis;
}
input:focus {
  background: white;
  border: 2px solid #0e70f1;
  box-sizing: border-box;
  border-radius: 8px;
}

input:hover {
  /* white */
  background: white;
  border: 2px solid #0e70f1;
  box-sizing: border-box;
  border-radius: 8px;
  transition: 0.25s ease-in-out;
}
.input,
.input-first,
.input-last {
  text-align: center;
  font-family: Poppins;
  font-weight: 900;
  font-size: 2rem;
  /* lightGray */

  background: #f5f6f6;
  border: 2px solid #0e70f1;
  box-sizing: border-box;
  border-radius: 8px;
  border-style: none;
}

.info {
  /* Where can I get the access code? */

  align-self: start right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;

  height: 1rem;

  /* Caption */
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1rem;

  /* identical to box height, or 133% */
  display: inline-block;
  align-items: center;

  /* black */
  color: #0e70f1;
  opacity: 0.6;
}
.empty-space {
  grid-column: 3 / 3;
  white-space: nowrap;
  margin-right: auto;
  white-space: nowrap;
}
.styling {
  grid-column: 4/5;
}
.button-position {
  align-self: start;
}
.button {
  /* button */

  /* Auto Layout */

  height: 56px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding: 1rem 1.5rem;
  border-style: none;

  height: 3.5rem;
  left: 53.5rem;
  top: 36.813rem;
  border-radius: 0.75rem;
  background: #0e70f1;
}
.disabledButton {
  height: 56px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding: 1rem 1.5rem;
  border-style: none;

  height: 3.5rem;
  left: 53.5rem;
  top: 36.813rem;
  border-radius: 0.75rem;
  background: rgba(14, 112, 241, 0.4);
}

.connect {
  /* Button */

  width: 4.313rem;
  height: 1.5rem;
  white-space: nowrap;

  /* Button */

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;

  /* identical to box height, or 150% */

  align-items: center;
  text-align: center;
  letter-spacing: 0.003rem;

  /* white */

  color: #ffffff;

  /* Inside Auto Layout */

  order: 0;
  flex-grow: 0;
}
.download {
  /* Body/16/Regular */

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  letter-spacing: 0.003em;
  width: 199px;
  color: #000000;

  opacity: 0.8;
}

.appstore-button {
  align-self: end;
}
.google-button {
  align-self: end;
}
</style>
