import { ConnectRouter, Code, ConnectError } from "@connectrpc/connect";

import { HelloReply, HelloRequest } from "./gen/helloworld_pb";
import { Greeter } from "./gen/helloworld_connect";
import * as http2 from "http2";
import { connectNodeAdapter } from "@connectrpc/connect-node";
/* import { fastify } from "fastify";
import { fastifyConnectPlugin } from "@connectrpc/connect-fastify";
import { readFileSync } from "fs"; */

const route = (router: ConnectRouter) =>
  // registers Greeter as a service on the router
  router.service(Greeter, {
    async sayHello(req: HelloRequest): Promise<HelloReply | ConnectError> {
      const message = new HelloReply({
        message: `Hello ${req.name}`,
      });
      if (req.name === "error") {
        throw new ConnectError("Oops", Code.AlreadyExists);
      }

      return message;
    },
  });

http2
  .createServer(
    connectNodeAdapter({ routes: route }) // responds with 404 for other requests
  )
  .listen(8080);
