<template>
  <div class="container">
    <table class="table">
      <div
        @dragenter="toggleActive"
        @dragleave="toggleActive"
        @dragover.prevent
        @drop="toggleActive"
        :class="{ 'active-dropzone': active }"
      >
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">
              <span class="header">{{ column.field }} </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <File
            v-for="(entry, index) in entries"
            :key="index"
            :entry="entry"
            @mouseover="showButton(entry)"
            @mouseleave="hideButton(entry)"
          />
        </tbody>
      </div>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import File from "@/components/File.vue";

export default {
  name: "FilesList",
  components: {
    File,
  },
  setup() {
    // Active area for drop and upload file
    const active = ref(false);

    const toggleActive = (event) => {
      event.preventDefault();
      active.value = !active.value;
    };
    return { active, toggleActive };
  },
  data() {
    return {
      columns: [
        {
          label: "name",
          field: "NAME",
        },
        {
          label: "empty-temporary",
          field: "",
        },
        {
          label: "size",
          field: "FILE SIZE",
        },
        {
          label: "upload_date",
          field: "UPLOAD DATE",
        },
        {
          label: "download",
          field: "",
        },
        {
          label: "trash",
          field: "",
        },
      ],
      entries: [],
    };
  },
  methods: {
    showButton(entry) {
      entry.onHover = true;
    },
    hideButton(entry) {
      entry.onHover = false;
    },
  },
  created() {
    this.entries.forEach((element) => {
      element.onHover = false;
    });

    var my_this = this;
    this.$addWsOnMessageListener(loadEntries);
    this.$wsListFiles();
    function loadEntries(msg) {
      console.log(msg);
      my_this.entries = msg.payload;
    }
  },
};
</script>
<style scoped>
.container {
  display: grid;
  grid-template: repeat(12, 1fr) / repeat(6, 1fr);
  grid-gap: 3px;
}
.table {
  grid-column: 1/6;
  grid-row: 1/12;
  width: 100%;
  height: 100vh;
  margin: 1%;
  text-align: center;
  display: flex;
  align-self: end;
}
@media screen and (min-width: 0px) and (max-width: 576px) {
  .active-dropzone {
    opacity: 0.25;
    background-color: #fff;
    border: 2px;
    height: 20%;
  }
  .header {
    font-size: 0.45rem;
    font-weight: 900;
    letter-spacing: 0.0025em;
    line-height: 24px;
  }
  th {
    align-self: center;
    grid-column: 1/10;
  }
  tr :nth-child(1) {
    grid-column: 1/2;
    min-width: 1vw;
  }
  tr :nth-child(2) {
    grid-column: 1/2;
    text-align: left;
    min-width: 10vw;
  }
  tr :nth-child(3) {
    grid-column: 2/3;
    justify-content: center;
    min-width: 3vw;
  }
  tr :nth-child(4) {
    grid-column: 3/4;
    justify-content: center;
  }
  tr :nth-child(5) {
    grid-column: 4/5;

    align-content: left;
    position: flex;
  }
  tr :nth-child(6) {
    grid-column: 4/5;

    align-content: left;
    position: flex;
  }
  button {
    width: 1px;
    height: 2px;
    height: 100%;
  }
  td.trash {
    height: 100%;
  }
}
@media screen and (min-width: 576px) and (max-width: 768px) {
    .active-dropzone {
    opacity: 0.25;
    background-color: #fff;
    border: 2px;
    height: 20%;
  }
  .header {
    font-size: 0.45rem;
    font-weight: 900;
    letter-spacing: 0.0025em;
    line-height: 24px;
  }
  th {
    align-self: center;
    grid-column: 1/10;
  }
  tr :nth-child(1) {
    grid-column: 1/2;
    min-width: 1vw;
  }
  tr :nth-child(2) {
    grid-column: 1/2;
    text-align: left;
    min-width: 10vw;
  }
  tr :nth-child(3) {
    grid-column: 2/3;
    justify-content: center;
    min-width: 3vw;
  }
  tr :nth-child(4) {
    grid-column: 3/4;
    justify-content: center;
  }
  tr :nth-child(5) {
    grid-column: 4/5;

    align-content: left;
    position: flex;
  }
  tr :nth-child(6) {
    grid-column: 4/5;

    align-content: left;
    position: flex;
  }
  button {
    width: 1px;
    height: 2px;
    height: 100%;
  }
  td.trash {
    height: 100%;
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
}
@media screen and (min-width: 992px) and (max-width: 1200px) {
}
@media screen and (min-width: 1201px) {
  .active-dropzone {
    opacity: 0.25;
    background-color: #fff;
  }
  .header {
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 0.005em;
    line-height: 24px;
  }
  th {
    align-self: center;
  }
  tr {
    width: 100%;
  }
  tr :nth-child(2) {
    width: 70vw;
  }
  tr :nth-child(3) {
    width: 5vw;
  }
  tr :nth-child(4) {
    width: 5vw;
    align-content: left;
    position: flex;
  }
}

.table {
  border-spacing: 0px;
}

.active-dropzone {
  opacity: 0.25;
  background-color: #fff;
}

.header {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  font-family: Poppins;
  font-style: normal;

  display: flex;
  align-items: center;

  text-transform: uppercase;
  color: #0c0c0c;
  opacity: 0.6;
}
</style>
