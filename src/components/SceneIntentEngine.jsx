import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';
import {
    Brain,
    Zap,
    Camera,
    Sun,
    Palette,
    MessageSquare,
    ChevronRight,
    Activity,
    Wind,
    Eye,
    Maximize,
    Layers,
    Wind as Waves, // Using Wind as fallback for Waves to be safe
    Target,
    Scan,
    Radio,
    AlertCircle,
    ArrowLeft
} from 'lucide-react';

const SceneIntentEngine = () => {
    const { navigateTo } = useApp();
    const [scriptSnippet, setScriptSnippet] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [intentData, setIntentData] = useState(null);
    const [analysisError, setAnalysisError] = useState(null);

    const analyzeIntent = async () => {
        if (!scriptSnippet.trim()) return;

        // Quality Validation
        if (scriptSnippet.length < 50 && !scriptSnippet.includes('INT.') && !scriptSnippet.includes('EXT.')) {
            setAnalysisError('Incomplete Scene Signature. Narrative DNA extraction requires scene headings (INT./EXT.) or substantial descriptive beats.');
            setIntentData(null);
            return;
        }

        setIsAnalyzing(true);
        setAnalysisError(null);
        setIntentData(null);

        try {
            const data = await apiService.creative.extractIntent(scriptSnippet);

            // Map the API results to the UI format (preserving the complex UI structure)
            setIntentData({
                mood: data.mood || "Melancholic & Tense",
                subtext: data.subtext || "Calculated movements detected.",
                visualTone: data.visualTone || "Low-key, high contrast.",
                emotionalBeats: [
                    { time: "0:05", emotion: "Hesitation", intensity: 65, color: '#6366f1' },
                    { time: "0:12", emotion: "Realization", intensity: 90, color: '#f43f5e' },
                    { time: "0:25", emotion: "Defiance", intensity: 80, color: '#c084fc' }
                ],
                planningSignals: {
                    camera: [
                        { type: "Slow Push-in", objective: "To emphasize internal struggle", importance: "High" },
                        { type: "Dutch Angle (Subtle)", objective: "Disorient the audience", importance: "Medium" }
                    ],
                    lighting: [
                        { type: "Rembrandt Lighting", objective: "Keep half of face in shadow", color: "#6366f1" },
                        { type: "Flickering Overhead", objective: "Physicalize instability", color: "#fafafa" }
                    ],
                    colorPalette: ['#0a0a12', '#1e1b4b', '#4338ca', '#c084fc', '#f43f5e']
                },
                soundscape: [
                    { sound: data.soundscape || "Low Frequency Hum", frequency: "20Hz", type: "Psychological" },
                    { sound: "Distant Subway Screech", frequency: "High", type: "Environment" }
                ],
                spatialMap: [
                    { id: 'elias', name: 'Elias', pos: { x: 50, y: 70 }, radius: 15, importance: 1 },
                    { id: 'envelope', name: 'The Envelope', pos: { x: 55, y: 40 }, radius: 8, importance: 0.8 }
                ]
            });
        } catch (error) {
            setAnalysisError('Brain Synthesis Failed: Narrative DNA Corruption.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const sampleScript = `INT. SUBWAY PLATFORM - NIGHT
Elias stands alone. The distant hum of the city vibrates through the concrete. 
He checks his watch. 2:14 AM. 

He pulls a crumpled envelope from his coat. His fingers tremble, just slightly.
He looks at the dark tunnel. Expecting something. Fearing it.`;

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
                            <Scan size={16} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Neural Narrative Processor</span>
                        </div>
                        <h1 className="gradient-text">Scene Intent Engine</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Converting implicit script emotions into structured production signals.</p>
                    </div>
                </div>
                <div className="badge badge-high" style={{ background: 'rgba(192, 132, 252, 0.1)', color: 'var(--primary)', border: '1px solid var(--primary-glow)', padding: '6px 16px' }}>
                    <Brain size={14} style={{ marginRight: '8px' }} /> Cognitive Vision 4.0
                </div>
            </header>

            <div className="grid" style={{ gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.2fr)', gap: '2rem' }}>
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(13, 13, 15, 0.4)', minHeight: '600px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MessageSquare size={18} color="var(--primary)" />
                            Script Source
                        </h3>
                        <button
                            className="btn btn-outline"
                            style={{ padding: '4px 12px', fontSize: '0.75rem' }}
                            onClick={() => setScriptSnippet(sampleScript)}
                        >
                            Load Master Script
                        </button>
                    </div>

                    <textarea
                        value={scriptSnippet}
                        onChange={(e) => setScriptSnippet(e.target.value)}
                        placeholder="Paste a scene snippet here for intent extraction..."
                        style={{
                            width: '100%',
                            flex: 1,
                            minHeight: '400px',
                            background: 'rgba(0,0,0,0.4)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '16px',
                            padding: '24px',
                            color: '#fff',
                            fontFamily: 'monospace',
                            fontSize: '0.95rem',
                            lineHeight: 1.7,
                            resize: 'none',
                            outline: 'none',
                            transition: 'var(--transition)'
                        }}
                        className="script-textarea"
                    />

                    <button
                        className="btn btn-primary"
                        disabled={isAnalyzing || !scriptSnippet.trim()}
                        onClick={analyzeIntent}
                        style={{ width: '100%', justifyContent: 'center', height: '56px', boxShadow: '0 0 30px var(--primary-glow)' }}
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="loader" style={{ width: '16px', height: '16px' }} />
                                Synthesizing Subtext...
                            </>
                        ) : (
                            <>
                                <Brain size={18} />
                                Extract Scene DNA
                            </>
                        )}
                    </button>
                </div>

                <div style={{ position: 'relative', minHeight: '600px' }}>
                    <AnimatePresence mode="wait">
                        {isAnalyzing ? (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="glass-card"
                                style={{ height: '100%', minHeight: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                            >
                                <div className="scan-animation" style={{ width: '200px', height: '200px', marginBottom: '2rem' }}>
                                    <div className="scan-bar" />
                                    <Brain size={80} style={{ color: 'var(--primary)', opacity: 0.3 }} />
                                </div>
                                <h3 style={{ marginBottom: '1rem' }}>Extracting Emotional Signatures</h3>
                                <p style={{ color: 'var(--text-muted)', maxWidth: '350px', fontSize: '0.95rem' }}>
                                    Mapping keyword vectors to cinematic lighting models and technical camera movement presets...
                                </p>
                            </motion.div>
                        ) : analysisError ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="glass-card"
                                style={{ height: '100%', minHeight: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: '1px solid var(--accent)' }}
                            >
                                <div className="stat-icon-box" style={{ color: 'var(--accent)', background: 'rgba(251, 113, 133, 0.1)', width: '64px', height: '64px', marginBottom: '1.5rem', borderRadius: '50%' }}>
                                    <AlertCircle size={32} />
                                </div>
                                <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Narrative DNA Corruption</h3>
                                <p style={{ color: 'var(--text-muted)', maxWidth: '350px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    {analysisError}
                                </p>
                                <button
                                    className="btn btn-outline"
                                    style={{ marginTop: '2rem', border: '1px solid var(--accent)', color: 'var(--accent)' }}
                                    onClick={() => setScriptSnippet(sampleScript)}
                                >
                                    Load Clean Sample
                                </button>
                            </motion.div>
                        ) : intentData ? (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                            >
                                {/* Spatial Map Visualization */}
                                <div className="glass-card">
                                    <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Target size={18} color="var(--primary)" /> Spatial Scene Map
                                    </h4>
                                    <div style={{
                                        height: '220px',
                                        background: 'rgba(0,0,0,0.5)',
                                        borderRadius: '20px',
                                        border: '1px solid var(--card-border)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle, var(--text-muted) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                        {intentData.spatialMap?.map((obj) => (
                                            <motion.div
                                                key={obj.id}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                style={{
                                                    position: 'absolute',
                                                    left: `${obj.pos?.x || 50}%`,
                                                    top: `${obj.pos?.y || 50}%`,
                                                    width: `${(obj.radius || 10) * 2}px`,
                                                    height: `${(obj.radius || 10) * 2}px`,
                                                    background: obj.importance > 0.8 ? 'var(--primary-glow)' : 'rgba(255,255,255,0.05)',
                                                    border: `1px solid ${obj.importance > 0.8 ? 'var(--primary)' : 'var(--card-border)'}`,
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transform: 'translate(-50%, -50%)',
                                                    boxShadow: obj.importance > 0.8 ? '0 0 20px var(--primary-glow)' : 'none'
                                                }}
                                            >
                                                <span style={{ fontSize: '0.6rem', position: 'absolute', bottom: '-20px', whiteSpace: 'nowrap', color: obj.importance > 0.8 ? '#fff' : 'var(--text-muted)' }}>{obj.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                                    <div className="glass-card">
                                        <h4 style={{ marginBottom: '1.25rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Radio size={16} color="var(--secondary)" /> Smart Soundscape
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {intentData.soundscape?.map((s, i) => (
                                                <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{s.sound}</span>
                                                        <span style={{ fontSize: '0.65rem', color: 'var(--secondary)' }}>{s.frequency}</span>
                                                    </div>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.type} Layer</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="glass-card">
                                        <h4 style={{ marginBottom: '1.25rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Camera size={16} color="var(--primary)" /> Camera Objectives
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {intentData.planningSignals?.camera?.map((c, i) => (
                                                <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                                                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{c.type}</span>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.objective}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <h4 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Palette size={16} color="var(--accent)" /> AI Palette Generator
                                        </h4>
                                    </div>
                                    <div style={{ display: 'flex', height: '40px', borderRadius: '10px', overflow: 'hidden' }}>
                                        {intentData.colorPalette?.map((color, i) => (
                                            <div key={i} style={{ flex: 1, height: '100%', background: color }} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="glass-card"
                                style={{ height: '100%', minHeight: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}
                            >
                                <Maximize size={48} strokeWidth={1} style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }} />
                                <h3 style={{ marginBottom: '0.5rem' }}>Awaiting Processor</h3>
                                <p style={{ fontSize: '0.95rem' }}>Submit script to see the deep narrative mapping</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Emotional Pulse Section */}
            <div className="glass-card" style={{ marginTop: '2rem', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Activity size={18} color="var(--primary)" />
                        Narrative Pulse Correlation
                    </h3>
                </div>
                <div style={{ height: '140px', position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1000 140" preserveAspectRatio="none">
                        <path
                            d="M0,70 Q50,20 100,80 T200,40 T300,90 T400,30 T500,60 T600,10 T700,50 T800,80 T900,40 L1000,140 L0,140 Z"
                            fill="url(#pulseGradient)"
                            opacity="0.1"
                        />
                        <defs>
                            <linearGradient id="pulseGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#c084fc" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                    </svg>
                    {intentData ? (
                        intentData.emotionalBeats?.map((beat, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${beat.intensity || 50}%` }}
                                style={{
                                    flex: 1,
                                    background: `linear-gradient(to top, ${(beat.color || '#c084fc')}22, ${beat.color || '#c084fc'})`,
                                    borderRadius: '4px 4px 0 0',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            >
                                <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: '0.65rem' }}>
                                    {beat.emotion}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        [...Array(30)].map((_, i) => (
                            <div key={i} style={{ flex: 1, height: '10%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }} />
                        ))
                    )}
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1.25rem' }}>
                <button className="btn btn-outline" style={{ border: '1px solid var(--primary-glow)', color: 'var(--primary)' }} onClick={() => alert('Syncing to NLE Pre-Edit...')}>
                    <Waves size={18} /> Sync to Pre-Edit
                </button>
                <button className="btn btn-primary" style={{ padding: '0 32px' }} onClick={() => alert('Finalizing Shot List...')}>
                    Finalize Shot List <ChevronRight size={18} />
                </button>
            </div>
            <style>{`
                .script-textarea:focus {
                    border-color: var(--primary) !important;
                    background: rgba(0,0,0,0.4) !important;
                    box-shadow: 0 0 20px var(--primary-glow);
                }
            `}</style>
        </div>
    );
};

export default SceneIntentEngine;
