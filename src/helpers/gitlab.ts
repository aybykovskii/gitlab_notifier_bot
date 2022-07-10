import { IMRNoteWebHook, IPipelineWebHook, TGitLabWebHook, NoteableTypes, ObjectKindTypes, IMRWebHook } from '@ts'

export const isMergeRequest = (webHook: TGitLabWebHook): webHook is IMRWebHook =>
  webHook.object_kind === ObjectKindTypes.MERGE_REQUEST

export const isNote = (webHook: TGitLabWebHook): webHook is IMRNoteWebHook =>
  webHook.object_kind === ObjectKindTypes.NOTE

export const compareNoteableType = <WHT extends IMRNoteWebHook>(webHook: WHT, type: NoteableTypes) =>
  webHook.object_attributes.noteable_type === type

export const isMRNote = (webHook: TGitLabWebHook): webHook is IMRNoteWebHook =>
  isNote(webHook) && compareNoteableType(webHook, NoteableTypes.MERGE_REQUEST)

export const isPipeline = (webHook: TGitLabWebHook): webHook is IPipelineWebHook =>
  webHook.object_kind === ObjectKindTypes.PIPELINE
