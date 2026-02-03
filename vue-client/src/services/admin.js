import { apiFetch } from './api'

export const getAdminResources = () =>
  apiFetch('/admin/resources')

export const getResourceForEdit = (id) =>
  apiFetch(`/admin/resource/${id}`)

export const saveResource = (payload, id) =>
  apiFetch(id ? `/admin/edit-resource/${id}` : '/admin/add-resource', {
    method: id ? 'PUT' : 'POST',
    body: JSON.stringify(payload)
  })

export const deleteResource = (id) =>
  apiFetch(`/admin/resource/${id}`, { method: 'DELETE' })