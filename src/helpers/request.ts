import axios from 'axios'

import { ENV } from './evironment'

export const Request = axios.create({
  headers: { Authorization: `Bearer ${ENV.GITLAB_AUTH_TOKEN}` },
  baseURL: `https://gitlab.com/api/v4/projects/${ENV.GITLAB_PROJECT_ID}`,
})
