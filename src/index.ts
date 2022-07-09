import TelegramBot from 'node-telegram-bot-api'
import express from 'express'

import { ENV } from '@helpers'
import { RequestWithBody, TGitLabWebHook } from '@ts'
import { isNote } from '@helpers/gitlab'
import { getNoteMessage } from '@helpers/message'

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
  <b>bold</b>, <strong>bold</strong>
<i>italic</i>, <em>italic</em>
<a href="URL">inline URL</a>
<code>${msg.chat.id}</code>
<pre>pre-formatted fixed-width code block</pre>`,
    { parse_mode: 'HTML' }
  )
})

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
