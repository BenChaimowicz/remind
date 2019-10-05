
export interface TokenItem {
    expiry: number;
    userName?: string;
    email?: string;
    token: Object;
}

export interface TokenData {
    userId?: number;
    email?: string;
}