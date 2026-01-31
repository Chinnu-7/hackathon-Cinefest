import React from 'react';
import { Star, Trophy, MessageSquare, Activity, Image as ImageIcon, Wind, Check } from 'lucide-react';

const TakeSelection = () => {
    const takes = [
        {
            id: 'Take 04',
            scene: '12B',
            score: 94,
            emotion: 92,
            lighting: 96,
            stability: 94,
            status: 'Recommended',
            notes: 'Best delivery of line 42. Lighting perfectly matches Scene 12A.'
        },
        {
            id: 'Take 02',
            scene: '12B',
            score: 82,
            emotion: 88,
            lighting: 74,
            stability: 85,
            status: 'Secondary',
            notes: 'Strong emotion but slight focus pull issue at 00:04.'
        },
        {
            id: 'Take 03',
            scene: '12B',
            score: 68,
            emotion: 65,
            lighting: 72,
            stability: 68,
            status: 'Rejected',
            notes: 'Micro-stutter in gimbal movement. Emotion felt forced.'
        },
    ];

    const Metrics = ({ label, value, color }) => (
        <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{value}%</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: '2px' }}></div>
            </div>
        </div>
    );

    return (
        <div className="animate-in">
            <header className="dashboard-header">
                <div>
                    <h1 className="gradient-text">Best-Take Selection</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Multimodal analysis to rank and select the best performance</p>
                </div>
            </header>

            <div className="grid grid-cols-1" style={{ gap: '1.5rem' }}>
                {takes.map((take, i) => (
                    <div key={i} className={`glass-card ${take.status === 'Recommended' ? 'active' : ''}`} style={{
                        borderLeft: `4px solid ${take.status === 'Recommended' ? 'var(--secondary)' : (take.status === 'Secondary' ? 'var(--primary)' : 'var(--accent)')}`,
                        padding: 0
                    }}>
                        <div style={{ display: 'flex', padding: '1.5rem', gap: '2rem' }}>
                            <div style={{ width: '200px', height: '120px', background: '#000', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))' }}></div>
                                <div style={{ position: 'absolute', bottom: '8px', left: '8px', fontSize: '0.8rem', fontWeight: 700 }}>{take.id}</div>
                                {take.status === 'Recommended' && (
                                    <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--secondary)', color: 'black', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                                        <Trophy size={10} inline /> BEST
                                    </div>
                                )}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3>{take.id} - Scene {take.scene}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Star size={16} fill="var(--secondary)" color="var(--secondary)" />
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>{take.score}</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                                    <Metrics label="Emotion" value={take.emotion} color="var(--primary)" />
                                    <Metrics label="Lighting" value={take.lighting} color="var(--secondary)" />
                                    <Metrics label="Stability" value={take.stability} color="var(--accent)" />
                                </div>

                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', display: 'flex', gap: '10px' }}>
                                    <MessageSquare size={16} color="var(--text-muted)" />
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{take.notes}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                                <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                                    {take.status === 'Recommended' ? <><Check size={16} /> Selected</> : 'Select Take'}
                                </button>
                                <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '8px 20px', fontSize: '0.9rem' }}>
                                    Review
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2" style={{ marginTop: '3rem' }}>
                <div className="glass-card">
                    <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={18} color="var(--primary)" /> Emotion Curve Analysis
                    </h4>
                    <div style={{ height: '100px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', display: 'flex', alignItems: 'flex-end', padding: '10px', gap: '4px' }}>
                        {[40, 60, 45, 90, 85, 40, 50, 70, 95, 80, 60, 55].map((h, i) => (
                            <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--primary-glow)', borderTop: '2px solid var(--primary)', borderRadius: '2px 2px 0 0' }}></div>
                        ))}
                    </div>
                </div>
                <div className="glass-card">
                    <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Wind size={18} color="var(--secondary)" /> Stability Warp Report
                    </h4>
                    <div style={{ height: '100px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px dashed var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Motion tracking vectors normal. No gimbal jitter detected.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TakeSelection;
