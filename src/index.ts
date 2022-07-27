import TelegramBot from 'node-telegram-bot-api'
import express from 'express'

import { RequestWithBody, TGitLabWebHook } from '@ts'
import {
  ENV,
  isMergeRequest,
  isNote,
  isPipeline,
  getMRMessage,
  getNoteMessage,
  getPipelineMessage,
  Request,
} from '@helpers'

const telegramBot = new TelegramBot(ENV.BOT_TOKEN, { polling: true })
const server = express()

server.use(express.json())
const PORT = ENV.PORT || 80

server.post('/', async ({ body }: RequestWithBody<TGitLabWebHook>, res) => {
  if (isNote(body)) {
    await telegramBot.sendMessage(ENV.CHAT_ID, getNoteMessage(body), {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'fixed', callback_data: '/comment_reply_fix' },
            {
              text: 'second',
              callback_data: '/second',
            },
          ],
          [{ text: 'ok', callback_data: '/ok' }],
        ],
      },
    })
  }

  if (isPipeline(body)) {
    await telegramBot.sendMessage(ENV.CHAT_ID, getPipelineMessage(body), { parse_mode: 'HTML' })
  }

  if (isMergeRequest(body)) {
    await telegramBot.sendMessage(ENV.CHAT_ID, getMRMessage(body), { parse_mode: 'HTML' })
  }

  res.json({})
})

type Discussion = { id: string; notes: { id: number }[] }

telegramBot.on('callback_query', async (msg) => {
  const url = msg.message?.entities?.[0]?.url
  const msgKeyboard = msg.message?.reply_markup?.inline_keyboard
  const msgButtons = msgKeyboard?.map((keyboardButton) => keyboardButton[0])

  await telegramBot.sendMessage(ENV.CHAT_ID, JSON.stringify(msgKeyboard))
  await telegramBot.sendMessage(ENV.CHAT_ID, JSON.stringify(msgButtons))

  if (!url) return

  const [MRId, noteId] = url.split('merge_requests/').pop()?.split('#note_').map(Number) || []

  await Request.get<Discussion[]>(`/merge_requests/${MRId}/discussions`).then(async ({ data: discussions }) => {
    const discussion = discussions.find((dis) => dis.notes.map(({ id }) => id).includes(noteId))

    if (!discussion) return

    await Request.post(`/merge_requests/${MRId}/discussions/${discussion.id}/notes?body=test comment create`)
  })
})

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
