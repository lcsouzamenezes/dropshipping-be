import Bull from 'bull'
import redis from '@config/redis'
import * as jobs from './jobs'

export interface Job {
  name: string
  handle: ({ data: any }) => Promise<void>
  options?: Bull.QueueOptions
  onFailed: Bull.FailedEventCallback
}

const queues = Object.values(jobs).map((job) => ({
  name: job.name,
  bull: new Bull(job.name, {
    redis,
  }),
  handle: job.handle,
  options: job.options,
  onFailed: job.onFailed,
}))

export default {
  queues,
  add: <T = any>(name: string, data: T, opts?: Bull.JobOptions) => {
    const queue = queues.find((queue) => queue.name === name)
    if (!queue) {
      throw new Error('Queue not registered or invalid name')
    }
    return queue.bull.add(data, opts)
  },
  process: () => {
    queues.forEach((queue) => {
      queue.bull.process(queue.handle)
      if (!queue.onFailed) {
        queue.bull.on('failed', (job, err) => {
          console.log('Job Failed:', queue.name, job.data)
        })
      } else {
        queue.bull.on('failed', queue.onFailed)
      }
    })
  },
}
