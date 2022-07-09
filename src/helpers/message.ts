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

  const fileInfo = `Файл: <code>${filePath}</code>`

  if (lineFrom === lineTo) return `${fileInfo}. Строка ${lineTo}`

  return ` ${fileInfo}. Строки: ${lineFrom} - ${lineTo}`
}

export const getNoteMessage = (body: TGitLabWebHook) => {
  if (!isMRNote(body)) return ''

  const {
    object_attributes: { position, description, url },
    merge_request: { iid, title },
  } = body

  const linesInfo = position ? getNoteLineInfo(body) : ''

  return `
Новый коментарий к <a href="${url}">!${iid}-${title}</a>
${getUserInfo(body.user)}
${linesInfo}
${description}
`
}
