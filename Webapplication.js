//creating server

const { request } = require("express");


var http = request('http')
var url = request('url')

http.createServer(onRequest).listern(8888);
console.log('Server has started');

function onRequest(request,response){

    varpathName = url.parse(request.url).pathname

    console.log('pathname'+pathname);
    response.writeHead(200);
    response.write(' world')
    response.end();

}