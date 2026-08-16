import { Client } from "@elastic/elasticsearch";
import { ENV } from "./env";

export const elasticClient = new Client({
  node: ENV.ELASTICSEARCH_NODE,
});
