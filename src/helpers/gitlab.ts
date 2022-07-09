import { EventTypes, TGitLabWebHook, TMergeRequestObjectAttributes, TNoteObjectAttributes } from '@ts'

export const isMergeRequest = (
  webHook: TGitLabWebHook
): webHook is TGitLabWebHook & { object_attributes: TMergeRequestObjectAttributes } =>
  webHook.event_type === EventTypes.MERGE_REQUEST

export const isNote = (
  webHook: TGitLabWebHook
): webHook is TGitLabWebHook & { object_attributes: TNoteObjectAttributes } => webHook.event_type === EventTypes.NOTE
