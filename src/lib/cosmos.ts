import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_ENDPOINT!;
const key = process.env.COSMOS_KEY!;
const databaseId = process.env.COSMOS_DATABASE || "whitetrust";
const containerId = process.env.COSMOS_CONTAINER || "enquiries";
const bookingsContainerId = process.env.COSMOS_BOOKINGS_CONTAINER || "bookings";

export const cosmos = new CosmosClient({
  endpoint,
  key,
});

export const database = cosmos.database(databaseId);
export const container = database.container(containerId);
export const bookingsContainer = database.container(bookingsContainerId);

let bookingsContainerReady: Promise<void> | null = null;

export function ensureBookingsContainer(): Promise<void> {
  if (!bookingsContainerReady) {
    bookingsContainerReady = database.containers
      .createIfNotExists({ id: bookingsContainerId, partitionKey: { paths: ["/id"] } })
      .then(() => undefined);
  }
  return bookingsContainerReady;
}