const ws = new WebSocket('ws://localhost:8080');
const blog = document.getElementById('blog');

ws.onopen = function open() {
  ws.send('something');
};

ws.onmessage = function incoming(data) {
  const element = document.createElement('div');
  element.innerHTML = data.data;
  blog.prepend(element);
  console.log(data);
};
