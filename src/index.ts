import TelegramBot from 'node-telegram-bot-api'
import express from 'express'

import { RequestWithBody, TGitLabWebHook } from '@ts'
import { ENV, isMergeRequest, isNote, isPipeline, getMRMessage, getNoteMessage, getPipelineMessage } from '@helpers'

const telegramBot = new TelegramBot(ENV.BOT_TOKEN, { polling: true })
const server = express()

server.use(express.json())
const PORT = ENV.PORT || 80

server.post('/', async ({ body }: RequestWithBody<TGitLabWebHook>, res) => {
  if (isNote(body)) {
    await telegramBot.sendMessage(ENV.CHAT_ID, getNoteMessage(body), { parse_mode: 'HTML' })
  }

  if (isPipeline(body)) {
    await telegramBot.sendMessage(ENV.CHAT_ID, getPipelineMessage(body), { parse_mode: 'HTML' })
  }

  if (isMergeRequest(body)) {
    await telegramBot.sendMessage(ENV.CHAT_ID, getMRMessage(body), { parse_mode: 'HTML' })
  }

  res.json({})
})

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
