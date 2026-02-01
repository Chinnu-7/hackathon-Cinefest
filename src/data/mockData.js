import {
    TrendingUp,
    AlertCircle,
    Video,
    Clock,
    Camera,
    Sun,
    Activity,
    Wind
} from 'lucide-react';

export const dashboardStats = [
    { label: 'Script Readiness', value: '85%', icon: TrendingUp, color: '#c084fc', trend: '+12%' },
    { label: 'Risk Alerts', value: '3', icon: AlertCircle, color: '#fb7185', trend: 'Critical' },
    { label: 'Analyzed Footage', value: '14.2h', icon: Video, color: '#6366f1', trend: '+2h' },
    { label: 'Time Saved', value: '24h', icon: Clock, color: '#2dd4bf', trend: 'Total' },
];

export const directorInsights = [
    { title: 'Shot Composition', value: 'Rule of Thirds detected. Excellent headroom.', type: 'visual', icon: Camera },
    { title: 'Lighting Mood', value: 'Low-key lighting. 4:1 contrast ratio. Moody.', type: 'technical', icon: Sun },
    { title: 'Color Palette', value: 'Teal & Orange heavy. High cinematic saturation.', type: 'mood', icon: Activity },
    { title: 'Camera Motion', value: 'Smooth gimbal track. No micro-jitter detected.', type: 'shot', icon: Wind },
];

export const sceneFeasibilityRaw = [
    { id: '14', name: 'The Subway Chase', score: 65, status: 'Moderate', factors: ['Stunts', 'Crowd', 'Night'], reasoning: 'High stunt complexity with logicistical night constraints.' },
    { id: '02', name: 'Intro: Elias Apartment', score: 92, status: 'Low', factors: ['Single Loc', 'Day'], reasoning: 'Controlled environment, minimal setup variance.' },
    { id: '21', name: 'The Rooftop Finale', score: 34, status: 'High', factors: ['VFX', 'Heights', 'Weather'], reasoning: 'Depends on extreme weather stability and high-cost wire work.' },
    { id: '08', name: 'The Darkroom Reveal', score: 85, status: 'Low', factors: ['Interior', 'Controlled'], reasoning: 'Standard lighting setup with minimal mobility risks.' },
];
