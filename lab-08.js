// #1 TODO: Declare fastify object from fastify, and execute
const fastify = require("fastify")();
// #2 TODO: Declare fetch object from node-fetch
const fetch = require("node-fetch");

// https://jsonplaceholder.typicode.com/photos

fastify.get("/photos", (request, reply) => {

    fetch("https://jsonplaceholder.typicode.com/photos")
        .then((res) => res.json()) // transforms data 
        .then((resp_json) => 
        {
            // fastify reply

            // console.log(resp_json);
            reply
                .code(200)
                .header("Content-Type", "text/json; charset=utf-8")
                .send({ error: "", statusCode: 200, photos: resp_json });
        })
        .catch(err=>{
            // fastify reply with err
            reply
                .code(404)
                .header("Content-Type", "text/json; charset=utf-8")
                .send({ error: "Route not found", statusCode: 404, photos: [] });

            })
  });
  


fastify.get("/photos/:id", (request, reply) => {
  const { id = "" } = request.params.id;

    fetch("https://jsonplaceholder.typicode.com/photos" + id)
    .then((response) => response.json())
    .then((photo) => {
      reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ error: "", statusCode: 200, photos: id});
    })
    .catch((error) => {
      reply
      .code(200)
      .header("Content-Type", "text/json; charset=utf-8")
      .send({ error: "Error", statusCode: 404, photos: []});
    });
    
    reply
      .code(200)
      .header("Content-Type", "text/json; charset=utf-8")
      .send({ error: "ERROR", statusCode: 404 });
  });

  
  // Start server and listen to requests using Fastify
  const listenIP = "localhost";
  const listenPort = 8080;
  fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });
