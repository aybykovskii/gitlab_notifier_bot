import TelegramBot from 'node-telegram-bot-api'
import express from 'express'

import { ENV } from '@helpers'
import { RequestWithBody, TGitLabWebHook } from '@ts'
import { isMergeRequest, isNote } from '@helpers/gitlab'
import { getUserInfo } from '@helpers/message'

const telegramBot = new TelegramBot(ENV.BOT_TOKEN, { polling: true })
const server = express()

server.use(express.json())
const PORT = ENV.PORT || 80

server.post('/', async ({ body }: RequestWithBody<TGitLabWebHook>, res) => {
  if (isNote(body)) {
    await telegramBot.sendMessage(
      ENV.CHAT_ID,
      `
		${getUserInfo(body.user)}
		Оставил новый комментарий: ${body.object_attributes.description}
		URL: ${body.object_attributes.url}
		`
    )
  }

  // await telegramBot.sendMessage(ENV.CHAT_ID, getUserInfo(body.user))
  // await telegramBot.sendMessage(ENV.CHAT_ID, JSON.stringify(body.object_attributes))
  res.json({})
})

telegramBot.on('channel_post', (msg) => {
  console.log(msg.chat.id)
})

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
