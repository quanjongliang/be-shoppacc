import { ApiPropertyOptional } from "@nestjs/swagger";

export class NewPasswordDto {
  @ApiPropertyOptional()
  newPassword: string;
  @ApiPropertyOptional()
  confirmNewPassword: string;
}

export class ForgetPasswordDto extends NewPasswordDto {
  @ApiPropertyOptional()
  username: string;
}

export class ChangePasswordDto extends NewPasswordDto {
  @ApiPropertyOptional()
  oldPassword: string;
}
