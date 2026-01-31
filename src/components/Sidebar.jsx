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
    Plus,
    ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'script', label: 'Script Analysis', icon: FileText },
        { id: 'feasibility', label: 'Feasibility', icon: BarChart3 },
        { id: 'visuals', label: 'Visual Planning', icon: ImageIcon },
        { id: 'continuity', label: 'Continuity', icon: Users },
        { id: 'footage', label: 'Footage Search', icon: Search },
        { id: 'takes', label: 'Take Selection', icon: Film },
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
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--primary)' }} />
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Active Project</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, letterSpacing: '-0.01em' }}>Neon Shadows</span>
                        <ChevronRight size={14} color="var(--text-muted)" />
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '48px' }}>
                    <Plus size={18} /> New Project
                </button>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <item.icon size={20} className="nav-icon" />
                        <span>{item.label}</span>
                    </div>
                ))}
            </nav>

            <div className="nav-item" style={{ marginTop: 'auto', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem', borderRadius: 0 }}>
                <Settings size={20} />
                <span>Settings</span>
            </div>
        </div>
    );
};


export default Sidebar;
