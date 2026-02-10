/**
 * CineMind API Service
 * Centralized service for all backend/AI communications.
 * To integrate with a real backend, replace the base URL and mock delays.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = 'API Request Failed';
        try {
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        } catch (e) {
            errorMessage = await response.text() || errorMessage;
        }
        throw new Error(errorMessage);
    }
    return response.json();
};

export const apiService = {
    // Authentication
    auth: {
        login: async (credentials) => {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            return handleResponse(response);
        },
        register: (data) => {
            return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
        }
    },

    // Script Intelligence
    script: {
        analyze: async (formData) => {
            const response = await fetch(`${API_BASE_URL}/script/analyze`, {
                method: 'POST',
                body: formData // Multer expects FormData
            });
            return handleResponse(response);
        },
        getHistory: async (userId = 1) => {
            const response = await fetch(`${API_BASE_URL}/script/history?userId=${userId}`);
            return handleResponse(response);
        }
    },

    // Dashboard Insights
    dashboard: {
        getStats: async () => {
            const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
            return handleResponse(response);
        }
    },

    // AI Vision & Video
    vision: {
        analyzeSentiment: (videoFile) => {
            return new Promise((resolve) => setTimeout(() => resolve({
                frames: [],
                dominantEmotion: 'Tension',
                confidence: 0.94
            }), 4000));
        },
        searchFootage: async (query) => {
            const response = await fetch(`${API_BASE_URL}/footage/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            return handleResponse(response);
        },
        generateVideo: async (sceneId, prompt) => {
            const response = await fetch(`${API_BASE_URL}/video/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sceneId, prompt })
            });
            return handleResponse(response);
        }
    },

    // Creative Engine
    creative: {
        generateMoodboard: (prompt) => {
            return new Promise((resolve) => setTimeout(() => resolve({
                images: ['url1', 'url2'],
                suggestedColors: ['#001219', '#005f73']
            }), 3000));
        },
        extractIntent: async (scriptSnippet) => {
            const response = await fetch(`${API_BASE_URL}/creative/intent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ snippet: scriptSnippet })
            });
            return handleResponse(response);
        }
    }
};
