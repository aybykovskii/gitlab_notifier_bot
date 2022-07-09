import TelegramBot from 'node-telegram-bot-api'
import express from 'express'

import { ENV } from '@helpers'
import { RequestWithBody, TGitLabWebHook } from '@ts'
import { isMergeRequest, isNote } from '@helpers/gitlab'

const telegramBot = new TelegramBot(ENV.BOT_TOKEN, { polling: true })
const server = express()

const PORT = ENV.PORT || 80

server.post('/', async ({ body }: RequestWithBody<TGitLabWebHook>, res) => {
  const isMR = isMergeRequest(body)
  const isComment = isNote(body)

  await telegramBot.sendMessage(ENV.CHAT_ID, '123')
  res.json({})
})

telegramBot.on('channel_post', (msg) => {
  console.log(msg.chat.id)
})

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
