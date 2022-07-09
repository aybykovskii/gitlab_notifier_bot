import TelegramBot from 'node-telegram-bot-api'
import express from 'express'

import { ENV } from '@helpers'
import { RequestWithBody, TGitLabWebHook } from '@ts'
import { isNote } from '@helpers/gitlab'
import { getNoteMessage, getUserInfo } from '@helpers/message'

const telegramBot = new TelegramBot(ENV.BOT_TOKEN, { polling: true })
const server = express()

server.use(express.json())
const PORT = ENV.PORT || 80

server.post('/', async ({ body }: RequestWithBody<TGitLabWebHook>, res) => {
  if (isNote(body)) {
    await telegramBot.sendMessage(ENV.CHAT_ID, getNoteMessage(body), { parse_mode: 'HTML' })
  }
  res.json({})
})

telegramBot.on('channel_post', async (msg) => {
  console.log(msg.chat.id)
  await telegramBot.sendMessage(
    ENV.CHAT_ID,
    `
<b>User</b>example@mail.ru
Оставил новый комментарий со строки 10 до строки 12 в файле <code>ts/index</code>: qwe
<a href="https://localhost:8080">!12</a>
`,
    { parse_mode: 'HTML' }
  )
})

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
