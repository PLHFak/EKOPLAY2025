// EKOPLAY Video Library
// Configuration for different sport demos

const DEMO_LIBRARY = {
    boxing: {
        title: "Boxing Demo",
        subtitle: "Frame-Accurate Audio Sync for Slow-Motion Replay",
        vimeoIds: [
            '1146429158', // box1B - Live
            '1146351469', // box2 - Crowd
            '1146351726'  // box3EKO - Echo
        ],
        waveforms: [
            'assets/waveforms/waveform1.png',
            'assets/waveforms/waveform2.png',
            'assets/waveforms/waveform3.png'
        ],
        videos: [
            {
                title: "Video 1 — Real-Time (Reference)",
                badge: "LIVE 1×",
                description: "Original camera audio at native speed — pitch shifts when time-stretched",
                speed: "1×"
            },
            {
                title: "Video 2 — Slow-Motion (Standard)",
                badge: "REPLAY 3×",
                description: "Ambient audio captured at normal speed, played with slow-motion video",
                speed: "3×"
            },
            {
                title: "Video 3 — Slow-Motion (EKO Synthetic)",
                badge: "REPLAY 3×",
                description: "EKO-generated synthetic audio maintains natural pitch at any playback speed",
                speed: "3×"
            }
        ]
    },

    jump: {
        title: "Jump B Demo",
        subtitle: "Synchronized Multi-Angle Jump Analysis",
        vimeoIds: [
            '1148259490', // Jump B 1 - Real-Time
            '1148259570', // Jump B 2 - Slow-Motion Standard
            '1148493931'  // Jump B 3 - Slow-Motion EKO (CORRECTED)
        ],
        waveforms: [
            'assets/waveforms/waveform_jump1.png',
            'assets/waveforms/waveform_jump2.png',
            'assets/waveforms/waveform_jump3.png'
        ],
        videos: [
            {
                title: "Jump 1 — Real-Time (Reference)",
                badge: "LIVE 1×",
                description: "Original camera audio at native speed",
                speed: "1×"
            },
            {
                title: "Jump 2 — Slow-Motion (Standard)",
                badge: "REPLAY 3×",
                description: "Ambient audio with slow-motion video",
                speed: "3×"
            },
            {
                title: "Jump 3 — Slow-Motion (EKO Synthetic)",
                badge: "REPLAY 3×",
                description: "EKO synthetic audio maintains natural pitch",
                speed: "3×"
            }
        ]
    },

    tennis: {
        title: "Tennis Demo",
        subtitle: "Frame-Accurate Audio Sync for Tennis Serve",
        vimeoIds: [
            '1148274250', // Tennis 1 - Real-Time
            '1148430431', // Tennis 2 - Slow-Motion Standard (UPDATED)
            '1148430407'  // Tennis 3 - Slow-Motion EKO (UPDATED)
        ],
        waveforms: [
            'assets/waveforms/waveform_tennis1.png',
            'assets/waveforms/waveform_tennis2.png',
            'assets/waveforms/waveform_tennis3.png'
        ],
        videos: [
            {
                title: "Tennis 1 — Real-Time (Reference)",
                badge: "LIVE 1×",
                description: "Original camera audio at native speed",
                speed: "1×"
            },
            {
                title: "Tennis 2 — Slow-Motion (Standard)",
                badge: "REPLAY 3×",
                description: "Ambient audio with slow-motion video",
                speed: "3×"
            },
            {
                title: "Tennis 3 — Slow-Motion (EKO Synthetic)",
                badge: "REPLAY 3×",
                description: "EKO synthetic audio maintains natural pitch",
                speed: "3×"
            }
        ]
    },

    football: {
        title: "Football Demo",
        subtitle: "Frame-Accurate Audio Sync for Football Goal",
        vimeoIds: [
            '1148437490', // Football 1 - Real-Time
            '1148505311', // Football 2 - Slow-Motion Standard (UPDATED)
            '1148505316'  // Football 3 - Slow-Motion EKO (UPDATED)
        ],
        waveforms: [
            'assets/waveforms/waveform_football1.png',
            'assets/waveforms/waveform_football2.png',
            'assets/waveforms/waveform_football3.png'
        ],
        videos: [
            {
                title: "Football 1 — Real-Time (Reference)",
                badge: "LIVE 1×",
                description: "Original camera audio at native speed",
                speed: "1×"
            },
            {
                title: "Football 2 — Slow-Motion (Standard)",
                badge: "REPLAY 3×",
                description: "Ambient audio with slow-motion video",
                speed: "3×"
            },
            {
                title: "Football 3 — Slow-Motion (EKO Synthetic)",
                badge: "REPLAY 3×",
                description: "EKO synthetic audio maintains natural pitch",
                speed: "3×"
            }
        ]
    },

    basketball: {
        title: "Basketball Demo",
        subtitle: "Frame-Accurate Audio Sync for Basketball Action",
        vimeoIds: [
            '1148505838', // Basketball 1 - Using Basketball 3 as reference (correct format)
            '',           // Basketball 2 - Does not exist (will show black)
            '1148505838'  // Basketball 3 - Slow-Motion EKO
        ],
        waveforms: [
            'assets/waveforms/waveform_basketball1.png',
            'assets/waveforms/waveform_basketball2.png',
            'assets/waveforms/waveform_basketball3.png'
        ],
        videos: [
            {
                title: "Basketball 1 — Real-Time (Reference)",
                badge: "LIVE 1×",
                description: "Original camera audio at native speed",
                speed: "1×"
            },
            {
                title: "Basketball 2 — Slow-Motion (Standard)",
                badge: "REPLAY 3×",
                description: "Ambient audio with slow-motion video",
                speed: "3×"
            },
            {
                title: "Basketball 3 — Slow-Motion (EKO Synthetic)",
                badge: "REPLAY 3×",
                description: "EKO synthetic audio maintains natural pitch",
                speed: "3×"
            }
        ]
    },

    cricket: {
        title: "Cricket Demo",
        subtitle: "Frame-Accurate Audio Sync for Cricket Match",
        vimeoIds: [
            '1148513396', // Cricket 1 - Real-Time
            '1148513408', // Cricket 2 - Slow-Motion Standard
            '1148513430'  // Cricket 3 - Slow-Motion EKO
        ],
        waveforms: [
            'assets/waveforms/waveform_cricket1.png',
            'assets/waveforms/waveform_cricket2.png',
            'assets/waveforms/waveform_cricket3.png'
        ],
        videos: [
            {
                title: "Cricket 1 — Real-Time (Reference)",
                badge: "LIVE 1×",
                description: "Original camera audio at native speed",
                speed: "1×"
            },
            {
                title: "Cricket 2 — Slow-Motion (Standard)",
                badge: "REPLAY 3×",
                description: "Ambient audio with slow-motion video",
                speed: "3×"
            },
            {
                title: "Cricket 3 — Slow-Motion (EKO Synthetic)",
                badge: "REPLAY 3×",
                description: "EKO synthetic audio maintains natural pitch",
                speed: "3×"
            }
        ]
    },

    ufc: {
        title: "UFC Demo",
        subtitle: "Frame-Accurate Audio Sync for MMA Combat",
        vimeoIds: [
            '1148517510', // UFC 1 - Real-Time
            '1148517488', // UFC 2 - Slow-Motion Standard
            '1148517463'  // UFC 3 - Slow-Motion EKO
        ],
        waveforms: [
            'assets/waveforms/waveform_ufc1.png',
            'assets/waveforms/waveform_ufc2.png',
            'assets/waveforms/waveform_ufc3.png'
        ],
        videos: [
            {
                title: "UFC 1 — Real-Time (Reference)",
                badge: "LIVE 1×",
                description: "Original camera audio at native speed",
                speed: "1×"
            },
            {
                title: "UFC 2 — Slow-Motion (Standard)",
                badge: "REPLAY 3×",
                description: "Ambient audio with slow-motion video",
                speed: "3×"
            },
            {
                title: "UFC 3 — Slow-Motion (EKO Synthetic)",
                badge: "REPLAY 3×",
                description: "EKO synthetic audio maintains natural pitch",
                speed: "3×"
            }
        ]
    }
};

// Get demo from URL parameter or default to boxing
function getCurrentDemo() {
    const urlParams = new URLSearchParams(window.location.search);
    const demo = urlParams.get('demo') || 'boxing';
    return DEMO_LIBRARY[demo] || DEMO_LIBRARY.boxing;
}

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DEMO_LIBRARY, getCurrentDemo };
}
