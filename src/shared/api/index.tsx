import axios from 'axios'
import { API_BASE_URL } from '../constants'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-API-VERSION': '1',
    'Content-Type': 'application/json'
  },
})