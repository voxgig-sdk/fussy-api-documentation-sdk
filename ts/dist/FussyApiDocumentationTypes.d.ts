export interface GraphQl {
    data?: Record<string, any>;
    errors?: any[];
    message?: string;
    operationName?: string;
    query: string;
    variables?: Record<string, any>;
}
export interface GraphQlListMatch {
    operation_name?: string;
    query: string;
    variable?: string;
}
export interface GraphQlCreateData {
    data?: Record<string, any>;
    errors?: any[];
    message?: string;
    operationName?: string;
    query: string;
    variables?: Record<string, any>;
}
