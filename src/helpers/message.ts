import { TGitLabUser } from '@ts'

export const getUserInfo = (user: TGitLabUser) => ` ${user.name}(${user.username})<${user.email}>`
