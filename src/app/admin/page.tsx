'use client';

import { useUnlock } from '@/context/UnlockContext';
import { useMembers, Member } from '@/context/MemberContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { Download, Users, Shield, Search, ArrowUpDown, Filter } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
    const { isUnlocked, role } = useUnlock();
    const { members, exportHistory, stats, logExport } = useMembers();
    const router = useRouter();

    // Local State for Search/Sort/Filter
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [sortField, setSortField] = useState<keyof Member>('joined');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        if (role !== 'admin') {
            router.push('/login');
        }
    }, [role, router]);

    // Filtering and Sorting Logic
    const filteredMembers = useMemo(() => {
        let result = [...members];

        // Filter by Status
        if (statusFilter !== 'all') {
            result = result.filter(m => m.status === statusFilter);
        }

        // Filter by Search Term
        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(m =>
                m.name.toLowerCase().includes(lowerSearch) ||
                m.email.toLowerCase().includes(lowerSearch) ||
                m.company.toLowerCase().includes(lowerSearch)
            );
        }

        // Sort
        result.sort((a, b) => {
            const aValue = a[sortField]?.toString().toLowerCase() || '';
            const bValue = b[sortField]?.toString().toLowerCase() || '';
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    }, [members, search, statusFilter, sortField, sortDirection]);

    const toggleSort = (field: keyof Member) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc'); // Default to asc for new field
        }
    };

    const downloadCSV = () => {
        const headers = ['Name', 'Email', 'Company', 'Phone', 'Provider', 'Contact Rate', 'Joined', 'Plan', 'Opt-In'];
        const rows = filteredMembers.map(m => [
            m.name,
            m.email,
            m.company,
            m.phone,
            m.provider,
            `${m.contactRate}%`,
            m.joined,
            m.plan,
            m.optIn ? 'Yes' : 'No'
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `voip_members_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // LOG THE EXPORT
        logExport('Admin User');
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <nav className="bg-slate-900 px-6 py-4 text-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="h-6 w-6 text-red-500" />
                        <span className="text-xl font-bold">Admin Portal</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-sm text-slate-300 hover:text-white">View Dashboard</Link>
                        <button
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = '/';
                            }}
                            className="text-sm font-medium hover:text-red-400"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl p-6 lg:p-8 space-y-8">
                {/* Header & Stats */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Member Database</h1>
                        <p className="text-muted-foreground mt-1">Manage, search, and export registered directory members.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="rounded-lg border bg-card p-4 text-center min-w-[100px]">
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <div className="text-xs text-muted-foreground uppercase font-bold">Total</div>
                        </div>
                        <div className="rounded-lg border bg-card p-4 text-center min-w-[100px]">
                            <div className="text-2xl font-bold text-green-600">+{stats.newToday}</div>
                            <div className="text-xs text-muted-foreground uppercase font-bold">New Today</div>
                        </div>
                        <div className="rounded-lg border bg-card p-4 text-center min-w-[100px]">
                            <div className="text-2xl font-bold text-blue-600">{stats.pro}</div>
                            <div className="text-xs text-muted-foreground uppercase font-bold">Pro Users</div>
                        </div>
                    </div>
                </div>

                {/* Filters & Actions */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl bg-secondary/20 p-4 border">
                    <div className="flex flex-1 items-center gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search name, email, company..."
                                className="w-full rounded-md border bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <select
                                className="rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as any)}
                            >
                                <option value="all">All Status</option>
                                <option value="active">ActiveOnly</option>
                                <option value="inactive">Inactive Only</option>
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={downloadCSV}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 shadow-sm transition-colors"
                    >
                        <Download className="h-4 w-4" />
                        Export CSV
                    </button>
                </div>

                {/* Data Table */}
                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-secondary/50 text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-4 font-medium cursor-pointer hover:text-foreground" onClick={() => toggleSort('name')}>
                                        <div className="flex items-center gap-1">Name <ArrowUpDown className="h-3 w-3" /></div>
                                    </th>
                                    <th className="px-6 py-4 font-medium cursor-pointer hover:text-foreground" onClick={() => toggleSort('email')}>
                                        <div className="flex items-center gap-1">Email <ArrowUpDown className="h-3 w-3" /></div>
                                    </th>
                                    <th className="px-6 py-4 font-medium">Company</th>
                                    <th className="px-6 py-4 font-medium">Provider</th>
                                    <th className="px-6 py-4 font-medium cursor-pointer hover:text-foreground" onClick={() => toggleSort('contactRate')}>
                                        <div className="flex items-center gap-1">Rate <ArrowUpDown className="h-3 w-3" /></div>
                                    </th>
                                    <th className="px-6 py-4 font-medium cursor-pointer hover:text-foreground" onClick={() => toggleSort('joined')}>
                                        <div className="flex items-center gap-1">Joined <ArrowUpDown className="h-3 w-3" /></div>
                                    </th>
                                    <th className="px-6 py-4 font-medium">Role</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredMembers.length > 0 ? (
                                    filteredMembers.map((member) => (
                                        <tr key={member.id} className="hover:bg-secondary/20 transition-colors">
                                            <td className="px-6 py-4 font-medium">{member.name}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{member.email}</td>
                                            <td className="px-6 py-4">{member.company}</td>
                                            <td className="px-6 py-4">{member.provider}</td>
                                            <td className="px-6 py-4">{member.contactRate}%</td>
                                            <td className="px-6 py-4 text-muted-foreground">{member.joined}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${member.plan === 'pro'
                                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                                                    }`}>
                                                    {member.plan.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${member.status === 'active'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}>
                                                    {member.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                                            No members found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t bg-secondary/10 px-6 py-4 text-xs text-muted-foreground flex justify-between">
                        <span>Total Records: {filteredMembers.length}</span>
                        <span>Sorted by: {sortField} ({sortDirection})</span>
                    </div>
                </div>

                {/* Export History */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Export History</h2>
                    <div className="rounded-xl border bg-card overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-secondary/50 text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Date Exported</th>
                                    <th className="px-6 py-3 font-medium">Exported By</th>
                                    <th className="px-6 py-3 font-medium">Records</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {exportHistory.length > 0 ? (
                                    exportHistory.map(record => (
                                        <tr key={record.id}>
                                            <td className="px-6 py-3">{record.date}</td>
                                            <td className="px-6 py-3">{record.adminName}</td>
                                            <td className="px-6 py-3">{record.recordCount} records</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-muted-foreground italic">
                                            No exports recorded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
