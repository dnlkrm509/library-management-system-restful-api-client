import { apiFetch } from './api'

export const login = (email, password) =>
  apiFetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })

export const signup = (email, password, confirmPassword) =>
  apiFetch('/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, confirmPassword })
  })

export const resetPassword = (email) =>
  apiFetch('/reset', {
    method: 'POST',
    body: JSON.stringify({ email })
  })

export const setNewPassword = (userId, token, password) =>
  apiFetch('/new-password', {
    method: 'POST',
    body: JSON.stringify({ userId, token, password })
  })