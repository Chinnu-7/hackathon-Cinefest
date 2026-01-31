import React from 'react';
import {
    TrendingUp,
    AlertCircle,
    Clock,
    Video,
    ChevronRight,
    Play
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = ({ setActiveTab }) => {
    const stats = [
        { label: 'Script Readiness', value: '85%', icon: TrendingUp, color: '#c084fc', trend: '+12%' },
        { label: 'Risk Alerts', value: '3', icon: AlertCircle, color: '#fb7185', trend: 'Critical' },
        { label: 'Analyzed Footage', value: '14.2h', icon: Video, color: '#6366f1', trend: '+2h' },
        { label: 'Time Saved', value: '24h', icon: Clock, color: '#2dd4bf', trend: 'Total' },
    ];

    const recentScenes = [
        { title: 'The Heist - Scene 14', risk: 'Low', date: '2h ago', status: 'Analyzed' },
        { title: 'Rainy Night - Scene 02', risk: 'High', date: '5h ago', status: 'Flagged' },
        { title: 'Subway Encounter', risk: 'Medium', date: '1d ago', status: 'Pending' },
    ];

    return (
        <div className="animate-in">
            <header className="dashboard-header">
                <div>
                    <h1 className="gradient-text">Welcome back, Director.</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Project: <span style={{ color: '#fff' }}>"Neon Shadows"</span> • Pre-production</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline">
                        Quick Export
                    </button>
                    <button className="btn btn-primary" onClick={() => setActiveTab('script')}>
                        Resume Planning <ChevronRight size={18} />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-4" style={{ marginBottom: '3rem' }}>
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="glass-card stat-card"
                    >
                        <div className="stat-header">
                            <div className="stat-icon-box" style={{ color: stat.color }}>
                                <stat.icon size={24} />
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: stat.color, background: `${stat.color}15`, padding: '4px 8px', borderRadius: '100px' }}>
                                {stat.trend}
                            </span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>{stat.label}</p>
                        <h2 className="stat-value">{stat.value}</h2>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-2">
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem' }}>Recent Analysis</h3>
                        <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>View All</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {recentScenes.map((scene, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '16px',
                                transition: 'var(--transition)',
                                cursor: 'pointer'
                            }} className="scene-item">
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'var(--primary-glow)',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--primary)'
                                    }}>
                                        <Play size={18} fill="currentColor" />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{scene.title}</h4>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{scene.date} • {scene.status}</span>
                                    </div>
                                </div>
                                <span className={`badge badge-${scene.risk.toLowerCase()}`}>{scene.risk} Risk</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{
                    background: 'linear-gradient(225deg, rgba(192, 132, 252, 0.08) 0%, rgba(3, 3, 3, 0.6) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <div className="badge badge-mid" style={{ marginBottom: '1rem', alignSelf: 'flex-start' }}>AI Alert</div>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', lineHeight: 1.2 }}>Detected costume inconsistency in Scene 14</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem' }}>
                        Our vision AI detected that "Elias" is wearing a different watch than in Scene 12 (Continuity mismatch).
                    </p>
                    <div style={{
                        height: '180px',
                        background: 'rgba(0,0,0,0.5)',
                        borderRadius: '20px',
                        border: '1px solid var(--card-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'var(--primary)' }} />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em' }}>VISUAL COMPARISON ENGINE</span>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '52px' }}>
                        Resolve Inconsistency <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Dashboard;
