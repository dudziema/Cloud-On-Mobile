<template>
  <div class="dropzone">
    <label class="drop" for="dopZoneFile">Select File</label>
    <input type="file" id="dopZoneFile" />
  </div>
</template>

<script>
export default {
  name: "DropZone",
};
</script>
<style >
.drop {
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
input {
  display: none;
}
</style>
