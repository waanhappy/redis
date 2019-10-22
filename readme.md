### Redis Promisify


```
const redis = require('@wentazhi/redis');

const client = redis.createClient(options);

async function(key){
  client.asyncSet(key, value, 1000);
  const data = client.asyncGet(key);

}
```