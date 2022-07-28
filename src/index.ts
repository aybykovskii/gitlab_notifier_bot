import TelegramBot from 'node-telegram-bot-api'
import express from 'express'

import { RequestWithBody, TGitLabWebHook } from '@ts'
import {
  ENV,
  getInlineKeyboardMsgOptions,
  getMRMessage,
  getNoteMessage,
  getPipelineMessage,
  isMergeRequest,
  isNote,
  isPipeline,
} from '@helpers'
import { KEYBOARD_BUTTON_TEXT, NOTE_MSG_INLINE_KEYBOARD } from '@constants/keyboard'
import { KeyboardButton } from '@ts/keyboard'
import { getMRDiscussions, postMRDiscussionReply } from '@api'

const telegramBot = new TelegramBot(ENV.BOT_TOKEN, { polling: true })
const server = express()

server.use(express.json())
const PORT = ENV.PORT || 80

server.post('/', async ({ body }: RequestWithBody<TGitLabWebHook>, res) => {
  if (isNote(body)) {
    await telegramBot.sendMessage(
      ENV.CHAT_ID,
      getNoteMessage(body),
      getInlineKeyboardMsgOptions(NOTE_MSG_INLINE_KEYBOARD)
    )
  }

  if (isPipeline(body)) {
    await telegramBot.sendMessage(ENV.CHAT_ID, getPipelineMessage(body), { parse_mode: 'HTML' })
  }

  if (isMergeRequest(body)) {
    await telegramBot.sendMessage(ENV.CHAT_ID, getMRMessage(body), { parse_mode: 'HTML' })
  }

  res.json({})
})

telegramBot.on('callback_query', async (msg) => {
  const url = msg.message?.entities?.[0]?.url
  const button = msg.data as KeyboardButton

  if (!url) return

  const [MRId, noteId] = url.split('merge_requests/').pop()?.split('#note_').map(Number) || []

  await getMRDiscussions(MRId).then(async (discussions) => {
    const discussion = discussions.find((dis) => dis.notes.map(({ id }) => id).includes(noteId))

    if (!discussion) return

    await postMRDiscussionReply(MRId, noteId, KEYBOARD_BUTTON_TEXT[button])
  })
})

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
