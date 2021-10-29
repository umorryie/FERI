export interface User {
    role: string;
    userId: string;
    exp: string | number;
}
export interface UserToken {
    token: string;
    id: string;
    refreshToken: string;
}

export interface FacebookPayload {
    email?: string;
    sub: string;
}
