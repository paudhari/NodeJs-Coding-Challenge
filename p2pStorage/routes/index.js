
const Redis = require('ioredis');
const {REDIS_HOST,REDIS_PORT} = process.env
let redis;
if(REDIS_HOST){
  redis = new Redis({
    host : REDIS_HOST,
    port : REDIS_PORT
  })
} else {
  //For Dev
  redis = new Redis()
}
const express = require('express');
//Initialize Router
const router = express.Router();


//Map Routes
router.get('/', async function (req, res, next) {
  const data =  await redis.get("data");
  res.send(data);
});
router.post('/', async function(req, res, next) {
  redis.set("data", JSON.stringify(req.body));
  res.sendStatus(200);
});
module.exports = router;
