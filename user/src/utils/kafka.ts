require("dotenv").config();
import { Kafka } from "kafkajs";

const brokers = [`${process.env.KAFKA_URL}`];

const kafka = new Kafka({
  clientId: "user-service",
  brokers,
});

const producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();
  console.log("Producer connected");
}

export async function disconnectFromKafka() {
  await producer.disconnect();
  console.log("Producer disconnected");
}

const topics = ["user-created"] as const;

export async function sendMessage(
  topic: (typeof topics)[number],
  message: any
) {
  const messageString = JSON.stringify(message);
  const messageBuffer = Buffer.from(messageString);

  return producer.send({
    topic,
    messages: [{ value: messageBuffer }],
  });
}
