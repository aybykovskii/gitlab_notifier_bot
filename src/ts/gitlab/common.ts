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

export type TGitLabCommitAuthor = {
  name: string
  email: string
}

export type TGitLabUser = TGitLabCommitAuthor & {
  id: number
  username: string
  avatar_url: string | null
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
  title: string
  description: string
  url: string
}

export type TNodePositionLine = {
  line_code: string
  type: string
  old_line: number | null
  new_line: number
}

export type TNotePosition = {
  old_path: string
  new_path: string
  position_type: string
  old_line: number | null
  new_line: number
  line_range: {
    start: TNodePositionLine
    end: TNodePositionLine
  }
}

export type TGitLabCommit = {
  id: string
  message: string
  timestamp: string
  url: string
  author: TGitLabCommitAuthor
}

export type TGitLabMergeRequest = {
  id: number
  iid: number
  target_branch: string
  source_branch: string
  title: string
  description: string
  position: number
}

export type TMergeRequestObjectAttributes = TCommonObjectAttributes & {
  action: MergeRequestActionTypes
}

export type TNoteObjectAttributes = TCommonObjectAttributes & {
  note: string
  noteable_type: NoteableTypes
  position?: TNotePosition
}

export type TGitLabWebHook = {
  object_kind: EventTypes
  event_type: EventTypes
  user: TGitLabUser
  object_attributes: TNoteObjectAttributes | TMergeRequestObjectAttributes
}

export interface TMRNoteWebHook extends TGitLabWebHook {
  object_kind: EventTypes.NOTE
  event_type: EventTypes.NOTE
  object_attributes: TNoteObjectAttributes
  project: TGitLabProject
  merge_request: TGitLabMergeRequest
}
