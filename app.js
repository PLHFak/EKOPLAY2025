// EKOPLAY - Synchronized Video Player with Vimeo
// Using Vimeo Player API and pre-computed waveforms

class EkoPlayer {
    constructor() {
        // Load demo configuration
        const demoConfig = getCurrentDemo();
        console.log(`🎬 Loading demo: ${demoConfig.title}`);

        // Vimeo video IDs from library
        this.vimeoIds = demoConfig.vimeoIds;

        this.players = [];
        this.activeAudioIndex = 0;  // DEFAULT TO VIDEO 1 (SEQUENCE 1 - REFERENCE)
        this.isPlayingAll = false;
        this.playersReady = 0;
        this.loopCounters = [0, 0, 0];
        this.lastLoggedSecond = {};
        this.isResyncPaused = false;
        this.hasPlayedOnce = false;
        this.autoPlayTriggered = false;
        this.isBuffering = true; // Track buffering state

        // Fullscreen mode
        this.fullscreenActive = false;
        this.fullscreenVideoIndex = null;

        // Waveform data storage
        this.waveformData = [null, null, null];

        // Store demo config
        this.demoConfig = demoConfig;

        this.init();
        this.updateDemoUI();
    }

    updateDemoUI() {
        // Update page title and header
        document.title = `EKOPLAY - ${this.demoConfig.title}`;
        const header = document.querySelector('header h1');
        if (header) {
            header.innerHTML = `EKOPLAY <span class="subtitle">${this.demoConfig.title}</span>`;
        }

        // Update waveform images for the current demo
        for (let i = 0; i < 3; i++) {
            const waveformImg = document.getElementById(`waveform-img-${i}`);
            if (waveformImg && this.demoConfig.waveforms[i]) {
                // Add timestamp to force reload and avoid cache
                const timestamp = new Date().getTime();
                waveformImg.src = `${this.demoConfig.waveforms[i]}?t=${timestamp}`;
                console.log(`🖼️ Updated waveform ${i} to: ${this.demoConfig.waveforms[i]}`);
            }
        }

        // Update demo button
        const demoLink = document.querySelector('.demo-link');
        if (demoLink) {
            const urlParams = new URLSearchParams(window.location.search);
            const currentDemo = urlParams.get('demo') || 'boxing';

            if (currentDemo === 'jump') {
                demoLink.href = '?demo=boxing';
                demoLink.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span>Boxing Demo</span>
                `;
            } else {
                demoLink.href = '?demo=jump';
                demoLink.innerHTML = `
                    <span>Jump Demo</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                `;
            }
        }
    }

    async init() {
        console.log('🚀 EKOPLAY: Initializing...');

        // Initialize Vimeo players
        for (let i = 0; i < 3; i++) {
            console.log(`📹 Creating player ${i} with Vimeo ID: ${this.vimeoIds[i]}`);

            const player = new Vimeo.Player(`video-${i}`, {
                id: this.vimeoIds[i],
                width: 640,
                responsive: true,
                controls: false,
                muted: (i !== this.activeAudioIndex),
                autoplay: false,
                background: true,  // CRITICAL: Allow multiple videos to play simultaneously
                quality: 'auto',   // Auto quality selection
                playsinline: true  // Better mobile support
            });

            this.players.push(player);

            // Setup event listeners for each player
            // Use 'ready' instead of 'loaded' - more reliable
            player.ready().then(() => {
                this.onPlayerLoaded(i);
            }).catch(err => {
                console.error(`❌ Player ${i} ready failed:`, err);
            });

            player.on('play', () => {
                console.log(`▶️ Video ${i} started playing`);
            });

            player.on('pause', () => {
                console.log(`⏸️ Video ${i} paused`);
            });

            player.on('timeupdate', (data) => {
                this.onTimeUpdate(i, data);
            });

            player.on('ended', () => {
                this.onVideoEnd(i);
            });

            player.on('error', (error) => {
                console.error(`❌ Video ${i} error:`, error);
            });
        }

        // Setup UI event listeners
        this.setupEventListeners();

        console.log('✅ EKOPLAY initialized with Vimeo players');
    }

    async loadWaveforms() {
        // Use waveforms from demo configuration
        const waveformFiles = this.demoConfig.waveforms;

        for (let i = 0; i < 3; i++) {
            try {
                const img = new Image();
                img.src = waveformFiles[i];
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });

                // Extract waveform data from image
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                const data = imageData.data;

                // Sample waveform amplitude (take center row)
                const samples = [];
                const centerY = Math.floor(img.height / 2);
                for (let x = 0; x < img.width; x++) {
                    const idx = (centerY * img.width + x) * 4;
                    const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                    samples.push(brightness / 255);
                }

                this.waveformData[i] = samples;
                console.log(`✅ Loaded waveform ${i} (${waveformFiles[i]}): ${samples.length} samples`);
            } catch (error) {
                console.error(`❌ Failed to load waveform ${i} (${waveformFiles[i]}):`, error);
            }
        }
    }

    async onPlayerLoaded(index) {
        try {
            this.playersReady++;
            const duration = await this.players[index].getDuration();
            this.updateDuration(index, duration);

            // Set initial volume to 45%
            await this.players[index].setVolume(0.45);
            console.log(`🔊 Volume ${index} set to 45%`);

            // Update volume slider display
            const slider = document.querySelector(`.volume-slider[data-video="${index}"]`);
            if (slider) slider.value = 45;
            const valueDisplay = document.getElementById(`volume-value-${index}`);
            if (valueDisplay) valueDisplay.textContent = '45%';

            // Hide loading overlay
            const loadingOverlay = document.getElementById(`loading-${index}`);
            if (loadingOverlay) {
                loadingOverlay.classList.add('hidden');
                console.log(`✅ Loading overlay ${index} hidden`);
            }

            console.log(`✅ Player ${index} loaded (${this.playersReady}/3), duration: ${duration}s`);

            if (this.playersReady === 3) {
                console.log('🎉 All players ready!');

                // Set default audio to VIDEO 1 (SEQUENCE 1 - REFERENCE)
                await this.selectAudio(0);
                document.getElementById('audio-0').checked = true;

                // Show buffering message
                this.showBufferingMessage();

                // Auto-play after longer delay for better buffering
                if (!this.autoPlayTriggered) {
                    this.autoPlayTriggered = true;
                    console.log('⏳ Buffering for 4 seconds before auto-play...');
                    setTimeout(() => {
                        this.hideBufferingMessage();
                        this.playAll();
                    }, 4000); // Increased from 2s to 4s
                }
            }
        } catch (error) {
            console.error(`❌ Error loading player ${index}:`, error);
        }
    }

    onTimeUpdate(index, data) {
        this.updateTimeDisplay(index, data.seconds);
        this.updateWaveformCursor(index, data.seconds, data.duration);
    }

    // Show buffering message
    showBufferingMessage() {
        // Remove any existing message first
        this.hideBufferingMessage();

        const message = document.createElement('div');
        message.id = 'buffering-message';
        message.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: rgba(0,0,0,0.9); padding: 30px 50px; border-radius: 15px; 
                        z-index: 10000; text-align: center; border: 2px solid #667eea;">
                <div style="font-size: 48px; margin-bottom: 15px;">⏳</div>
                <div style="font-size: 20px; color: #fff; font-weight: 600;">Buffering videos...</div>
                <div style="font-size: 14px; color: #94a3b8; margin-top: 8px;">Please wait for optimal synchronization</div>
                <div style="font-size: 13px; color: #667eea; margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(102, 126, 234, 0.3);">
                    💡 If sync is lost, use the <strong style="color: #fff;">🔄 Resync</strong> button
                </div>
            </div>
        `;
        document.body.appendChild(message);
    }

    // Hide buffering message
    hideBufferingMessage() {
        const message = document.getElementById('buffering-message');
        if (message) {
            message.remove();
        }
    }

    async onVideoEnd(index) {
        console.log(`🔄 Video ${index} ended, looping...`);

        // Increment loop counter
        this.loopCounters[index]++;

        // REMOVED AUTOMATIC RESYNC - Only manual resync via button
        // Simple seamless loop without interruption
        try {
            await this.players[index].setCurrentTime(0);
            await this.players[index].play();
            console.log(`✅ Video ${index} looped (${this.loopCounters[index]} loops total)`);
        } catch (error) {
            console.error(`❌ Error looping video ${index}:`, error);
        }
    }

    setupEventListeners() {
        // Global controls
        document.getElementById('playAll').addEventListener('click', () => {
            console.log('🎬 Play All button clicked');
            this.playAll();
        });

        document.getElementById('stopAll').addEventListener('click', () => {
            console.log('⏹️ Stop All button clicked');
            this.stopAll();
        });

        document.getElementById('rewindAll').addEventListener('click', () => {
            console.log('⏮️ Rewind All button clicked');
            this.rewindAll();
        });

        // Spacebar for play/pause
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault(); // Prevent page scroll

                if (this.isPlayingAll) {
                    console.log('⏸️ Spacebar pressed - Pausing all');
                    this.stopAll();
                } else {
                    console.log('▶️ Spacebar pressed - Playing all');
                    this.playAll();
                }
            }
        });

        // Re-sync button
        document.getElementById('resyncAll').addEventListener('click', () => {
            console.log('🔄 Re-sync button clicked');
            this.forceResync();
        });


        // Audio selection via radio buttons
        document.querySelectorAll('.audio-radio').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const videoIndex = parseInt(e.target.value);
                console.log(`🔊 Audio radio selected: Video ${videoIndex}`);
                this.selectAudio(videoIndex);
            });
        });

        // Click on video or waveform to select audio
        document.querySelectorAll('[data-audio-target]').forEach(element => {
            element.addEventListener('click', (e) => {
                const videoIndex = parseInt(element.dataset.audioTarget);
                console.log(`🎯 Clicked on video/waveform ${videoIndex} - switching audio`);
                this.selectAudio(videoIndex);
                // Update radio button
                document.getElementById(`audio-${videoIndex}`).checked = true;
            });
        });

        // Click on waveform containers to select audio
        document.querySelectorAll('.waveform-container').forEach(element => {
            element.addEventListener('click', (e) => {
                const videoIndex = parseInt(element.dataset.player);
                console.log(`🎯 Clicked on waveform ${videoIndex} - switching audio`);
                this.selectAudio(videoIndex);
                // Update radio button
                document.getElementById(`audio-${videoIndex}`).checked = true;
            });
        });

        // Click on video overlay to select audio (specific handler for better reliability)
        document.querySelectorAll('.video-click-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                const videoIndex = parseInt(overlay.dataset.audioTarget);
                console.log(`🎬 Clicked on video overlay ${videoIndex} - switching audio`);
                this.selectAudio(videoIndex);
                // Update radio button
                document.getElementById(`audio-${videoIndex}`).checked = true;
            });
        });

        // Individual play buttons
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const videoIndex = parseInt(e.target.dataset.video);
                console.log(`▶️ Individual play button clicked: Video ${videoIndex}`);
                this.playVideo(videoIndex);
            });
        });

        // Individual stop buttons
        document.querySelectorAll('.stop-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const videoIndex = parseInt(e.target.dataset.video);
                console.log(`⏹️ Individual stop button clicked: Video ${videoIndex}`);
                this.stopVideo(videoIndex);
            });
        });

        // Fullscreen buttons
        document.querySelectorAll('.fullscreen-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent video click event
                const videoIndex = parseInt(btn.dataset.video);
                console.log(`🖥️ Fullscreen button clicked: Video ${videoIndex}`);
                this.enterFullscreen(videoIndex);
            });
        });

        // Fullscreen exit button
        document.getElementById('fullscreen-exit').addEventListener('click', () => {
            this.exitFullscreen();
        });

        // Volume sliders
        document.querySelectorAll('.volume-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const videoIndex = parseInt(e.target.dataset.video);
                const volume = parseInt(e.target.value) / 100;
                this.setVolume(videoIndex, volume);
                document.getElementById(`volume-value-${videoIndex}`).textContent = `${e.target.value}%`;
            });
        });
    }

    // Play all videos synchronously
    async playAll() {
        console.log('🎬 Starting Play All sequence...');
        this.isPlayingAll = true;

        try {
            // Check if players are ready
            if (this.playersReady < 3) {
                console.warn(`⚠️ Not all players ready yet (${this.playersReady}/3)`);
                alert('Please wait, videos are still loading...');
                return;
            }

            // First play - INCREASED buffering time with visible indicator
            if (!this.hasPlayedOnce) {
                console.log('⏳ First play - buffering for 4 seconds...');
                this.showBufferingMessage();

                // INCREASED: Wait 4 seconds for better buffering
                await new Promise(resolve => setTimeout(resolve, 4000));

                this.hideBufferingMessage();

                console.log('▶️ Launching all 3 videos in parallel with precise timing...');

                // Synchronized start - all at once
                await Promise.all([
                    this.players[0].play(),
                    this.players[1].play(),
                    this.players[2].play()
                ]);

                this.hasPlayedOnce = true;
                console.log('✅ First play complete!');

                // AUTO RESYNC after initial play for better sync
                console.log('⏳ Waiting 500ms before auto-resync...');
                await new Promise(resolve => setTimeout(resolve, 500));
                console.log('🔄 Performing automatic resync after download...');
                await this.forceResync();
            } else {
                // Subsequent plays - synchronized start
                console.log('▶️ Launching all 3 videos in parallel...');
                await Promise.all([
                    this.players[0].play(),
                    this.players[1].play(),
                    this.players[2].play()
                ]);
            }

            console.log('🎉 All play commands sent!');
        } catch (error) {
            console.error('❌ Error in Play All:', error);
            alert(`Error: ${error.message}`);
        }
    }


    // Stop all videos
    async stopAll() {
        console.log('⏹️ Stopping all videos...');
        this.isPlayingAll = false;

        try {
            const pausePromises = this.players.map((player, i) => {
                console.log(`  Pausing video ${i}`);
                return player.pause();
            });
            await Promise.all(pausePromises);
            console.log('✅ All videos stopped');
        } catch (error) {
            console.error('❌ Error stopping videos:', error);
        }
    }

    // Rewind all videos to start
    async rewindAll() {
        console.log('⏮️ Rewinding all videos to start...');
        this.isPlayingAll = false;

        try {
            await Promise.all(this.players.map(p => p.pause()));
            await Promise.all(this.players.map(p => p.setCurrentTime(0)));
            console.log('✅ All videos rewound to start');
        } catch (error) {
            console.error('❌ Error rewinding:', error);
        }
    }

    // Force re-synchronization
    async forceResync() {
        console.log('🔄 Force re-synchronization...');

        try {
            const wasPlaying = this.isPlayingAll;

            // Pause all
            await Promise.all(this.players.map(p => p.pause()));

            // Get current times
            const times = await Promise.all(this.players.map(p => p.getCurrentTime()));
            console.log(`📊 Current times: ${times.map(t => t.toFixed(3)).join(', ')}`);

            // Find reference time (video 0)
            const referenceTime = times[0];

            // Sync videos 1 and 2 to reference with tolerance
            const tolerance = 0.05; // 50ms tolerance

            for (let i = 1; i < 3; i++) {
                const drift = Math.abs(times[i] - referenceTime);
                if (drift > tolerance) {
                    console.log(`⚠️  Video ${i} drift: ${(drift * 1000).toFixed(0)}ms - correcting...`);
                    await this.players[i].setCurrentTime(referenceTime);
                }
            }

            // Small delay for seek to complete
            await new Promise(resolve => setTimeout(resolve, 100));

            // Resume if was playing
            if (wasPlaying) {
                await Promise.all(this.players.map(p => p.play()));
                this.isPlayingAll = true;
            }

            console.log('✅ Re-sync complete');
        } catch (error) {
            console.error('❌ Error in force resync:', error);
        }
    }

    // Play individual video
    async playVideo(index) {
        console.log(`▶️ Playing video ${index}...`);
        try {
            await this.players[index].play();
            console.log(`✅ Video ${index} playing`);
        } catch (error) {
            console.error(`❌ Error playing video ${index}:`, error);
        }
    }

    // Stop individual video
    async stopVideo(index) {
        console.log(`⏹️ Stopping video ${index}...`);
        try {
            await this.players[index].pause();
            console.log(`✅ Video ${index} stopped`);
        } catch (error) {
            console.error(`❌ Error stopping video ${index}:`, error);
        }
    }

    // Select audio source (exclusive)
    async selectAudio(index) {
        console.log(`🔊 Selecting audio source: Video ${index}`);
        this.activeAudioIndex = index;

        try {
            // Mute all except selected
            for (let i = 0; i < this.players.length; i++) {
                const shouldMute = (i !== index);
                console.log(`  Video ${i}: ${shouldMute ? 'MUTED' : 'UNMUTED'}`);
                await this.players[i].setMuted(shouldMute);

                // Add/remove inactive class on waveform containers
                const waveformContainer = document.querySelector(`.waveform-container[data-player="${i}"]`);
                if (waveformContainer) {
                    if (shouldMute) {
                        waveformContainer.classList.add('inactive');
                    } else {
                        waveformContainer.classList.remove('inactive');
                    }
                }

                // Update audio indicator icons
                const audioIndicator = document.getElementById(`audio-indicator-${i}`);
                if (audioIndicator) {
                    if (shouldMute) {
                        audioIndicator.classList.remove('active');
                    } else {
                        audioIndicator.classList.add('active');
                    }
                }
            }

            console.log(`✅ Audio source set to Video ${index}`);
        } catch (error) {
            console.error('❌ Error selecting audio:', error);
        }
    }

    // Set volume for individual video
    async setVolume(index, volume) {
        try {
            await this.players[index].setVolume(volume);
            console.log(`🔊 Video ${index} volume set to ${Math.round(volume * 100)}%`);
        } catch (error) {
            console.error(`❌ Error setting volume for video ${index}:`, error);
        }
    }

    // Update duration display
    updateDuration(index, duration) {
        const formatted = this.formatTime(duration);
        document.getElementById(`duration-${index}`).textContent = formatted;
    }

    // Update time display
    updateTimeDisplay(index, currentTime) {
        const formatted = this.formatTime(currentTime);
        document.getElementById(`time-${index}`).textContent = formatted;
    }

    // Update waveform cursor position
    updateWaveformCursor(index, currentTime, duration) {
        const cursor = document.querySelector(`[data-player="${index}"] .waveform-cursor`);
        if (!cursor || duration <= 0) return;

        // Calculate position based on video time
        const progress = currentTime / duration;
        const position = progress * 100; // 0% to 100%

        // Update cursor position directly (no animation)
        cursor.style.left = `${position}%`;
        cursor.style.animation = 'none'; // Disable CSS animation
    }

    // Format time as MM:SS
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Fullscreen Mode
    enterFullscreen(videoIndex) {
        console.log(`🖥️ Entering fullscreen for video ${videoIndex}`);

        this.fullscreenActive = true;
        this.fullscreenVideoIndex = videoIndex;

        const container = document.getElementById('fullscreen-container');
        const videoContainer = document.getElementById('fullscreen-video');
        const controls = document.getElementById('fullscreen-controls');

        // Move (not clone) the video iframe to fullscreen to maintain sync
        const originalVideo = document.getElementById(`video-${videoIndex}`);
        const iframe = originalVideo.querySelector('iframe');
        if (iframe) {
            // Store original parent for restoration
            this.originalVideoParent = originalVideo;

            // Move iframe to fullscreen
            videoContainer.appendChild(iframe);
        }

        // Show/hide controls based on video type
        if (videoIndex === 0) {
            // Direct Live - no mixing
            controls.style.display = 'none';
        } else {
            // Slow-motion - show mixing controls
            controls.style.display = 'block';
            this.setupMixControls(videoIndex);
        }

        // Show fullscreen
        container.classList.remove('hidden');
    }

    setupMixControls(primaryVideoIndex) {
        // Determine which slow-motion videos to mix
        const slowMoIndexes = [1, 2]; // Both slow-motion videos
        const otherIndex = slowMoIndexes.find(i => i !== primaryVideoIndex);

        // Update labels
        document.getElementById('mix-label-1').textContent =
            primaryVideoIndex === 1 ? 'Slow-Mo Standard (Active)' : 'Slow-Mo Standard';
        document.getElementById('mix-label-2').textContent =
            primaryVideoIndex === 2 ? 'Slow-Mo EKO (Active)' : 'Slow-Mo EKO';

        // Set initial values
        const slider1 = document.getElementById('mix-slider-1');
        const slider2 = document.getElementById('mix-slider-2');

        if (primaryVideoIndex === 1) {
            slider1.value = 100;
            slider2.value = 0;
        } else {
            slider1.value = 0;
            slider2.value = 100;
        }

        this.updateMixValues();

        // Setup event listeners
        slider1.oninput = () => {
            this.updateMixValues();
            this.applyAudioMix();
        };

        slider2.oninput = () => {
            this.updateMixValues();
            this.applyAudioMix();
        };
    }

    updateMixValues() {
        const slider1 = document.getElementById('mix-slider-1');
        const slider2 = document.getElementById('mix-slider-2');

        document.getElementById('mix-value-1').textContent = slider1.value + '%';
        document.getElementById('mix-value-2').textContent = slider2.value + '%';
    }

    async applyAudioMix() {
        const vol1 = parseInt(document.getElementById('mix-slider-1').value) / 100;
        const vol2 = parseInt(document.getElementById('mix-slider-2').value) / 100;

        // Apply volumes to both slow-motion videos
        await this.players[1].setVolume(vol1);
        await this.players[2].setVolume(vol2);

        console.log(`🎚️ Audio mix: Standard=${vol1.toFixed(2)}, EKO=${vol2.toFixed(2)}`);
    }

    exitFullscreen() {
        console.log('🚪 Exiting fullscreen');

        this.fullscreenActive = false;

        const container = document.getElementById('fullscreen-container');
        const videoContainer = document.getElementById('fullscreen-video');

        // Restore iframe to original position
        const iframe = videoContainer.querySelector('iframe');
        if (iframe && this.originalVideoParent) {
            this.originalVideoParent.appendChild(iframe);
        }

        container.classList.add('hidden');

        // Reset audio to exclusive mode
        this.selectAudio(this.activeAudioIndex);

        this.fullscreenVideoIndex = null;
        this.originalVideoParent = null;
    }

    // Cleanup method to destroy all players and remove event listeners
    async destroy() {
        console.log('🧹 Destroying EkoPlayer instance...');

        try {
            // Stop all videos first
            await this.stopAll();

            // Destroy each Vimeo player
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i]) {
                    try {
                        await this.players[i].destroy();
                        console.log(`✅ Player ${i} destroyed`);
                    } catch (error) {
                        console.error(`❌ Error destroying player ${i}:`, error);
                    }
                }
            }

            // Clear player array
            this.players = [];
            this.playersReady = 0;

            // Remove buffering message if present
            this.hideBufferingMessage();

            console.log('✅ EkoPlayer instance destroyed');
        } catch (error) {
            console.error('❌ Error during cleanup:', error);
        }
    }
}


// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌐 DOM loaded, creating EKOPLAY instance...');

    // Cleanup old instance if it exists
    if (window.ekoPlayer) {
        console.log('🧹 Cleaning up previous EkoPlayer instance...');
        await window.ekoPlayer.destroy();
        window.ekoPlayer = null;
    }

    // Create new instance
    const app = new EkoPlayer();

    // Make it globally accessible for debugging
    window.ekoPlayer = app;
    console.log('💡 TIP: Access player via window.ekoPlayer in console');
});

// Detect URL changes (when switching demos via links)
// Force page reload to ensure proper cleanup
window.addEventListener('popstate', () => {
    console.log('🔄 URL changed - reloading page for clean demo switch...');
    window.location.reload();
});

// Also handle when user clicks on demo links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="?demo="]');
    if (link && link.href.includes('?demo=')) {
        e.preventDefault();
        console.log('🔄 Demo link clicked - reloading page...');
        window.location.href = link.href;
    }
});
