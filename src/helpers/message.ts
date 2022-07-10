import { TGitLabUser, TGitLabWebHook } from '@ts'
import { isMRNote, isNote } from '@helpers/gitlab'

export const getUserInfo = (user: TGitLabUser) => `${user.name} (${user.username} - ${user.email})`

export const getNoteLineInfo = (body: TGitLabWebHook) => {
  if (!isNote(body) || !body.object_attributes.position) return ''

  const {
    new_path: filePath,
    line_range: {
      end: { new_line: lineTo },
    },
  } = body.object_attributes.position

  return `<code>${filePath}:${lineTo}</code>`
}

export const getNoteMessage = (body: TGitLabWebHook) => {
  if (!isMRNote(body)) return ''

  const {
    object_attributes: { position, description, url },
    merge_request: { iid, title },
  } = body

  const linesInfo = position ? getNoteLineInfo(body) : ''

  return `
Новый коментарий к <a href="${url}">${title} !${iid}</a>
${getUserInfo(body.user)}
${linesInfo}
${description}
`
}
