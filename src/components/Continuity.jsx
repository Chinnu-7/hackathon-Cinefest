import React, { useState } from 'react';
import { User, AlertTriangle, CheckCircle2, History, Shirt, Zap, Loader2, Search, FileDown, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const Continuity = () => {
    const { navigateTo } = useApp();
    const [isScanning, setIsScanning] = useState(false);
    const [scanResults, setScanResults] = useState(null);

    const characters = [
        { name: 'Elias', status: 'Inconsistent', alerts: 1, lastScene: 'Scene 14', role: 'Lead', color: 'var(--primary)' },
        { name: 'Sarah', status: 'Consistent', alerts: 0, lastScene: 'Scene 12', role: 'Support', color: 'var(--secondary)' },
        { name: 'The Guard', status: 'Consistent', alerts: 0, lastScene: 'Scene 04', role: 'Minor', color: '#a1a1aa' },
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

    const handleScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setScanResults('Scan Complete: 1 conflict detected in Elias (Scene 14).');
        }, 2500);
    };

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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '4px' }}>
                            <Search size={16} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Visual Continuity Guard</span>
                        </div>
                        <h1 className="gradient-text">Character Continuity</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>AI-Powered appearance tracking and wardrobe verification across production days.</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline" onClick={() => alert('Generating Daily Consistency Report...')}>
                        <FileDown size={18} /> Export Journal
                    </button>
                    <button className={`btn btn-primary ${isScanning ? 'loading' : ''}`} onClick={handleScan} disabled={isScanning}>
                        {isScanning ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
                        {isScanning ? 'Scanning Rushes...' : 'Run Neural Audit'}
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ marginBottom: '2rem' }}
                    >
                        <div className="glass-card" style={{ background: 'rgba(192, 132, 252, 0.05)', border: '1px solid var(--primary)', textAlign: 'center', padding: '2rem' }}>
                            <div className="scan-animation" style={{ margin: '0 auto 1rem', width: '100px', height: '40px' }}>
                                <div className="scan-bar" />
                            </div>
                            <p style={{ color: 'var(--primary)', fontWeight: 600 }}>Analyzing frame embeddings for character Elias...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-3" style={{ marginBottom: '3rem' }}>
                {characters.map((char, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="glass-card stat-card"
                    >
                        <div className="stat-header">
                            <div className="stat-icon-box" style={{ color: char.color, background: `${char.color}15` }}>
                                <User size={24} />
                            </div>
                            <span className={`badge ${char.alerts > 0 ? 'badge-high' : 'badge-low'}`}>
                                {char.status}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{char.name}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{char.role} • Last seen in {char.lastScene}</p>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <History size={24} color="var(--primary)" /> Continuity Live-Feed
                    </h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <span className="badge" style={{ background: 'rgba(255,255,255,0.05)' }}>LAST AUDIT: 4 MINS AGO</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {comparisons.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '20px',
                                background: 'rgba(255,255,255,0.02)',
                                borderRadius: '20px',
                                border: `1px solid ${item.status === 'Conflict' ? 'rgba(251, 113, 133, 0.2)' : 'var(--card-border)'}`,
                                transition: 'var(--transition)'
                            }}
                        >
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
                                <button className="btn btn-outline" style={{ height: '36px', fontSize: '0.8rem', padding: '0 16px' }} onClick={() => alert(item.status === 'Conflict' ? 'Incident Report Generated' : 'Opening Frames...')}>
                                    {item.status === 'Conflict' ? 'Generate Incident Report' : 'Review Frames'}
                                </button>
                            </div>
                        </motion.div>
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
