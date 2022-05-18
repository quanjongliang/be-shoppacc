/// <reference types="multer" />
import { USER_ROLE } from '@/entity';
export declare const NAME_APP_COMPANY = "Tempest Genshin";
export declare const MAILER_CONFIG: {
    HOST: string;
    PORT: number;
    SECURE: boolean;
    USER: string;
    PASS: string;
    TEMPLATE_DIR: string;
    FROM: string;
};
export declare const DRIVE_CONFIG: {
    PROJECT_ID: string;
    AUTH_URL: string;
    TOKEN_URI: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    REFRESH_TOKEN: string;
    REDIRECT_URI: string;
    ROLE: {
        READER: string;
    };
    TYPE: {
        ANYONE: string;
    };
    FIELDS: string;
    SCOPES: string[];
    TOKEN_PATH: string;
    API_KEY: string;
};
export declare const MULTER_CONFIG: {
    DESTINATION: string;
    CONFIG: {
        storage: import("multer").StorageEngine;
    };
};
export declare const JWT_CONFIG: {
    SECRET: string;
    EXPIRES_IN: string;
};
export declare const JWT_EMAIL_CONFIG: {
    secret: string;
    expiresIn: string;
};
export declare const ROLE_CONTEXT = "roles";
export declare const POST_CONFIG: {
    LENGTH: {
        MIN: number;
    };
    LIMIT: number;
};
export declare const MOD_ADMIN_ROLE: USER_ROLE[];
export declare const CLOUDINARY_CONFIG: {
    NAME: string;
    API_KEY: string;
    API_SECRET: string;
    API_ENV: string;
};
export declare const DEFAULT_CONFIG: {
    LIMIT: number;
    OFFSET: number;
};
export declare const TIM_DANG_EMAIL = "dft1711198@gmail.com";
export declare const QUILL_LIANG_EMAIL = "lhongquan.1998@gmail.com";
