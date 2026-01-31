import React from 'react';
import { Shield, Target, Zap, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Feasibility = () => {
    const scenes = [
        { id: '14', name: 'The Subway Chase', score: 65, status: 'Moderate', factors: ['Stunts', 'Crowd', 'Night'] },
        { id: '02', name: 'Intro: Elias Apartment', score: 92, status: 'Low', factors: ['Single Loc', 'Day'] },
        { id: '21', name: 'The Rooftop Finale', score: 34, status: 'High', factors: ['VFX', 'Heights', 'Weather'] },
    ];

    return (
        <div className="animate-in">
            <header className="dashboard-header">
                <div>
                    <h1 className="gradient-text">Feasibility Intelligence</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Project: <span style={{ color: '#fff' }}>"Neon Shadows"</span> • AI Risk & Budget Prediction</p>
                </div>
            </header>

            <div className="grid grid-cols-3" style={{ marginBottom: '3rem' }}>
                <div className="glass-card stat-card">
                    <div className="stat-header">
                        <div className="stat-icon-box" style={{ color: 'var(--secondary)' }}>
                            <Shield size={24} />
                        </div>
                        <span className="badge badge-low">Optimal</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Production Safety Score</p>
                    <h2 className="stat-value">82%</h2>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: '82%', background: 'var(--secondary)', boxShadow: '0 0 12px rgba(45, 212, 191, 0.4)' }} />
                    </div>
                </div>

                <div className="glass-card stat-card">
                    <div className="stat-header">
                        <div className="stat-icon-box" style={{ color: 'var(--primary)' }}>
                            <Target size={24} />
                        </div>
                        <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.1)', color: 'var(--primary)' }}>PRECISE</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Shooting Precision</p>
                    <h2 className="stat-value">High</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Matching script complexity to dynamic budget</p>
                </div>

                <div className="glass-card stat-card">
                    <div className="stat-header">
                        <div className="stat-icon-box" style={{ color: 'var(--accent)' }}>
                            <Zap size={24} />
                        </div>
                        <span className="badge badge-high">Action Required</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Critical Risk Zones</p>
                    <h2 className="stat-value">3 Scenes</h2>
                    <p style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600 }}>Complex stunts & VFX detected</p>
                </div>
            </div>

            <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem' }}>Scene-by-Scene Risk Breakdown</h3>
                    <button className="btn btn-outline" style={{ height: '40px' }}>Export Detailed Report</button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
                                <th style={{ padding: '12px 20px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scene #</th>
                                <th style={{ padding: '12px 20px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</th>
                                <th style={{ padding: '12px 20px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feasibility Score</th>
                                <th style={{ padding: '12px 20px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Risk Level</th>
                                <th style={{ padding: '12px 20px', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary Factors</th>
                                <th style={{ padding: '12px 20px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {scenes.map((scene, i) => (
                                <tr key={i} style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    transition: 'var(--transition)',
                                    cursor: 'pointer'
                                }} className="table-row-hover">
                                    <td style={{ padding: '16px 20px', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>{scene.id}</td>
                                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>{scene.name}</td>
                                    <td style={{ padding: '16px 20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: `${scene.score}%`,
                                                    height: '100%',
                                                    background: scene.score > 80 ? 'var(--secondary)' : (scene.score > 50 ? 'var(--primary)' : 'var(--accent)'),
                                                    boxShadow: `0 0 10px ${scene.score > 80 ? 'rgba(45, 212, 191, 0.3)' : (scene.score > 50 ? 'rgba(192, 132, 252, 0.3)' : 'rgba(251, 113, 133, 0.3)')}`
                                                }} />
                                            </div>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{scene.score}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 20px' }}>
                                        <span className={`badge badge-${scene.status.toLowerCase() == 'moderate' ? 'mid' : scene.status.toLowerCase()}`}>{scene.status}</span>
                                    </td>
                                    <td style={{ padding: '16px 20px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {scene.factors.map((f, j) => (
                                                <span key={j} style={{
                                                    fontSize: '0.75rem',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    padding: '4px 10px',
                                                    borderRadius: '8px',
                                                    border: '1px solid var(--card-border)',
                                                    color: 'var(--text-muted)'
                                                }}>{f}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 20px', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', textAlign: 'right' }}>
                                        <button className="btn btn-outline" style={{ padding: '8px', minWidth: 'auto', borderRadius: '10px' }}><ChevronRight size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


export default Feasibility;
