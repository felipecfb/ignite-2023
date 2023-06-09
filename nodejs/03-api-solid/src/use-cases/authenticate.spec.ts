import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(inMemoryUsersRepository)
  })

  it('should be able to authenticate', async () => {
    await inMemoryUsersRepository.create({
      name: 'Mario Stevenson',
      email: 'kaw@kiwarfo.gi',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'kaw@kiwarfo.gi',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'zoc@foshud.tr',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUsersRepository.create({
      name: 'Mario Stevenson',
      email: 'kaw@kiwarfo.gi',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'kaw@kiwarfo.gi',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
