import { Emoji, MergeRequestActionTypes, PipelineStatus } from '@ts'

export const EMOJIS = {
  [Emoji.ARROW_RIGHT]: '➡️',
  [Emoji.CONGRATULATION]: '🎉',
  [Emoji.FAILED]: '❌',
  [Emoji.MERGE]: '🎉',
  [Emoji.PENDING]: '🕛',
  [Emoji.COMMENT]: '💬',
  [Emoji.SUCCESS]: '✅',
  [Emoji.RUNNING]: '🏃‍♂️',
  [Emoji.USER]: '🙍‍♂️',
  [Emoji.LOCATION]: '📍',
  [Emoji.DESCRIPTION]: '✏️',
  [Emoji.OPEN]: '❕',
  [Emoji.UPDATE]: '♨️',
  [Emoji.CLOSE]: '🚫',
  [Emoji.APPROVE]: '👍',
  [Emoji.UNAPPROVED]: '👎',
}

export const PIPELINE_STATUS_EMOJI = {
  [PipelineStatus.PENDING]: EMOJIS[Emoji.PENDING],
  [PipelineStatus.RUNNING]: EMOJIS[Emoji.RUNNING],
  [PipelineStatus.SUCCESS]: EMOJIS[Emoji.SUCCESS],
  [PipelineStatus.FAILED]: EMOJIS[Emoji.FAILED],
}

export const MR_ACTION_EMOJI = {
  [MergeRequestActionTypes.OPEN]: EMOJIS[Emoji.OPEN],
  [MergeRequestActionTypes.UPDATE]: EMOJIS[Emoji.UPDATE],
  [MergeRequestActionTypes.CLOSE]: EMOJIS[Emoji.CLOSE],
  [MergeRequestActionTypes.MERGE]: EMOJIS[Emoji.MERGE],
  [MergeRequestActionTypes.APPROVED]: EMOJIS[Emoji.APPROVE],
  [MergeRequestActionTypes.UNAPPROVED]: EMOJIS[Emoji.UNAPPROVED],
}
