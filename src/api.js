const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getAuthToken();
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...options,
    };
    
    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }
    
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Erreur API');
        }
        
        return data;
    } catch (error) {
        console.error('Erreur API:', error);
        throw error;
    }
};

// Auth API
export const authAPI = {
    login: async (credentials) => {
        return apiRequest('/auth/login', {
            method: 'POST',
            body: credentials,
        });
    },
    
    register: async (userData) => {
        return apiRequest('/auth/register', {
            method: 'POST',
            body: userData,
        });
    },
    
    logout: async () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        return Promise.resolve();
    },
};

// Tasks API
export const tasksAPI = {
    getAllTasks: async () => {
        return apiRequest('/tasks');
    },
    
    createTask: async (taskData) => {
        return apiRequest('/tasks', {
            method: 'POST',
            body: taskData,
        });
    },
    
    updateTask: async (taskId, taskData) => {
        return apiRequest(`/tasks/${taskId}`, {
            method: 'PUT',
            body: taskData,
        });
    },
    
    deleteTask: async (taskId) => {
        return apiRequest(`/tasks/${taskId}`, {
            method: 'DELETE',
        });
    },
    
    getFilteredTasks: async (filters) => {
        const queryParams = new URLSearchParams();
        
        if (filters.status && filters.status !== 'all') {
            queryParams.append('status', filters.status);
        }
        
        if (filters.priority && filters.priority !== 'all') {
            queryParams.append('priority', filters.priority);
        }
        
        if (filters.search) {
            queryParams.append('search', filters.search);
        }
        
        return apiRequest(`/tasks/filter?${queryParams.toString()}`);
    },
};

// User Logs API
export const userLogsAPI = {
    getAllLogs: async () => {
        return apiRequest('/logs');
    },
    
    createLog: async (logData) => {
        return apiRequest('/logs', {
            method: 'POST',
            body: logData,
        });
    },
    
    deleteLog: async (logId) => {
        return apiRequest(`/logs/${logId}`, {
            method: 'DELETE',
        });
    },
    
    getFilteredLogs: async (filters) => {
        const queryParams = new URLSearchParams();
        
        if (filters.role && filters.role !== 'all') {
            queryParams.append('role', filters.role);
        }
        
        if (filters.action && filters.action !== 'all') {
            queryParams.append('action', filters.action);
        }
        
        if (filters.search) {
            queryParams.append('search', filters.search);
        }
        
        return apiRequest(`/logs/filter?${queryParams.toString()}`);
    },
};

// Admin API
export const adminAPI = {
    getAllUsers: async () => {
        return apiRequest('/admin/users');
    },
    
    updateUser: async (email, userData) => {
        return apiRequest(`/admin/users/${email}`, {
            method: 'PUT',
            body: userData,
        });
    },
    
    deleteUser: async (email) => {
        return apiRequest(`/admin/users/${email}`, {
            method: 'DELETE',
        });
    },
};

// Health Check API
export const healthAPI = {
    checkHealth: async () => {
        return apiRequest('/health');
    },
};

// Export default API object
const API = {
    auth: authAPI,
    tasks: tasksAPI,
    userLogs: userLogsAPI,
    admin: adminAPI,
    health: healthAPI,
};

export default API;