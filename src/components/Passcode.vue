<template>
  <div class="list files">
    <div class="log-in">
      <h3>
        Connect to production server
        <input type="checkbox" v-on:click="productionServer" /><br />
      </h3>
      <div
        id="passcode"
        class="inputs d-flex flex-row justify-content-center mt-2"
      >
        <input
          v-on:keyup="inputenter(0)"
          type="text"
          id="input0"
          maxlength="1"
        />
        <input
          v-on:keyup="inputenter(1)"
          type="text"
          id="input1"
          maxlength="1"
        />
        <input
          v-on:keyup="inputenter(2)"
          type="text"
          id="input2"
          maxlength="1"
        />
        <input
          v-on:keyup="inputenter(3)"
          type="text"
          id="input3"
          maxlength="1"
        />
      </div>
      <br />
      <router-link to="/phoneFiles"
        ><button class="validate" v-on:click="send()">
          Validate
        </button></router-link
      >
      <router-view />
    </div>
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
<style>
.inputs input {
  width: 80px;
  height: 90px;
  border-style: inset;
  margin: 3px;
  font-size: 60px;
  text-align: center;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

.form-control:focus {
  box-shadow: none;
  border: 2px solid #6f1667;
}

.d-flex {
  display: block;
}
.content a {
  color: #d64f4f;
  transition: all 0.5s;
}

.content a:hover {
  color: #6f1667;
}

.validate {
  align-items: center;
  background-color: #0771fc;
  border: 2px solid #111;
  border-radius: 8px;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: center;
  font-family: Inter, sans-serif;
  font-size: 16px;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.validate:after {
  background-color: #111;
  border-radius: 8px;
  content: "";
  display: block;
  height: 48px;
  left: 0;
  width: 100%;
  position: absolute;
  top: -2px;
  transform: translate(8px, 8px);
  transition: transform 0.2s ease-out;
  z-index: -1;
}

.validate:hover:after {
  transform: translate(0, 0);
}

.validate:active {
  background-color: #034ef0;
  outline: 0;
}

.validate:hover {
  outline: 0;
}

@media (min-width: 768px) {
  .validate {
    padding: 0 40px;
  }
}
</style>
