import { Kafka, EachMessagePayload } from "kafkajs";
import { Client } from "@elastic/elasticsearch";

require("dotenv").config();

const brokers: string[] = [`${process.env.KAFKA_URL}`];
const topics = ["comment-created", "user-created", "post-created"] as const;

const kafka = new Kafka({
  brokers,
  clientId: "consumer-service",
});

const consumer = kafka.consumer({
  groupId: "consumer-service",
});

const elasticClient = new Client({ node: process.env.ELASTICSEARCH_NODE });

async function indexToElasticsearch(index: string, data: any) {
  try {
    const { body } = await elasticClient.index({
      index,
      body: data,
    });
    console.log("Indexed to Elasticsearch:", body);
  } catch (error) {
    console.error("Error indexing to Elasticsearch:", error);
  }
}

async function messageHandler(topic: string, data: any) {
  try {
    console.log(data);
    console.log("Message stored in the database");
    await indexToElasticsearch(topic, data);
  } catch (error) {
    console.error("Error storing message in the database:", error);
  }
}

type TopicHandler = (topic: string, data: any) => Promise<void>;

const topicToSubscribe: Record<(typeof topics)[number], TopicHandler> = {
  "comment-created": messageHandler,
  "user-created": messageHandler,
  "post-created": messageHandler,
};

export async function connectConsumer() {
  await consumer.connect();
  console.log("Connected to consumer");

  for (const topic of topics) {
    await consumer.subscribe({
      topic,
      fromBeginning: true,
    });
  }

  await consumer.run({
    eachMessage: async ({ topic, message }: EachMessagePayload) => {
      if (!message || !message.value) {
        return;
      }
      const data = JSON.parse(message.value.toString());

      const handler = topicToSubscribe[topic as (typeof topics)[number]];

      if (handler) {
        await handler(topic, data);
      }
    },
  });
}

export async function disconnectConsumer() {
  await consumer.disconnect();
  console.log("Disconnected from consumer");
}
