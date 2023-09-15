import { createPromiseClient } from "@connectrpc/connect";
import { Greeter } from "./gen/helloworld_connect";
import { createGrpcTransport } from "@connectrpc/connect-node";

const transport = createGrpcTransport({
  baseUrl: "http://localhost:50051",
  httpVersion: "2",
});

async function main() {
  const client = createPromiseClient(Greeter, transport);
  try {
    const res = await client.sayHello({ name: "error" });
    console.log(res);
  } catch (error) {
    console.error("ohhhh", error);
  }
}
void main();
