export declare const hashedPassword: (password: string) => Promise<string>;
export declare const checkIsMatchPassword: (password: string, hashedPassword: string) => Promise<boolean>;
