import http from 'http';
import app from './app';

const port = process.env.PORT || 5000;
const hostname = '127.0.0.1';

const server = http.createServer(app);

server.on('connection', () => {
    console.log('New connection .....');
});

server.listen(port,hostname,()=>{
    console.log(`Serving running at http://${hostname}:${port}/`);
});
