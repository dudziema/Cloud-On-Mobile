<template>
  <div class="enter">Enter the access code</div>
  <div class="instruction">
    To connect with your device, please enter the access code displayed in the
    mobile app.
  </div>
  <div>
    <input
      class="code"
      v-on:keyup="inputenter(0)"
      type="text"
      id="input0"
      maxlength="1"
    />
    <input
      class="code"
      v-on:keyup="inputenter(1)"
      type="text"
      id="input1"
      maxlength="1"
    />
    <input
      class="code"
      v-on:keyup="inputenter(2)"
      type="text"
      id="input2"
      maxlength="1"
    />
    <input
      class="code"
      v-on:keyup="inputenter(3)"
      type="text"
      id="input3"
      maxlength="1"
    />
  </div>
  <div class="info">Where can I get the access code?</div>
  <br />

  <router-link to="/phoneFiles"
    ><button class="button" v-on:click="send()">
      <span class="connect">Connect</span>
    </button></router-link
  >
  <router-view />
  <div>
    <img src="src/assets/buttons/Apple button.png" />
  </div>
</template>

<script>
export default {
  name: "Passcode",
  methods: {
    inputenter(id) {
      const inputs = document.querySelectorAll("#passcode > *[id]");
      let value = inputs[id].value;
      // Focus on previous box when value is deleted
      if (value === "") {
        if (id !== 0) inputs[id - 1].focus();
      } else {
        if ("0123456789".indexOf(value) >= 0) {
          // When last box is filled return true
          if (id === inputs.length - 1) {
            return true;
          } else {
            inputs[id + 1].focus();
          }
        }
      }
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
  },
};
</script>
<style scoped>
/* OLi css  */
* {
  display: flex;
}
/* Enter the access code */
.enter {
  position: absolute;
  width: 24.063rem;
  height: 3rem;
  left: 53.5rem;
  top: 13.313rem;

  /* Heading/Web */

  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 3rem;
  /* identical to box height, or 133% */

  display: flex;
  align-items: center;
  letter-spacing: -0.019rem;

  /* black */

  color: #0c0c0c;
}

.instruction {
  /* To connect with your device, please enter the access code displayed in the mobile app. */

  position: absolute;
  width: 24.063rem;
  height: 3rem;
  left: 53.5rem;
  top: 17.438rem;

  /* Body/16/Regular */

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.5rem;
  /* or 150% */

  display: flex;
  align-items: center;
  letter-spacing: 0.003rem;

  /* black */

  color: #0c0c0c;

  opacity: 0.8;
}

#input0 {
  left: 53.5rem;
  top: 26.313rem;
}

#input1 {
  left: 58.408rem;
  top: 26.313rem;
}
#input2 {
  left: 63.316rem;
  top: 26.313rem;
}
#input3 {
  left: 68.224rem;
  top: 26.313rem;
}

.code {
  height: 4rem;
  width: 3.438rem;
  left: 0rem;
  top: 0rem;
  border-radius: 0.5rem;
  left: 53.5rem;
  top: 26.313rem;

  /* codeInput/empty/default */

  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  /* lightGray */

  background: #f5f6f6;
  border-radius: 0.5rem;
}

.info {
  /* Where can I get the access code? */

  position: absolute;
  width: 12.688rem;
  height: 1rem;
  left: 68.813rem;
  top: 31.313rem;

  /* Caption */

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1rem;
  /* identical to box height, or 133% */

  display: flex;
  align-items: center;

  /* black */

  color: #0c0c0c;

  opacity: 0.6;
}

.button {
  /* button */

  /* Auto Layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;

  position: absolute;
  width: 43rem;
  height: 3.5rem;
  left: 53.5rem;
  top: 36.813rem;

  background: rgba(14, 112, 241, 0.4);
  border-radius: 0.75rem;
}

.connect {
  /* Button */

  position: static;
  width: 4.313rem;
  height: 1.5rem;
  left: 11.844rem;
  top: 1rem;

  /* Button */

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.5rem;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.003rem;

  /* white */

  color: #ffffff;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0rem 0.625rem;
}
</style>
