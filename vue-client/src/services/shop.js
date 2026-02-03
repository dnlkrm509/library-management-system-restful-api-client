import { apiFetch } from './api'

export const getResources = (page = 1) =>
  apiFetch(`/?page=${page}`)

export const getResource = (id) =>
  apiFetch(`/resources/${id}`)

export const borrowResource = (resourceId) =>
  apiFetch('/borrow', {
    method: 'POST',
    body: JSON.stringify({ resourceId })
  })

export const getBorrowed = () =>
  apiFetch('/borrow')

export const getBorrowHistory = () =>
  apiFetch('/borrow-history')