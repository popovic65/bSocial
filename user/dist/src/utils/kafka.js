"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.disconnectFromKafka = exports.connectProducer = void 0;
require("dotenv").config();
const kafkajs_1 = require("kafkajs");
const brokers = [`${process.env.KAFKA_URL}`];
const kafka = new kafkajs_1.Kafka({
    clientId: "user-service",
    brokers,
});
const producer = kafka.producer();
function connectProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield producer.connect();
        console.log("Producer connected");
    });
}
exports.connectProducer = connectProducer;
function disconnectFromKafka() {
    return __awaiter(this, void 0, void 0, function* () {
        yield producer.disconnect();
        console.log("Producer disconnected");
    });
}
exports.disconnectFromKafka = disconnectFromKafka;
const topics = ["user-created"];
function sendMessage(topic, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageString = JSON.stringify(message);
        const messageBuffer = Buffer.from(messageString);
        return producer.send({
            topic,
            messages: [{ value: messageBuffer }],
        });
    });
}
exports.sendMessage = sendMessage;
