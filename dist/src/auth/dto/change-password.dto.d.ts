export declare class NewPasswordDto {
    newPassword: string;
    confirmNewPassword: string;
}
export declare class ForgetPasswordDto extends NewPasswordDto {
    username: string;
}
export declare class ChangePasswordDto extends NewPasswordDto {
    oldPassword: string;
}
