import { api } from '@/lib/axios'

interface UpdateProfileBody {
  name: string
  description: string
}

export async function updateProfile({ name, description }: UpdateProfileBody) {
  throw new Error('')

  await api.put('/profile', { name, description })
}
