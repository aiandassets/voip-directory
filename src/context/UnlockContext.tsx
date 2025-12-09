'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'guest' | 'member' | 'admin' | 'pro';

interface UnlockContextType {
    isUnlocked: boolean;
    unlock: (email: string) => void;
    role: UserRole;
    logout: () => void;
    searchCount: number;
    incrementSearchCount: () => void;
    login: (role: UserRole, email: string) => void;
    toolUsageCount: number;
    incrementToolUsage: () => void;
}

const UnlockContext = createContext<UnlockContextType | undefined>(undefined);

export function UnlockProvider({ children }: { children: React.ReactNode }) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [role, setRole] = useState<UserRole>('guest');
    const [searchCount, setSearchCount] = useState(0);
    const [toolUsageCount, setToolUsageCount] = useState(0);

    useEffect(() => {
        // Check unlock status
        const unlocked = localStorage.getItem('voip-directory-unlocked');
        if (unlocked === 'true') {
            setIsUnlocked(true);
        }

        // Check role
        const storedRole = localStorage.getItem('voip-directory-role');
        if (storedRole && (storedRole === 'member' || storedRole === 'admin' || storedRole === 'pro')) {
            setRole(storedRole as UserRole);
            setIsUnlocked(true);
        }
        // ...
        // ...
        const login = (newRole: UserRole, newEmail: string) => {
            localStorage.setItem('voip-directory-unlocked', 'true');
            localStorage.setItem('voip-directory-role', newRole);
            localStorage.setItem('voip-directory-email', newEmail);
            setIsUnlocked(true);
            setRole(newRole);
        };

        // Check search count
        const count = localStorage.getItem('voip-directory-search-count');
        if (count) {
            setSearchCount(parseInt(count, 10));
        }

        // Check tool usage count
        const toolCount = localStorage.getItem('voip-directory-tool-usage');
        if (toolCount) {
            setToolUsageCount(parseInt(toolCount, 10));
        }
    }, []);

    const unlock = (email: string) => {
        localStorage.setItem('voip-directory-unlocked', 'true');
        localStorage.setItem('voip-directory-email', email);

        // Simple admin check for demo purposes
        if (email === 'admin@voip.com') {
            localStorage.setItem('voip-directory-role', 'admin');
            setRole('admin');
        } else {
            localStorage.setItem('voip-directory-role', 'member');
            setRole('member');
        }

        setIsUnlocked(true);
    };

    const login = (newRole: UserRole, newEmail: string) => {
        localStorage.setItem('voip-directory-unlocked', 'true');
        localStorage.setItem('voip-directory-role', newRole);
        localStorage.setItem('voip-directory-email', newEmail);
        setIsUnlocked(true);
        setRole(newRole);
    };

    const logout = () => {
        localStorage.removeItem('voip-directory-unlocked');
        localStorage.removeItem('voip-directory-email');
        localStorage.removeItem('voip-directory-role');
        setIsUnlocked(false);
        setRole('guest');
    };

    const incrementSearchCount = () => {
        const newCount = searchCount + 1;
        setSearchCount(newCount);
        localStorage.setItem('voip-directory-search-count', newCount.toString());
    };

    const incrementToolUsage = () => {
        const newCount = toolUsageCount + 1;
        setToolUsageCount(newCount);
        localStorage.setItem('voip-directory-tool-usage', newCount.toString());
    };

    return (
        <UnlockContext.Provider value={{ isUnlocked, unlock, role, logout, searchCount, incrementSearchCount, login, toolUsageCount, incrementToolUsage }}>
            {children}
        </UnlockContext.Provider>
    );
}

export function useUnlock() {
    const context = useContext(UnlockContext);
    if (context === undefined) {
        throw new Error('useUnlock must be used within an UnlockProvider');
    }
    return context;
}
