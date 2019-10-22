import { Client } from './../index';
import { createClient } from '../index';

async function getClientTest(cb: (client:Client)=> Promise<any>){
  const client = createClient({ host: '127.0.0.1', port: 6379, db: 1 });
  const data = await cb(client)
  await client.asyncQuit();
  return data;
}

describe('测试redis', () => {
  it('asyncSet', async () => {
    const data = await getClientTest(client => client.asyncSet('hello', 'world', 'EX', 1000) );
    expect(data).toBe('OK');
    return true;
  });
  it('asyncGet', async () => {
    const data = await getClientTest(client =>client.asyncGet('hello'));
    expect(data).toBe('world');
    return true;
  });
  it('asyncTtl', async () => {
    const data = await getClientTest(client =>client.asyncTtl('hello'));
    expect(data).toBeLessThanOrEqual(1000);
    return true;
  });
  it('asyncDel', async () => {
    await getClientTest(async client => {
      const result = await client.asyncDel('hello');
      expect(result).toBe(1);
      const data = await client.asyncGet('hello');
      expect(data).toBe(null);
    })
    return true;
  });
});
