import { Request } from '@helpers'
import { TDiscussion } from '@ts'

export const getMRDiscussions = async (id: number) =>
  Request.get<TDiscussion[]>(`/merge_requests/${id}/discussions`).then(({ data }) => data)

export const postMRDiscussionReply = async (MRId: number, discussionId: number | string, text: string) =>
  Request.post(encodeURI(`/merge_requests/${MRId}/discussions/${discussionId}/notes?body=${text}`)).catch(console.log)
