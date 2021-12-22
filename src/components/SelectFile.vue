<template>
  <div class="selectfile">
    <label class="select" for="selectFile">+ Add new file</label>
    <input type="file" id="selectFile" class="selectFiles" />
  </div>
</template>

<script>
export default {
  name: "SelectFile",
};
</script>
<style scoped>
.select {
  /* primary/100 */

  background: #0e70f1;
  border-radius: 12px;

  /* Button/Large */

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  padding: 5%;

  letter-spacing: 0.01em;

  /* white */

  color: #ffffff;
}
input {
  display: none;
}
</style>
