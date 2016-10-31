A NodeJS Proxy with no Dependencies
===================================

I recently needed to write a _proxy_ using Node. I've done this before using the `http-proxy` library
which is pretty good. But on the new
code I wanted to prevent the unnecessary proliferation of dependencies. My option was then to study a bit of
how Node handles _requests_, _responses_ and streams.
 
At the end, it resulted quite simple:

```javascript
// Create your server as you normally do
const server = http.createServer((req, res) => {
    // Prepare your new request options,
    // basically copying from the original request.
    const opts = {
        hostname: endpoint, // The endpoint you want to proxy to
        port: endpointPort, // Usually 80
        path: req.url,
        method: req.method,
        headers: req.headers
    };
        
    const proxyRequest = http.request(opts, proxyResponse => {
        proxyResponse.on('data', chunk => { res.write(chunk, 'binary'); });
        proxyResponse.on('end', () => { res.end(); });
        proxyResponse.on('error', er => {
            throw new Error('Error processing response: ' + er.message);
        });
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
    });
    req.on('data', chunk => { proxyRequest.write(chunk, 'binary'); });
    req.on('end', () => { proxyRequest.end(); });
});
server.listen(port); // Whatever port you decide to use
```

And that's pretty much all.

In my mind ~20 lines of code are better than adding dependencies into my project.
