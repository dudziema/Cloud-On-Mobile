<template>
  <div class="file-list">
    <SelectFile @change="selectedFile" />
    <span class="file-info">File:{{ dropZoneFile.name }}</span>
    <FilesList @drop.prevent="dropHandler2" />
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
