import React, { useState } from 'react';
import { Camera, Sun, Info, Plus, Download, Sparkles, Loader2, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const VisualPlanning = () => {
    const { navigateTo } = useApp();
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [references, setReferences] = useState([
        { title: 'Subway Lighting', type: 'Lighting', img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80', description: 'Deep blues with neon magenta accents. High cinematic contrast.' },
        { title: 'Cyberpunk Texture', type: 'Mood', img: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=800&q=80', description: 'Rain-slicked streets, reflecting city lights and deep shadows.' },
        { title: 'Elias Apartment', type: 'Set Design', img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=800&q=80', description: 'Minimalist, industrial, cold color palette with sharp lines.' },
    ]);

    const handleGenerate = () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);

        // Simulate AI Image Generation
        setTimeout(() => {
            const newRef = {
                title: 'AI Generated Reference',
                type: 'Mood',
                img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
                description: `Procedural visual for: "${prompt}"`
            };
            setReferences([newRef, ...references]);
            setPrompt('');
            setIsGenerating(false);
        }, 3000);
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
                            <ImageIcon size={16} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Style Synthesis Engine</span>
                        </div>
                        <h1 className="gradient-text">Visual Planning</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Map script intent to cinematic reference styles and AI-generated moodboards.</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline" onClick={() => alert('Lookbook Exported to Production PDF')}>
                        <Download size={18} /> Export Lookbook
                    </button>
                    <button className="btn btn-primary" onClick={() => setPrompt('Cinematic low-light portrait with rim light')}>
                        <Plus size={18} /> Quick Prompt
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {references.map((item, i) => (
                        <motion.div
                            key={i}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card"
                            style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--card-border)' }}
                        >
                            <div style={{ height: '260px', position: 'relative' }}>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    className="reference-img"
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8))' }} />
                                <span className="badge" style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    background: 'rgba(0,0,0,0.6)',
                                    backdropFilter: 'blur(8px)',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '6px 12px'
                                }}>
                                    {item.type}
                                </span>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.5 }}>
                                    {item.description}
                                </p>
                                <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                                        <Camera size={16} /> STYLE MATCHED
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 600 }}>
                                        <Sun size={16} /> LIGHTING SYNCED
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="glass-card" style={{
                marginTop: '3rem',
                background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.05) 0%, rgba(13, 13, 15, 0.8) 100%)',
                padding: '3rem'
            }}>
                <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
                    <div style={{
                        width: '140px',
                        height: '140px',
                        background: isGenerating ? 'rgba(192,132,252,0.1)' : 'rgba(0,0,0,0.4)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: isGenerating ? '2px solid var(--primary)' : '2px dashed var(--card-border)',
                        color: 'var(--primary)',
                        transition: 'var(--transition)',
                        cursor: 'default'
                    }}>
                        {isGenerating ? <Loader2 size={40} className="animate-spin" /> : <Sparkles size={40} />}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div className="badge badge-mid" style={{ marginBottom: '1rem' }}>AI POWERED</div>
                        <h2 style={{ marginBottom: '0.75rem', fontSize: '1.75rem' }}>Neural Style Synthesis</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem', maxWidth: '600px' }}>
                            Describe a cinematic atmosphere to generate a pixel-perfect reference frame using our custom-trained Production Diffusion model.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="e.g. A noir alleyway with a single flickering blue neon light, anamorphic flares..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                disabled={isGenerating}
                                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                                style={{
                                    flex: 1,
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '14px',
                                    padding: '0 20px',
                                    height: '56px',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    transition: 'var(--transition)'
                                }}
                            />
                            <button
                                className="btn btn-primary"
                                style={{ height: '56px', minWidth: '160px', justifyContent: 'center' }}
                                onClick={handleGenerate}
                                disabled={isGenerating || !prompt.trim()}
                            >
                                {isGenerating ? 'Synthesizing...' : 'Generate Look'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualPlanning;
