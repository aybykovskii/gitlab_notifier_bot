export type TProject = {
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

export type TAuthor = {
  name: string
  email: string
}

export type TUser = TAuthor & {
  id: number
  username: string
  avatar_url: string | null
}

export type TRepository = {
  name: string
  url: string
  description: string
  homepage: string
}

export type TObjectAttributes = {
  id: number
  target_branch: string
  source_branch: string
  title: string
  description: string
  url: string
}

export type TPositionLine = {
  line_code: string
  type: string
  old_line: number | null
  new_line: number
}

export type TPosition = {
  old_path: string
  new_path: string
  position_type: string
  old_line: number | null
  new_line: number
  line_range: {
    start: TPositionLine
    end: TPositionLine
  }
}

export type TCommit = {
  id: string
  title: string
  message: string
  timestamp: string
  url: string
  author: TAuthor
}

export type TMergeRequest = {
  id: number
  iid: number
  target_branch: string
  source_branch: string
  title: string
  description: string
  position: number
}
