import { USER_ROLE } from "@/entity";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiPropertyOptional()
  email: string;
}

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @ApiPropertyOptional()
  username: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  role: USER_ROLE;
}

export class LoginUserDto {
  @ApiPropertyOptional()
  username: string;
  @ApiPropertyOptional()
  password: string;
}
