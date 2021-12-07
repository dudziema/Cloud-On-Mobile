let webSocketsService = {};
var ws = null;
// var demoEnabled = false;

webSocketsService.install = function (Vue) {
  Vue.config.globalProperties.$webSocketsConnect = function () {
    console.log("Starting Connection to WebSocket Server");
    ws = new WebSocket("wss://seredynski.com:9292/");
    this.ws = ws;
    ws.onopen = () => {
      console.log("Now is connected!");
    };

    ws.onmessage = (event) => {
      // New message from the backend - use JSON.parse(event.data)
      let received_message = event.data;
      alert("Message is received" + received_message);
      parseMessage(received_message);
    };

    ws.onclose = (event) => {
      if (event) {
        alert("Connection is closed.");
      }
    };

    ws.onerror = (error) => {
      console.log(error);
      ws.close();
    };
  };

  Vue.config.globalProperties.$webSocketsDisconnect = () => {
    // Our custom disconnect event
    ws.close();
  };
  Vue.config.globalProperties.$webSocketsSend = (msg) => {
    // Send data to the backend - use JSON.stringify(data)
    ws.send(JSON.stringify(msg));
    alert("Message is sent.");
  };
  Vue.config.globalProperties.$GetFiles = (obj) => {
    let fileList = obj.payload;
    return fileList;
  };

  /*
    Here we write our custom functions to not make a mess in one function
  */
  function parseMessage(received_msg) {
    let obj = JSON.parse(received_msg);
    if (obj.type == "web-loging-with-code" && obj.result == 0) {
      wsListFiles();
    } else if (obj.command == "list-files") {
      // todo: potential js injection
      Vue.config.globalProperties.$GetFiles;
    }
  }
  function wsListFiles() {
    var msg = { type: "forward", command: "list-files", demo: 1 };
    Vue.config.globalProperties.$webSocketsSend(msg);
  }
};

export default webSocketsService;
