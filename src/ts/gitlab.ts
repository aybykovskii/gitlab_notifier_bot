export enum EventTypes {
  NOTE = 'note',
  MERGE_REQUEST = 'merge_request',
}

export enum NoteableTypes {
  COMMIT = 'Commit',
  MERGE_REQUEST = 'MergeRequest',
  ISSUE = 'Issue',
  SNIPPET = 'Snippet',
}

export enum MergeRequestActionTypes {
  OPEN = 'open',
  CLOSE = 'close',
  REOPEN = 'reopen',
  UPDATE = 'update',
  APPROVED = 'approved',
  UNAPPROVED = 'unapproved',
  APPROVAL = 'approval',
  UNAPPROVAL = 'unapproval',
  MERGE = 'merge',
}

export type TGitLabProject = {
  id: number
  name: string
  description: string
  web_url: string
  avatar_url: string | null
  git_ssh_url: string
  git_http_url: string
  namespace: string
  visibility_level: number
  path_with_namespace: string
  default_branch: string
  homepage: string
  url: string
  ssh_url: string
  http_url: string
}

export type TGitLabUser = {
  id: number
  name: string
  username: string
  avatar_url: string | null
  email: string
}

export type TGitLabRepository = {
  name: string
  url: string
  description: string
  homepage: string
}

export type TCommonObjectAttributes = {
  id: number
  target_branch: string
  source_branch: string
  source_project_id: number
  author_id: number
  assignee_id: number
  title: string
  created_at: string
  updated_at: string
  milestone_id: number | null
  state: string
  blocking_discussions_resolved: boolean
  work_in_progress: boolean
  first_contribution: boolean
  merge_status: string
  target_project_id: number
  description: string
  url: string
}

export type TMergeRequestObjectAttributes = TCommonObjectAttributes & {
  action: MergeRequestActionTypes
}

export type TNoteObjectAttributes = TCommonObjectAttributes & {
  note: string
  noteable_type: NoteableTypes
}

export type TGitLabWebHook = {
  object_kind: EventTypes
  event_type: EventTypes
  user: TGitLabUser
  object_attributes: TNoteObjectAttributes | TMergeRequestObjectAttributes
}
