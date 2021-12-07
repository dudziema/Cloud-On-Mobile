<template>
  <div class="file-list">
    <FilesList :columns="columns" :entries="entries"></FilesList>
  </div>
</template>

<script>
// @ is an alias to /src
import FilesList from "@/components/FilesList.vue";

export default {
  name: "PhoneFiles",
  data() {
    return {
      columns: [
        {
          name: "name",
          text: "Name",
        },
        {
          name: "action",
          text: "Action",
        },
      ],
      entries: [],
    };
  },
  components: {
    FilesList,
  },
  created() {
    this.$GetFiles().then((res) => {
      this.entries = res;
    });
  },
  methods: {
    async $GetFiles() {
      return this.fileList;
    },
  },
};
</script>
