import { createClient as createRedisClient, ClientOpts, RedisClient } from 'redis';
import { promisify, CustomPromisify } from 'util';

export interface Client extends RedisClient {
  asyncSet: CustomPromisify<RedisClient['set']>;
  asyncGet: CustomPromisify<RedisClient['get']>;
  asyncCommand: CustomPromisify<RedisClient['send_command']>;
  asyncKeys: CustomPromisify<RedisClient['keys']>;
  asyncTtl: CustomPromisify<RedisClient['ttl']>;
  asyncDel: CustomPromisify<RedisClient['del']>;
  asyncType: CustomPromisify<RedisClient['type']>;
  asyncQuit: CustomPromisify<RedisClient['quit']>;
}

export { ClientOpts, RedisClient };

export function createClient(port: number, host?: string, options?: ClientOpts): Client;
export function createClient(unix_socket: string, options?: ClientOpts): Client;
export function createClient(redis_url: string, options?: ClientOpts): Client;
export function createClient(options?: ClientOpts): Client;

export function createClient(...args: any[]) {
  const client: Client = createRedisClient(...args) as Client;
  return promisifyClient(client);
}

export function promisifyClient(client: RedisClient) {
  const theClient = client as Client;
  theClient.asyncSet = promisify(client.set).bind(client);
  theClient.asyncGet = promisify(client.get).bind(client);
  theClient.asyncCommand = promisify(client.send_command).bind(client);
  theClient.asyncKeys = promisify(client.keys).bind(client);
  theClient.asyncTtl = promisify(client.ttl).bind(client);
  theClient.asyncDel = promisify(client.del).bind(client);
  theClient.asyncType = promisify(client.type).bind(client);
  theClient.asyncQuit = promisify(client.quit).bind(client);
  return theClient;
}
