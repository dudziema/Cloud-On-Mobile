<template>
  <div class="container">
    <div class="logo">logo</div>
    <div class="button-select"><SelectFile @change="selectedFile" /></div>

    <div class="all-files"><Grid class="grid" />All files</div>
    <div class="recent-files"><Clock class="clock" /> Recent files</div>
    <div class="connected-with">
      <div class="connected-text">Connected with</div>
      <div class="phoneName">
        <PhoneIcon class="phoneicon" />{{ phoneName }}
      </div>
    </div>
    <div class="settings"><SettingsIcon class="settingsicon" />Settings</div>
    <div class="disconnect"><LogOut class="logout" />Disconnect</div>
    <div class="filelist"><FilesList @drop.prevent="dropHandler2" /></div>
  </div>
</template>

<script>
// @ is an alias to /src
import FilesList from "@/components/FilesList.vue";
import SelectFile from "@/components/SelectFile.vue";
import { ref } from "vue";
import Grid from "@/components/Grid.vue";
import Clock from "@/components/Clock.vue";
import SettingsIcon from "@/components/SettingsIcon.vue";
import LogOut from "@/components/LogOut.vue";
import PhoneIcon from "@/components/PhoneIcon.vue";

export default {
  name: "PhoneFiles",
  components: {
    FilesList,
    SelectFile,
    Grid,
    Clock,
    SettingsIcon,
    LogOut,
    PhoneIcon,
  },
  data() {
    return {
      phoneName: "iPhone(TEST)",
    };
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
  grid-column: 2/3;

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
  grid-row: 3/3;
  grid-column: 1 / span 2;
  margin-left: 0.5rem;
}
.grid {
  padding: 0.5rem;
}
.all-files {
  grid-row: 4/5;
  grid-column: 1/3;
  padding-left: 0%;
  /* Body/16/Bold */
  margin-left: 0.5rem;
  font-family: Poppins;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;
  letter-spacing: 0.003em;

  /* primary/100 */

  color: #0e70f1;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
}
.clock {
  padding: 0.5rem;
  color: #0c0c0c;
}
.recent-files {
  grid-row: 5/5;
  grid-column: 1/3;
  /* Body/16/Regular */
  margin-left: 0.5rem;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;
  letter-spacing: 0.003em;

  /* black */

  color: #0c0c0c;
}
.phoneicon {
  padding: 0.5rem;
}
.connected-with {
  grid-row: 10/10;
  grid-column: 1/2;
  /* container */

  width: 216px;
  height: 64px;
  margin-left: 0.5rem;
  /* primary/10 */

  background: #f5faff;
  border-radius: 8px;

  /* Connected with */
  display: block;
  /* Caption */

  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */



  color: #000000;

  opacity: 0.6;
}
.connected-text {
  padding-left:0.5rem;
}
.phoneName {
  /* Body/14/Regular */
  align-self:end;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  display: flex;
  align-items: center;
  letter-spacing: 0.003em;

  /* primary/100 */

  color: #0e70f1;
}
.settingsicon {
  padding: 0.5rem;
}
.settings {
  grid-row: 11/11;
  grid-column: 1/3;
  /* Settings */

  margin-left: 0.5rem;

  /* Body/16/Regular */

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;
  letter-spacing: 0.003em;

  /* black */

  color: #0c0c0c;
}
.logout {
  padding: 0.5rem;
}

.disconnect {
  grid-row: 12/12;
  grid-column: 1/4;
  margin-left: 0.5rem;

  /* Body/16/Regular */

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;
  letter-spacing: 0.003em;

  /* black */

  color: #0c0c0c;
}
.filelist {
  grid-column: 3/12;
  grid-row: 3/12;
}
span.header {
  grid-column: span 3;
}
</style>
