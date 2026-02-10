import React from 'react';
import { Shield, Target, Zap, Clock, ChevronRight, AlertCircle, TrendingUp, Info, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

import { sceneFeasibilityRaw } from '../data/mockData';

const Feasibility = () => {
    const { navigateTo } = useApp();
    const scenes = sceneFeasibilityRaw;

    return (
        <div className="animate-in">
            <header className="dashboard-header">
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    <button
                        className="btn-back"
                        onClick={() => navigateTo('dashboard')}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', marginBottom: '4px' }}>
                            <Shield size={16} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Production Guard System Alpha</span>
                        </div>
                        <h1 className="gradient-text">Feasibility Intelligence</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Project: <span style={{ color: '#fff', fontWeight: 600 }}>Neon Shadows</span> • Logic-based Risk & Logic Projection</p>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>EST. BUDGET VARIANCE</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>+14.2% <TrendingUp size={18} style={{ verticalAlign: 'middle' }} /></div>
                </div>
            </header>

            <div className="grid grid-cols-3" style={{ marginBottom: '2.5rem' }}>
                <div className="glass-card stat-card">
                    <div className="stat-header">
                        <div className="stat-icon-box" style={{ color: 'var(--secondary)' }}>
                            <Shield size={24} />
                        </div>
                        <span className="badge badge-low">Optimal</span>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Safety Index</span>
                    <h2 className="stat-value">82%</h2>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: '82%', background: 'var(--secondary)', boxShadow: '0 0 12px rgba(45, 212, 191, 0.4)' }} />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scan based on stunt density & crew logistics.</p>
                </div>

                <div className="glass-card stat-card">
                    <div className="stat-header">
                        <div className="stat-icon-box" style={{ color: 'var(--primary)' }}>
                            <Target size={24} />
                        </div>
                        <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.1)', color: 'var(--primary)' }}>VFX HEAVY</span>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Complexity Factor</span>
                    <h2 className="stat-value">Ultra</h2>
                    <div style={{ display: 'flex', gap: '4px', marginTop: '10px' }}>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i < 4 ? 'var(--primary)' : 'rgba(255,255,255,0.05)' }} />
                        ))}
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>Matching narrative beats to technical overhead.</p>
                </div>

                <div className="glass-card stat-card" style={{ border: '1px solid var(--accent)' }}>
                    <div className="stat-header">
                        <div className="stat-icon-box" style={{ color: 'var(--accent)' }}>
                            <Zap size={24} />
                        </div>
                        <span className="badge badge-high">High Alert</span>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Risk Mitigation</span>
                    <h2 className="stat-value">3 Zones</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600 }}>
                        <AlertCircle size={14} /> Insurance Review Recommended
                    </div>
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ background: 'rgba(251, 113, 133, 0.05)', border: '1px solid rgba(251, 113, 133, 0.1)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent)' }}>
                            <AlertCircle size={20} /> AI Risk Reasoning
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Logistical Clash</p>
                                <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Combining Night Shoots with Stunts in Scene 14 increases insurance premium by 12%.</p>
                            </div>
                            <div style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '1rem' }}>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Efficiency Gain</p>
                                <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Scenes 02 and 08 share 80% of lighting assets. Scheduling them concurrently saves 1.5 days.</p>
                            </div>
                            <div style={{ borderLeft: '2px solid var(--secondary)', paddingLeft: '1rem' }}>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>VFX Prediction</p>
                                <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Scene 21 rooftop plate requires 4K HDR scanning for seamless AI background replacement.</p>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '56px' }}>
                        Run Production Simulation
                    </button>
                </div>

                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem' }}>Production Feasibility Matrix</h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span className="badge" style={{ background: 'rgba(255,255,255,0.05)' }}>LAST SCAN: 2 MINS AGO</span>
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '0 20px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>Scene</th>
                                    <th style={{ padding: '0 20px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>Descriptor</th>
                                    <th style={{ padding: '0 20px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>Score</th>
                                    <th style={{ padding: '0 20px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>Level</th>
                                    <th style={{ padding: '0 20px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>AI Observations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scenes.map((scene, i) => (
                                    <tr key={i} className="table-row-hover" style={{ background: 'rgba(255,255,255,0.02)', cursor: 'default' }}>
                                        <td style={{ padding: '16px 20px', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)' }}>{scene.id}</td>
                                        <td style={{ padding: '16px 20px' }}>
                                            <div style={{ fontWeight: 700 }}>{scene.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{scene.factors.join(' • ')}</div>
                                        </td>
                                        <td style={{ padding: '16px 20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                                    <div style={{
                                                        width: `${scene.score}%`,
                                                        height: '100%',
                                                        background: scene.score > 80 ? 'var(--secondary)' : (scene.score > 50 ? 'var(--primary)' : 'var(--accent)'),
                                                    }} />
                                                </div>
                                                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{scene.score}%</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 20px' }}>
                                            <span className={`badge badge-${scene.status.toLowerCase() == 'moderate' ? 'mid' : scene.status.toLowerCase()}`}>{scene.status}</span>
                                        </td>
                                        <td style={{ padding: '16px 20px', borderTopRightRadius: '16px', borderBottomRightRadius: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                            {scene.reasoning}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feasibility;
