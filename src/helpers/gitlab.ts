import {
  EventTypes,
  NoteableTypes,
  TGitLabWebHook,
  TMergeRequestObjectAttributes,
  TMRNoteWebHook,
  TNoteObjectAttributes,
} from '@ts'

export const isMergeRequest = (
  webHook: TGitLabWebHook
): webHook is TGitLabWebHook & { object_attributes: TMergeRequestObjectAttributes } =>
  webHook.event_type === EventTypes.MERGE_REQUEST

export const isNote = (
  webHook: TGitLabWebHook
): webHook is TGitLabWebHook & { object_attributes: TNoteObjectAttributes } => webHook.event_type === EventTypes.NOTE

export const compareNoteableType = <WHT extends { object_attributes: TNoteObjectAttributes }>(
  webHook: WHT,
  type: NoteableTypes
) => webHook.object_attributes.noteable_type === type

export const isMRNote = (webHook: TGitLabWebHook): webHook is TMRNoteWebHook =>
  isNote(webHook) && compareNoteableType(webHook, NoteableTypes.MERGE_REQUEST)
