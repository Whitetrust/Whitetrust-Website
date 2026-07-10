import "isomorphic-fetch";
import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { env, bookingEnabled } from "./env";

let cached: Client | null = null;

export function graph(): Client {
  if (!bookingEnabled()) {
    throw new Error("Microsoft Graph not configured");
  }
  if (cached) return cached;

  const credential = new ClientSecretCredential(
    env.azureTenantId!,
    env.azureClientId!,
    env.azureClientSecret!
  );
  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
  });
  cached = Client.initWithMiddleware({ authProvider });
  return cached;
}
