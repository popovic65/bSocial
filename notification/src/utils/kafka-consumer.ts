require("dotenv").config();
import { Kafka } from "kafkajs";
import { NotificationService } from "../services/notification.service";
import { NotificationRepository } from "../repository/notification.repository";

const notificationService = new NotificationService(
  new NotificationRepository()
);

const brokers = [`${process.env.KAFKA_URL}`];
const topics = ["comment-created"] as const;

const kafka = new Kafka({
  brokers,
  clientId: "notifications-service",
});

const consumer = kafka.consumer({
  groupId: "notifications-service",
});

async function messageCreatedHandler(data: any) {
  try {
    await notificationService.createNotification(data);
    console.log("Message stored in the database");
  } catch (error) {
    console.error("Error storing message in the database:", error);
  }
}

const topicToSubscribe: Record<(typeof topics)[number], Function> = {
  "comment-created": messageCreatedHandler,
};
export async function connectConsumer() {
  await consumer.connect();
  console.log("Connected to consumer");

  for (let i = 0; i < topics.length; i++) {
    await consumer.subscribe({
      topic: topics[i],
      fromBeginning: true,
    });
  }

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message || !message.value) {
        return;
      }
      const data = JSON.parse(message.value.toString());

      const handler = topicToSubscribe[topic as (typeof topics)[number]];

      if (handler) {
        handler(data);
      }
    },
  });
}

export async function disconnectConsumer() {
  await consumer.disconnect();
  console.log("Disconnected from consumer");
}
