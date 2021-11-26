<template>
  <div class="inputs">
    <div id="passcode" class="inputs d-flex flex-row justify-content-center mt-2">
      <input
        type="text"
        id="input1"
        v-on:keyup="inputenter(1)"
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
      <input
        v-on:keyup="inputenter(4)"
        type="text"
        id="input4"
        maxlength="1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Passcode",
  methods: {
    inputenter(id) {
      const inputs = document.querySelectorAll("#passcode > *[id]");
      console.log(id);
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("keydown", function (event) {
          if (event.key === "Backspace") {
            inputs[i].value = "";
            if (i !== 0) inputs[i - 1].focus();
          } else {
            if (i === inputs.length - 1 && inputs[i].value !== "") {
              return true;
            } else if (event.keyCode > 47 && event.keyCode < 58) {
              inputs[i].value = event.key;
              if (i !== inputs.length - 1) inputs[i + 1].focus();
              event.preventDefault();
            }
          }
        });
      }
    },
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
