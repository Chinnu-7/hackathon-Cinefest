import React from 'react';
import { User, AlertTriangle, CheckCircle2, History, Shirt, Zap } from 'lucide-react';

const Continuity = () => {
    const characters = [
        { name: 'Elias', status: 'Inconsistent', alerts: 1, lastScene: 'Scene 14', role: 'Lead' },
        { name: 'Sarah', status: 'Consistent', alerts: 0, lastScene: 'Scene 12', role: 'Support' },
        { name: 'The Guard', status: 'Consistent', alerts: 0, lastScene: 'Scene 04', role: 'Minor' },
    ];

    const comparisons = [
        {
            item: 'Watch (Left Wrist)',
            character: 'Elias',
            sceneA: 'Scene 12 (Take 2)',
            sceneB: 'Scene 14 (Take 4)',
            status: 'Conflict',
            desc: 'Watch missing in Scene 14'
        },
        {
            item: 'Hair Style',
            character: 'Sarah',
            sceneA: 'Scene 12 (Take 1)',
            sceneB: 'Scene 12 (Take 5)',
            status: 'Matched',
            desc: 'Consistency verified'
        }
    ];

    return (
        <div className="animate-in">
            <header className="dashboard-header">
                <div>
                    <h1 className="gradient-text">Character Continuity</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>AI-Powered appearance tracking across shots, takes and scenes</p>
                </div>
            </header>

            <div className="grid grid-cols-3" style={{ marginBottom: '3rem' }}>
                {characters.map((char, i) => (
                    <div key={i} className="glass-card stat-card">
                        <div className="stat-header">
                            <div className="stat-icon-box" style={{ color: 'var(--primary)' }}>
                                <User size={24} />
                            </div>
                            <span className={`badge ${char.alerts > 0 ? 'badge-high' : 'badge-low'}`}>
                                {char.status}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{char.name}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{char.role} • Last seen in {char.lastScene}</p>
                    </div>
                ))}
            </div>

            <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <History size={24} color="var(--primary)" /> Continuity Live-Feed
                    </h3>
                    <button className="btn btn-outline" style={{ height: '40px' }}>Historical Logs</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {comparisons.map((item, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '20px',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '20px',
                            border: `1px solid ${item.status === 'Conflict' ? 'rgba(251, 113, 133, 0.2)' : 'var(--card-border)'}`,
                            transition: 'var(--transition)'
                        }}>
                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    background: item.status === 'Conflict' ? 'rgba(251, 113, 133, 0.1)' : 'rgba(45, 212, 191, 0.1)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: `1px solid ${item.status === 'Conflict' ? 'rgba(251, 113, 133, 0.2)' : 'rgba(45, 212, 191, 0.2)'}`
                                }}>
                                    {item.status === 'Conflict' ? <AlertTriangle color="var(--accent)" size={24} /> : <CheckCircle2 color="var(--secondary)" size={24} />}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px' }}>{item.item}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        Cross-checking <span style={{ color: '#fff' }}>{item.sceneA}</span> against <span style={{ color: '#fff' }}>{item.sceneB}</span>
                                    </p>
                                </div>
                            </div>

                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                                <span className={`badge ${item.status === 'Conflict' ? 'badge-high' : 'badge-low'}`} style={{ fontSize: '0.75rem' }}>
                                    {item.desc}
                                </span>
                                <button className="btn btn-outline" style={{ height: '36px', fontSize: '0.8rem', padding: '0 16px' }}>
                                    {item.status === 'Conflict' ? 'Generate Incident Report' : 'Review Frames'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2" style={{ marginTop: '3rem' }}>
                <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(45, 212, 191, 0.08) 0%, rgba(3,3,3,0.6) 100%)' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'rgba(45, 212, 191, 0.1)', padding: '10px', borderRadius: '12px' }}>
                            <Shirt size={24} color="var(--secondary)" />
                        </div>
                        <h3 style={{ fontSize: '1.25rem' }}>Wardrobe Index</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                        CineMind AI has indexed 14 distinct wardrobe components for "Elias". All current takes match the approved Look-Book for Production Day 4.
                    </p>
                </div>
                <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(3,3,3,0.6) 100%)' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '10px', borderRadius: '12px' }}>
                            <Zap size={24} color="var(--primary)" />
                        </div>
                        <h3 style={{ fontSize: '1.25rem' }}>Prop Status</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                        Critical prop "Black Briefcase" is being tracked across 4 camera setups. Spatial orientation verified for seamless shot matching.
                    </p>
                </div>
            </div>
        </div>
    );
};


export default Continuity;
