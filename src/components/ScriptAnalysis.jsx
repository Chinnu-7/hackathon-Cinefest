import React, { useState, useRef } from 'react';
import {
    Upload,
    FileText,
    CheckCircle2,
    AlertTriangle,
    User,
    MapPin,
    Loader2,
    FileUp,
    Activity,
    Users,
    Compass,
    Sparkles,
    BarChart3,
    Clock,
    ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';

const ScriptAnalysis = () => {
    const { navigateTo, user } = useApp();
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState(null);
    const fileInputRef = useRef(null);

    const startAnalysis = async (file) => {
        if (!file) return;
        setFileName(file.name);
        setAnalyzing(true);
        setResult(null);

        try {
            // Real API integration pattern
            const formData = new FormData();
            formData.append('script', file);
            formData.append('userId', user?.id || 1);

            const data = await apiService.script.analyze(formData);

            // Map common API response to your UI
            setResult({
                scenes: 24, // Mock metadata
                duration: '112 mins',
                tone: 'Neo-Noir / Psychological Thriller',
                characters: data.characters.map(c => ({
                    name: c.name,
                    scenes: 18,
                    sentiment: 'Conflicted',
                    casting: c.casting
                })),
                locations: data.locations.map(l => ({ name: l.name, type: 'Interior', time: 'Night' })),
                risks: [
                    { task: 'AI Analysis Complete', risk: 'Safe', cost: '$' },
                    { task: 'Production Risk', risk: 'Medium', detail: `Base Risk: ${data.riskScore}%` }
                ],
                narrativeFlow: [30, 45, 25, 60, 85, 40, 55, 95, 20, 50, 75, 90],
                castingNotes: data.castingNotes
            });
        } catch (error) {
            console.error("Analysis failed:", error);
        } finally {
            setAnalyzing(false);
        }
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.type === "application/pdf" || file.name.endsWith('.txt') || file.name.endsWith('.fdx'))) {
            startAnalysis(file);
        } else {
            alert("Please upload a valid script file (.pdf, .txt, .fdx)");
        }
    };

    const onFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) startAnalysis(file);
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
                            <Sparkles size={16} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Neural Production Breakdown</span>
                        </div>
                        <h1 className="gradient-text">Script Intelligence</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Extract deep production insights from your screenplay using cinematic AI.</p>
                    </div>
                </div>
            </header>

            <div className="grid" style={{ gridTemplateColumns: '1fr 1.8fr' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <motion.div
                        className="glass-card"
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        style={{
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '4rem 2rem',
                            border: isDragging ? '2px dashed var(--primary)' : '1px solid var(--card-border)',
                            background: isDragging ? 'rgba(192, 132, 252, 0.05)' : 'var(--card-bg)',
                            transition: 'var(--transition)',
                        }}
                    >
                        <div className="upload-icon-circle" style={{ margin: '0 auto 1.5rem', background: isDragging ? 'var(--primary)' : 'var(--primary-glow)', color: isDragging ? '#000' : 'var(--primary)' }}>
                            {analyzing ? <Loader2 className="animate-spin" size={32} /> : (isDragging ? <FileUp size={32} /> : <Upload size={32} />)}
                        </div>

                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                            {analyzing ? 'Breaking Down...' : (isDragging ? 'Release Script' : 'Upload Screenplay')}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                            {fileName ? fileName : 'Support for .PDF, .TXT and .FDX files'}
                        </p>

                        <button
                            className="btn btn-primary"
                            style={{ justifyContent: 'center' }}
                            onClick={() => fileInputRef.current.click()}
                            disabled={analyzing}
                        >
                            {analyzing ? 'AI Working...' : 'Choose File'}
                        </button>
                        <input type="file" ref={fileInputRef} onChange={onFileSelect} style={{ display: 'none' }} accept=".pdf,.txt,.fdx" />
                    </motion.div>

                    {result && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                                <Compass size={18} color="var(--primary)" /> Smart Breakdown
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="stat-mini">
                                    <span>Scenes</span>
                                    <strong>{result.scenes}</strong>
                                </div>
                                <div className="stat-mini">
                                    <span>Est. Length</span>
                                    <strong>{result.duration}</strong>
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Primary Tone</p>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{result.tone}</p>
                            </div>
                        </motion.div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <AnimatePresence mode="wait">
                        {!result && !analyzing ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-card"
                                style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5, border: '1px dashed var(--card-border)' }}
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <FileText size={64} strokeWidth={1} style={{ marginBottom: '1.5rem' }} />
                                    <h3>Awaiting Script Input</h3>
                                    <p>Detailed analysis will be generated here</p>
                                </div>
                            </motion.div>
                        ) : analyzing ? (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-card"
                                style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}
                            >
                                <div className="scan-animation" style={{ margin: '0 auto 2rem', width: '120px', height: '150px' }}>
                                    <div className="scan-bar" />
                                    <FileText size={64} style={{ color: 'var(--primary)', opacity: 0.5 }} />
                                </div>
                                <h3 style={{ marginBottom: '1rem' }}>Neural Parsing in Progress</h3>
                                <div className="progress-container" style={{ maxWidth: '300px', margin: '0 auto 2rem' }}>
                                    <motion.div
                                        className="progress-bar"
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 3.5 }}
                                    />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                                    {['Scene Detection', 'Mood Mapping', 'Risk Assessment'].map((step, i) => (
                                        <div key={i} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            <div className="loader" style={{ width: '12px', height: '12px', margin: '0 auto 8px' }} />
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                            >
                                <div className="glass-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <Activity size={20} color="var(--primary)" />
                                            Emotional Intensity Arc
                                        </h3>
                                        <div className="badge badge-low">Narrative Beats</div>
                                    </div>
                                    <div style={{ height: '150px', display: 'flex', alignItems: 'flex-end', gap: '6px', padding: '0 10px' }}>
                                        {result.narrativeFlow.map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ delay: i * 0.05 }}
                                                style={{
                                                    flex: 1,
                                                    background: h > 80 ? 'var(--accent)' : 'var(--primary)',
                                                    borderRadius: '4px 4px 0 0',
                                                    opacity: 0.6 + (h / 200),
                                                    position: 'relative'
                                                }}
                                            >
                                                {h > 80 && <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', color: 'var(--accent)', fontWeight: 700 }}>PEAK</div>}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                        <span>Act I</span>
                                        <span>Act II</span>
                                        <span>Act III</span>
                                    </div>
                                </div>

                                {/* AI Casting Recommendations */}
                                <div className="glass-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <Users size={20} color="var(--secondary)" />
                                            AI Casting Recommendations
                                        </h3>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Found {result.characters.length} Roles</div>
                                    </div>
                                    <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                                        {result.characters.map((char, idx) => (
                                            <div key={idx} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{char.name}</span>
                                                    <span className="badge badge-low" style={{ fontSize: '0.65rem' }}>{char.sentiment}</span>
                                                </div>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{char.traits || 'Primary Protagonist'}</p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 600 }}>
                                                    <Sparkles size={14} /> {char.casting || 'Suggested: Open Casting'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {result.castingNotes && (
                                        <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(45, 212, 191, 0.05)', borderRadius: '12px', border: '1px solid rgba(45, 212, 191, 0.1)', fontSize: '0.85rem', color: '#2dd4bf' }}>
                                            <strong>Director's AI Note:</strong> {result.castingNotes}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                                    <div className="glass-card">
                                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                                            <Users size={18} color="var(--primary)" /> Cast Interaction
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {result.characters.map((char, i) => (
                                                <div key={i} className="asset-item" style={{ cursor: 'default' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                                                        <span style={{ fontWeight: 600 }}>{char.name}</span>
                                                    </div>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{char.sentiment} • {char.scenes} Sc.</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="glass-card">
                                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                                            <AlertTriangle size={18} color="var(--accent)" /> Production Risks
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {result.risks.map((risk, i) => (
                                                <div key={i} style={{
                                                    padding: '10px 14px',
                                                    background: 'rgba(251, 113, 133, 0.05)',
                                                    borderRadius: '10px',
                                                    border: '1px solid rgba(251, 113, 133, 0.1)',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--accent)' }}>{risk.task}</span>
                                                    <span className="badge" style={{ fontSize: '0.6rem', background: 'rgba(251, 113, 133, 0.2)', color: 'var(--accent)' }}>{risk.risk}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card">
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                                        <MapPin size={18} color="var(--secondary)" /> Location Breakdown
                                    </h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                        {result.locations.map((loc, i) => (
                                            <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                                                <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>{loc.name}</p>
                                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{loc.type} • {loc.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style>{`
                .stat-mini {
                    padding: 12px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid var(--card-border);
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                }
                .stat-mini span { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; }
                .stat-mini strong { font-size: 1.1rem; color: #fff; margin-top: 4px; }
            `}</style>
        </div>
    );
};

export default ScriptAnalysis;
