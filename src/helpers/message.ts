import { IMRNoteWebHook, IPipelineWebHook, TUser } from '@ts'

export const getUserInfo = (user: TUser) => `${user.name} (${user.username} - ${user.email})`

export const getNoteLineInfo = (body: IMRNoteWebHook) => {
  if (!body.object_attributes.position) return ''

  const {
    new_path: filePath,
    line_range: {
      end: { new_line: lineTo },
    },
  } = body.object_attributes.position

  return `<code>${filePath}:${lineTo}</code>`
}

export const getNoteMessage = (body: IMRNoteWebHook) => {
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

export const getPipelineMessage = (body: IPipelineWebHook) => {
  const {
    object_attributes: { id, status },
    commit: { title, url },
    project: { web_url },
  } = body

  return `Pipline status: ${status}
<a href="${url}">${title}</a>
<a href="${web_url}/-/pipelines/${id}">Pipeline #${id}</a>
`
}
