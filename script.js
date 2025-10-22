// Birthday celebration script for Nguyen Le Quy Tran
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

let musicPlaying = false;
let quotesInterval;
let confettiActive = false;
let youtubePlayer = null;
let playerReady = false;

function initializeWebsite() {
    // Initialize YouTube player first
    initializeYouTubePlayer();
    
    // Check for photo and load it
    loadBirthdayPhoto();
    
    // Start the quote rotation
    startQuoteRotation();
    
    // Add floating hearts
    startFloatingHearts();
    
    // Add sparkle effects
    startSparkleEffect();
    
    // Add magical cursor trail
    addCursorTrail();
    
    // Add entrance animations with delay
    setTimeout(() => {
        addFloatingElements();
    }, 1000);
    
    // Auto-start celebration after page load
    setTimeout(() => {
        showWelcomeMessage();
    }, 2000);
    
    // Add click effects to interactive elements
    addClickEffects();
    
    // Add keyboard shortcuts for surprise effects
    addKeyboardEffects();
}

// YouTube Player API functions
function onYouTubeIframeAPIReady() {
    // This function is called automatically by YouTube API
    initializeYouTubePlayer();
}

function initializeYouTubePlayer() {
    if (typeof YT !== 'undefined' && YT.Player) {
        youtubePlayer = new YT.Player('youtube-player', {
            height: '1',
            width: '1',
            videoId: 'hYU4b-UnCQA', // Your new chosen song
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'start': 15, // Start at 0:15 (15 seconds)
                'loop': 1,
                'playlist': 'hYU4b-UnCQA' // Required for looping
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        });
    } else {
        // Retry after a short delay if API not loaded yet
        setTimeout(initializeYouTubePlayer, 500);
    }
}

function onPlayerReady(event) {
    playerReady = true;
    
    // Set volume to a comfortable level  
    event.target.setVolume(25);
    
    // Don't auto-start - wait for user interaction
    console.log('YouTube player ready - waiting for user interaction');
}

function startAutoMusic() {
    if (youtubePlayer && playerReady) {
        // Start playing from 0:15
        youtubePlayer.seekTo(15, true);
        youtubePlayer.playVideo();
        musicPlaying = true;
        
        // Update music button
        const button = document.getElementById('music-toggle');
        if (button) {
            button.innerHTML = '🔇 Pause Music';
        }
        
        // Show song info
        const songInfo = document.getElementById('song-info');
        if (songInfo) {
            songInfo.style.display = 'block';
            setTimeout(() => {
                songInfo.style.display = 'none';
            }, 5000); // Show for 5 seconds
        }
        
        console.log('Auto-playing your special song from 0:15');
    }
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        // When song ends, restart from 0:15
        event.target.seekTo(15, true);
        event.target.playVideo();
    }
}

function onPlayerError(event) {
    console.log('YouTube player error:', event.data);
    // Fallback to custom tune if YouTube fails
    playSimpleTune();
}

function loadBirthdayPhoto() {
    // Enhanced photo loading with her specific photo file
    const photoFiles = ['nlqtroi.jpg', 'photo.jpg', 'photo.jpeg', 'photo.png', 'birthday.jpg', 'birthday.jpeg', 'birthday.png'];
    const photoElement = document.getElementById('birthday-photo');
    const placeholder = document.getElementById('photo-placeholder');
    
    // Try to load each possible photo file
    let photoLoaded = false;
    
    photoFiles.forEach((filename, index) => {
        if (!photoLoaded) {
            const img = new Image();
            img.onload = function() {
                if (!photoLoaded) {
                    photoLoaded = true;
                    photoElement.src = filename;
                    
                    // Add spectacular photo reveal animation
                    setTimeout(() => {
                        placeholder.style.animation = 'photo-fade-out 1s ease-out forwards';
                        setTimeout(() => {
                            placeholder.style.display = 'none';
                            photoElement.style.display = 'block';
                            photoElement.style.animation = 'photo-spectacular-entrance 2s ease-out forwards';
                            
                            // Create heart burst around photo
                            createPhotoHeartBurst();
                            
                            // Add photo glow effect
                            setTimeout(() => {
                                photoElement.classList.add('photo-loaded');
                            }, 2000);
                        }, 1000);
                    }, 500);
                }
            };
            img.onerror = function() {
                // Continue to next photo if this one fails
            };
            img.src = filename;
        }
    });
}

function createPhotoHeartBurst() {
    const hearts = ['💕', '💖', '💗', '💝', '💘', '🌹', '✨'];
    const photoContainer = document.querySelector('.photo-container');
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.fontSize = '1.5rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '999';
            
            const angle = (i / 12) * 360;
            const distance = 150;
            const endX = Math.cos(angle * Math.PI / 180) * distance;
            const endY = Math.sin(angle * Math.PI / 180) * distance;
            
            heart.style.animation = `heart-burst 2s ease-out forwards`;
            heart.style.setProperty('--end-x', endX + 'px');
            heart.style.setProperty('--end-y', endY + 'px');
            
            photoContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 100);
    }
}

function startFloatingHearts() {
    setInterval(() => {
        if (Math.random() > 0.8) { // 20% chance every interval
            createFloatingHeart();
        }
    }, 2000);
}

function createFloatingHeart() {
    const hearts = ['💕', '💖', '💗', '💝', '💘'];
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.animationDuration = (Math.random() * 3 + 7) + 's';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 10000);
}

function startQuoteRotation() {
    const quotes = document.querySelectorAll('.quote');
    let currentQuote = 0;
    
    // Show first quote
    quotes[currentQuote].classList.add('active');
    
    quotesInterval = setInterval(() => {
        // Hide current quote
        quotes[currentQuote].classList.remove('active');
        
        // Move to next quote
        currentQuote = (currentQuote + 1) % quotes.length;
        
        // Show next quote
        setTimeout(() => {
            quotes[currentQuote].classList.add('active');
        }, 300);
    }, 4000);
}

function showWelcomeMessage() {
    // Create a welcome popup
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-message';
    welcomeDiv.innerHTML = `
        <div class="welcome-content">
            <h3>💕 Happy Birthday to My Beautiful Girlfriend! 💕</h3>
            <p>My dearest Nguyen Le Quy Tran, today is all about celebrating you and the incredible woman you are at 23!</p>
            <p>I've created this special website just for you, filled with all my love and your favorite song! 🌹🎵</p>
            <button onclick="closeWelcomeAndStartMusic()" class="close-welcome">Start My Birthday Experience! 💖</button>
        </div>
    `;
    
    // Add welcome message styles
    const style = document.createElement('style');
    style.textContent = `
        .welcome-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fade-in 0.5s ease-out;
        }
        
        .welcome-content {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            animation: popup-enter 0.5s ease-out;
        }
        
        .welcome-content h3 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.3rem;
        }
        
        .welcome-content p {
            color: #666;
            margin-bottom: 30px;
        }
        
        .close-welcome {
            background: linear-gradient(45deg, #ff6b6b, #ffd93d);
            border: none;
            border-radius: 50px;
            padding: 12px 25px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            font-size: 1rem;
        }
        
        /* Responsive Welcome Message */
        @media (max-width: 767px) {
            .welcome-content {
                max-width: 350px;
                padding: 25px;
                margin: 0 15px;
            }
            
            .welcome-content h3 {
                font-size: 1.1rem;
            }
            
            .welcome-content p {
                font-size: 0.9rem;
            }
            
            .close-welcome {
                font-size: 0.9rem;
                padding: 10px 20px;
            }
        }
        
        @media (max-width: 480px) {
            .welcome-content {
                max-width: 300px;
                padding: 20px;
                margin: 0 10px;
            }
            
            .welcome-content h3 {
                font-size: 1rem;
                margin-bottom: 15px;
            }
            
            .welcome-content p {
                font-size: 0.85rem;
                margin-bottom: 15px;
            }
            
            .close-welcome {
                font-size: 0.85rem;
                padding: 8px 16px;
            }
        }
        
        @media (max-width: 320px) {
            .welcome-content {
                max-width: 280px;
                padding: 15px;
            }
            
            .welcome-content h3 {
                font-size: 0.95rem;
            }
            
            .welcome-content p {
                font-size: 0.8rem;
            }
            
            .close-welcome {
                font-size: 0.8rem;
                padding: 7px 14px;
            }
        }
        
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes popup-enter {
            from { transform: scale(0.5) translateY(-50px); opacity: 0; }
            to { transform: scale(1) translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(welcomeDiv);
}

function closeWelcome() {
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.style.animation = 'fade-out 0.3s ease-out forwards';
        setTimeout(() => {
            welcomeMessage.remove();
            // Start a small celebration
            createConfetti(20);
        }, 300);
    }
}

function closeWelcomeAndStartMusic() {
    // Start the auto music
    startAutoMusic();
    
    // Close welcome message
    closeWelcome();
}

function startCelebration() {
    // Add celebration class to body
    document.body.classList.add('celebration-active');
    
    // Create massive confetti
    createConfetti(100);
    
    // Play celebration sound effect (if available)
    playCelebrationSound();
    
    // Shake the birthday card
    const card = document.querySelector('.birthday-card');
    card.style.animation = 'card-celebration 1s ease-out';
    
    // Change button text temporarily
    const btn = document.querySelector('.celebration-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '💕 I Love You So Much! 💕';
    btn.style.background = 'linear-gradient(45deg, #ff6b9d, #ffa8a8)';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = 'linear-gradient(45deg, #e91e63, #ff6b9d)';
        document.body.classList.remove('celebration-active');
    }, 3000);
    
    // Add extra floating elements
    createFloatingHearts();
    createFloatingStars();
}

function createConfetti(count = 50) {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4ecdc4', '#a8e6cf', '#ff8a80'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

function createFloatingHearts() {
    const hearts = ['💖', '💕', '💝', '💗'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '999';
            heart.style.animation = 'float-up 4s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        }, i * 200);
    }
}

function createFloatingStars() {
    const stars = ['⭐', '🌟', '✨', '💫'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.innerHTML = stars[Math.floor(Math.random() * stars.length)];
            star.style.position = 'fixed';
            star.style.right = Math.random() * 100 + '%';
            star.style.bottom = '-50px';
            star.style.fontSize = '1.5rem';
            star.style.pointerEvents = 'none';
            star.style.zIndex = '999';
            star.style.animation = 'float-up-right 5s ease-out forwards';
            
            document.body.appendChild(star);
            
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 5000);
        }, i * 300);
    }
}

function addFloatingElements() {
    // Add floating gift boxes randomly
    const gifts = ['🎁', '🎀', '🎊'];
    
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
            const gift = document.createElement('div');
            gift.innerHTML = gifts[Math.floor(Math.random() * gifts.length)];
            gift.style.position = 'fixed';
            gift.style.left = Math.random() * 100 + '%';
            gift.style.top = '-50px';
            gift.style.fontSize = '1.5rem';
            gift.style.pointerEvents = 'none';
            gift.style.zIndex = '5';
            gift.style.animation = 'gift-fall 8s linear forwards';
            
            document.body.appendChild(gift);
            
            setTimeout(() => {
                if (gift.parentNode) {
                    gift.parentNode.removeChild(gift);
                }
            }, 8000);
        }
    }, 3000);
}

function addClickEffects() {
    // Add touch-friendly click effect to cake
    const cake = document.querySelector('.cake-animation');
    
    // Handle both click and touch events
    const handleCakeInteraction = function(e) {
        e.preventDefault();
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'cake-bounce 0.5s ease-out';
        }, 10);
        createConfetti(20);
    };
    
    cake.addEventListener('click', handleCakeInteraction);
    cake.addEventListener('touchend', handleCakeInteraction);
    
    // Add touch-friendly click effect to candles
    const candles = document.querySelectorAll('.candle');
    candles.forEach(candle => {
        const handleCandleInteraction = function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0)';
            this.innerHTML = '💨';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.innerHTML = '🕯️';
            }, 1000);
            
            // Check if all candles are blown out
            const allCandles = document.querySelectorAll('.candle');
            const blownCandles = Array.from(allCandles).filter(c => c.innerHTML === '💨');
            if (blownCandles.length === allCandles.length) {
                setTimeout(() => {
                    showWishMessage();
                }, 500);
            }
        };
        
        candle.addEventListener('click', handleCandleInteraction);
        candle.addEventListener('touchend', handleCandleInteraction);
    });
    
    // Add hover effects to party emojis
    const partyEmojis = document.querySelectorAll('.party-emojis span');
    partyEmojis.forEach(emoji => {
        emoji.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5) rotate(20deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        emoji.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

function showWishMessage() {
    const wishDiv = document.createElement('div');
    wishDiv.className = 'wish-message';
    wishDiv.innerHTML = `
        <div class="wish-content">
            <h3>💖 Your wish has been sent with all my love! 💖</h3>
            <p>My darling Nguyen Le Quy Tran, I hope this new year brings you everything your heart desires!</p>
            <p>You deserve all the happiness in the world, and I promise to do everything I can to make your dreams come true. 🌹</p>
            <div class="wish-sparkles">💕 ✨ � ✨ 💕</div>
        </div>
    `;
    
    wishDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        z-index: 9999;
        animation: wish-appear 2s ease-out forwards;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(wishDiv);
    
    setTimeout(() => {
        wishDiv.style.animation = 'wish-disappear 1s ease-out forwards';
        setTimeout(() => {
            wishDiv.remove();
        }, 1000);
    }, 3000);
    
    createConfetti(50);
}

function toggleMusic() {
    const button = document.getElementById('music-toggle');
    
    if (youtubePlayer && playerReady) {
        if (musicPlaying) {
            // Pause YouTube player
            youtubePlayer.pauseVideo();
            musicPlaying = false;
            button.innerHTML = '🎵 Play Music';
        } else {
            // Resume YouTube player from 0:15
            youtubePlayer.seekTo(15, true);
            youtubePlayer.playVideo();
            musicPlaying = true;
            button.innerHTML = '🔇 Pause Music';
        }
    } else {
        // Fallback if YouTube player not ready
        const music = document.getElementById('birthday-music');
        if (!musicPlaying) {
            music.play().then(() => {
                musicPlaying = true;
                button.innerHTML = '🔇 Pause Music';
            }).catch(error => {
                console.log('Audio fallback failed:', error);
                playSimpleTune();
                button.innerHTML = '🔇 Stop Tune';
            });
        } else {
            music.pause();
            musicPlaying = false;
            button.innerHTML = '🎵 Play Music';
        }
    }
}

// Simplified music functions for automatic YouTube playback

function playSimpleTune() {
    // Create simple birthday tune using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [261.63, 261.63, 293.66, 261.63, 349.23, 329.63]; // Happy Birth-day to You
    let noteIndex = 0;
    
    const playNote = (frequency, duration) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    };
    
    const playTune = () => {
        if (noteIndex < notes.length && musicPlaying) {
            playNote(notes[noteIndex], 0.5);
            noteIndex++;
            setTimeout(playTune, 600);
        } else {
            noteIndex = 0;
            if (musicPlaying) {
                setTimeout(playTune, 2000); // Repeat after 2 seconds
            }
        }
    };
    
    musicPlaying = true;
    playTune();
}

function playCelebrationSound() {
    // Create a simple celebration sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.1); // G5
        oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioContext.currentTime + 0.2); // C6
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        console.log('Could not play celebration sound:', error);
    }
}

// Add additional CSS animations dynamically
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes float-up {
        from { 
            transform: translateY(0) rotate(0deg); 
            opacity: 1; 
        }
        to { 
            transform: translateY(-100vh) rotate(360deg); 
            opacity: 0; 
        }
    }
    
    @keyframes float-up-right {
        from { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 1; 
        }
        to { 
            transform: translateY(-100vh) translateX(50px) rotate(720deg); 
            opacity: 0; 
        }
    }
    
    @keyframes gift-fall {
        from { 
            transform: translateY(-50px) rotate(0deg); 
            opacity: 0; 
        }
        10% { 
            opacity: 1; 
        }
        90% { 
            opacity: 1; 
        }
        to { 
            transform: translateY(100vh) rotate(360deg); 
            opacity: 0; 
        }
    }
    
    @keyframes wish-appear {
        from { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.5); 
        }
        to { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1); 
        }
    }
    
    @keyframes wish-disappear {
        from { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1); 
        }
        to { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.5) translateY(-50px); 
        }
    }
    
    .wish-sparkles {
        font-size: 1.5rem;
        margin-top: 15px;
        animation: sparkle 1s ease-in-out infinite alternate;
    }
`;

document.head.appendChild(additionalStyles);

// Advanced interactive effects
function startSparkleEffect() {
    setInterval(() => {
        createSparkle();
    }, 800);
}

function createSparkle() {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 3000);
}

function addCursorTrail() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create heart trail
        if (Math.random() > 0.7) {
            createCursorHeart(mouseX, mouseY);
        }
    });
}

function createCursorHeart(x, y) {
    const hearts = ['💕', '💖', '💗'];
    const heart = document.createElement('div');
    heart.className = 'cursor-trail';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = (x - 10) + 'px';
    heart.style.top = (y - 10) + 'px';
    heart.style.fontSize = '12px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 1000);
}

function addKeyboardEffects() {
    document.addEventListener('keydown', (e) => {
        switch(e.key.toLowerCase()) {
            case 'l': // L for Love
                createMassiveHeartExplosion();
                break;
            case 'h': // H for Happy
                createHappinessWave();
                break;
            case 'b': // B for Birthday
                startCelebration();
                break;
            case 'g': // G for Poodle Dog
                createPoodleEffect();
                break;
            case 't': // T for Girl
                createGirlEffect();
                break;
            case ' ': // Spacebar for surprise
                createSurpriseEffect();
                break;
        }
    });
}

function createMassiveHeartExplosion() {
    const hearts = ['💕', '💖', '💗', '💝', '💘', '🌹', '❤️'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            const angle = Math.random() * 360;
            const velocity = Math.random() * 300 + 100;
            const endX = Math.cos(angle * Math.PI / 180) * velocity;
            const endY = Math.sin(angle * Math.PI / 180) * velocity;
            
            heart.style.animation = `explosion-heart 3s ease-out forwards`;
            heart.style.setProperty('--end-x', endX + 'px');
            heart.style.setProperty('--end-y', endY + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 3000);
        }, i * 50);
    }
}

function createHappinessWave() {
    const emojis = ['😊', '😍', '🥰', '😘', '🤗', '💕'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = (i * 5) + '%';
            emoji.style.bottom = '-50px';
            emoji.style.fontSize = '2.5rem';
            emoji.style.pointerEvents = 'none';
            emoji.style.zIndex = '999';
            emoji.style.animation = 'wave-rise 4s ease-out forwards';
            
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                if (emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            }, 4000);
        }, i * 200);
    }
}

function createSurpriseEffect() {
    // Create a surprise message
    const surpriseDiv = document.createElement('div');
    surpriseDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff69b4, #ff1493);
            color: white;
            padding: 30px;
            border-radius: 20px;
            font-size: 1.5rem;
            text-align: center;
            z-index: 10000;
            animation: surprise-popup 2s ease-out forwards;
            box-shadow: 0 20px 40px rgba(255, 20, 147, 0.4);
        ">
            🎉 SURPRISE! 🎉<br>
            You're absolutely amazing!<br>
            💖 I love you so much! 💖
        </div>
    `;
    
    document.body.appendChild(surpriseDiv);
    
    // Add extra confetti
    createConfetti(100);
    
    setTimeout(() => {
        surpriseDiv.remove();
    }, 3000);
}

function createPoodleEffect() {
    // Create multiple gao.jfif images bouncing around
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const poodleImg = document.createElement('img');
            poodleImg.src = 'gao.jfif';
            poodleImg.style.position = 'fixed';
            poodleImg.style.left = Math.random() * 70 + 15 + '%'; // Keep images more centered
            poodleImg.style.top = '-150px';
            poodleImg.style.width = '120px';
            poodleImg.style.height = '120px';
            poodleImg.style.borderRadius = '50%';
            poodleImg.style.objectFit = 'cover';
            poodleImg.style.border = '5px solid #ff1493';
            poodleImg.style.boxShadow = '0 10px 30px rgba(255, 20, 147, 0.8), 0 0 20px rgba(255, 105, 180, 0.6)';
            poodleImg.style.pointerEvents = 'none';
            poodleImg.style.zIndex = '99999';
            poodleImg.style.animation = 'poodle-bounce 5s ease-out forwards';
            
            // Add error handling for image loading
            poodleImg.onerror = function() {
                // Fallback to emoji if image fails to load
                const fallback = document.createElement('div');
                fallback.innerHTML = '🐩';
                fallback.style.cssText = this.style.cssText;
                fallback.style.fontSize = '6rem';
                fallback.style.display = 'flex';
                fallback.style.alignItems = 'center';
                fallback.style.justifyContent = 'center';
                fallback.style.width = '120px';
                fallback.style.height = '120px';
                this.parentNode.replaceChild(fallback, this);
            };
            
            document.body.appendChild(poodleImg);
            
            setTimeout(() => {
                if (poodleImg.parentNode) {
                    poodleImg.parentNode.removeChild(poodleImg);
                }
            }, 5000);
        }, i * 300);
    }
    
    // Also create a large center image
    setTimeout(() => {
        const centerImg = document.createElement('img');
        centerImg.src = 'gao.jfif';
        centerImg.style.position = 'fixed';
        centerImg.style.left = '50%';
        centerImg.style.top = '50%';
        centerImg.style.transform = 'translate(-50%, -50%)';
        centerImg.style.width = '200px';
        centerImg.style.height = '200px';
        centerImg.style.borderRadius = '50%';
        centerImg.style.objectFit = 'cover';
        centerImg.style.border = '8px solid #ff1493';
        centerImg.style.boxShadow = '0 15px 50px rgba(255, 20, 147, 0.9), 0 0 40px rgba(255, 105, 180, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)';
        centerImg.style.pointerEvents = 'none';
        centerImg.style.zIndex = '999999';
        centerImg.style.animation = 'center-poodle-show 4s ease-out forwards';
        
        centerImg.onerror = function() {
            // Fallback to emoji
            const fallback = document.createElement('div');
            fallback.innerHTML = '🐩';
            fallback.style.cssText = this.style.cssText;
            fallback.style.fontSize = '8rem';
            fallback.style.display = 'flex';
            fallback.style.alignItems = 'center';
            fallback.style.justifyContent = 'center';
            fallback.style.width = '200px';
            fallback.style.height = '200px';
            this.parentNode.replaceChild(fallback, this);
        };
        
        document.body.appendChild(centerImg);
        
        setTimeout(() => {
            if (centerImg.parentNode) {
                centerImg.parentNode.removeChild(centerImg);
            }
        }, 4000);
    }, 500);
    
    // Show poodle message
    showSpecialMessage('🐩 Gao is Here! 🐩', 'The cutest poodle in the world!');
}

function createGirlEffect() {
    const girls = ['👧', '💃', '👩', '🙋‍♀️', '💁‍♀️', '🤷‍♀️'];
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const girl = document.createElement('div');
            girl.innerHTML = girls[Math.floor(Math.random() * girls.length)];
            girl.style.position = 'fixed';
            girl.style.right = Math.random() * 100 + '%';
            girl.style.bottom = '-50px';
            girl.style.fontSize = '2.2rem';
            girl.style.pointerEvents = 'none';
            girl.style.zIndex = '999';
            girl.style.animation = 'girl-dance 3.5s ease-out forwards';
            
            document.body.appendChild(girl);
            
            setTimeout(() => {
                if (girl.parentNode) {
                    girl.parentNode.removeChild(girl);
                }
            }, 3500);
        }, i * 250);
    }
    
    // Show girl power message
    showSpecialMessage('👧 Girl Power! 👧', 'Beautiful and strong like you!');
}

function showSpecialMessage(title, subtitle) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff69b4, #ff1493);
            color: white;
            padding: 25px;
            border-radius: 20px;
            font-size: 1.3rem;
            text-align: center;
            z-index: 10000;
            animation: special-message-popup 2s ease-out forwards;
            box-shadow: 0 20px 40px rgba(255, 20, 147, 0.4);
        ">
            ${title}<br>
            <div style="font-size: 1rem; margin-top: 10px; opacity: 0.9;">
                ${subtitle}
            </div>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 2500);
}