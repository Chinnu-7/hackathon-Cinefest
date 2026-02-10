import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('cineMindUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (email, password) => {
        try {
            const response = await apiService.auth.login({ email, password });
            if (response.success) {
                const userData = response.user;
                setUser(userData);
                localStorage.setItem('cineMindUser', JSON.stringify(userData));
                return { success: true };
            }
            return { success: false, error: response.message || 'Login failed' };
        } catch (err) {
            return { success: false, error: err.message || 'Server connection failed' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('cineMindUser');
        setActiveTab('dashboard');
    };

    const navigateTo = (tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AppContext.Provider value={{
            activeTab,
            navigateTo,
            user,
            login,
            logout,
            isLoggedIn: !!user
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
