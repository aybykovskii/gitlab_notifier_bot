import { TCommit, TMergeRequest, TObjectAttributes, TPosition, TProject, TRepository, TUser } from './common'

export enum ObjectKindTypes {
  NOTE = 'note',
  MERGE_REQUEST = 'merge_request',
  PIPELINE = 'pipeline',
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

export enum PipelineStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export type TMRObjectAttributes = TObjectAttributes & {
  target_branch: string
  source_branch: string
  action: MergeRequestActionTypes
}

export type TNoteObjectAttributes = TObjectAttributes & {
  note: string
  noteable_type: NoteableTypes
  position?: TPosition
}

export type TPipelineObjectAttributes = TObjectAttributes & {
  status: PipelineStatus
}

export type TGitLabWebHook = {
  object_kind: ObjectKindTypes
  user: TUser
  object_attributes: TNoteObjectAttributes | TMRObjectAttributes | TPipelineObjectAttributes
}

export interface IMRWebHook extends TGitLabWebHook {
  object_attributes: TMRObjectAttributes
}

export interface IMRNoteWebHook extends TGitLabWebHook {
  object_kind: ObjectKindTypes.NOTE
  object_attributes: TNoteObjectAttributes
  project: TProject
  merge_request: TMergeRequest
  repository: TRepository
}

export interface IPipelineWebHook extends TGitLabWebHook {
  user: TUser
  object_attributes: TPipelineObjectAttributes
  commit: TCommit
  project: TProject
}
