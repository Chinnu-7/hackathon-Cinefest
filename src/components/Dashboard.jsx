import React, { useState, useEffect, useRef } from 'react';
import {
    TrendingUp,
    AlertCircle,
    Clock,
    Video,
    ChevronRight,
    Play,
    Download,
    CheckCircle2,
    Eye,
    Upload,
    Film,
    Camera,
    Maximize2,
    Activity,
    Zap,
    Wind,
    Sun,
    Layers,
    Scissors,
    Monitor,
    Brain,
    Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';

import { directorInsights } from '../data/mockData';

const Dashboard = () => {
    const { navigateTo } = useApp();
    const [isExporting, setIsExporting] = useState(false);
    const [showExportSuccess, setShowExportSuccess] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const fileInputRef = useRef(null);

    const [stats, setStats] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);

    const iconMap = { TrendingUp, AlertCircle, Clock, Video, Brain, Users, Zap };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await apiService.dashboard.getStats();
                if (data && data.stats) {
                    const mappedStats = data.stats.map(s => ({
                        ...s,
                        icon: iconMap[s.icon] || TrendingUp
                    }));
                    setStats(mappedStats);
                }
            } catch (err) {
                console.error("Failed to fetch stats", err);
            } finally {
                setLoadingStats(false);
            }
        };
        fetchStats();
    }, []);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            simulateUpload(file);
        }
    };

    const simulateUpload = (file) => {
        setIsUploading(true);
        setVideoFile(file);
        setTimeout(() => {
            setIsUploading(false);
            startAnalysis();
        }, 2000);
    };

    const startAnalysis = () => {
        setIsAnalyzing(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                setAnalysisProgress(100);
                clearInterval(interval);
                setTimeout(() => {
                    setIsAnalyzing(false);
                    setShowAnalysis(true);
                }, 1000);
            } else {
                setAnalysisProgress(progress);
            }
        }, 400);
    };

    const handleQuickExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            setShowExportSuccess(true);
            setTimeout(() => setShowExportSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="animate-in">
            <header className="dashboard-header">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '4px' }}>
                        <Film size={16} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Director's Command Center</span>
                    </div>
                    <h1 className="gradient-text">Studio Overview</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Project: <span style={{ color: '#fff' }}>"Neon Shadows"</span> • Pre-production Phase</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                    <AnimatePresence>
                        {showExportSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                style={{
                                    position: 'absolute',
                                    top: '-50px',
                                    right: 0,
                                    background: 'var(--secondary)',
                                    color: '#000',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    zIndex: 10
                                }}
                            >
                                <CheckCircle2 size={16} /> Production Book Exported!
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button
                        className={`btn btn-outline ${isExporting ? 'loading' : ''}`}
                        onClick={handleQuickExport}
                        disabled={isExporting}
                    >
                        {isExporting ? <span className="loader"></span> : <Download size={18} />}
                        {isExporting ? 'Exporting...' : 'Export Bible'}
                    </button>
                    <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
                        <Upload size={18} /> Import AI Footage
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="video/*"
                        onChange={handleFileUpload}
                    />
                </div>
            </header>

            {/* Stats Section */}
            <div className="grid grid-cols-4" style={{ marginBottom: '3rem' }}>
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="glass-card stat-card"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="stat-header">
                            <div className="stat-icon-box" style={{ color: stat.color }}>
                                <stat.icon size={24} />
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: stat.color, background: `${stat.color}15`, padding: '4px 8px', borderRadius: '100px' }}>
                                {stat.trend}
                            </span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>{stat.label}</p>
                        <h2 className="stat-value">{stat.value}</h2>
                    </motion.div>
                ))}
            </div>

            <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
                {/* Director's Lab / Upload Section */}
                <div className="glass-card lab-card" style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>AI Vision Lab</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Deep analysis of generated cinematic assets</p>
                        </div>
                        <Monitor size={20} color="var(--primary)" />
                    </div>

                    {!videoFile && !isAnalyzing ? (
                        <div
                            className="upload-dropzone"
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file && file.type.startsWith('video/')) simulateUpload(file);
                            }}
                        >
                            <div className="upload-icon-circle">
                                <Upload size={32} />
                            </div>
                            <h4>Drop AI Video Here</h4>
                            <p>or click to browse local files</p>
                            <div className="upload-badges">
                                <span className="badge badge-low">4K Ready</span>
                                <span className="badge badge-low">30 FPS</span>
                                <span className="badge badge-low">HEVC</span>
                            </div>
                        </div>
                    ) : (
                        <div className="analysis-view">
                            {isAnalyzing ? (
                                <div className="analyzing-state">
                                    <div className="scan-animation">
                                        <div className="scan-bar" />
                                        <Video size={48} className="analyzing-icon" />
                                    </div>
                                    <h3>Neural Scene Decomposition...</h3>
                                    <div className="progress-container" style={{ maxWidth: '300px', margin: '1.5rem auto' }}>
                                        <motion.div
                                            className="progress-bar"
                                            animate={{ width: `${analysisProgress}%` }}
                                        />
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Identifying shot type, lighting mood, and technical metadata</p>
                                </div>
                            ) : showAnalysis ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="analysis-results"
                                >
                                    <div className="video-player-mock">
                                        <div className="mock-frame">
                                            <Play size={40} fill="rgba(255,255,255,0.2)" />
                                            <div className="time-code">00:00:04:12</div>
                                            <div className="shot-label">MCU - MEDIUM CLOSE UP</div>
                                        </div>
                                        <div className="waveform-mock" />
                                    </div>

                                    <div className="grid grid-cols-2" style={{ gap: '1rem', marginTop: '1.5rem' }}>
                                        {directorInsights.map((insight, idx) => (
                                            <div key={idx} className="insight-item">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                    <insight.icon size={14} color="var(--primary)" />
                                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{insight.title}</span>
                                                </div>
                                                <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{insight.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                                        <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                            <Layers size={18} /> Apply Visual Grade
                                        </button>
                                        <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { setVideoFile(null); setShowAnalysis(false); }}>
                                            <Scissors size={18} /> Re-roll Analysis
                                        </button>
                                    </div>
                                </motion.div>
                            ) : null}
                        </div>
                    )}
                </div>

                {/* Right Column: Alerts & Assets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ background: 'linear-gradient(225deg, rgba(251, 113, 133, 0.1) 0%, rgba(13, 13, 15, 0.8) 100%)', border: '1px solid rgba(251, 113, 133, 0.2)' }}>
                        <div className="badge badge-high" style={{ marginBottom: '1rem' }}>
                            <AlertCircle size={14} style={{ marginRight: '4px' }} /> Visual Mismatch
                        </div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Lighting Discrepancy detected</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                            Scene 14b was generated with warmer light (3200K) compared to the master reference (5600K). Correction needed.
                        </p>
                        <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
                            View Comparison
                        </button>
                    </div>

                    <div className="glass-card" style={{ flex: 1 }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                            <Zap size={18} color="var(--primary)" /> Quick Assets
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { name: 'Cyber-Street-01.mp4', type: 'Video' },
                                { name: 'Rain-Ambience.wav', type: 'Audio' },
                                { name: 'Director-Notes-V2.pdf', type: 'Document' }
                            ].map((asset, i) => (
                                <motion.div
                                    key={i}
                                    className="asset-item"
                                    whileHover={{ x: 5 }}
                                    onClick={() => alert(`Downloading ${asset.name}...`)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Play size={12} fill="currentColor" />
                                        <span style={{ fontSize: '0.85rem' }}>{asset.name}</span>
                                    </div>
                                    <Download size={14} color="var(--text-muted)" />
                                </motion.div>
                            ))}
                        </div>
                        <button className="btn btn-outline" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }} onClick={() => navigateTo('footage')}>
                            Open Media Pool
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .lab-card {
                    background: radial-gradient(circle at top right, rgba(147, 51, 234, 0.05), transparent);
                }
                .upload-dropzone {
                    border: 2px dashed var(--card-border);
                    border-radius: 20px;
                    padding: 4rem 2rem;
                    text-align: center;
                    cursor: pointer;
                    transition: var(--transition);
                }
                .upload-dropzone:hover {
                    border-color: var(--primary);
                    background: rgba(192, 132, 252, 0.03);
                    transform: scale(0.99);
                }
                .upload-icon-circle {
                    width: 64px;
                    height: 64px;
                    background: var(--primary-glow);
                    color: var(--primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                }
                .upload-badges {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 1.5rem;
                }
                .analyzing-state {
                    text-align: center;
                    padding: 3rem 0;
                }
                .scan-animation {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    margin: 0 auto 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255,255,255,0.03);
                    border-radius: 20px;
                    border: 1px solid var(--card-border);
                    overflow: hidden;
                }
                .scan-bar {
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background: var(--primary);
                    box-shadow: 0 0 15px var(--primary);
                    top: 0;
                    animation: scan-vertical 2s linear infinite;
                }
                @keyframes scan-vertical {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .analyzing-icon {
                    color: var(--primary);
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; transform: scale(0.9); }
                    50% { opacity: 1; transform: scale(1); }
                }
                .video-player-mock {
                    width: 100%;
                    background: #000;
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid var(--card-border);
                }
                .mock-frame {
                    height: 240px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800');
                    background-size: cover;
                }
                .time-code {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    font-family: monospace;
                    background: rgba(0,0,0,0.6);
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .shot-label {
                    position: absolute;
                    bottom: 12px;
                    left: 12px;
                    font-weight: 700;
                    font-size: 0.65rem;
                    letter-spacing: 0.1em;
                    background: var(--primary);
                    color: #000;
                    padding: 4px 10px;
                    border-radius: 4px;
                }
                .waveform-mock {
                    height: 30px;
                    background: repeating-linear-gradient(90deg, transparent, transparent 2px, var(--primary) 2px, var(--primary) 4px);
                    opacity: 0.3;
                    margin: 10px;
                }
                .insight-item {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid var(--card-border);
                    border-radius: 12px;
                    padding: 12px;
                }
                .asset-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 14px;
                    background: rgba(255,255,255,0.02);
                    border-radius: 10px;
                    border: 1px solid transparent;
                    transition: var(--transition);
                    cursor: pointer;
                }
                .asset-item:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: var(--card-border);
                }
                .loading { cursor: not-allowed; opacity: 0.8; }
                .loader {
                    width: 18px;
                    height: 18px;
                    border: 2px solid rgba(255,255,255,0.2);
                    border-top: 2px solid #fff;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;

