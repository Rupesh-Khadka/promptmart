import { Kafka, Producer } from "kafkajs";
import fs from "fs";
import path from "path";
const broker = process.env.KAFKA_BROKER;
if (!broker) {
  throw new Error("KAFKA_BROKER environment variable is not set");
}
const username = process.env.KAFKA_USERNAME;
const password = process.env.KAFKA_PASSWORD;
if (!username || !password) {
  throw new Error(
    "KAFKA_USERNAME and KAFKA_PASSWORD environment variables must be set"
  );
}
const kafka = new Kafka({
  brokers: [broker],
  ssl: {
    ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")],
  },
  sasl: {
    mechanism: "plain",
    username,
    password,
  },
});

let producer: null | Producer = null;

export async function createProducer() {
  if (producer) {
    return producer;
  }
  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;
  return producer;
}

export async function produceOrder(order: any) {
  const producer = await createProducer();
  const topic = process.env.KAFKA_TOPIC;
  if (!topic) {
    throw new Error("KAFKA_TOPIC environment variable is not set");
  }
  return await producer.send({
    topic,
    messages: [{ value: order }],
  });
}

// async function produceOrder(key: string, order: string) {
//   const producer = await createProducer();
//   await producer.send({
//     topic: "orders",
//     messages: [{ key, value: order }],
//   });
//   await producer.disconnect();
// }

export default kafka;
