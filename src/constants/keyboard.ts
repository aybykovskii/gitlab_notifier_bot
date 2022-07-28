import { InlineKeyboardButton } from 'node-telegram-bot-api'

import { KeyboardButton } from '@ts/keyboard'
import { GenericObject } from '@helpers'

export const KEYBOARD_BUTTON_TEXT = {
  [KeyboardButton.FIXED]: 'Исправил',
  [KeyboardButton.OK]: 'Ок',
}

export const NOTE_MSG_INLINE_KEYBOARD: InlineKeyboardButton[][] = GenericObject.values(KeyboardButton).map((button) => [
  {
    callback_data: button,
    text: KEYBOARD_BUTTON_TEXT[button],
  },
])
