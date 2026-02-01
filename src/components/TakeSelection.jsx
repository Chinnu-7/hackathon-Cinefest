import React, { useState } from 'react';
import { Star, Trophy, MessageSquare, Activity, Image as ImageIcon, Wind, Check, Play, Eye, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const TakeSelection = () => {
    const { navigateTo } = useApp();
    const [selectedTake, setSelectedTake] = useState('Take 04');
    const [takes] = useState([
        {
            id: 'Take 04',
            scene: '12B',
            score: 94,
            emotion: 92,
            lighting: 96,
            stability: 94,
            status: 'Recommended',
            notes: 'Best delivery of line 42. Lighting perfectly matches Scene 12A.',
            thumb: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 'Take 02',
            scene: '12B',
            score: 82,
            emotion: 88,
            lighting: 74,
            stability: 85,
            status: 'Secondary',
            notes: 'Strong emotion but slight focus pull issue at 00:04.',
            thumb: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 'Take 03',
            scene: '12B',
            score: 68,
            emotion: 65,
            lighting: 72,
            stability: 68,
            status: 'Rejected',
            notes: 'Micro-stutter in gimbal movement. Emotion felt forced.',
            thumb: 'https://images.unsplash.com/photo-1514467953516-ec483e58c65f?auto=format&fit=crop&w=400&q=80'
        },
    ]);

    const Metrics = ({ label, value, color }) => (
        <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{value}%</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    style={{ height: '100%', background: color, borderRadius: '2px' }}
                />
            </div>
        </div>
    );

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
                            <Trophy size={16} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Performance Auditor v2.4</span>
                        </div>
                        <h1 className="gradient-text">Best-Take Selection</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Multimodal analysis to rank and select the best performance from raw rushes.</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline" onClick={() => alert('Daily Report Sent to Director')}>
                        <MessageSquare size={18} /> Send Notes
                    </button>
                    <button className="btn btn-primary">
                        <Play size={18} /> Review Selected
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1" style={{ gap: '1.5rem' }}>
                {takes.map((take, i) => (
                    <motion.div
                        key={i}
                        layout
                        className={`glass-card ${selectedTake === take.id ? 'active' : ''}`}
                        style={{
                            borderLeft: `4px solid ${selectedTake === take.id ? 'var(--secondary)' : (take.status === 'Secondary' ? 'var(--primary)' : 'var(--accent)')}`,
                            padding: 0,
                            position: 'relative'
                        }}
                    >
                        <div style={{ display: 'flex', padding: '1.5rem', gap: '2rem' }}>
                            <div style={{ width: '220px', height: '130px', background: '#000', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                                <img src={take.thumb} alt={take.id} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))' }}></div>
                                <div style={{ position: 'absolute', bottom: '8px', left: '8px', fontSize: '0.8rem', fontWeight: 700 }}>{take.id}</div>
                                {take.status === 'Recommended' && (
                                    <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--secondary)', color: 'black', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                                        <Trophy size={10} style={{ display: 'inline', marginRight: '4px' }} /> BEST
                                    </div>
                                )}
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.8 }}>
                                    <Play size={32} />
                                </div>
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.25rem' }}>Take {take.id.split(' ')[1]} - Scene {take.scene}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Star size={16} fill="var(--secondary)" color="var(--secondary)" />
                                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary)' }}>{take.score}</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                                    <Metrics label="Emotion" value={take.emotion} color="var(--primary)" />
                                    <Metrics label="Lighting" value={take.lighting} color="var(--secondary)" />
                                    <Metrics label="Stability" value={take.stability} color="var(--accent)" />
                                </div>

                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', display: 'flex', gap: '10px', border: '1px solid var(--card-border)' }}>
                                    <MessageSquare size={16} color="var(--primary)" />
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{take.notes}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                                <button
                                    className={`btn ${selectedTake === take.id ? 'btn-secondary' : 'btn-primary'}`}
                                    style={{ padding: '8px 24px', fontSize: '0.9rem', minWidth: '140px' }}
                                    onClick={() => setSelectedTake(take.id)}
                                >
                                    {selectedTake === take.id ? <><Check size={16} /> Selected</> : 'Select Take'}
                                </button>
                                <button className="btn btn-outline" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>
                                    <Eye size={16} /> Review
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-2" style={{ marginTop: '3rem' }}>
                <div className="glass-card">
                    <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={18} color="var(--primary)" /> Neural Emotion Curve
                    </h4>
                    <div style={{ height: '100px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', display: 'flex', alignItems: 'flex-end', padding: '10px', gap: '4px', border: '1px solid var(--card-border)' }}>
                        {[40, 60, 45, 90, 85, 40, 50, 70, 95, 80, 60, 55].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05 }}
                                style={{ flex: 1, background: 'var(--primary-glow)', borderTop: '2px solid var(--primary)', borderRadius: '2px 2px 0 0' }}
                            />
                        ))}
                    </div>
                </div>
                <div className="glass-card">
                    <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Wind size={18} color="var(--secondary)" /> Technical Stability Report
                    </h4>
                    <div style={{ height: '100px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px dashed var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.5 }}>
                            <Check size={14} color="var(--secondary)" style={{ marginRight: '6px' }} />
                            Gimbal motion vectors within 0.05% tolerance. No micro-jitter or focus hunting detected in primary subject area.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TakeSelection;
