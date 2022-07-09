import { TGitLabUser, TGitLabWebHook } from '@ts'
import { isMRNote, isNote } from '@helpers/gitlab'

export const getUserInfo = (user: TGitLabUser) => `
<span>
<b>${user.name} </b> (${user.username})<${user.email}>
</span>
`

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
<div>${getUserInfo(body.user)}</div>
<div>Оставил новый комментарий ${linesInfo}: ${description}</div>
<a href="${url}">!${id}</a>
`
}
