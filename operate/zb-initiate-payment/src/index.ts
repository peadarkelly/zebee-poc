import { ZBClient, Duration, Job, CompleteFn, ZBWorker } from 'zeebe-node'
import { ZEBEE_HOST } from './config'

let zb: ZBClient = null

start()

async function start(): Promise<void> {
  zb = prepareZB()
  startWorker()
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

function startWorker(): void {
  zb.createWorker({
    taskType: 'initiate-payment',
    taskHandler: handleJob,
      onReady: () => console.log(`Initiate Payment Worker connected!`),
      onConnectionError: () => {
        throw new Error('Initiate Payment Worker Failed to connect')
      },
      connectionTolerance: Duration.seconds.of(3.5).value
  })
}

function handleJob(job: Readonly<Job<{}, {}>>, complete: CompleteFn<{}>, worker: ZBWorker<{}, {}, {}>): void {
  console.log('HANDLING JOB')
  console.log('Variables', job.variables)

  console.log('Worker task type', worker.taskType)

  complete.success()
}

process.on('SIGTERM', async () => zb && await zb.close())
