import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { UserList } from '@/components/admin/UserList';

export default async function AdminPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Basic email check for protection (Replace with your actual admin email)
    // const allowedAdmins = ['admin@dialsignal.io', 'brett@dialsignal.io']; 
    // if (!allowedAdmins.includes(user.email || '')) {
    //    return <div>Access Denied. You are not an admin.</div>;
    // }

    // FETCH USERS (Public profiles are viewable)
    const { data: profiles } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                    Master Admin Dashboard
                </h1>
                <p className="text-slate-500 mt-2">Manage all users and their clean numbers.</p>

                <div className="mt-8">
                    <UserList profiles={profiles || []} />
                </div>
            </div>
        </div>
    );
}
