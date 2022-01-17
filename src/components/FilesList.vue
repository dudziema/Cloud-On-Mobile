<template>
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
      passcode: null,
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
    this.passcode = parseInt(this.$route.params.passcode)
    var my_this = this;
    this.$addWsOnMessageListenerAuth(function onAuthMsg(obj) {
      if (obj.result == -1) {
        my_this.$router.push({
          name: "Home",
        });
      } else if (obj.result == 0) {
        my_this.$wsListFiles();
      }
    });

    this.$addWsOnMessageListener(function loadEntries(msg) {
      my_this.entries = msg.payload;
    });

    let this_fileslist = this;
    this.$webSocketsConnect(
      function () {
        this_fileslist.$webSocketsSendAuth(this_fileslist.passcode);
      },
      function () {
        // Failure
        // Alert cant connect to the server
      }
    );
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.table {
  width: 100%;
  height: 100vh;
  margin: 1%;
}
@media screen and (min-width: 0px) and (max-width: 576px) {
  .active-dropzone {
    opacity: 0.25;
    background-color: #fff;
  }
  .header {
    font-size: 0.4em;
    font-weight: 900;
    letter-spacing: 0.005em;
    line-height: 1.2rem;
  }
  th {
    align-self: center;
  }
  tr {
    width: 100%;
  }
  tr :nth-child(2) {
    width: 20vw;
  }
  tr :nth-child(3) {
    width: 10vw;
  }
  tr :nth-child(4) {
    width: 8vw;
    align-content: left;
    position: flex;
    white-space: nowrap;
  }
  tr :nth-child(5) {
    width: 3vw;
  }
  tr :nth-child(6) {
    width: 3vw;
  }
}
@media screen and (min-width: 577px) and (max-width: 768px) {
  .active-dropzone {
    opacity: 0.25;
    background-color: #fff;
  }
  .header {
    font-size: 0.6rem;
    font-weight: 900;
    letter-spacing: 0.005em;
    line-height: 1.2rem;
  }
  th {
    align-self: center;
  }
  tr {
    width: 100%;
  }
  tr :nth-child(2) {
    width: 33vw;
  }
  tr :nth-child(3) {
    width: 8vw;
  }
  tr :nth-child(4) {
    width: 8vw;
    align-content: left;
    position: flex;
    white-space: nowrap;
  }
  tr :nth-child(5) {
    width: 3vw;
  }
  tr :nth-child(6) {
    width: 3vw;
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .active-dropzone {
    opacity: 0.25;
    background-color: #fff;
  }
  .header {
    font-size: 0.9rem;
    font-weight: 900;
    letter-spacing: 0.005em;
    line-height: 1.2rem;
  }
  th {
    align-self: center;
  }
  tr {
    width: 100%;
  }
  tr :nth-child(2) {
    width: 30vw;
  }
  tr :nth-child(3) {
    width: 8vw;
  }
  tr :nth-child(4) {
    width: 10vw;
    align-content: left;
    position: flex;
    white-space: nowrap;
  }
  tr :nth-child(5) {
    width: 3vw;
  }
  tr :nth-child(6) {
    width: 3vw;
  }
}
@media screen and (min-width: 993px) and (max-width: 1200px) {
  .active-dropzone {
    opacity: 0.25;
    background-color: #fff;
  }
  .header {
    font-size: 1em;
    font-weight: 900;
    letter-spacing: 0.005em;
    line-height: 1.2rem;
  }
  th {
    align-self: center;
  }
  tr {
    width: 100%;
  }
  tr :nth-child(2) {
    width: 40vw;
  }
  tr :nth-child(3) {
    width: 10vw;
  }
  tr :nth-child(4) {
    width: 10vw;
    align-content: left;
    position: flex;
  }
  tr :nth-child(5) {
    width: 3vw;
  }
  tr :nth-child(6) {
    width: 3vw;
  }
}
@media screen and (min-width: 1201px) {
  .active-dropzone {
    opacity: 0.25;
    background-color: #fff;
  }
  .header {
    font-size: 1.1rem;
    font-weight: 900;
    letter-spacing: 0.005em;
    line-height: 1.2rem;
  }
  th {
    align-self: center;
  }
  tr {
    width: 100%;
  }
  tr :nth-child(2) {
    width: 45vw;
  }
  tr :nth-child(3) {
    width: 10vw;
  }
  tr :nth-child(4) {
    width: 10vw;
    align-content: left;
    position: flex;
  }
  tr :nth-child(5) {
    width: 3vw;
    align-content: left;
    position: flex;
  }
  tr :nth-child(6) {
    width: 3vw;
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
  font-family: PoppinsBold;
  font-style: normal;
  display: flex;
  align-items: center;

  text-transform: uppercase;
  color: #0c0c0c;
  opacity: 0.6;
}
</style>
