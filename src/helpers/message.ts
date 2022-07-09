import { TGitLabUser, TGitLabWebHook } from '@ts'
import { isNote } from '@helpers/gitlab'

export const getUserInfo = (user: TGitLabUser) => ` ${user.name}(${user.username})<${user.email}>`

export const getNoteLineInfo = (body: TGitLabWebHook) => {
  if (!isNote(body)) return ''

  const lineFrom = body.object_attributes.position?.line_range.start.new_line
  const lineTo = body.object_attributes.position?.line_range.end.new_line

  if (lineFrom === lineTo) return `для строки ${lineTo}`

  return `со строки ${lineFrom} до строки ${lineTo}`
}

export const getNoteMessage = (body: TGitLabWebHook) =>
  isNote(body) &&
  `
${getUserInfo(body.user)}
Оставил новый комментарий ${body.object_attributes?.position ? getNoteLineInfo(body) : ''}: ${
    body.object_attributes.description
  }
${body.object_attributes.url}
`
