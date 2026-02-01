import React, { useState, useRef } from 'react';
import {
    Film,
    Play,
    Zap,
    Sparkles,
    Download,
    Maximize2,
    ArrowLeft,
    Loader2,
    Video,
    Layers,
    Scissors,
    Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';

const VideoPreviz = () => {
    const { navigateTo } = useApp();
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [videoReady, setVideoReady] = useState(false);
    const [activeScene, setActiveScene] = useState(1);
    const [renderedUrl, setRenderedUrl] = useState('');

    const scenes = [
        { id: 1, title: 'The Subway Entry', duration: '4s', status: 'Draft' },
        { id: 2, title: 'The Silent Standoff', duration: '6s', status: 'Unrendered' },
        { id: 3, title: 'Rainy Escape', duration: '5s', status: 'Unrendered' },
    ];

    const startGeneration = async () => {
        setIsGenerating(true);
        setVideoReady(false);
        setProgress(0);

        // Start progress simulation
        const progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + (Math.random() * 5), 98));
        }, 200);

        try {
            const currentScene = scenes.find(s => s.id === activeScene);
            const data = await apiService.vision.generateVideo(activeScene, currentScene.title);

            clearInterval(progressInterval);
            setProgress(100);

            setTimeout(() => {
                setRenderedUrl(data.videoUrl);
                setIsGenerating(false);
                setVideoReady(true);
            }, 800);
        } catch (error) {
            console.error("Video Gen failure", error);
            clearInterval(progressInterval);
            setIsGenerating(false);
        }
    };
    走
    return (
        <div className="animate-in">
            <header className="dashboard-header">
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    <button className="btn-back" onClick={() => navigateTo('dashboard')}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '4px' }}>
                            <Film size={16} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Neural Cinematic Renderer</span>
                        </div>
                        <h1 className="gradient-text">AI Video Previz</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Convert script descriptions into animated cinematic previews.</p>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={startGeneration} disabled={isGenerating}>
                    {isGenerating ? <Loader2 className="spin" size={18} /> : <Zap size={18} />}
                    {isGenerating ? 'Rendering Neural Frames...' : 'Generate Scene Video'}
                </button>
            </header>

            <div className="grid" style={{ gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
                {/* Scene List */}
                <div className="glass-card" style={{ height: 'fit-content' }}>
                    <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Layers size={18} color="var(--primary)" /> Scene Sequence
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {scenes.map((scene) => (
                            <div
                                key={scene.id}
                                className={`scene-item ${activeScene === scene.id ? 'active' : ''}`}
                                onClick={() => setActiveScene(scene.id)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{scene.title}</span>
                                    <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{scene.duration}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="badge badge-low" style={{ fontSize: '0.6rem', padding: '2px 8px' }}>{scene.status}</span>
                                    {scene.id === 1 && videoReady && <Play size={10} fill="currentColor" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Video Preview Window */}
                <div className="glass-card" style={{ position: 'relative', padding: 0, overflow: 'hidden', minHeight: '500px' }}>
                    {!isGenerating && !videoReady ? (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <div className="render-empty-circle">
                                <Video size={48} />
                            </div>
                            <h3>Neural Buffer Empty</h3>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '1rem auto' }}>
                                select a scene and click generate to render AI frames using the current visual planning style.
                            </p>
                        </div>
                    ) : isGenerating ? (
                        <div style={{ position: 'absolute', inset: 0, background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="scan-line" />
                            <div className="gpu-shimmer" />
                            <div style={{ width: '400px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>
                                    <span>{Math.round(progress)}% SYNTHESIZED</span>
                                    <span>TILE: 410/1024</span>
                                </div>
                                <div className="progress-container">
                                    <motion.div className="progress-bar" animate={{ width: `${progress}%` }} />
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    Applying temporal consistency • checking lighting coherence • 4k upscaling
                                </p>
                            </div>
                        </div>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0 }}>
                            <div className="video-player-container">
                                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                                    <source src={renderedUrl || "https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-street-at-night-with-neon-lights-25164-large.mp4"} type="video/mp4" />
                                </video>
                                <div className="video-overlay">
                                    <div className="video-top-bar">
                                        <div className="badge badge-low">SCENE 14B - TAKE 04</div>
                                        <div style={{ fontFamily: 'monospace' }}>00:14:02:11</div>
                                    </div>
                                    <div className="video-controls">
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <Play size={20} fill="currentColor" />
                                            <Scissors size={20} />
                                            <Shield size={20} />
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <Download size={20} />
                                            <Maximize2 size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            <style>{`
                .scene-item {
                    padding: 1rem;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid var(--card-border);
                    border-radius: 12px;
                    cursor: pointer;
                    transition: var(--transition);
                }
                .scene-item:hover {
                    background: rgba(255,255,255,0.05);
                    transform: translateX(5px);
                }
                .scene-item.active {
                    background: var(--primary-glow);
                    border-color: var(--primary);
                }
                .render-empty-circle {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: rgba(192, 132, 252, 0.05);
                    color: var(--primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2rem;
                    border: 1px solid var(--card-border);
                }
                .video-player-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    background: #000;
                }
                .video-overlay {
                    position: absolute;
                    inset: 0;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.4), transparent, rgba(0,0,0,0.8));
                    opacity: 0;
                    transition: 0.3s ease;
                }
                .video-player-container:hover .video-overlay {
                    opacity: 1;
                }
                .video-top-bar, .video-controls {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .scan-line {
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background: var(--primary);
                    box-shadow: 0 0 20px var(--primary);
                    animation: scan 3s linear infinite;
                    z-index: 2;
                }
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .gpu-shimmer {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 50% 50%, rgba(192, 132, 252, 0.1), transparent);
                    animation: pulse 2s ease-in-out infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
            `}</style>
        </div>
    );
};

export default VideoPreviz;
