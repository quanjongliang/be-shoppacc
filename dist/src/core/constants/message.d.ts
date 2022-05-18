export declare const DRIVER_MESSAGE: {
    REMOVE: {
        SUCCESS: string;
    };
};
export declare const AUTH_MESSAGE: {
    USER: {
        NOT_FOUND: string;
        EXIST: string;
        CONFIRM_PASSWORD: string;
        WRONG_PASSWORD: string;
        SUBMITTED: string;
        ROLE: string;
        UNAUTHORIZED: string;
        WRONG: string;
    };
    TOKEN: {
        EXPIRED: string;
    };
};
export declare const POST_MESSAGE: {
    DELETE: string;
    NOT_FOUND: string;
};
export declare const TAG_MESSAGE: {
    CONFLICT: string;
};
export declare const ACCOUNT_MESSAGE: {
    NOT_FOUND: string;
    SOLD: string;
};
export declare const AUDIT_MESSAGE: {
    STATUS_NOT_FOUND: string;
    NOT_ENOUGH: string;
};
export declare const HISTORY_MESSAGE: {
    NOT_FOUND: string;
};
export declare enum EXPIRES_IN_MINUTE {
    FIVE_MINUTE = 5,
    THIRTY_MINUTE = 30
}
