<template>
  <div class="container">
    <div class="logo">logo</div>
    <div class="button-select"><SelectFile @change="selectedFile" /></div>
    <div class="all-files">All files</div>
    <div class="recent-files">Recent files</div>
    <div class="connected-with">Connected with</div>
    <div class="settings">Settings</div>
    <div class="disconnect">Disconnect</div>
    <div class="filelist"><FilesList @drop.prevent="dropHandler2" /></div>
  </div>
</template>

<script>
// @ is an alias to /src
import FilesList from "@/components/FilesList.vue";
import SelectFile from "@/components/SelectFile.vue";
import { ref } from "vue";

export default {
  name: "PhoneFiles",
  components: {
    FilesList,
    SelectFile,
  },

  methods: {
    dropHandler2(ev) {
      this.$dropHandler(ev);
    },
  },
  setup() {
    let dropZoneFile = ref("");

    const drop = (ev) => {
      dropZoneFile.value = ev.dataTransfer.files[0];
    };

    const dropHandler = (ev) => {
      this.$dropHandler2(ev);
    };

    const selectedFile = () => {
      dropZoneFile.value = document.querySelector(".dropzoneFile").files[0];
    };
    return { dropZoneFile, drop, selectedFile, dropHandler };
  },
};
</script>
<style scoped>
.container {
  display: grid;
  grid-template: repeat(12, 1fr) / repeat(12, 1fr);
  grid-gap: 3px;
}
.logo {
  grid-row: 1/1;
  grid-column: 3/5;
  /* logo */

  position: absolute;
  width: 53px;
  height: 40px;
  left: 25px;
  top: 24px;

  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 40px;
  /* identical to box height, or 167% */

  display: flex;
  align-items: center;
  letter-spacing: -0.3px;

  /* black */

  color: #0c0c0c;
}

.button-select {
  grid-row: 2/2;
  grid-column: 1 / span 2;
}

.all-files {
  grid-row: 3/3;
  grid-column: 1/2;
}

.recent-files {
  grid-row: 4/4;
  grid-column: 1/2;
}

.connected-with {
  grid-row: 10/10;
  grid-column: 1/2;
}
.settings {
  grid-row: 11/11;
  grid-column: 1/2;
}
.disconnect {
  grid-row: 12/12;
  grid-column: 1/2;
}
.filelist {
  grid-column: 3/12;
  grid-row: 3/12;
}
</style>
