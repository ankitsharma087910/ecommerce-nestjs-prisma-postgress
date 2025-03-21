import { plainToInstance } from "class-transformer";
import { IsInt, IsNotEmpty, IsUrl, validateSync } from "class-validator";


export class EnvConfig {
  @IsNotEmpty()
  @IsInt()
  BCRYPT_SALT_ROUNDS: number;

  @IsUrl({
    protocols: ['postgresql'], // Allow standard PostgreSQL protocol
    require_tld: false, // Allow hosts without a TLD (e.g., localhost or Neon’s custom domains)
    allow_query_components: true, // Allow query params like ?sslmode=require
  })
  @IsNotEmpty()
  DATABASE_URL: string;

}

/**
 * Validates environment variables.
 * Throws an error if validation fails.
 */
export function validateConfig(config: Record<string, any>) {
  const validatedConfig = plainToInstance(EnvConfig, config, {
    enableImplicitConversion: true, // Automatically convert string to number
  });
  // Manually validate the DTO
  const errors = validateSync(validatedConfig);
  if (errors.length > 0) {
    throw new Error(`Config validation error: ${JSON.stringify(errors)}`);
  }

  return validatedConfig;
}
