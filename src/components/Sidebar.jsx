import React from 'react';
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    Image as ImageIcon,
    Users,
    Search,
    Film,
    Settings,
    ChevronRight,
    Brain,
    Zap,
    History,
    Sparkles,
    LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
    const { activeTab, navigateTo, logout, user } = useApp();

    const menuGroups = [
        {
            title: 'Core Operations',
            items: [
                { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
                { id: 'script', label: 'Script Intelligence', icon: Brain },
                { id: 'intent', label: 'Scene Intent Engine', icon: Zap },
                { id: 'video_previz', label: 'AI Video Previz', icon: Film },
                { id: 'history', label: 'Production History', icon: History },
            ]
        },
        {
            title: 'Creative Engine',
            items: [
                { id: 'visuals', label: 'Visual Worldbuilder', icon: ImageIcon },
                { id: 'storyboard', label: 'AI Storyboard Pro', icon: Sparkles },
                { id: 'sentiment', label: 'Emotional Beats', icon: Users },
            ]
        },
        {
            title: 'Post & Assets',
            items: [
                { id: 'footage', label: 'Aesthetic Search', icon: Search },
                { id: 'takes', label: 'Smart Selection', icon: Film },
            ]
        }
    ];

    return (
        <div className="sidebar">
            <div className="logo-container">
                <div className="logo-box">
                    <Film size={24} color="white" />
                </div>
                <h2 className="logo-text">CineMind</h2>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                    padding: '16px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '16px',
                    border: '1px solid var(--card-border)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, var(--primary), var(--secondary))' }} />
                    <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontWeight: 800 }}>User Profile</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '-0.01em', color: '#fff', textTransform: 'capitalize' }}>{user?.name || 'Guest'}</span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>{user?.role || 'User'}</span>
                        </div>
                        <ChevronRight size={14} color="var(--primary)" />
                    </div>
                </div>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '4px' }}>
                {menuGroups.map((group, gIdx) => (
                    <div key={gIdx}>
                        <h3 style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px', paddingLeft: '14px', fontWeight: 800 }}>
                            {group.title}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {group.items.map((item) => (
                                <div
                                    key={item.id}
                                    className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                                    onClick={() => navigateTo(item.id)}
                                >
                                    <item.icon size={18} className="nav-icon" />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div
                    className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => navigateTo('settings')}
                    role="button"
                >
                    <Settings size={18} />
                    <span>Studio Settings</span>
                </div>
                <div
                    className="nav-item logout-item"
                    onClick={logout}
                    role="button"
                >
                    <LogOut size={18} />
                    <span>Terminate Session</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
