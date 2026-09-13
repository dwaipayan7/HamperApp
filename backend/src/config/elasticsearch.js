import { Client } from "@elastic/elasticsearch";
import { ENV } from "./env.js";

export const elasticClient = new Client({
  node: ENV.ELASTICSEARCH_NODE,
});
