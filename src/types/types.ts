// API response
export type ApiResponse = {
    status: number; // HTTP status code
    message: string; // HTTP status msg
    data?: any; // Data returned if is necessary
};
