const fortune = require('fortune');
const http = require('http');

const store = fortune.create();
const listener = fortune.net.http(store);
const server = http.createServer(listener);
const port = process.env.PORT || 5000;

store.defineType('task', {
  title: { type: String },
  project: { link: 'project', inverse: 'tasks' }
});

store.defineType('project', {
  title: { type: String },
  tasks: { link: 'task', inverse: 'project', isArray: true }
});

store.connect().then(() => {
  server.listen(port);
  console.log(`Server is listening on port ${port}...`);
});
