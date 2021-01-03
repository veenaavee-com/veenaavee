export interface ApiResponse<T> {
    status: string;
    message: string;
    payload: T;
}
