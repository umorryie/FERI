export interface ErrorHandler {
    status: number;
    message: string;
    name?: string;
    oauthError?: FacebookOAuthError;
}

interface FacebookOAuthError {
    statusCode?: number;
    data?: string;
}
