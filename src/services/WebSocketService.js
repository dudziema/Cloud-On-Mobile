let webSocketsService = {};

webSocketsService.install = function (Vue) {
  Vue.config.globalProperties.$webSocketsConnect = function () {
    console.log("Starting Connection to WebSocket Server");
    let ws = new WebSocket("ws://192.168.50.112:9292");

    ws.onopen = () => {
      // Restart reconnect interval
      console.log("Now is connected!");
    };

    ws.onmessage = (event) => {
      // New message from the backend - use JSON.parse(event.data)
      let received_message = event.data;
      alert("Message is received" + received_message);
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
    this.ws.close();
  };

  Vue.config.globalProperties.$webSocketsSend = (msg) => {
    // Send data to the backend - use JSON.stringify(data)
    sendMessage(msg);
  };

  /*
    Here we write our custom functions to not make a mess in one function
  */
  function sendMessage(msg) {
    this.ws.send(JSON.stringify(msg));
    alert("Message is sent.");
  }
};

export default webSocketsService;
