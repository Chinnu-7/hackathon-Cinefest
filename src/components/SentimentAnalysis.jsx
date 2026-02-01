import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
    Upload,
    Play,
    Pause,
    User,
    Activity,
    Smile,
    Frown,
    Meh,
    AlertCircle,
    Zap,
    TrendingUp,
    ChevronRight,
    Video,
    Plus,
    ArrowLeft,
    CheckCircle2,
    Download
} from 'lucide-react';

const SentimentAnalysis = () => {
    const { navigateTo } = useApp();
    const [videoUrl, setVideoUrl] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    // Mock data for characters and sentiments
    const mockCharacters = [
        { id: 1, name: 'Protagonist', color: '#c084fc' },
        { id: 2, name: 'Antagonist', color: '#fb7185' },
        { id: 3, name: 'Mentor', color: '#2dd4bf' }
    ];

    const [activeCharacters, setActiveCharacters] = useState([]);
    const [sentimentHistory, setSentimentHistory] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoUrl(url);
            startAnalysis();
        }
    };

    const startAnalysis = () => {
        setIsAnalyzing(true);
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 15;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setIsAnalyzing(false);
            }
            setProgress(p);
        }, 300);
    };

    const emotions = [
        { label: 'Joy', icon: Smile, color: '#2dd4bf' },
        { label: 'Sadness', icon: Frown, color: '#6366f1' },
        { label: 'Anger', icon: AlertCircle, color: '#f43f5e' },
        { label: 'Neutral', icon: Meh, color: '#a1a1aa' },
    ];

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            if (videoRef.current) {
                const time = videoRef.current.currentTime;
                setCurrentTime(time);

                // Simulate character detection based on time
                const active = [];
                if (time > 2 && time < 8) active.push({ ...mockCharacters[0], emotion: emotions[Math.floor(Math.random() * emotions.length)] });
                if (time > 5 && time < 12) active.push({ ...mockCharacters[1], emotion: emotions[Math.floor(Math.random() * emotions.length)] });
                if (time > 10 && time < 18) active.push({ ...mockCharacters[2], emotion: emotions[Math.floor(Math.random() * emotions.length)] });

                setActiveCharacters(active);

                if (active.length > 0) {
                    setSentimentHistory(prev => [...prev.slice(-15), {
                        time: time.toFixed(1),
                        sentiment: Math.random() * 100,
                        char: active[0].name
                    }]);
                }
            }
        }, 500);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            setExportSuccess(true);
            setTimeout(() => setExportSuccess(false), 3000);
        }, 2000);
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
                        <h1 className="gradient-text">Sentiment Analysis</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Real-time character emotion and sentiment tracking</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div className="badge badge-low">
                        <Activity size={12} /> AI Engine Active
                    </div>
                </div>
            </header>

            {!videoUrl ? (
                <div
                    className="glass-card"
                    style={{
                        height: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderStyle: 'dashed',
                        background: 'rgba(255,255,255,0.02)'
                    }}
                >
                    <div className="stat-icon-box" style={{ width: '64px', height: '64px', marginBottom: '1.5rem', background: 'var(--primary-glow)' }}>
                        <Upload size={32} color="var(--primary)" />
                    </div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Upload Production Video</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>MP4, MOV or MKV supported (Max 500MB)</p>
                    <label className="btn btn-primary">
                        <Plus size={18} /> Select Video File
                        <input type="file" hidden accept="video/*" onChange={handleFileUpload} />
                    </label>
                </div>
            ) : isAnalyzing ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        style={{ marginBottom: '2rem', display: 'inline-block' }}
                    >
                        <Zap size={48} color="var(--primary)" />
                    </motion.div>
                    <h2>Analyzing Visual Sentiments...</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Identifying characters and mapping emotional vectors</p>
                    <div className="progress-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <motion.div
                            className="progress-bar"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                    <p style={{ fontSize: '0.8rem', marginTop: '1rem', color: 'var(--primary)' }}>{Math.round(progress)}% Complete</p>
                </div>
            ) : (
                <div className="grid" style={{ gridTemplateColumns: '1fr 320px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="glass-card" style={{ padding: '0', position: 'relative', overflow: 'hidden', background: '#000' }}>
                            <video
                                ref={videoRef}
                                src={videoUrl}
                                style={{ width: '100%', display: 'block' }}
                                onLoadedMetadata={(e) => setDuration(e.target.duration)}
                                onEnded={() => setIsPlaying(false)}
                            />

                            {/* Overlays */}
                            <AnimatePresence>
                                {activeCharacters.map((char, index) => (
                                    <motion.div
                                        key={char.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        style={{
                                            position: 'absolute',
                                            top: `${20 + index * 25}%`,
                                            left: `${20 + index * 30}%`,
                                            padding: '12px 20px',
                                            background: 'rgba(0,0,0,0.6)',
                                            backdropFilter: 'blur(8px)',
                                            border: `1px solid ${char.color}`,
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            boxShadow: `0 0 20px ${char.color}44`
                                        }}
                                    >
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '8px',
                                            background: char.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <User size={18} color="white" />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>{char.name}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <char.emotion.icon size={14} color={char.emotion.color} />
                                                <span style={{ fontSize: '0.85rem', color: char.emotion.color, fontWeight: 600 }}>{char.emotion.label}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '20px',
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px'
                            }}>
                                <button
                                    onClick={togglePlay}
                                    style={{
                                        background: 'var(--primary)',
                                        border: 'none',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" style={{ marginLeft: '2px' }} />}
                                </button>
                                <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', position: 'relative' }}>
                                    <div style={{
                                        width: `${(currentTime / duration) * 100}%`,
                                        height: '100%',
                                        background: 'var(--primary)',
                                        borderRadius: '2px'
                                    }} />
                                </div>
                                <span style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
                                    {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
                                </span>
                            </div>
                        </div>

                        <div className="glass-card">
                            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <TrendingUp size={20} color="var(--primary)" />
                                Emotional Pulse History
                            </h3>
                            <div style={{ height: '150px', display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '20px', borderBottom: '1px solid var(--card-border)' }}>
                                {sentimentHistory.map((data, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${data.sentiment}%` }}
                                        style={{
                                            flex: 1,
                                            background: 'var(--gradient-1)',
                                            borderRadius: '4px 4px 0 0',
                                            opacity: 0.7,
                                            position: 'relative'
                                        }}
                                    >
                                        {i % 4 === 0 && (
                                            <span style={{ position: 'absolute', bottom: '-25px', left: '0', fontSize: '0.6rem', color: 'var(--text-muted)' }}>{data.time}s</span>
                                        )}
                                    </motion.div>
                                ))}
                                {sentimentHistory.length === 0 && (
                                    <div style={{ width: '100%', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        Play video to start tracking emotional data points
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="glass-card" style={{ flex: 1 }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Character Feed</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {mockCharacters.map(char => {
                                    const isActive = activeCharacters.find(c => c.id === char.id);
                                    return (
                                        <div
                                            key={char.id}
                                            style={{
                                                padding: '12px',
                                                borderRadius: '12px',
                                                background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                                                border: isActive ? `1px solid ${char.color}44` : '1px solid transparent',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: char.color }} />
                                                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{char.name}</span>
                                                </div>
                                                {isActive && <div className="badge badge-low" style={{ padding: '2px 8px' }}>On Screen</div>}
                                            </div>
                                            {isActive ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isActive.emotion.color }}>
                                                    <isActive.emotion.icon size={14} />
                                                    <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{isActive.emotion.label} Detected</span>
                                                </div>
                                            ) : (
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Standing by...</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{ marginTop: '2rem', padding: '16px', borderRadius: '12px', background: 'rgba(192, 132, 252, 0.05)', border: '1px solid rgba(192, 132, 252, 0.1)' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Scene Insights</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                                    High intensity conflict detected between 00:05 and 00:12. Recommendation: Increase color saturation in post-production to match emotional peaks.
                                </p>
                            </div>
                        </div>

                        <div className="glass-card" style={{ background: 'var(--gradient-2)', color: '#000', position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                <Video size={20} />
                                <h4 style={{ fontWeight: 800 }}>Export Data</h4>
                            </div>
                            <p style={{ fontSize: '0.8rem', fontWeight: 500, opacity: 0.8, marginBottom: '1.5rem' }}>
                                Download frame-by-frame emotional metadata for color grading.
                            </p>
                            <button
                                className={`btn ${isExporting ? 'loading' : ''}`}
                                style={{ background: '#000', color: '#fff', width: '100%', justifyContent: 'center' }}
                                onClick={handleExport}
                                disabled={isExporting}
                            >
                                {isExporting ? <div className="loader" style={{ width: '16px', height: '16px' }} /> : (exportSuccess ? <CheckCircle2 size={18} /> : <Download size={18} />)}
                                {isExporting ? 'Generating JSON...' : (exportSuccess ? 'Data Exported!' : 'JSON Meta Export')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                input[type="file"] {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default SentimentAnalysis;
