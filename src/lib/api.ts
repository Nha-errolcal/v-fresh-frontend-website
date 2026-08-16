// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { BASE_URL } from "@/core/env"

interface ApiError {
    message: string;
    status: number;
}

interface RequestOptions extends RequestInit {
    withAuth?: boolean;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { withAuth = false, headers, ...rest } = options;

    const token = withAuth && typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...rest,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
        },
    });

    if (res.status === 401 && withAuth && typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    }

    if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        const error: ApiError = {
            message: errorBody?.message || `Request failed with status ${res.status}`,
            status: res.status,
        };
        throw error;
    }

    if (res.status === 204) return null as T;
    return res.json();
}

function createClient(withAuth: boolean) {
    return {
        GET: <T>(endpoint: string, params?: Record<string, string | number | boolean>) => {
            const query = params
                ? '?' + new URLSearchParams(params as Record<string, string>).toString()
                : '';
            return request<T>(`${endpoint}${query}`, { method: 'GET', withAuth });
        },

        POST: <T>(endpoint: string, data?: unknown) =>
            request<T>(endpoint, {
                method: 'POST',
                body: data ? JSON.stringify(data) : undefined,
                withAuth,
            }),

        PATCH: <T>(endpoint: string, data?: unknown) =>
            request<T>(endpoint, {
                method: 'PATCH',
                body: data ? JSON.stringify(data) : undefined,
                withAuth,
            }),

        PUT: <T>(endpoint: string, data?: unknown) =>
            request<T>(endpoint, {
                method: 'PUT',
                body: data ? JSON.stringify(data) : undefined,
                withAuth,
            }),

        DELETE: <T>(endpoint: string) =>
            request<T>(endpoint, { method: 'DELETE', withAuth }),
    };
}

export const publicApi = createClient(false);

export const privateApi = createClient(true);


// import { publicApi, privateApi } from '@/libs/apiRequest';

// // Public route — e.g. login, register, public job listings
// const result = await publicApi.POST('/auth/login', { username, password });

// // Private route — e.g. food CRUD
// const foods = await privateApi.GET<food[]>('/food');
// await privateApi.PATCH(`/food/${id}`, { name: 'Updated' });