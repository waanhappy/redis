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

export function createClient(port: number, host?: string, options?: ClientOpts): Client;
export function createClient(unix_socket: string, options?: ClientOpts): Client;
export function createClient(redis_url: string, options?: ClientOpts): Client;
export function createClient(options?: ClientOpts): Client;

export function createClient(...args: any[]) {
  const client: Client = createRedisClient(...args) as Client;

  client.asyncSet = promisify(client.set).bind(client);
  client.asyncGet = promisify(client.get).bind(client);
  client.asyncCommand = promisify(client.send_command).bind(client);
  client.asyncKeys = promisify(client.keys).bind(client);
  client.asyncTtl = promisify(client.ttl).bind(client);
  client.asyncDel = promisify(client.del).bind(client);
  client.asyncType = promisify(client.type).bind(client);
  client.asyncQuit = promisify(client.quit).bind(client);

  return client;
}
