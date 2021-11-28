<template>
  <div class="inputs">
    <div
      id="passcode"
      class="inputs d-flex flex-row justify-content-center mt-2"
    >
      <input v-on:keyup="inputenter(0)" type="text" id="input0" maxlength="1" />
      <input v-on:keyup="inputenter(1)" type="text" id="input1" maxlength="1" />
      <input v-on:keyup="inputenter(2)" type="text" id="input2" maxlength="1" />
      <input v-on:keyup="inputenter(3)" type="text" id="input3" maxlength="1" />
    </div>

    <button v-on:click="sendMessage()">Validate</button>
  </div>
</template>

<script>
export default {
  name: "Passcode",
  data: function () {
    return {
      connection: null,
    };
  },
  methods: {
    inputenter(id) {
      const inputs = document.querySelectorAll("#passcode > *[id]");
      console.log(inputs);
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
    sendMessage: function () {
      let code = parseInt(document.querySelectorAll("#passcode > *[id]"));
      let msg = { type: "web-loging-with-code", code: code };
      this.ws.send(JSON.stringify(msg));
      alert("Message is sent.");
    },
  },
  created: function () {
    console.log("Starting Connection to WebSocket Server");
    this.ws = new WebSocket("ws://seredynski.com:9292/");
    this.ws.onopen = () => console.log("Now is connected!");

    this.ws.onmessage = function (event) {
      let received_message = event.data;
      alert("Message is received" + received_message);
    };

    this.ws.onclose = function () {
      alert("Connection is closed.");
    };
  },
};
</script>
<style>
.inputs input {
  width: 80px;
  height: 90px;
  border-style: inset;
  margin: 3px;
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

.validate {
  border-radius: 20px;
  height: 40px;
  background-color: #6f1667;
  border: 1px solid #6f1667;
  width: 10%;
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
</style>
