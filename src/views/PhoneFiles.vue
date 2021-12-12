<template>
  <div class="file-list">
    <DropZone></DropZone>
    <span class="file-info">File:{{ dropZoneFile.name }}</span>
    <FilesList></FilesList>
  </div>
</template>

<script>
// @ is an alias to /src
import FilesList from "@/components/FilesList.vue";
import DropZone from "@/components/DropZone.vue";
import { ref } from "vue";

export default {
  name: "PhoneFiles",
  components: {
    FilesList,
    DropZone,
  },
  setup() {
    let dropZoneFile = ref("");

    return { dropZoneFile };
  },
};
</script>
