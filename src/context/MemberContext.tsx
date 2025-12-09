'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Member {
    id: string;
    name: string;
    email: string;
    company: string;
    phone: string;
    provider: string; // Current provider they are using
    contactRate: string; // Reported contact rate
    joined: string; // Date string
    status: 'active' | 'inactive';
    plan: 'free' | 'pro';
    optIn: boolean;
}

export interface ExportRecord {
    id: string;
    date: string;
    adminName: string;
    recordCount: number;
}

interface MemberContextType {
    members: Member[];
    exportHistory: ExportRecord[];
    stats: {
        total: number;
        newToday: number;
        pro: number;
        free: number;
    };
    addMember: (data: Partial<Member>) => void;
    logExport: (adminName: string) => void;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export function MemberProvider({ children }: { children: React.ReactNode }) {
    const [members, setMembers] = useState<Member[]>([]);
    const [exportHistory, setExportHistory] = useState<ExportRecord[]>([]);

    // Initialize from LocalStorage or Mock Data
    useEffect(() => {
        const storedMembers = localStorage.getItem('voip-directory-members');
        const storedExports = localStorage.getItem('voip-directory-exports');

        if (storedMembers) {
            setMembers(JSON.parse(storedMembers));
        } else {
            // Seed with some mock data if empty for demo feeling
            const initialMock: Member[] = [
                { id: '1', name: 'Frank Miller', email: 'frank@salescorp.com', company: 'SalesCorp', phone: '555-0101', provider: 'Ricochet360', contactRate: '41', joined: '2023-10-15', status: 'active', plan: 'pro', optIn: true },
                { id: '2', name: 'Sarah Jones', email: 'sarah@techflow.io', company: 'TechFlow', phone: '555-0102', provider: 'RingCentral', contactRate: '15', joined: '2023-11-20', status: 'active', plan: 'free', optIn: true },
                { id: '3', name: 'Mike Ross', email: 'mike@lawfirm.net', company: 'Pearson Specter', phone: '555-0103', provider: 'Five9', contactRate: '18', joined: '2023-12-05', status: 'active', plan: 'free', optIn: false },
            ];
            setMembers(initialMock);
            localStorage.setItem('voip-directory-members', JSON.stringify(initialMock));
        }

        if (storedExports) {
            setExportHistory(JSON.parse(storedExports));
        }
    }, []);

    const addMember = (data: Partial<Member>) => {
        const newMember: Member = {
            id: crypto.randomUUID(),
            name: data.name || 'Unknown',
            email: data.email || '',
            company: data.company || '',
            phone: data.phone || '',
            provider: data.provider || 'Unknown',
            contactRate: data.contactRate || '0',
            joined: new Date().toISOString().split('T')[0],
            status: 'active',
            plan: 'free', // Default new signups to free
            optIn: data.optIn || false,
        };

        const updatedMembers = [newMember, ...members];
        setMembers(updatedMembers);
        localStorage.setItem('voip-directory-members', JSON.stringify(updatedMembers));
    };

    const logExport = (adminName: string) => {
        const newRecord: ExportRecord = {
            id: crypto.randomUUID(),
            date: new Date().toLocaleString(),
            adminName,
            recordCount: members.length
        };
        const updatedHistory = [newRecord, ...exportHistory];
        setExportHistory(updatedHistory);
        localStorage.setItem('voip-directory-exports', JSON.stringify(updatedHistory));
    };

    // derived stats
    const stats = {
        total: members.length,
        newToday: members.filter(m => m.joined === new Date().toISOString().split('T')[0]).length,
        pro: members.filter(m => m.plan === 'pro').length,
        free: members.filter(m => m.plan === 'free').length,
    };

    return (
        <MemberContext.Provider value={{ members, exportHistory, stats, addMember, logExport }}>
            {children}
        </MemberContext.Provider>
    );
}

export function useMembers() {
    const context = useContext(MemberContext);
    if (context === undefined) {
        throw new Error('useMembers must be used within a MemberProvider');
    }
    return context;
}
