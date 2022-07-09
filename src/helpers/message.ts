import { TGitLabUser, TGitLabWebHook } from '@ts'
import { isMRNote, isNote } from '@helpers/gitlab'

export const getUserInfo = (user: TGitLabUser) => `<b>${user.name} </b> (${user.username} - ${user.email})`

export const getNoteLineInfo = (body: TGitLabWebHook) => {
  if (!isNote(body) || !body.object_attributes.position) return ''

  const {
    new_path: filePath,
    line_range: {
      start: { new_line: lineFrom },
      end: { new_line: lineTo },
    },
  } = body.object_attributes.position

  const fileInfo = `в файле <code>${filePath}</code>`

  if (lineFrom === lineTo) return `для строки ${lineTo} ${fileInfo}`

  return `со строки ${lineFrom} до строки ${lineTo} ${fileInfo}`
}

export const getNoteMessage = (body: TGitLabWebHook) => {
  if (!isMRNote(body)) return ''

  const {
    object_attributes: { position, description, url },
    merge_request: { id },
  } = body

  const linesInfo = position ? getNoteLineInfo(body) : ''

  return `
${getUserInfo(body.user)}
Оставил новый комментарий ${linesInfo}: ${description}
<a href="${url}">!${id}</a>
`
}
