import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConfigKey, SecurityConfig } from '~/config/config.interface'
import { compare, hash } from 'bcrypt'

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {
    this.config = configService.get<SecurityConfig>(ConfigKey.Security)!
  }

  private readonly config: SecurityConfig

  get bcryptSaltRounds(): string | number {
    const { bcryptSaltOrRound } = this.config

    return Number.isInteger(Number(bcryptSaltOrRound))
      ? Number(bcryptSaltOrRound)
      : bcryptSaltOrRound
  }

  validate = (original: string, hashed: string) => compare(original, hashed)
  make = (value: string) => hash(value, this.bcryptSaltRounds)
}
