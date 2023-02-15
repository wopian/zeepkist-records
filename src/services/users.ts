import type { UserRankingsResponse, UserResponse } from '@/models/user'
import { api } from '@/services/api'

interface GetUserParameters {
  id?: number
  steamId?: string
}

export const getUser = async ({ id, steamId }: GetUserParameters) => {
  const response = await (id
    ? api.get('users/id', { params: { id } })
    : api.get('users/steamid', { params: { SteamId: steamId } }))

  if (response.status === 200) return response.data as UserResponse
  else {
    throw new Error(response.data.error)
  }
}

interface GetUserRankingsParameters {
  Limit?: number
  Offset?: number
}

export const getUserRankings = async ({
  Limit,
  Offset
}: GetUserRankingsParameters) => {
  const query = {
    Limit,
    Offset
  }
  const response = await api.get('users/rankings', { params: query })

  if (response.status === 200) return response.data as UserRankingsResponse
  else {
    throw new Error(response.data.error)
  }
}
