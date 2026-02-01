import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Film, Github, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Auth = () => {
    const { login } = useApp();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const result = await login(formData.email, formData.password);
            if (!result.success) {
                setError(result.error);
                setIsLoading(false);
            }
            // If success, AppContext state change will trigger re-render in App.jsx
        } catch (err) {
            setError('Authentication System Offline');
            setIsLoading(false);
        }
    };

    const toggleAuth = () => {
        setIsLogin(!isLogin);
        setError(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="auth-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="auth-card"
            >
                <div className="auth-header">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="logo-box"
                        style={{ margin: '0 auto' }}
                    >
                        <Film size={24} color="white" />
                    </motion.div>
                    <h2 className="auth-title">
                        {isLogin ? 'Welcome Back' : 'Join CineMind'}
                    </h2>
                    <p className="auth-subtitle">
                        {isLogin
                            ? 'The next generation AI film production suite'
                            : 'Start your creative journey with us today'}
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card"
                        style={{ padding: '12px', background: 'rgba(255, 75, 75, 0.1)', border: '1px solid rgba(255, 75, 75, 0.2)', marginBottom: '1.5rem', display: 'flex', gap: '10px', alignItems: 'center', color: '#ff4b4b', fontSize: '0.85rem' }}
                    >
                        <AlertCircle size={16} />
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="input-group"
                                key="name-field"
                            >
                                <label className="input-label">Full Name</label>
                                <div className="input-wrapper">
                                    <User className="input-icon" size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        className="auth-input"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required={!isLogin}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                name="email"
                                className="auth-input"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: '1rem' }}>
                        <label className="input-label">Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input
                                type="password"
                                name="password"
                                className="auth-input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {isLogin && (
                        <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
                            <span className="auth-link" style={{ fontSize: '0.85rem' }}>Forgot Password?</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', height: '52px', marginTop: isLogin ? '0' : '1rem' }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                style={{ width: 20, height: 20, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%' }}
                            />
                        ) : (
                            <>
                                {isLogin ? 'Sign In' : 'Create Account'}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="divider">
                    <span>Or continue with</span>
                </div>

                <div className="grid grid-cols-2" style={{ gap: '12px' }}>
                    <button type="button" className="btn btn-outline" style={{ justifyContent: 'center' }}>
                        <Github size={18} /> GitHub
                    </button>
                    <button type="button" className="btn btn-outline" style={{ justifyContent: 'center' }}>
                        Google
                    </button>
                </div>

                <div className="auth-footer">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span className="auth-link" onClick={toggleAuth}>
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </span>
                </div>
            </motion.div>

            {/* Background elements */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                overflow: 'hidden',
                pointerEvents: 'none'
            }}>
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(192, 132, 252, 0.15) 0%, transparent 70%)',
                        filter: 'blur(60px)'
                    }}
                />
                <motion.div
                    animate={{
                        x: [0, -50, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '10%',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                        filter: 'blur(60px)'
                    }}
                />
            </div>
        </div>
    );
};

export default Auth;
