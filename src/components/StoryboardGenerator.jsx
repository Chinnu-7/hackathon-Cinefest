import React, { useState } from 'react';
import {
    Image as ImageIcon,
    Sparkles,
    Download,
    Layout,
    Maximize2,
    Trash2,
    Plus,
    Loader2,
    ArrowLeft,
    Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const StoryboardGenerator = () => {
    const { navigateTo } = useApp();
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [frames, setFrames] = useState([
        { id: 1, title: 'Establishing Shot', description: 'The subway platform at night, neon lights reflecting on wet concrete.', img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=800' },
        { id: 2, title: 'Medium Close-up', description: 'Elias looks nervously at his watch, shadows deepening his expression.', img: 'https://images.unsplash.com/photo-1542204127-9097e089f33b?auto=format&fit=crop&q=80&w=800' }
    ]);

    const handleGenerate = () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);

        // Simulation of DALL-E/Stable Diffusion Generation
        setTimeout(() => {
            const newFrame = {
                id: Date.now(),
                title: 'New Scene Frame',
                description: prompt,
                img: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&q=80&w=800' // Placeholder generated image
            };
            setFrames([...frames, newFrame]);
            setPrompt('');
            setIsGenerating(false);
        }, 3500);
    };

    const deleteFrame = (id) => {
        setFrames(frames.filter(f => f.id !== id));
    };

    return (
        <div className="animate-in">
            <header className="dashboard-header">
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    <button className="btn-back" onClick={() => navigateTo('dashboard')}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '4px' }}>
                            <Sparkles size={16} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Visual Synthesis Module</span>
                        </div>
                        <h1 className="gradient-text">AI Storyboard Pro</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Generate cinematic board frames directly from narrative prompts.</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline">
                        <Download size={18} /> Export PDF
                    </button>
                    <button className="btn btn-primary" onClick={() => setPrompt('A cinematic low-angle shot of a mysterious figure in a trench coat')}>
                        <Plus size={18} /> Draft Prompt
                    </button>
                </div>
            </header>

            <div className="glass-card" style={{ marginBottom: '3rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <ImageIcon size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                        <input
                            type="text"
                            className="auth-input"
                            placeholder="Describe the cinematic frame (e.g. 'Low-key lighting, wide shot of city ruins')..."
                            style={{ paddingLeft: '48px', height: '56px', borderRadius: '12px' }}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        style={{ height: '56px', padding: '0 32px' }}
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                    >
                        {isGenerating ? <Loader2 className="spin" size={20} /> : <Sparkles size={20} />}
                        {isGenerating ? 'Synthesizing...' : 'Generate Frame'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3">
                <AnimatePresence>
                    {frames.map((frame, index) => (
                        <motion.div
                            key={frame.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="glass-card"
                            style={{ padding: 0, overflow: 'hidden' }}
                        >
                            <div className="frame-image-box">
                                <img src={frame.img} alt={frame.title} />
                                <div className="frame-overlay">
                                    <div className="frame-actions">
                                        <button className="icon-btn"><Maximize2 size={16} /></button>
                                        <button className="icon-btn" onClick={() => deleteFrame(frame.id)}><Trash2 size={16} /></button>
                                    </div>
                                    <div className="frame-tag">FRAME {index + 1}</div>
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Layout size={16} color="var(--primary)" /> {frame.title}
                                </h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{frame.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <style>{`
                .frame-image-box {
                    height: 220px;
                    position: relative;
                    background: #000;
                }
                .frame-image-box img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .frame-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    transition: 0.3s ease;
                }
                .frame-image-box:hover .frame-overlay {
                    opacity: 1;
                }
                .frame-actions {
                    display: flex;
                    gap: 8px;
                    justify-content: flex-end;
                }
                .icon-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .icon-btn:hover {
                    background: var(--accent);
                    border-color: var(--accent);
                }
                .frame-tag {
                    font-size: 0.65rem;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    color: var(--primary);
                }
            `}</style>
        </div>
    );
};

export default StoryboardGenerator;
