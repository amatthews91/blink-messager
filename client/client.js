const Blink1 = require('node-blink1');
const WebSocket = require('ws')

const connection = new WebSocket('ws://localhost:3000');
const blink = new Blink1();

const pubs = {
  'tap': [0, 0, 255],
  'dogandparrot': [255, 0, 0],
  'forth': [0, 255, 0]
}

connection.onopen = () => {
  connection.send('Message From Client')
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
  const message = e.data;
  const pub = pubs[message];
  console.log(message)
  if (pub) {
    blink.setRGB(pub[0], pub[1], pub[2]);
    setTimeout(() => blink.off(), 1000);
  } else {
    console.log(`No pub exists: ${message}`)
  }
}
