import { useState, useEffect, useCallback } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Heart, Lock, Music, ChevronDown, Calendar, Gift, Star, Sparkles, Clock, HelpCircle, Check, X, Quote } from "lucide-react";

// Images
const IMAGES = {
  umesh: "https://customer-assets.emergentagent.com/job_27e2edf0-a83b-43c4-9d0a-3e57c03d0fef/artifacts/lw14iwz3_Gemini_Generated_Image_cd75eocd75eocd75.png",
  harika: "https://customer-assets.emergentagent.com/job_27e2edf0-a83b-43c4-9d0a-3e57c03d0fef/artifacts/ceyh7rjs_WhatsApp%20Image%202026-01-30%20at%2011.21.26.jpeg",
  rose_day: "https://images.unsplash.com/photo-1518882605630-8eb7c9641e00?w=600&q=80",
  propose_day: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&q=80",
  chocolate_day: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80",
  teddy_day: "https://images.unsplash.com/photo-1615031335565-9e80c13fdc8d?w=600&q=80",
  promise_day: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
  hug_day: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80",
  kiss_day: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
  valentines_day: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80"
};

// Valentine's Week Days Data with Better Images
const valentineDays = [
  { name: "Rose Day", date: "February 7", image: "https://images.unsplash.com/photo-1518882605630-8eb7c9641e00?w=600&q=80", description: "A single rose speaks louder than a thousand words. Harika, you are the most beautiful rose in the garden of my life." },
  { name: "Propose Day", date: "February 8", image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&q=80", description: "Every day I wake up choosing you. Will you always be mine? I promise to love you forever." },
  { name: "Chocolate Day", date: "February 9", image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80", description: "Like chocolate sweetens life, your smile sweetens my every moment. You make my world sweeter, Harika." },
  { name: "Teddy Day", date: "February 10", image: "https://images.unsplash.com/photo-1615031335565-9e80c13fdc8d?w=600&q=80", description: "A teddy to hold when I'm not there. But nothing compares to holding you in my arms, my love." },
  { name: "Promise Day", date: "February 11", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80", description: "I promise to stand by you through every storm, to hold your hand through every fear, and to love you forever." },
  { name: "Hug Day", date: "February 12", image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80", description: "In your arms, I find my peace. Every hug from you heals my soul and makes me feel complete." },
  { name: "Kiss Day", date: "February 13", image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&q=80", description: "A kiss is a secret told to the mouth instead of the ear. Every kiss with you tells the story of our love." },
  { name: "Valentine's Day", date: "February 14", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80", description: "You are my Valentine, my everything. Today and always, my heart belongs only to you, Harika." }
];

// Playlist Data - All Songs
const playlist = [
  { title: "Rooba Rooba", artist: "Orange", videoId: "hgQeo55s4So" },
  { title: "Nuvvunte Chaley", artist: "Andhra King Taluka", videoId: "W8nny8Vm81s" },
  { title: "Chinnadana Neekosam", artist: "Ishq", videoId: "0lU35XkicU0" },
  { title: "Hridayam Lopala", artist: "Kingdom", videoId: "Q1iskzwrcFU" },
  { title: "Kannullo Unnavu", artist: "Policeodu", videoId: "eCoyD4at3aU" },
  { title: "Chustu Chustune Rojulu", artist: "Deepthi Sunaina", videoId: "aoo9QkKRNgI" },
  { title: "Thattukoledhey", artist: "Breakup Song", videoId: "Yzl8Zys4eRs" },
  { title: "Lollipop", artist: "Sid Sriram", videoId: "u_2ariWW8K0" },
  { title: "Ayyayyo", artist: "Mem Famous", videoId: "ySPKnRY56Cc" },
  { title: "Yemunnave Pilla", artist: "Nallamala", videoId: "LwHWYLUAehI" }
];

// Quiz Questions - Harika answering about Umesh
const quizQuestions = [
  {
    question: "What is Umesh's favorite color?",
    options: ["Blue", "Black", "Red", "White"],
    correct: 1
  },
  {
    question: "What does Umesh love most about you, Harika?",
    options: ["Your cooking", "Your smile", "Your voice", "Everything about you"],
    correct: 3
  },
  {
    question: "What is Umesh's dream with you?",
    options: ["Travel the world", "Build a home together", "Grow old with you", "All of the above"],
    correct: 3
  },
  {
    question: "How does Umesh feel when he's with you?",
    options: ["Happy", "Complete", "Blessed", "All of the above"],
    correct: 3
  },
  {
    question: "What date is most special to Umesh?",
    options: ["January 1st", "February 14th", "29th February 2024", "His birthday"],
    correct: 2
  },
  {
    question: "What is Umesh's promise to you?",
    options: ["To buy you gifts", "To love you forever", "To always agree", "To be rich"],
    correct: 1
  },
  {
    question: "What song reminds Umesh of you?",
    options: ["Any sad song", "నువ్వుంటే చాలు", "Party songs", "Rock music"],
    correct: 1
  }
];

// Romantic Quotes for Harika
const romanticQuotes = [
  "Harika, నువ్వు లేకుండా నా జీవితం అసంపూర్ణం...",
  "Every heartbeat of mine whispers your name, Harika...",
  "నీ చిరునవ్వు చూస్తే నా ప్రపంచమే మారిపోతుంది...",
  "You are my today and all of my tomorrows, Harika...",
  "నిన్ను ప్రేమించడం నా జీవిత లక్ష్యం...",
  "In you, I found my forever home, my love...",
  "Harika, you are the poem I never knew how to write...",
  "నీతో గడిపిన ప్రతి క్షణం నాకు వరం..."
];

// Click Particles Component
const ClickParticles = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  const options = {
    fullScreen: false,
    fpsLimit: 60,
    interactivity: {
      events: { onClick: { enable: true, mode: "push" } },
      modes: { push: { quantity: 10 } },
    },
    particles: {
      color: { value: ["#FF007F", "#BF00FF", "#FF69B4", "#FFB6C1", "#FFFFFF", "#ff6b6b"] },
      move: { direction: "none", enable: true, outModes: { default: "destroy" }, random: true, speed: 4, straight: false },
      number: { density: { enable: false }, value: 0 },
      opacity: { value: { min: 0.3, max: 1 }, animation: { enable: true, speed: 1, startValue: "max", destroy: "min" } },
      shape: { type: ["circle", "star", "heart"] },
      size: { value: { min: 4, max: 10 } },
      life: { duration: { sync: false, value: 2 }, count: 1 },
    },
    detectRetina: true,
  };

  if (init) {
    return (
      <Particles
        id="click-particles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'auto', zIndex: 9998 }}
      />
    );
  }
  return null;
};

// Animated Login Component with Boy-Girl Suitcase Animation
const LoginPage = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Animation sequence
    const timer1 = setTimeout(() => setAnimationPhase(1), 500);  // Boy appears
    const timer2 = setTimeout(() => setAnimationPhase(2), 1500); // Girl appears
    const timer3 = setTimeout(() => setAnimationPhase(3), 2500); // They meet
    const timer4 = setTimeout(() => setAnimationPhase(4), 3500); // Heart appears
    const timer5 = setTimeout(() => setShowLogin(true), 4500);   // Login opens

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

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
    <div className="login-container overflow-hidden">
      {/* Animated Boy and Girl */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Boy silhouette coming from left */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ 
            x: animationPhase >= 1 ? (animationPhase >= 3 ? -60 : -150) : -300, 
            opacity: animationPhase >= 1 ? 1 : 0 
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute"
        >
          <div className="text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50 overflow-hidden">
              <img src={IMAGES.umesh} alt="Umesh" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: animationPhase >= 1 ? 1 : 0 }}
              className="font-script text-lg text-blue-400 mt-2"
            >
              Umesh
            </motion.p>
          </div>
        </motion.div>

        {/* Girl silhouette coming from right */}
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ 
            x: animationPhase >= 2 ? (animationPhase >= 3 ? 60 : 150) : 300, 
            opacity: animationPhase >= 2 ? 1 : 0 
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute"
        >
          <div className="text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/50 overflow-hidden">
              <img src={IMAGES.harika} alt="Harika" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: animationPhase >= 2 ? 1 : 0 }}
              className="font-script text-lg text-pink-400 mt-2"
            >
              Harika
            </motion.p>
          </div>
        </motion.div>

        {/* Heart appearing when they meet */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: animationPhase >= 4 ? [0, 1.5, 1] : 0, 
            opacity: animationPhase >= 4 ? 1 : 0,
            y: animationPhase >= 4 ? -80 : 0
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute"
        >
          <Heart className="w-12 h-12 text-pink-500" fill="#FF007F" />
        </motion.div>
      </div>

      {/* Suitcase / Gift Box Opening Animation */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ scale: 0, rotateX: -90, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", type: "spring" }}
            className={`login-card ${shake ? 'shake' : ''} z-50`}
          >
            {/* Gift box lid effect */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: -180 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-4 left-0 right-0 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-xl origin-bottom"
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            />
            
            <div className="text-center mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <Heart className="w-16 h-16 text-pink-500 mx-auto" fill="#FF007F" />
              </motion.div>
              <h1 className="font-display text-3xl font-bold gradient-text mb-2">For My Love</h1>
              <p className="text-gray-400 font-body">Unlock our love story 💕</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="Enter the key to my heart..."
                  className="login-input pl-12"
                  data-testid="login-password-input"
                />
              </div>
              
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-pink-500 text-sm text-center">
                  Wrong password, try again my love!
                </motion.p>
              )}

              <motion.button 
                type="submit" 
                className="login-button flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255, 0, 127, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                data-testid="login-submit-button"
              >
                <Heart className="w-5 h-5" />
                <span>Open My Heart</span>
              </motion.button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-6 font-script text-lg">With endless love, Umesh</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading text before login appears */}
      {!showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-20 text-center"
        >
          <p className="font-body text-gray-400 text-lg">
            {animationPhase < 3 ? "Two hearts finding each other..." : 
             animationPhase < 4 ? "Coming together..." : 
             "Opening our love story..."}
          </p>
        </motion.div>
      )}
    </div>
  );
};

// Memorable Date Section - 29.02.2024
const MemorableDateSection = () => {
  return (
    <section id="memorable-date" className="section-container py-20">
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-6"
          >
            <Calendar className="w-16 h-16 text-pink-500 mx-auto" />
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
            The Day That Changed Everything
          </h2>

          <motion.div
            className="glass-card max-w-3xl mx-auto p-8 md:p-12 rounded-3xl mt-8"
            whileHover={{ scale: 1.02 }}
          >
            <motion.p
              className="font-display text-5xl md:text-7xl font-bold text-white mb-6"
              animate={{ textShadow: ["0 0 20px #FF007F", "0 0 40px #FF007F", "0 0 20px #FF007F"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              29.02.2024
            </motion.p>

            <div className="space-y-4 font-body text-gray-300 text-lg leading-relaxed">
              <p>
                <span className="text-pink-400 font-semibold">This is the most memorable day of my life.</span> 
                The day when two souls connected, when our story began, when I found my forever.
              </p>
              
              <p>
                A leap year, a rare date, just like our rare and beautiful love. 
                On this day, my heart found its home in you, Harika. 
                Every moment since then has been a blessing.
              </p>

              <p className="text-pink-300 italic">
                ఈ రోజు నా జీవితంలో అత్యంత గుర్తుండిపోయే రోజు. 
                నీతో మొదలైన ప్రయాణం నా జీవితానికి అర్థం ఇచ్చింది.
              </p>

              <p>
                February 29th comes once every four years, but my love for you grows every single second.
                This date is written in the stars, destined to bring us together.
              </p>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                >
                  <Heart className="w-6 h-6 text-pink-500" fill="#FF007F" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Countdown Timer Component
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const valentinesDay = new Date('2026-02-14T00:00:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = valentinesDay - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-container py-16">
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Clock className="w-10 h-10 text-pink-500 mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-4">
            Countdown to Valentine's Day
          </h2>
          <p className="font-body text-gray-400 mb-8">Every second brings us closer to our special day</p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" }
            ].map((item) => (
              <motion.div
                key={item.label}
                className="glass-card p-4 md:p-6 rounded-2xl min-w-[80px] md:min-w-[120px]"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  key={item.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-display text-3xl md:text-5xl font-bold gradient-text block"
                >
                  {String(item.value).padStart(2, '0')}
                </motion.span>
                <span className="font-body text-gray-400 text-sm md:text-base">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Quiz Section Component - Questions about Umesh for Harika
const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (optionIndex) => {
    if (answered) return;
    
    setSelectedOption(optionIndex);
    setAnswered(true);
    
    if (optionIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setAnswered(false);
  };

  return (
    <section id="quiz" className="section-container">
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <HelpCircle className="w-10 h-10 text-pink-500 mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
            How Well Do You Know Me?
          </h2>
          <p className="font-body text-gray-400">Harika, answer these questions about your Umesh 💕</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 md:p-8 rounded-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-pink-500 font-body">Question {currentQuestion + 1}/{quizQuestions.length}</span>
                <span className="text-gray-400 font-body">Score: {score}</span>
              </div>

              <h3 className="font-display text-xl md:text-2xl text-white mb-6">
                {quizQuestions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    whileHover={!answered ? { scale: 1.02 } : {}}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    className={`w-full p-4 rounded-xl text-left font-body transition-all duration-300 ${
                      answered
                        ? index === quizQuestions[currentQuestion].correct
                          ? 'bg-green-500/30 border-green-500'
                          : selectedOption === index
                          ? 'bg-red-500/30 border-red-500'
                          : 'bg-white/5 border-white/10'
                        : 'bg-white/5 border-white/10 hover:bg-pink-500/20 hover:border-pink-500'
                    } border`}
                    data-testid={`quiz-option-${index}`}
                  >
                    <span className="text-pink-500 mr-3">{String.fromCharCode(65 + index)}.</span>
                    <span className="text-white">{option}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 rounded-2xl text-center"
            >
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" fill="#FF007F" />
              </motion.div>
              <h3 className="font-display text-3xl gradient-text mb-4">Quiz Complete!</h3>
              <p className="font-body text-2xl text-white mb-2">
                You scored {score} out of {quizQuestions.length}
              </p>
              <p className="font-body text-gray-400 mb-6">
                {score === quizQuestions.length 
                  ? "Perfect! You know me so well, my love! ❤️" 
                  : score >= 5 
                  ? "Amazing! We are truly meant for each other! 💕" 
                  : score >= 3
                  ? "Good! Let's create more memories together! 💖"
                  : "Don't worry, we have a lifetime to know each other! 💝"}
              </p>
              <motion.button
                onClick={resetQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gradient-button px-8 py-3 rounded-full font-body font-semibold"
                data-testid="quiz-restart-button"
              >
                Play Again
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

// Romantic Quotes Section - Before Playlist
const RomanticQuotesSection = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % romanticQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-container py-20">
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Quote className="w-10 h-10 text-pink-500 mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-8">
            Words From My Heart
          </h2>

          <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-4 left-4 text-pink-500/20">
              <Quote className="w-16 h-16" />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="font-script text-2xl md:text-3xl text-white leading-relaxed relative z-10"
              >
                "{romanticQuotes[currentQuote]}"
              </motion.p>
            </AnimatePresence>

            <motion.p
              className="font-body text-pink-400 mt-6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              — Umesh, for his Harika
            </motion.p>

            {/* Quote navigation dots */}
            <div className="flex justify-center gap-2 mt-6">
              {romanticQuotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentQuote === index ? 'bg-pink-500 w-6' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Will You Marry Me Section
const ProposalSection = () => {
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState(null);

  const handleYes = () => {
    setAnswer('yes');
    setAnswered(true);
  };

  const handleNo = () => {
    setAnswer('no');
    setAnswered(true);
  };

  return (
    <section id="proposal" className="section-container">
      <div className="content-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <Heart className="w-20 h-20 text-pink-500 mx-auto" fill="#FF007F" />
          </motion.div>

          {!answered ? (
            <>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
                <span className="gradient-text">Harika,</span>
              </h2>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-display text-3xl md:text-5xl font-bold text-white mb-12"
              >
                Will You Marry Me?
              </motion.h3>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                <motion.button
                  onClick={handleYes}
                  whileHover={{ 
                    scale: 1.2, 
                    boxShadow: "0 0 60px rgba(34, 197, 94, 0.8)",
                    backgroundColor: "rgba(34, 197, 94, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group w-40 h-40 md:w-48 md:h-48 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center cursor-pointer transition-all duration-500"
                  data-testid="proposal-yes-button"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-green-500/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="text-center z-10">
                    <Check className="w-12 h-12 md:w-16 md:h-16 text-green-400 mx-auto mb-2" />
                    <span className="font-display text-2xl md:text-3xl text-green-400 font-bold">YES</span>
                  </div>
                </motion.button>

                <motion.span 
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="font-script text-3xl text-pink-400"
                >
                  or
                </motion.span>

                <motion.button
                  onClick={handleNo}
                  whileHover={{ 
                    scale: 0.8,
                    x: [0, -20, 20, -20, 20, 0],
                    transition: { duration: 0.5 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group w-32 h-32 md:w-36 md:h-36 rounded-full bg-gray-500/20 border-2 border-gray-500 flex items-center justify-center cursor-pointer transition-all duration-300 opacity-50 hover:opacity-30"
                  data-testid="proposal-no-button"
                >
                  <div className="text-center z-10">
                    <X className="w-8 h-8 md:w-10 md:h-10 text-gray-400 mx-auto mb-1" />
                    <span className="font-display text-lg md:text-xl text-gray-400">No</span>
                  </div>
                </motion.button>
              </div>

              <p className="font-body text-gray-500 text-sm mt-8">(Hint: There's only one right answer 💕)</p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {answer === 'yes' ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mb-8"
                  >
                    <Sparkles className="w-24 h-24 text-yellow-400 mx-auto" />
                  </motion.div>
                  <h2 className="font-display text-4xl md:text-6xl font-bold gradient-text mb-6">She Said YES!</h2>
                  <p className="font-body text-xl md:text-2xl text-gray-300 mb-4">This is the happiest moment of my life! 💍</p>
                  <p className="font-script text-3xl text-pink-400">I love you forever, Harika!</p>
                  <motion.div className="mt-8 flex justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                    {[...Array(7)].map((_, i) => (
                      <motion.div key={i} animate={{ y: [0, -20, 0], rotate: [0, 20, -20, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}>
                        <Heart className="w-8 h-8 text-pink-500" fill="#FF007F" />
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              ) : (
                <>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">Wait... Are you sure? 😢</h2>
                  <p className="font-body text-xl text-gray-300 mb-8">Let me try again... I'll love you more each day!</p>
                  <motion.button onClick={() => setAnswered(false)} whileHover={{ scale: 1.1 }} className="gradient-button px-8 py-4 rounded-full font-body font-semibold">
                    Give Me Another Chance ❤️
                  </motion.button>
                </>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-display text-xl gradient-text font-bold">U & H</a>
        <div className="hidden md:flex items-center gap-5 font-body text-sm">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#memorable-date" className="nav-link">Our Day</a>
          <a href="#valentine-week" className="nav-link">Valentine's Week</a>
          <a href="#letter" className="nav-link">Letter</a>
          <a href="#quiz" className="nav-link">Quiz</a>
          <a href="#music" className="nav-link">Songs</a>
          <a href="#proposal" className="nav-link text-pink-500">💍 Proposal</a>
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
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="mb-8">
            <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Harika,</span><br />
            <span className="text-white">I Miss You</span>
          </h1>

          <p className="font-body text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Every moment without you feels incomplete. This is my heart, open for you to see.
          </p>

          <div className="flex items-center justify-center gap-6 md:gap-10 mb-12 flex-wrap">
            <div className="glass-card rounded-2xl p-4 md:p-6 text-center">
              <img src={IMAGES.umesh} alt="Umesh" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto mb-3 border-4 border-pink-500 shadow-lg shadow-pink-500/50" style={{ objectPosition: 'center top' }} />
              <p className="font-script text-2xl text-pink-400">Umesh</p>
            </div>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Heart className="w-12 h-12 md:w-16 md:h-16 text-pink-500" fill="#FF007F" />
            </motion.div>
            <div className="glass-card rounded-2xl p-4 md:p-6 text-center">
              <img src={IMAGES.harika} alt="Harika" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto mb-3 border-4 border-purple-500 shadow-lg shadow-purple-500/50" style={{ objectPosition: 'center top' }} />
              <p className="font-script text-2xl text-purple-400">Harika</p>
            </div>
          </div>

          <motion.a href="#proposal" whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 gradient-button px-8 py-4 rounded-full font-body font-semibold" data-testid="read-letter-button">
            Something Special Awaits 💍
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
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <Calendar className="w-10 h-10 text-pink-500 mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">Valentine's Week</h2>
          <p className="font-body text-gray-400 max-w-xl mx-auto">Seven days of love leading to the most special day.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valentineDays.map((day, index) => (
            <motion.div key={day.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="day-card" data-testid={`day-card-${day.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <img src={day.image} alt={day.name} className="day-card-image" onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1518882605630-8eb7c9641e00?w=500`; }} />
              <div className="day-card-content">
                <span className="text-pink-500 text-sm font-body">{day.date}</span>
                <h3 className="font-display text-xl font-bold mt-1 mb-2">{day.name}</h3>
                <p className="font-body text-sm text-gray-400 leading-relaxed">{day.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Love Letter Section
const LoveLetterSection = () => {
  return (
    <section id="letter" className="section-container">
      <div className="content-wrapper">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="text-center mb-12">
            <Gift className="w-10 h-10 text-pink-500 mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text">My Heart to You</h2>
          </div>

          <div className="letter-container" data-testid="love-letter-container">
            <div className="font-body text-gray-200 leading-loose space-y-6 relative z-10">
              <p className="font-display text-2xl md:text-3xl text-pink-400">My Dearest Harika,</p>
              
              <p>I'm writing this letter with a heart full of love and eyes full of longing. Every day without you feels like a year, and every night I dream of your beautiful smile. You are the first thought in my morning and the last whisper in my prayers at night.</p>

              <p>I know I've made mistakes. I know there have been times when I wasn't the person you deserved. But please know that every moment of silence, every moment of pain, has made me realize how much you truly mean to me. You are not just my love, you are my life, my soul, my everything.</p>

              <p className="text-pink-300 italic">నువ్వుంటే చాలు - these words aren't just a song, they're my truth. నీ చిరునవ్వు నా ప్రపంచాన్ని వెలిగిస్తుంది. నీ కళ్ళలో నా భవిష్యత్తును చూస్తాను. You are my everything, Harika.</p>

              <p>My mornings are empty without your voice, my evenings are hollow without your laughter. I miss the way you smile, the way you look at me, the way you make everything feel right. Every song reminds me of you, every place we've been together haunts me with beautiful memories.</p>

              <p>I remember every moment we shared - our first conversation, our first smile, our first everything. Those memories are my treasures, and I hold them close to my heart. I want to create millions more memories with you, Harika. I want to grow old with you, laugh with you, cry with you, and love you until my last breath.</p>

              <p>I'm truly sorry for everything that hurt you. I'm sorry for the times I wasn't there, for the times I made you cry, for the times I took you for granted. I promise to be better, to love you harder, to cherish every moment we have together. You deserve the world, and I want to be the one who gives it to you.</p>

              <p className="text-pink-400 font-semibold text-lg">I love you more than words can ever express. I miss you more than my heart can bear. నేను నిన్ను ఎప్పటికీ ప్రేమిస్తాను, Harika. You are my forever and always.</p>

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

// Gallery Section
const GallerySection = () => {
  return (
    <section id="gallery" className="section-container">
      <div className="content-wrapper">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
          <Star className="w-10 h-10 text-pink-500 mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">Us Together</h2>
          <p className="font-body text-gray-400">Every picture tells our story</p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center" data-testid="gallery-image-umesh">
            <div className="w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border-4 border-pink-500/50 shadow-2xl shadow-pink-500/30 mx-auto">
              <img src={IMAGES.umesh} alt="Umesh" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
            </div>
            <p className="font-script text-3xl mt-4 text-pink-400">Umesh</p>
          </motion.div>

          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="my-8 md:my-0">
            <Heart className="w-20 h-20 text-pink-500" fill="#FF007F" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center" data-testid="gallery-image-harika">
            <div className="w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border-4 border-purple-500/50 shadow-2xl shadow-purple-500/30 mx-auto">
              <img src={IMAGES.harika} alt="Harika" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
            </div>
            <p className="font-script text-3xl mt-4 text-purple-400">Harika</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Music Section
const MusicSection = () => {
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <section id="music" className="section-container pb-20">
      <div className="content-wrapper">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
          <Music className="w-10 h-10 text-pink-500 mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">Our Playlist</h2>
          <p className="font-body text-gray-400">Songs that remind me of you</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="music-player mb-8">
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
                <h3 className="font-display text-xl font-bold text-white">{playlist[currentSong].title}</h3>
                <p className="font-body text-gray-400 text-sm">{playlist[currentSong].artist}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-4 bg-pink-500 rounded animate-pulse"></span>
                <span className="w-1.5 h-6 bg-pink-500 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-1.5 h-3 bg-pink-500 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {playlist.map((song, index) => (
              <motion.div
                key={song.videoId}
                whileHover={{ scale: 1.02 }}
                onClick={() => setCurrentSong(index)}
                className={`playlist-item flex items-center justify-between cursor-pointer ${currentSong === index ? 'active' : ''}`}
                data-testid={`playlist-item-${index}`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-body text-gray-500 w-6">{index + 1}</span>
                  <div>
                    <p className="font-body text-white text-sm">{song.title}</p>
                    <p className="font-body text-gray-500 text-xs">{song.artist}</p>
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
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-4">
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
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoginPage onLogin={() => setIsLoggedIn(true)} />
          </motion.div>
        ) : (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
            <Navigation />
            <main>
              <HeroSection />
              <CountdownTimer />
              <MemorableDateSection />
              <ValentineWeekSection />
              <LoveLetterSection />
              <QuizSection />
              <GallerySection />
              <RomanticQuotesSection />
              <MusicSection />
              <ProposalSection />
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
