import express from 'express';
import bodyParser from 'body-parser';
import { authorize } from './middlewares';
import { IncomingBody } from './types';
import { BingSpellCheck } from './services/BingSpellCheck';
 
const app = express();
app.use(bodyParser.json());
const port = 8080;

app.post('/', authorize, async (req, res) => {
  const body = req.body as IncomingBody;
  const spellCheck = await new BingSpellCheck(body.text).spellCheck();
  return res.status(200).send(spellCheck);
});

app.get('*', (req, res) => {
  res.status(404).send("Not found")
})

app.listen(port, () => {
  console.log(`This server is running on port: ${port}`);
});
