import { Emoji, IMRNoteWebHook, IMRWebHook, IPipelineWebHook, TUser } from '@ts'
import { EMOJIS, MR_ACTION_EMOJI, PIPELINE_STATUS_EMOJI } from '@constants'

export const getUserInfo = (user: TUser) => `${EMOJIS[Emoji.USER]} ${user.name} (${user.username} - ${user.email})`

export const getNoteLineInfo = (body: IMRNoteWebHook) => {
  if (!body.object_attributes.position) return ''

  const {
    new_path: filePath,
    line_range: {
      end: { new_line: lineTo },
    },
  } = body.object_attributes.position

  return `${EMOJIS[Emoji.LOCATION]} <code>${filePath}:${lineTo}</code>`
}

export const getNoteMessage = (body: IMRNoteWebHook) => {
  const {
    object_attributes: { position, description, url },
    merge_request: { iid, title },
  } = body

  const linesInfo = position ? getNoteLineInfo(body) : ''

  return `
${EMOJIS[Emoji.COMMENT]} Новый коментарий к <a href="${url}">${title} !${iid}</a>
${getUserInfo(body.user)}
${linesInfo}
${EMOJIS[Emoji.DESCRIPTION]} ${description}
`
}

export const getPipelineMessage = (body: IPipelineWebHook) => {
  const {
    object_attributes: { id, status },
    commit: { title, url },
    project: { web_url },
  } = body

  return `${PIPELINE_STATUS_EMOJI[status]} Pipeline status: ${status}
<a href="${url}">${title}</a>
<a href="${web_url}/-/pipelines/${id}">Pipeline #${id}</a>
`
}

export const getMRMessage = (body: IMRWebHook) => {
  const {
    object_attributes: { source_branch, target_branch, title, action, url, iid },
    user,
  } = body

  return `${MR_ACTION_EMOJI[action]} <a href="${url}">${title} !${iid}</a> ${action}
<code>${source_branch}</code> ${EMOJIS[Emoji.ARROW_RIGHT]} <code>${target_branch}</code> 
${getUserInfo(user)}
`
}
