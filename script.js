// Global state
let isLoggedIn = false;
let isMuted = false;
let currentTestimonial = 0;
let achievements = {
  'first-visit': { title: 'First Dose', description: 'Visited the Un-Gay Urself website', icon: '🏆', unlocked: true },
  'scroll-master': { title: 'Deep Diver', description: 'Scrolled through all sections', icon: '📜', unlocked: false },
  'admin-access': { title: 'Boss Level', description: 'Accessed the admin panel', icon: '👑', unlocked: false },
  'meme-generator': { title: 'Meme Lord', description: 'Used the meme generator 5 times', icon: '🎭', unlocked: false },
  'social-butterfly': { title: 'Social Chad', description: 'Clicked all social media links', icon: '🦋', unlocked: false }
};
let progress = {
  memeClicks: 0,
  socialClicks: 0,
  hasScrolledToFooter: false,
  hasVisitedAdmin: false
};

// Performance optimization - debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Load saved data
function loadData() {
  const savedData = localStorage.getItem('ungay_admin_data');
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (e) {
      console.error('Failed to load data:', e);
    }
  }
  
  return {
    tagline: 'Available Nowhere. Results Guaranteed.',
    logo: 'logo.png',
    banner: 'banner.png',
    telegramLink: '',
    twitterLink: 'https://twitter.com/Chad_wickchad2k',
    dexLink: '',
    contractAddress: '',
    totalSupply: '1,000,000,000',
    liquidityPool: '',
    marketCap: '',
    tokenSymbol: 'UNGAY',
    tokenName: 'Un-Gay Urself'
  };
}

// Save data
function saveData(data) {
  try {
    localStorage.setItem('ungay_admin_data', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data:', e);
  }
}

// Load achievements
function loadAchievements() {
  const saved = localStorage.getItem('ungay_achievements');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      achievements = { ...achievements, ...parsed.achievements };
      progress = { ...progress, ...parsed.progress };
    } catch (e) {
      console.error('Failed to load achievements:', e);
    }
  }
}

// Save achievements
function saveAchievements() {
  try {
    localStorage.setItem('ungay_achievements', JSON.stringify({ achievements, progress }));
  } catch (e) {
    console.error('Failed to save achievements:', e);
  }
}

// Sound effects
function playSound(type) {
  if (isMuted) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const createBeep = (frequency, duration, volume = 0.1) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    switch (type) {
      case 'pill':
        createBeep(800, 0.1);
        setTimeout(() => createBeep(1000, 0.1), 100);
        break;
      case 'transformation':
        createBeep(400, 0.2);
        setTimeout(() => createBeep(600, 0.15), 100);
        setTimeout(() => createBeep(800, 0.1), 200);
        break;
      case 'success':
        createBeep(523, 0.15);
        setTimeout(() => createBeep(659, 0.15), 150);
        setTimeout(() => createBeep(784, 0.3), 300);
        break;
      case 'hover':
        createBeep(600, 0.05, 0.05);
        break;
    }
  } catch (e) {
    console.log('Audio not supported');
  }
}

// Achievement system
function unlockAchievement(id) {
  if (achievements[id] && !achievements[id].unlocked) {
    achievements[id].unlocked = true;
    showAchievementNotification(achievements[id]);
    updateAchievementProgress();
    saveAchievements();
    playSound('success');
  }
}

function showAchievementNotification(achievement) {
  const notification = document.getElementById('achievementNotification');
  const icon = document.getElementById('achievementIcon');
  const title = document.getElementById('achievementTitle');
  const desc = document.getElementById('achievementDesc');
  
  if (notification && icon && title && desc) {
    icon.textContent = achievement.icon;
    title.textContent = achievement.title;
    desc.textContent = achievement.description;
    
    notification.classList.remove('hidden');
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 4000);
  }
}

function updateAchievementProgress() {
  const unlockedCount = Object.values(achievements).filter(a => a.unlocked).length;
  const totalCount = Object.keys(achievements).length;
  
  const countElement = document.getElementById('achievementCount');
  const barElement = document.getElementById('achievementBar');
  
  if (countElement) countElement.textContent = `${unlockedCount}/${totalCount}`;
  if (barElement) barElement.style.width = `${(unlockedCount / totalCount) * 100}%`;
}

function trackMemeClick() {
  progress.memeClicks++;
  if (progress.memeClicks >= 5) {
    unlockAchievement('meme-generator');
  }
  saveAchievements();
}

function trackSocialClick() {
  progress.socialClicks++;
  if (progress.socialClicks >= 3) {
    unlockAchievement('social-butterfly');
  }
  saveAchievements();
}

function trackAdminVisit() {
  if (!progress.hasVisitedAdmin) {
    progress.hasVisitedAdmin = true;
    unlockAchievement('admin-access');
  }
}

// Floating elements with performance optimization
function createFloatingElements() {
  const container = document.getElementById('floatingElements');
  if (!container) return;
  
  // Static elements
  const staticElements = [
    { type: 'pill', style: { top: '20%', left: '10%', animationDelay: '0s' } },
    { type: 'pill', style: { top: '60%', left: '80%', animationDelay: '2s' } },
    { type: 'pill', style: { top: '40%', left: '60%', animationDelay: '4s' } },
    { type: 'pill', style: { top: '80%', left: '20%', animationDelay: '1s' } },
    { type: 'sparkle', content: '✨', style: { top: '30%', left: '70%', animationDelay: '0.5s' } },
    { type: 'sparkle', content: '⭐', style: { top: '70%', left: '30%', animationDelay: '2.5s' } },
    { type: 'sparkle', content: '💫', style: { top: '50%', left: '90%', animationDelay: '1.5s' } },
    { type: 'sparkle', content: '🌟', style: { top: '10%', left: '50%', animationDelay: '3s' } }
  ];

  staticElements.forEach((element, index) => {
    const el = document.createElement('div');
    if (element.type === 'pill') {
      el.className = 'floating-pill will-change-transform';
    } else {
      el.className = 'floating-sparkle will-change-transform';
      el.textContent = element.content;
    }
    
    Object.assign(el.style, element.style);
    container.appendChild(el);
  });

  // Add random elements periodically with reduced frequency
  const addRandomElement = () => {
    if (document.hidden) return; // Don't add elements when tab is hidden
    
    const sparkles = ['💊', '✨', '⭐', '💫', '🌟'];
    const el = document.createElement('div');
    el.className = 'floating-sparkle will-change-transform';
    el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    el.style.top = Math.random() * 100 + '%';
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDelay = Math.random() * 3 + 's';
    
    container.appendChild(el);
    
    setTimeout(() => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, 8000);
  };

  // Reduced interval for better performance
  setInterval(addRandomElement, 8000);
}

// Side effects
function populateSideEffects() {
  const sideEffects = [
    { icon: '💪', title: 'Sudden Pull-up Strength', description: 'Inexplicable ability to do pull-ups. May cause gym addiction.', delay: '0s' },
    { icon: '👶', title: 'Three Surprise Kids', description: 'Children may appear without warning. Side effects include dad jokes.', delay: '0.5s' },
    { icon: '👘', title: 'Hoodie Spawn Syndrome', description: 'Hoodies multiply in your closet. Gray preferred, colors optional.', delay: '1s' },
    { icon: '🎤', title: 'Freestyle Outbreaks', description: 'Uncontrollable urge to rap. Bars guaranteed to be fire.', delay: '1.5s' },
    { icon: '🥗', title: 'Aversion to Brunch Menus', description: 'Sudden inability to comprehend avocado toast pricing.', delay: '2s' },
    { icon: '🍺', title: 'Beer Preference Shift', description: 'Craft beer knowledge increases exponentially. IPA opinions mandatory.', delay: '2.5s' }
  ];

  const container = document.getElementById('sideEffects');
  if (!container) return;

  container.innerHTML = '';

  sideEffects.forEach(effect => {
    const card = document.createElement('div');
    card.className = 'side-effect-card';
    card.style.animationDelay = effect.delay;
    
    card.innerHTML = `
      <div class="text-4xl mb-4 text-center animate-bounce-slow">${effect.icon}</div>
      <h3 class="text-xl font-bold mb-2 text-lime-400">${effect.title}</h3>
      <p class="text-gray-300">${effect.description}</p>
    `;
    
    container.appendChild(card);
  });
}

// Meme generator
function populateMemeGenerator() {
  const memes = ['💪 Gym Bro', '🍺 Beer Expert', '👶 Dad Mode', '🎤 Freestyle King', '🥩 Meat Lover', '🚗 Car Guy', '⚽ Sports Fan', '🔧 Handy Man'];
  const messages = [
    "Suddenly understands engine specs",
    "Can now bench press confidence",
    "Developed strong opinions about grilling",
    "Started a podcast about finance",
    "Knows all the sports statistics",
    "Built a shed without instructions",
    "Joined three fantasy leagues",
    "Bought tools for no reason"
  ];

  const container = document.getElementById('memeButtons');
  if (!container) return;

  container.innerHTML = '';

  memes.forEach(meme => {
    const button = document.createElement('button');
    button.className = 'neon-btn bg-gray-700 hover:bg-purple-600 p-3 md:p-4 rounded-lg border-purple-400 text-white font-bold transition-all hover:scale-105';
    button.textContent = meme;
    
    button.addEventListener('click', () => {
      const message = messages[Math.floor(Math.random() * messages.length)];
      alert(`${meme}: ${message}`);
      trackMemeClick();
      playSound('transformation');
    });
    
    container.appendChild(button);
  });
}

// Token info
function updateTokenInfo() {
  const data = loadData();
  const container = document.getElementById('tokenInfo');
  if (!container) return;

  container.innerHTML = '';

  const tokenCards = [
    { label: 'Symbol', value: data.tokenSymbol, color: 'yellow' },
    { label: 'Total Supply', value: data.totalSupply, color: 'orange' }
  ];

  if (data.marketCap) {
    tokenCards.push({ label: 'Market Cap', value: data.marketCap, color: 'lime' });
  }

  if (data.contractAddress) {
    tokenCards.push({
      label: 'Contract',
      value: data.contractAddress.slice(0, 6) + '...' + data.contractAddress.slice(-6),
      color: 'cyan',
      fullValue: data.contractAddress
    });
  }

  tokenCards.forEach(card => {
    const div = document.createElement('div');
    div.className = `bg-gray-800/50 p-4 md:p-6 rounded-xl border border-${card.color}-400/30 text-center`;
    
    let content = `
      <h3 class="text-lg font-bold mb-2 text-${card.color}-400">${card.label}</h3>
      <p class="text-xl font-bold text-white">${card.value}</p>
    `;

    if (card.fullValue) {
      content += `
        <button onclick="copyToClipboard('${card.fullValue}')" class="text-xs text-cyan-400 hover:text-cyan-300 mt-1 block">
          Copy Full Address
        </button>
      `;
    }

    div.innerHTML = content;
    container.appendChild(div);
  });
}

// Copy to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(() => {
      fallbackCopyTextToClipboard(text);
    });
  } else {
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    alert('Copied to clipboard!');
  } catch (err) {
    alert('Failed to copy');
  }
  document.body.removeChild(textArea);
}

// Countdown timer
function startCountdown() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = hours;
      if (minutesEl) minutesEl.textContent = minutes;
      if (secondsEl) secondsEl.textContent = seconds;
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

// Testimonials
function setupTestimonials() {
  const testimonials = [
    {
      name: "Chad McBroface",
      username: "@gigachad_2024",
      content: "Took the pill. Now I own 3 grills and can deadlift my feelings. Wife's boyfriend is jealous.",
      rating: 5,
      transformation: "💪➡️🔥"
    },
    {
      name: "Brad Lifestyle",
      username: "@brad_the_dad",
      content: "Side effects include: sudden urge to fix everything, talking about lawn care, and knowing beer brands.",
      rating: 5,
      transformation: "🍺➡️👨‍👧‍👦"
    },
    {
      name: "Kyle Energy",
      username: "@kyle_drinks_energy",
      content: "My freestyle game is unstoppable now. Dropped bars at the grocery store checkout. Cashier cried.",
      rating: 5,
      transformation: "🎤➡️🔥"
    },
    {
      name: "Derek Gainz",
      username: "@derek_infinite_gains",
      content: "Went from zero to hero in 24 hours. Now I understand cryptocurrency and have strong opinions about NFTs.",
      rating: 5,
      transformation: "📈➡️💎"
    }
  ];

  const container = document.getElementById('testimonialContainer');
  if (!container) return;

  function displayTestimonial(index) {
    const testimonial = testimonials[index];
    const stars = '⭐'.repeat(testimonial.rating);
    
    container.innerHTML = `
      <div class="animate-slide-up">
        <div class="text-4xl mb-4">${testimonial.transformation}</div>
        <blockquote class="text-lg md:text-xl text-gray-300 italic mb-4">
          "${testimonial.content}"
        </blockquote>
        <div class="text-cyan-400 font-bold mb-2">${testimonial.name}</div>
        <div class="text-gray-400 text-sm mb-2">${testimonial.username}</div>
        <div class="text-yellow-400">${stars}</div>
      </div>
    `;
  }

  displayTestimonial(currentTestimonial);

  // Navigation buttons
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      displayTestimonial(currentTestimonial);
      playSound('hover');
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      displayTestimonial(currentTestimonial);
      playSound('hover');
    });
  }

  // Auto-rotate testimonials
  setInterval(() => {
    if (!document.hidden) { // Only rotate when tab is visible
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      displayTestimonial(currentTestimonial);
    }
  }, 10000);
}

// Admin panel
function setupAdminPanel() {
  const adminSection = document.getElementById('admin');
  const loginForm = document.getElementById('loginForm');
  const adminControls = document.getElementById('adminControls');
  const passwordInput = document.getElementById('adminPassword');
  const loginBtn = document.getElementById('loginBtn');

  if (!adminSection || !loginForm || !adminControls || !passwordInput || !loginBtn) return;

  // Load current data into form
  function loadAdminData() {
    const data = loadData();
    const taglineInput = document.getElementById('taglineInput');
    const tokenSymbolInput = document.getElementById('tokenSymbolInput');
    const twitterInput = document.getElementById('twitterInput');
    const telegramInput = document.getElementById('telegramInput');
    const contractInput = document.getElementById('contractInput');
    const marketCapInput = document.getElementById('marketCapInput');

    if (taglineInput) taglineInput.value = data.tagline;
    if (tokenSymbolInput) tokenSymbolInput.value = data.tokenSymbol;
    if (twitterInput) twitterInput.value = data.twitterLink;
    if (telegramInput) telegramInput.value = data.telegramLink;
    if (contractInput) contractInput.value = data.contractAddress;
    if (marketCapInput) marketCapInput.value = data.marketCap;
  }

  // Login functionality
  loginBtn.addEventListener('click', () => {
    if (passwordInput.value === 'bosslynch') {
      isLoggedIn = true;
      loginForm.classList.add('hidden');
      adminControls.classList.remove('hidden');
      loadAdminData();
      trackAdminVisit();
      playSound('success');
    } else {
      alert('Incorrect password!');
      playSound('hover');
    }
  });

  // Enter key login
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loginBtn.click();
    }
  });

  // Save changes
  const saveBtn = document.getElementById('saveChanges');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const data = loadData();
      const taglineInput = document.getElementById('taglineInput');
      const tokenSymbolInput = document.getElementById('tokenSymbolInput');
      const twitterInput = document.getElementById('twitterInput');
      const telegramInput = document.getElementById('telegramInput');
      const contractInput = document.getElementById('contractInput');
      const marketCapInput = document.getElementById('marketCapInput');

      if (taglineInput) data.tagline = taglineInput.value;
      if (tokenSymbolInput) data.tokenSymbol = tokenSymbolInput.value;
      if (twitterInput) data.twitterLink = twitterInput.value;
      if (telegramInput) data.telegramLink = telegramInput.value;
      if (contractInput) data.contractAddress = contractInput.value;
      if (marketCapInput) data.marketCap = marketCapInput.value;

      saveData(data);
      updateSiteContent();
      alert('Changes saved successfully!');
      playSound('success');
    });
  }

  // Preview changes
  const previewBtn = document.getElementById('previewChanges');
  if (previewBtn) {
    previewBtn.addEventListener('click', () => {
      updateSiteContent();
      alert('Preview updated! Scroll up to see changes.');
      playSound('transformation');
    });
  }
}

// Update site content with admin data
function updateSiteContent() {
  const data = loadData();
  
  // Update tagline
  const taglineEl = document.getElementById('tagline');
  if (taglineEl) taglineEl.textContent = data.tagline;

  // Update social links
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    const social = link.dataset.social;
    if (social === 'twitter' && data.twitterLink) {
      link.href = data.twitterLink;
    } else if (social === 'telegram' && data.telegramLink) {
      link.href = data.telegramLink;
    } else if (social === 'dex' && data.dexLink) {
      link.href = data.dexLink;
    }
  });

  // Update token info
  updateTokenInfo();
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        if (targetId === '#admin') {
          document.getElementById('admin').classList.remove('hidden');
        }
        
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        playSound('hover');
      }
    });
  });
}

// Scroll tracking for achievements
function setupScrollTracking() {
  const debouncedScrollHandler = debounce(() => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Check if scrolled to footer
    if (scrollPosition >= documentHeight - 100 && !progress.hasScrolledToFooter) {
      progress.hasScrolledToFooter = true;
      unlockAchievement('scroll-master');
    }
  }, 100);

  window.addEventListener('scroll', debouncedScrollHandler);
}

// Setup event listeners
function setupEventListeners() {
  // Sound toggle
  const soundBtn = document.getElementById('soundBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      const icon = soundBtn.querySelector('i');
      if (icon) {
        icon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
      }
      soundBtn.title = isMuted ? 'Enable sound effects' : 'Disable sound effects';
      if (!isMuted) playSound('success');
    });
  }

  // CTA Button
  const ctaButton = document.getElementById('ctaButton');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      playSound('pill');
      alert('Dose administered! Side effects incoming...');
    });
  }

  // Merch buttons
  const merchButtons = document.querySelectorAll('.merch-btn');
  merchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const merch = btn.dataset.merch;
      const messages = {
        hoodies: 'Hoodies are spawning in your closet right now!',
        pills: 'Pill bottles are being shipped via interdimensional portal!',
        cards: 'Court summons cards are being processed by our legal team!'
      };
      alert(messages[merch] || 'Coming soon!');
      playSound('transformation');
    });
  });

  // Social links tracking
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('click', () => {
      trackSocialClick();
      playSound('hover');
    });
  });

  // Hover sound effects
  const hoverElements = document.querySelectorAll('.neon-btn, nav a');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (!isMuted) playSound('hover');
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Un-Gay Urself™ - Initializing...');
  
  // Load data
  loadAchievements();
  updateAchievementProgress();
  
  // Initialize components
  createFloatingElements();
  populateSideEffects();
  populateMemeGenerator();
  updateTokenInfo();
  setupTestimonials();
  setupAdminPanel();
  setupSmoothScrolling();
  setupScrollTracking();
  setupEventListeners();
  startCountdown();
  updateSiteContent();
  
  // Performance optimizations
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      console.log('Un-Gay Urself™ - Fully loaded and optimized!');
    });
  }
});

// Handle visibility change to pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
  const body = document.body;
  if (document.hidden) {
    body.style.animationPlayState = 'paused';
  } else {
    body.style.animationPlayState = 'running';
  }
});

// Make functions globally available for HTML onclick handlers
window.copyToClipboard = copyToClipboard;
