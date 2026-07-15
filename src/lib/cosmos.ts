import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_ENDPOINT!;
const key = process.env.COSMOS_KEY!;
const databaseId = process.env.COSMOS_DATABASE || "whitetrust";
const containerId = process.env.COSMOS_CONTAINER || "enquiries";

export const cosmos = new CosmosClient({
  endpoint,
  key,
});

export const database = cosmos.database(databaseId);
export const container = database.container(containerId);