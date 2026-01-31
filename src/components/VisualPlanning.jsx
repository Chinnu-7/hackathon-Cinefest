import React from 'react';
import { Camera, Sun, Info, Plus, Download } from 'lucide-react';

const VisualPlanning = () => {
    const references = [
        { title: 'Subway Lighting', type: 'Lighting', img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80', description: 'Deep blues with neon magenta accents. High cinematic contrast.' },
        { title: 'Cyberpunk Texture', type: 'Mood', img: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=800&q=80', description: 'Rain-slicked streets, reflecting city lights and deep shadows.' },
        { title: 'Elias Apartment', type: 'Set Design', img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=800&q=80', description: 'Minimalist, industrial, cold color palette with sharp lines.' },
    ];

    return (
        <div className="animate-in">
            <header className="dashboard-header">
                <div>
                    <h1 className="gradient-text">Visual Planning</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Map script intent to cinematic reference styles and AI-generated moodboards.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline">
                        <Download size={18} /> Export Lookbook
                    </button>
                    <button className="btn btn-primary">
                        <Plus size={18} /> Add Reference
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-3">
                {references.map((item, i) => (
                    <div key={i} className="glass-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--card-border)' }}>
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
                    </div>
                ))}
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
                        background: 'rgba(0,0,0,0.4)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px dashed var(--card-border)',
                        color: 'var(--primary)',
                        transition: 'var(--transition)',
                        cursor: 'pointer'
                    }} className="upload-placeholder">
                        <Plus size={40} />
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
                                className="search-input"
                            />
                            <button className="btn btn-primary" style={{ height: '56px', minWidth: '160px', justifyContent: 'center' }}>Generate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default VisualPlanning;
