import { useState, useEffect, useCallback } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Heart, Lock, Music, Play, Pause, ChevronDown, Calendar, Gift, Star, Sparkles } from "lucide-react";

// Images
const IMAGES = {
  umesh: "https://customer-assets.emergentagent.com/job_27e2edf0-a83b-43c4-9d0a-3e57c03d0fef/artifacts/lw14iwz3_Gemini_Generated_Image_cd75eocd75eocd75.png",
  harika: "https://customer-assets.emergentagent.com/job_27e2edf0-a83b-43c4-9d0a-3e57c03d0fef/artifacts/ceyh7rjs_WhatsApp%20Image%202026-01-30%20at%2011.21.26.jpeg",
  rose_day: "https://images.unsplash.com/photo-1518882605630-8eb7c9641e00?w=500",
  propose_day: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500",
  chocolate_day: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500",
  teddy_day: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
  promise_day: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=500",
  hug_day: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500",
  kiss_day: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500",
  valentines_day: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500"
};

// Valentine's Week Days Data
const valentineDays = [
  {
    name: "Rose Day",
    date: "February 7",
    image: IMAGES.rose_day,
    description: "A single rose speaks louder than a thousand words. Harika, you are the most beautiful rose in the garden of my life. Every petal reminds me of your delicate beauty."
  },
  {
    name: "Propose Day",
    date: "February 8",
    image: IMAGES.propose_day,
    description: "Every day I wake up choosing you. Will you always be mine? I promise to love you with every beat of my heart, today and forever."
  },
  {
    name: "Chocolate Day",
    date: "February 9",
    image: IMAGES.chocolate_day,
    description: "Like chocolate sweetens life, your smile sweetens my every moment. You make my world sweeter than the sweetest chocolate, Harika."
  },
  {
    name: "Teddy Day",
    date: "February 10",
    image: IMAGES.teddy_day,
    description: "A teddy to hold when I'm not there. But nothing compares to holding you in my arms, my love. You are my comfort and my peace."
  },
  {
    name: "Promise Day",
    date: "February 11",
    image: IMAGES.promise_day,
    description: "I promise to stand by you through every storm, to hold your hand through every fear, and to love you unconditionally forever and ever."
  },
  {
    name: "Hug Day",
    date: "February 12",
    image: IMAGES.hug_day,
    description: "In your arms, I find my peace. Every hug from you heals my soul and makes me feel complete. I miss your warm embrace so much."
  },
  {
    name: "Kiss Day",
    date: "February 13",
    image: IMAGES.kiss_day,
    description: "A kiss is a secret told to the mouth instead of the ear. Every kiss with you tells the story of our eternal love."
  },
  {
    name: "Valentine's Day",
    date: "February 14",
    image: IMAGES.valentines_day,
    description: "You are my Valentine, my everything. Today and always, my heart belongs only to you, Harika. Forever and always."
  }
];

// Playlist Data - YouTube Video IDs
const playlist = [
  { title: "Rooba Rooba", artist: "Orange", videoId: "hgQeo55s4So" },
  { title: "Nuvvunte Chaley", artist: "Andhra King Taluka", videoId: "W8nny8Vm81s" },
  { title: "Chinnadana Neekosam", artist: "Ishq", videoId: "0lU35XkicU0" },
  { title: "Hridayam Lopala", artist: "Kingdom", videoId: "Q1iskzwrcFU" },
  { title: "Kannullo Unnavu", artist: "Policeodu", videoId: "eCoyD4at3aU" }
];

// Click Particles Component
const ClickParticles = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  const options = {
    fullScreen: false,
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        push: { quantity: 8 },
      },
    },
    particles: {
      color: { value: ["#FF007F", "#BF00FF", "#FF69B4", "#FFB6C1", "#FFFFFF"] },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "destroy" },
        random: true,
        speed: 3,
        straight: false,
      },
      number: { density: { enable: false }, value: 0 },
      opacity: {
        value: { min: 0.3, max: 1 },
        animation: { enable: true, speed: 1, startValue: "max", destroy: "min" },
      },
      shape: { type: ["circle", "star"] },
      size: { value: { min: 3, max: 8 } },
      life: { duration: { sync: false, value: 1.5 }, count: 1 },
    },
    detectRetina: true,
  };

  if (init) {
    return (
      <Particles
        id="click-particles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="particles-container"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'auto', zIndex: 9998 }}
      />
    );
  }
  return null;
};

// Login Component
const LoginPage = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "Harika@gandham") {
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`login-card ${shake ? 'shake' : ''}`}
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Heart className="w-16 h-16 text-pink-500 mx-auto" fill="#FF007F" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold gradient-text mb-2">
            For My Love
          </h1>
          <p className="text-gray-400 font-body">Enter the key to my heart</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password..."
              className="login-input pl-12"
              data-testid="login-password-input"
            />
          </div>
          
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-pink-500 text-sm text-center"
            >
              Wrong password, try again my love!
            </motion.p>
          )}

          <button
            type="submit"
            className="login-button flex items-center justify-center gap-2"
            data-testid="login-submit-button"
          >
            <Heart className="w-5 h-5" />
            <span>Enter My Heart</span>
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6 font-script text-lg">
          With love, Umesh
        </p>
      </motion.div>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-display text-xl gradient-text font-bold">
          U & H
        </a>
        <div className="hidden md:flex items-center gap-8 font-body text-sm">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#valentine-week" className="nav-link">Valentine's Week</a>
          <a href="#letter" className="nav-link">My Letter</a>
          <a href="#gallery" className="nav-link">Us</a>
          <a href="#music" className="nav-link">Our Songs</a>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="hero" className="section-container flex items-center justify-center min-h-screen">
      <div className="content-wrapper text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-8"
          >
            <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Harika,</span>
            <br />
            <span className="text-white">I Miss You</span>
          </h1>

          <p className="font-body text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Every moment without you feels incomplete. This is my heart, open for you to see.
          </p>

          <div className="flex items-center justify-center gap-6 md:gap-10 mb-12 flex-wrap">
            <div className="glass-card rounded-2xl p-4 md:p-6 text-center">
              <img
                src={IMAGES.umesh}
                alt="Umesh"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto mb-3 border-4 border-pink-500 shadow-lg shadow-pink-500/50"
                style={{ objectPosition: 'center top' }}
              />
              <p className="font-script text-2xl text-pink-400">Umesh</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-12 h-12 md:w-16 md:h-16 text-pink-500" fill="#FF007F" />
            </motion.div>
            <div className="glass-card rounded-2xl p-4 md:p-6 text-center">
              <img
                src={IMAGES.harika}
                alt="Harika"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto mb-3 border-4 border-purple-500 shadow-lg shadow-purple-500/50"
                style={{ objectPosition: 'center top' }}
              />
              <p className="font-script text-2xl text-purple-400">Harika</p>
            </div>
          </div>

          <motion.a
            href="#letter"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 gradient-button px-8 py-4 rounded-full font-body font-semibold"
            data-testid="read-letter-button"
          >
            Read My Letter
            <ChevronDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// Valentine's Week Section
const ValentineWeekSection = () => {
  return (
    <section id="valentine-week" className="section-container">
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Calendar className="w-10 h-10 text-pink-500 mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
            Valentine's Week
          </h2>
          <p className="font-body text-gray-400 max-w-xl mx-auto">
            Seven days of love leading to the most special day. Each day is a celebration of us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valentineDays.map((day, index) => (
            <motion.div
              key={day.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="day-card"
              data-testid={`day-card-${day.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <img
                src={day.image}
                alt={day.name}
                className="day-card-image"
                onError={(e) => {
                  e.target.src = `https://images.unsplash.com/photo-1518882605630-8eb7c9641e00?w=500`;
                }}
              />
              <div className="day-card-content">
                <span className="text-pink-500 text-sm font-body">{day.date}</span>
                <h3 className="font-display text-xl font-bold mt-1 mb-2">{day.name}</h3>
                <p className="font-body text-sm text-gray-400 leading-relaxed">
                  {day.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Love Letter Section - EXPANDED
const LoveLetterSection = () => {
  return (
    <section id="letter" className="section-container">
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <Gift className="w-10 h-10 text-pink-500 mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text">
              My Heart to You
            </h2>
          </div>

          <div className="letter-container" data-testid="love-letter-container">
            <div className="font-body text-gray-200 leading-loose space-y-6 relative z-10">
              <p className="font-display text-2xl md:text-3xl text-pink-400">My Dearest Harika,</p>
              
              <p>
                I'm writing this letter with a heart full of love and eyes full of longing. 
                Every day without you feels like a year, and every night I dream of your beautiful smile.
                You are the first thought in my morning and the last whisper in my prayers at night.
              </p>

              <p>
                I know I've made mistakes. I know there have been times when I wasn't the person 
                you deserved. But please know that every moment of silence, every moment of pain, 
                has made me realize how much you truly mean to me. You are not just my love, 
                you are my life, my soul, my everything.
              </p>

              <p className="text-pink-300 italic">
                నువ్వుంటే చాలు - these words aren't just a song, they're my truth. 
                నీ చిరునవ్వు నా ప్రపంచాన్ని వెలిగిస్తుంది. నీ కళ్ళలో నా భవిష్యత్తును చూస్తాను.
                You are my everything, Harika.
              </p>

              <p>
                My mornings are empty without your voice, my evenings are hollow without your laughter.
                I miss the way you smile, the way you look at me, the way you make everything feel right.
                Every song reminds me of you, every place we've been together haunts me with beautiful memories.
              </p>

              <p>
                I remember every moment we shared - our first conversation, our first smile, 
                our first everything. Those memories are my treasures, and I hold them close to my heart.
                I want to create millions more memories with you, Harika. I want to grow old with you,
                laugh with you, cry with you, and love you until my last breath.
              </p>

              <p>
                I'm truly sorry for everything that hurt you. I'm sorry for the times I wasn't there,
                for the times I made you cry, for the times I took you for granted. I promise to be better, 
                to love you harder, to cherish every moment we have together. You deserve the world,
                and I want to be the one who gives it to you.
              </p>

              <p>
                You are the reason my heart beats, the reason I smile, the reason I believe in love.
                Without you, I am incomplete. Without you, colors seem dull, music seems silent,
                and life seems meaningless. You complete me in ways I never knew I was incomplete.
              </p>

              <p>
                This Valentine's Day, I don't need grand gestures or expensive gifts. 
                All I need is you - your forgiveness, your love, your presence in my life. 
                I promise to make every day feel like Valentine's Day for you.
              </p>

              <p>
                Will you give me another chance to prove my love? Will you let me 
                spend every Valentine's Day for the rest of my life making you feel 
                like the most loved person in the world? I will wait for you, 
                no matter how long it takes. My love for you is eternal.
              </p>

              <p className="text-pink-400 font-semibold text-lg">
                I love you more than words can ever express. I miss you more than my heart can bear.
                నేను నిన్ను ఎప్పటికీ ప్రేమిస్తాను, Harika. You are my forever and always.
              </p>

              <div className="mt-10 text-right">
                <p className="font-script text-3xl text-pink-400">Forever Yours,</p>
                <p className="font-script text-5xl gradient-text mt-2">Umesh</p>
                <p className="text-gray-500 mt-2 text-sm">❤️ With all my heart and soul ❤️</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Photo Gallery Section
const GallerySection = () => {
  return (
    <section id="gallery" className="section-container">
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Star className="w-10 h-10 text-pink-500 mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
            Us Together
          </h2>
          <p className="font-body text-gray-400">Every picture tells our story</p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
            data-testid="gallery-image-umesh"
          >
            <div className="w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border-4 border-pink-500/50 shadow-2xl shadow-pink-500/30 mx-auto">
              <img
                src={IMAGES.umesh}
                alt="Umesh"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center top' }}
              />
            </div>
            <p className="font-script text-3xl mt-4 text-pink-400">Umesh</p>
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="my-8 md:my-0"
          >
            <Heart className="w-20 h-20 text-pink-500" fill="#FF007F" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
            data-testid="gallery-image-harika"
          >
            <div className="w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border-4 border-purple-500/50 shadow-2xl shadow-purple-500/30 mx-auto">
              <img
                src={IMAGES.harika}
                alt="Harika"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center top' }}
              />
            </div>
            <p className="font-script text-3xl mt-4 text-purple-400">Harika</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Music Section with Direct YouTube Iframe
const MusicSection = () => {
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <section id="music" className="section-container pb-32">
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Music className="w-10 h-10 text-pink-500 mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Playlist
          </h2>
          <p className="font-body text-gray-400">Songs that remind me of you</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="music-player mb-8">
            {/* YouTube Video Player using iframe */}
            <div className="video-wrapper rounded-2xl overflow-hidden mb-6" style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${playlist[currentSong].videoId}?autoplay=0&rel=0`}
                title={playlist[currentSong].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '16px' }}
              />
            </div>

            <div className="flex items-center justify-between px-4">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  {playlist[currentSong].title}
                </h3>
                <p className="font-body text-gray-400 text-sm">
                  {playlist[currentSong].artist}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-4 bg-pink-500 rounded animate-pulse"></span>
                <span className="w-1.5 h-6 bg-pink-500 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-1.5 h-3 bg-pink-500 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-body text-sm text-gray-500 uppercase tracking-wider mb-4">
              Click to Play
            </h4>
            {playlist.map((song, index) => (
              <motion.div
                key={song.videoId}
                whileHover={{ scale: 1.02 }}
                onClick={() => setCurrentSong(index)}
                className={`playlist-item flex items-center justify-between cursor-pointer ${
                  currentSong === index ? 'active' : ''
                }`}
                data-testid={`playlist-item-${index}`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-body text-gray-500 w-6">{index + 1}</span>
                  <div>
                    <p className="font-body text-white">{song.title}</p>
                    <p className="font-body text-gray-500 text-sm">{song.artist}</p>
                  </div>
                </div>
                {currentSong === index && (
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3 bg-pink-500 rounded animate-pulse"></span>
                    <span className="w-1 h-4 bg-pink-500 rounded animate-pulse" style={{ animationDelay: '75ms' }}></span>
                    <span className="w-1 h-2 bg-pink-500 rounded animate-pulse" style={{ animationDelay: '150ms' }}></span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-8 text-center glass-card mt-auto">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="inline-block mb-4"
      >
        <Heart className="w-8 h-8 text-pink-500" fill="#FF007F" />
      </motion.div>
      <p className="font-script text-2xl gradient-text">Made with love for Harika</p>
      <p className="font-body text-gray-500 text-sm mt-2">From Umesh, with all my heart ❤️</p>
    </footer>
  );
};

// Main Valentine App
const ValentineApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div className="app-background"></div>
      <ClickParticles />
      
      <AnimatePresence>
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginPage onLogin={() => setIsLoggedIn(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            <Navigation />
            <main>
              <HeroSection />
              <ValentineWeekSection />
              <LoveLetterSection />
              <GallerySection />
              <MusicSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<ValentineApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
