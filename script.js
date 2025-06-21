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

// Load saved data
function loadData() {
  const savedData = localStorage.getItem('ungay_admin_data');
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (e) {
      console.error('Failed to load data');
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
  localStorage.setItem('ungay_admin_data', JSON.stringify(data));
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
      console.error('Failed to load achievements');
    }
  }
}

// Save achievements
function saveAchievements() {
  localStorage.setItem('ungay_achievements', JSON.stringify({ achievements, progress }));
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
  
  icon.textContent = achievement.icon;
  title.textContent = achievement.title;
  desc.textContent = achievement.description;
  
  notification.classList.remove('hidden');
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 4000);
}

function updateAchievementProgress() {
  const unlockedCount = Object.values(achievements).filter(a => a.unlocked).length;
  const totalCount = Object.keys(achievements).length;
  
  document.getElementById('achievementCount').textContent = `${unlockedCount}/${totalCount}`;
  document.getElementById('achievementBar').style.width = `${(unlockedCount / totalCount) * 100}%`;
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
  unlockAchievement('admin-access');
}

// Floating elements
function createFloatingElements() {
  const container = document.getElementById('floatingElements');
  
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
      el.className = 'floating-pill';
    } else {
      el.className = 'floating-sparkle';
      el.textContent = element.content;
    }
    
    Object.assign(el.style, element.style);
    container.appendChild(el);
  });

  // Add random elements periodically
  setInterval(() => {
    const sparkles = ['💊', '✨', '⭐', '💫', '🌟'];
    const el = document.createElement('div');
    el.className = 'floating-sparkle';
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
  }, 5000);
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
    "Built a shed without instructions"
  ];

  const container = document.getElementById('memeButtons');
  container.innerHTML = '';

  memes.forEach(meme => {
    const button = document.createElement('button');
    button.className = 'neon-btn bg-gray-700 hover:bg-purple-600 p-4 rounded-lg border-purple-400 text-white font-bold transition-all hover:scale-105';
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
    div.className = `bg-gray-800/50 p-6 rounded-xl border border-${card.color}-400/30 text-center`;
    
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
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard!');
  });
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

      document.getElementById('days').textContent = days;
      document.getElementById('hours').textContent = hours;
      document.getElementById('minutes').textContent = minutes;
      document.getElementById('seconds').textContent = seconds;
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
      content: "Started a podcast about crypto while wearing cargo shorts. Success rate: 420%",
      rating: 5,
      transformation: "🎤➡️📈"
    },
    {
      name: "Austin Powers",
      username: "@not_the_spy",
      content: "Now I understand why men shake hands firmly and grunt instead of using words.",
      rating: 4,
      transformation: "🤝➡️💼"
    }
  ];

  function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    const content = document.getElementById('testimonialContent');
    
    content.innerHTML = `
      <div class="text-6xl mb-4">${testimonial.transformation}</div>
      <blockquote class="text-xl md:text-2xl text-gray-300 mb-6 italic">
        "${testimonial.content}"
      </blockquote>
      <div class="flex justify-center mb-4">
        ${Array(testimonial.rating).fill('⭐').join('')}
      </div>
      <div class="text-cyan-400 font-bold text-lg">${testimonial.name}</div>
      <div class="text-gray-400">${testimonial.username}</div>
    `;
  }

  function setupDots() {
    const dotsContainer = document.getElementById('testimonialDots');
    dotsContainer.innerHTML = '';
    
    testimonials.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `w-3 h-3 rounded-full transition-all ${
        index === currentTestimonial ? 'bg-cyan-400' : 'bg-gray-600'
      }`;
      dot.addEventListener('click', () => {
        currentTestimonial = index;
        updateTestimonial();
        setupDots();
      });
      dotsContainer.appendChild(dot);
    });
  }

  updateTestimonial();
  setupDots();

  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
    setupDots();
  }, 4000);
}

// Navigation
function setupNavigation() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('bg-gray-900/80', 'backdrop-blur-md');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('bg-gray-900/80', 'backdrop-blur-md');
      navbar.classList.add('bg-transparent');
    }

    // Check if scrolled to footer
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition >= documentHeight - 100 && !progress.hasScrolledToFooter) {
      progress.hasScrolledToFooter = true;
      unlockAchievement('scroll-master');
      saveAchievements();
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Admin panel
function setupAdmin() {
  const adminLink = document.getElementById('adminLink');
  const mainContent = document.getElementById('mainContent');
  const adminPanel = document.getElementById('adminPanel');
  const adminLogin = document.getElementById('adminLogin');
  const adminDashboard = document.getElementById('adminDashboard');

  // Show admin panel
  adminLink.addEventListener('click', (e) => {
    e.preventDefault();
    mainContent.style.display = 'none';
    adminPanel.classList.remove('hidden');
    trackAdminVisit();
  });

  // Login
  document.getElementById('loginBtn').addEventListener('click', login);
  document.getElementById('adminPassword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') login();
  });

  function login() {
    const password = document.getElementById('adminPassword').value;
    const errorElement = document.getElementById('loginError');
    
    if (password === 'bosslynch') {
      adminLogin.style.display = 'none';
      adminDashboard.classList.remove('hidden');
      loadAdminData();
      errorElement.classList.add('hidden');
      playSound('success');
    } else {
      errorElement.classList.remove('hidden');
      document.getElementById('adminPassword').value = '';
    }
  }

  // Cancel/Back buttons
  document.getElementById('cancelBtn').addEventListener('click', backToSite);
  document.getElementById('backToSite').addEventListener('click', backToSite);
  document.getElementById('logoutBtn').addEventListener('click', logout);

  function backToSite() {
    adminPanel.classList.add('hidden');
    mainContent.style.display = 'block';
  }

  function logout() {
    adminLogin.style.display = 'block';
    adminDashboard.classList.add('hidden');
    document.getElementById('adminPassword').value = '';
  }

  // Load admin data
  function loadAdminData() {
    const data = loadData();
    document.getElementById('editTagline').value = data.tagline;
    document.getElementById('editTelegram').value = data.telegramLink;
    document.getElementById('editTwitter').value = data.twitterLink;
    document.getElementById('editDex').value = data.dexLink;
    document.getElementById('editTokenName').value = data.tokenName;
    document.getElementById('editTokenSymbol').value = data.tokenSymbol;
    document.getElementById('editContract').value = data.contractAddress;
    document.getElementById('editSupply').value = data.totalSupply;
    document.getElementById('editMarketCap').value = data.marketCap;
    document.getElementById('editLiquidity').value = data.liquidityPool;

    // Show current images if they exist
    if (data.logo && data.logo !== 'logo.png') {
      document.getElementById('logoPreview').classList.remove('hidden');
      document.getElementById('currentLogo').src = data.logo;
    }
    
    if (data.banner && data.banner !== 'banner.png') {
      document.getElementById('bannerPreview').classList.remove('hidden');
      document.getElementById('currentBanner').src = data.banner;
    }
  }

  // File uploads
  document.getElementById('logoUpload').addEventListener('change', (e) => {
    handleFileUpload(e, 'logo');
  });

  document.getElementById('bannerUpload').addEventListener('change', (e) => {
    handleFileUpload(e, 'banner');
  });

  function handleFileUpload(event, type) {
    const file = event.target.files[0];
    if (file) {
      const statusElement = document.getElementById(type + 'Status');
      statusElement.textContent = 'Uploading...';
      statusElement.className = 'text-yellow-400 text-sm mt-1';
      statusElement.classList.remove('hidden');

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = loadData();
        data[type] = e.target.result;
        saveData(data);
        
        statusElement.textContent = 'Upload successful!';
        statusElement.className = 'text-lime-400 text-sm mt-1';
        
        // Update preview
        const previewElement = document.getElementById(type + 'Preview');
        const imageElement = document.getElementById('current' + type.charAt(0).toUpperCase() + type.slice(1));
        previewElement.classList.remove('hidden');
        imageElement.src = e.target.result;
        
        setTimeout(() => {
          statusElement.classList.add('hidden');
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  }

  // Save changes
  document.getElementById('saveChanges').addEventListener('click', () => {
    const data = loadData();
    data.tagline = document.getElementById('editTagline').value;
    data.telegramLink = document.getElementById('editTelegram').value;
    data.twitterLink = document.getElementById('editTwitter').value;
    data.dexLink = document.getElementById('editDex').value;
    data.tokenName = document.getElementById('editTokenName').value;
    data.tokenSymbol = document.getElementById('editTokenSymbol').value;
    data.contractAddress = document.getElementById('editContract').value;
    data.totalSupply = document.getElementById('editSupply').value;
    data.marketCap = document.getElementById('editMarketCap').value;
    data.liquidityPool = document.getElementById('editLiquidity').value;
    
    saveData(data);
    updatePageContent();
    alert('Changes saved successfully!');
    playSound('success');
  });
}

// Update page content
function updatePageContent() {
  const data = loadData();
  
  document.getElementById('tagline').textContent = data.tagline;
  document.getElementById('logoImage').src = data.logo;
  document.getElementById('bannerImage').src = data.banner;
  
  // Update social links
  document.getElementById('twitterLink').href = data.twitterLink;
  document.getElementById('telegramLink').href = data.telegramLink || '#';
  document.getElementById('dexLink').href = data.dexLink || '#';
  
  updateTokenInfo();
}

// Main CTA button
function setupMainCTA() {
  document.getElementById('ctaButton').addEventListener('click', () => {
    const data = loadData();
    if (data.telegramLink) {
      window.open(data.telegramLink, '_blank');
    } else {
      alert('Telegram link not configured yet!');
    }
    
    // Screen shake effect
    document.body.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 500);
    
    playSound('pill');
  });
}

// Merch buttons
function setupMerchButtons() {
  const messages = {
    hoodies: 'Hoodies: For when you need to look mysterious while buying protein powder',
    pills: 'Pill Bottles: Empty containers for storing your hopes and dreams',
    cards: 'Court Summons Cards: Collect them all! Trade with friends!'
  };

  document.querySelectorAll('.merch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const merch = btn.getAttribute('data-merch');
      alert(messages[merch]);
      playSound('hover');
    });
  });
}

// Sound toggle
function setupSoundToggle() {
  const soundBtn = document.getElementById('soundBtn');
  
  soundBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    
    if (isMuted) {
      soundBtn.className = 'p-3 rounded-full transition-all bg-gray-700 text-gray-400';
      soundBtn.title = 'Enable sound effects';
      soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      soundBtn.className = 'p-3 rounded-full transition-all bg-purple-600 text-white hover:bg-purple-700';
      soundBtn.title = 'Disable sound effects';
      soundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });
}

// Social link tracking
function setupSocialTracking() {
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', () => {
      trackSocialClick();
    });
  });
}

// Whitepaper button
function setupWhitepaperButton() {
  document.getElementById('whitepaperBtn').addEventListener('click', () => {
    alert('Whitepaper download coming soon! For now, enjoy the memes.');
    playSound('hover');
  });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadAchievements();
  updateAchievementProgress();
  createFloatingElements();
  populateSideEffects();
  populateMemeGenerator();
  updateTokenInfo();
  startCountdown();
  setupTestimonials();
  setupNavigation();
  setupAdmin();
  updatePageContent();
  setupMainCTA();
  setupMerchButtons();
  setupSoundToggle();
  setupSocialTracking();
  setupWhitepaperButton();
  
  // Mark first visit achievement as unlocked
  setTimeout(() => {
    updateAchievementProgress();
  }, 1000);
});