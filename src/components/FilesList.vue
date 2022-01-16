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
          label: "trash_download",
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
  font-weight: 900;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;
  letter-spacing: 0.005em;
  text-transform: uppercase;

  /* black */

  color: #0c0c0c;

  opacity: 0.6;
}
th {
  align-self: center;
}
tr :nth-child(2) {
  padding-right: 1rem;
  width: 30rem;
}
tr :nth-child(3) {
  padding-right: 6rem;
}
tr :nth-child(4) {
  padding-right: 3rem;
}
</style>
