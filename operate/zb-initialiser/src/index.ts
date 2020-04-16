import * as bodyParser from 'body-parser'
import * as express from 'express'
import { ZBClient } from 'zeebe-node'
import { PORT, ZEBEE_HOST } from './config'

let zb: ZBClient = null

start()

async function start(): Promise<void> {
  zb = prepareZB()
  startExpress()
}

function prepareZB(): ZBClient {
	return new ZBClient(ZEBEE_HOST, {
    onReady: () => console.log(`Connected!`),
    onConnectionError: () => {
      throw new Error('Failed to connect')
    },
    connectionTolerance: 5000 // milliseconds
  })
}

function startExpress(): void {
  const app: express.Application = express()

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.get('/alive', (req, res) => res.sendStatus(200))
  app.post('/init-order-process', initOrderProcess)

  app.listen(PORT)
}

interface InitOrderProcessParams {
  orderId: number
  orderValue: number
}

async function initOrderProcess(req: express.Request, res: express.Response) {
  const body: InitOrderProcessParams = req.body

  if (!body.orderId || !body.orderValue) {
    return res.sendStatus(400)
  }

  await zb.createWorkflowInstance('order-process', body)

  return res.sendStatus(201)
}

process.on('SIGTERM', async () => zb && await zb.close())
