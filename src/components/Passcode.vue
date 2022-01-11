<template>
  <div class="container">
    <div class="empty-space"></div>
    <div class="enter">Enter the access code</div>
    <div class="instruction">
      To connect with your device, please enter the access code displayed in the
      mobile app.
    </div>
    <div class="styling"></div>
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
    </div>

    <div class="info">Where can I get the access code?</div>

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
img {
  width: 1.5rem;
  padding-left: 1rem;
  opacity: 0.5;
  padding-bottom: 1rem;
}
.container {
  display: grid;
  grid-template: repeat(8, 1fr) / repeat(12, 1fr);
  grid-gap: 3px;
}

.enter {
  /* Enter the access code */
  grid-column: 3 / 6;
  margin-right: auto;
  white-space: nowrap;
  align-self: end;

  /* Heading/Web */
  font-family: "SF-Pro-Text";
  font-style: normal;
  font-weight: 600;
  font-size: 230%;
  line-height: 3rem;
  text-align: center;
  letter-spacing: -0.019rem;
  color: #0c0c0c;
}

.instruction {
  /* To connect with your device, please enter the access code displayed in the mobile app. */
  grid-column: 3 / 9;
  margin-right: auto;
  /* Body/16/Regular */
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: 0.003rem;
  color: #0c0c0c;
  opacity: 0.8;
}

.passcode-inputs {
  align-self: end;
  grid-column: 3 / 12;

  white-space: nowrap;
  overflow: hidden;
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
  height: 3.25rem;
  width: 2.793378rem;
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

.input {
  margin: 2%;
}
.input-first {
  margin-right: 2%;
  margin-left: 0%;
}
.input-last {
  margin-left: 2%;
  margin-right: 0%;
}
.info {
  /* Where can I get the access code? */
  grid-column: 3 / 7;
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
  grid-column: 3 / 9;
  align-self: start;
}
.button {
  /* button */

  /* Auto Layout */
  width: 400px;
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
  width: 400px;
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

.stores {
  grid-column: 3/12;
  align-self: end;
}
.appstore-button {
  grid-column: 10/10;
  align-self: end;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 5rem;
  width: 95px;
}
.google-button {
  grid-column: 4/5;
  align-self: end;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 2rem;

  width: 100px;
}
</style>
