import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertTriangle, User, MapPin, Loader2, FileUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScriptAnalysis = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState(null);
    const fileInputRef = useRef(null);

    const startAnalysis = (file) => {
        if (!file) return;
        setFileName(file.name);
        setAnalyzing(true);
        setResult(null);

        // Simulate complex AI analysis
        setTimeout(() => {
            setAnalyzing(false);
            setResult({
                scenes: 12,
                characters: ['Elias', 'Sarah', 'The Guard', 'Agent Miller'],
                locations: ['Subway Platform', 'Dark Alley', 'Penthouse', 'Control Room'],
                risks: ['Stunt Work (Scene 4)', 'High Speed Chase', 'Night Shoot', 'VFX heavy transition']
            });
        }, 3000);
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
                <div>
                    <h1 className="gradient-text">Script Intelligence</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Extract deep production insights from your screenplay using neural analysis.</p>
                </div>
            </header>

            <div className="grid grid-cols-2" style={{ alignItems: 'stretch' }}>
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
                        padding: '5rem 2rem',
                        border: isDragging ? '2px dashed var(--primary)' : '1px solid var(--card-border)',
                        background: isDragging ? 'rgba(192, 132, 252, 0.05)' : 'var(--card-bg)',
                        transition: 'var(--transition)',
                        height: '100%'
                    }}
                >
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: isDragging ? 'var(--primary)' : 'var(--primary-glow)',
                        borderRadius: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        color: isDragging ? '#000' : 'var(--primary)',
                        transition: 'var(--transition)',
                        transform: isDragging ? 'scale(1.1) rotate(5deg)' : 'scale(1)'
                    }}>
                        {analyzing ? <Loader2 className="animate-spin" size={40} /> : (isDragging ? <FileUp size={40} /> : <Upload size={40} />)}
                    </div>

                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 700 }}>
                        {analyzing ? 'Processing Script...' : (isDragging ? 'Release to Upload' : 'Intelligence Upload')}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem', maxWidth: '300px', margin: '0 auto 2.5rem' }}>
                        {fileName ? `Scanning: ${fileName}` : 'Drop your PDF or Final Draft file here to begin the AI breakdown.'}
                    </p>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onFileSelect}
                        style={{ display: 'none' }}
                        accept=".pdf,.txt,.fdx"
                    />

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            className="btn btn-primary"
                            style={{ minWidth: '180px', justifyContent: 'center', height: '52px' }}
                            onClick={() => fileInputRef.current.click()}
                            disabled={analyzing}
                        >
                            {analyzing ? 'Analyzing...' : 'Select Script'}
                        </button>
                    </div>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <AnimatePresence mode="wait">
                        {result && !analyzing ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-card"
                                style={{ height: '100%' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ background: 'var(--secondary)', color: '#000', borderRadius: '50%', padding: '4px' }}>
                                            <CheckCircle2 size={24} />
                                        </div>
                                        Insights Ready
                                    </h3>
                                    <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>{result.scenes} SCENES FOUND</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Extraction Overview</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
                                                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '12px', color: 'var(--text-muted)' }}>
                                                    <User size={16} /> Characters
                                                </p>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                    {result.characters.map((c, i) => (
                                                        <span key={i} className="badge" style={{ background: 'rgba(192, 132, 252, 0.1)', color: '#c084fc', border: '1px solid rgba(192, 132, 252, 0.2)' }}>{c}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
                                                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '12px', color: 'var(--text-muted)' }}>
                                                    <MapPin size={16} /> Locations
                                                </p>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                    {result.locations.map((l, i) => (
                                                        <span key={i} className="badge" style={{ background: 'rgba(45, 212, 191, 0.1)', color: '#2dd4bf', border: '1px solid rgba(45, 212, 191, 0.2)' }}>{l}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Production Risk Analysis</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {result.risks.map((r, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    style={{
                                                        padding: '16px 20px',
                                                        background: 'rgba(251, 113, 133, 0.05)',
                                                        border: '1px solid rgba(251, 113, 133, 0.1)',
                                                        borderLeft: '4px solid var(--accent)',
                                                        borderRadius: '16px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '16px',
                                                        fontSize: '0.95rem',
                                                        color: 'var(--accent)'
                                                    }}
                                                >
                                                    <AlertTriangle size={18} /> {r}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : analyzing ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>AI Neural Breakdown</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Scanning dialogue patterns, scene beats, and technical requirements...</p>
                                    <div className="progress-container" style={{ background: 'rgba(255,255,255,0.03)', height: '10px' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 3, ease: "easeInOut" }}
                                            className="progress-bar"
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                                        {['Parsing Text', 'Locating Scenes', 'Identifying Risks'].map((task, i) => (
                                            <div key={i} style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                <Loader2 size={12} className="animate-spin" style={{ marginBottom: '4px', opacity: 0.5 }} />
                                                <br />{task}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', opacity: 0.5, border: '1px dashed var(--card-border)', borderRadius: '24px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <FileText size={48} strokeWidth={1} style={{ marginBottom: '1rem' }} />
                                    <p>Results will appear here</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};


export default ScriptAnalysis;
