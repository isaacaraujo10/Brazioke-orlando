/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Star, 
  Settings, 
  Globe, 
  Truck, 
  Check, 
  Tv, 
  Lightbulb, 
  MessageSquare, 
  MessageCircle, 
  Calendar, 
  Music, 
  ChevronRight, 
  ChevronLeft, 
  Menu, 
  X, 
  Send, 
  Phone, 
  Mail, 
  MapPin,
  Zap,
  ArrowRight,
  Instagram,
  Facebook,
  Shield,
  Clock,
  ThumbsUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PACKAGES = [
  {
    id: 'festa-em-casa',
    name: 'Festa em Casa',
    price: '$197',
    value: 197,
    image: 'https://i.imgur.com/N4WzhP8.png',
    icon: <Mic className="w-6 h-6 text-primary" />,
    description: 'A alegria do karaokê na sala da sua casa',
    items: [
      '2 microfones profissionais (som limpo e sem ruído)',
      'Sistema de som de alta fidelidade para pequenos espaços',
      'Acesso a +25.000 músicas (do clássico ao atual)',
      'Instalação profissional: você só precisa ligar e cantar',
      'Suporte via WhatsApp para total tranquilidade'
    ]
  },
  {
    id: 'show-da-familia',
    name: 'Show da Família',
    price: '$227',
    value: 227,
    popular: true,
    image: 'https://i.imgur.com/IsTXMdk.png',
    icon: <Star className="w-6 h-6 text-primary" />,
    description: 'Transforme sua festa em um verdadeiro show',
    items: [
      '2 microfones sem fio (liberdade total no palco)',
      'Som potente e nítido: sinta-se um verdadeiro artista',
      'Repertório completo com os maiores sucessos do Brasil',
      'Montagem completa feita por especialistas',
      'Suporte VIP prioritário durante todo o evento'
    ]
  },
  {
    id: 'super-festa',
    name: 'Super Festa',
    price: '$257',
    value: 257,
    image: 'https://i.imgur.com/kcT60Mm.png',
    icon: <Zap className="w-6 h-6 text-primary" />,
    description: 'A experiência definitiva de karaokê profissional',
    items: [
      '4 microfones (condução dinâmica com convidados)',
      'Som de alta performance para grandes ambientes',
      'O maior catálogo de músicas da região (+25k)',
      'Tudo pronto em minutos: entrega e retirada inclusas',
      'Acompanhamento técnico para evitar qualquer falha'
    ]
  }
];

const OPTIONALS = [
  { icon: <Tv size={32} />, name: 'TV - 32', desc: 'Ideal para espaços menores', price: '+$30', value: 30 },
  { icon: <Tv size={32} />, name: 'TV - 43', desc: 'Para grupos maiores', price: '+$50', value: 50 },
  { icon: <Lightbulb size={32} />, name: 'Jogo de Luz', desc: 'Efeitos de luz para animar a festa', price: '+$20', value: 20 },
];

const TESTIMONIALS = [
  {
    text: '"Simplesmente perfeito! Todo mundo cantou a noite toda. O equipamento é top de linha e o atendimento foi impecável. Já reservei para o próximo ano!"',
    author: 'Ana Paula S.',
    event: 'Aniversário de 40 anos • Kissimmee, FL',
    initials: 'AP'
  },
  {
    text: '"Contratei para a festa de fim de ano da minha empresa e foi um sucesso absoluto. Profissionais pontuais e muito atenciosos. Super recomendo!"',
    author: 'Carlos M.',
    event: 'Confraternização • Orlando, FL',
    initials: 'CM'
  },
  {
    text: '"Que experiência maravilhosa! As músicas brasileiras fizeram toda a diferença. Parecia que estávamos no Brasil! Minha família amou."',
    author: 'Fernanda L.',
    event: 'Chá de bebê • Winter Park, FL',
    initials: 'FL'
  },
  {
    text: '"Cara, foi bom demais! Aluguei pro churrasco de aniversário do meu marido e a galera pirou, cantamos até ficar roucos. O som é limpo, o sistema de escolha de músicas é facinho e os caras montam rapidão. Valeu cada centavo!"',
    author: 'Thiago Rocha',
    event: 'Churrasco de Aniversário • Orlando, FL',
    initials: 'TR'
  }
];

const FAQ_ITEMS = [
  {
    q: 'Qual é a área de entrega?',
    a: 'Atendemos Orlando e toda a região metropolitana incluindo Kissimmee, Winter Garden, Clermont, Winter Park, Altamonte Springs, Sanford, Lake Buena Vista, Ocoee e Windermere. Entre em contato para confirmar disponibilidade na sua cidade.'
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'Aceitamos Zelle, CashApp, cartão de crédito e débito. É necessário um sinal para confirmar a reserva e o restante é pago no dia do evento antes da montagem.'
  },
  {
    q: 'E se eu precisar cancelar?',
    a: 'Cancelamentos feitos com mais de 72 horas de antecedência recebem reembolso total do sinal. Para cancelamentos com menos de 72 horas o sinal não é reembolsável mas podemos reagendar para outra data disponível sem custo adicional.'
  },
  {
    q: 'Qual é a minha responsabilidade sobre o equipamento?',
    a: 'O cliente é responsável pelo equipamento durante o período do evento. Em caso de danos causados por mau uso ou acidentes evitáveis o cliente será responsabilizado pelo conserto ou reposição. Nosso equipamento é profissional e resistente para uso em festas.'
  },
  {
    q: 'Quais músicas estão disponíveis?',
    a: 'Nossa biblioteca tem mais de 25.000 músicas atualizadas para 2026 incluindo sertanejo, pagode, funk, axé, forró, pop brasileiro e internacional. Se tiver uma música específica em mente entre em contato antes para confirmar a disponibilidade.'
  },
  {
    q: 'Com quanto tempo de antecedência devo reservar?',
    a: 'Recomendamos reservar com no mínimo 7 dias de antecedência. Para fins de semana e feriados o ideal é reservar com 2 a 3 semanas pois as datas se esgotam rapidamente.'
  },
  {
    q: 'O que está incluído na entrega e instalação?',
    a: 'Entregamos, montamos e testamos o pacote escolhido. Importante: A TV é sempre à parte, pois o nosso aparelho encaixa facilmente na sua própria TV via HDMI. Caso prefira, temos TVs disponíveis para aluguel. Você não se preocupa com nada!'
  },
  {
    q: 'Preciso de espaço especial para o karaokê?',
    a: 'Não. Nosso equipamento é compacto e se adapta a qualquer ambiente incluindo salas de estar, quintais e salões de festa. Basta ter uma tomada elétrica próxima ao local.'
  },
  {
    q: 'E se chover no dia do evento?',
    a: 'Se o evento for ao ar livre e houver chuva forte recomendamos ter um espaço coberto disponível. Entre em contato e encontramos juntos a melhor solução para garantir a festa.'
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[1].id);
  
  // Testimonials state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Carrossel Galeria de Eventos State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Adição 1: Timer bar countdown
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  // Adição 2: Counter state & ref
  const [partyCount, setPartyCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  // Adição 3: Share toast state
  const [showShareToast, setShowShareToast] = useState(false);

  const GALLERY_IMAGES = [
    'https://i.imgur.com/8LyNPl1.jpg',
    'https://i.imgur.com/nJDM8be.jpg',
    'https://i.imgur.com/Vb27qgU.jpg',
    'https://i.imgur.com/rlJfwWM.jpg',
    'https://i.imgur.com/J9hB47u.jpg',
    'https://i.imgur.com/Ab5Fx0e.jpg',
    'https://i.imgur.com/QdETD1C.jpg',
    'https://i.imgur.com/ghRIKyW.jpg'
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  // Autoplay: 5s para o primeiro item, 3s para os subsequentes
  useEffect(() => {
    const delay = carouselIndex === 0 ? 5000 : 3000;
    const timer = setInterval(() => {
      nextSlide();
    }, delay);
    return () => clearInterval(timer);
  }, [carouselIndex]);

  const getTranslateX = () => {
    if (windowWidth < 768) {
      return carouselIndex * 100;
    } else if (windowWidth < 1024) {
      const index = carouselIndex % 4;
      return index * 50;
    } else {
      const index = carouselIndex % 3;
      return index * 33.3333;
    }
  };

  const handleGlobalRedirect = (link: string) => {
    // Redirecting immediately to avoid browser popup blocks/confirmations
    window.location.href = link;
  };

  // Adição 1: Countdown 24h timer (midnight resets)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0); // Next midnight
      const diff = midnight.getTime() - now.getTime();
      
      if (diff <= 0) {
        return '24:00:00';
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const hStr = String(hours).padStart(2, '0');
      const mStr = String(minutes).padStart(2, '0');
      const sStr = String(seconds).padStart(2, '0');

      return `${hStr}:${mStr}:${sStr}`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Adição 2: Intersection Observer for animating partyCount from 0 to 150
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        let start = 0;
        const end = 150;
        const duration = 3500; // 3.5 seconds
        const startTime = performance.now();

        const animateCount = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function: easeOutQuad
          const easeOutQuad = (t: number) => t * (2 - t);
          const currentCount = Math.floor(easeOutQuad(progress) * end);
          
          setPartyCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(animateCount);
          }
        };

        requestAnimationFrame(animateCount);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  // Adição 3: Web Share API / Copy Fallback
  const copyFallback = (texto: string) => {
    navigator.clipboard.writeText(texto).then(() => {
      setShowShareToast(true);
      setTimeout(() => {
        setShowShareToast(false);
      }, 3000);
    }).catch(() => {
      try {
        const tempInput = document.createElement("textarea");
        tempInput.value = texto;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        setShowShareToast(true);
        setTimeout(() => {
          setShowShareToast(false);
        }, 3000);
      } catch (e) {
        console.error("Clipboard copy failed", e);
      }
    });
  };

  const handleShare = async () => {
    const textoCompleto = `🎤 Olha que serviço incrível aqui em Orlando!\n\nEles levam um karaokê profissional até a sua casa, Airbnb ou salão de festa — com entrega, instalação e mais de 25.000 músicas. Atendimento 100% em português! Perfeito para festas e aniversários 🎉\n\nAcesse agora: https://www.braziokeorlando.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          text: textoCompleto
        });
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          copyFallback(textoCompleto);
        }
      }
    } else {
      copyFallback(textoCompleto);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO: Local Business Schema Injection
  useEffect(() => {
    document.title = "Aluguel de Karaokê em Orlando | BRAZIOKÊ - Entrega e Instalação";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Aluguel de karaokê profissional em Orlando para brasileiros. Entrega, instalação e +25.000 músicas atualizadas. Atendimento em português. Reserve agora!');
    }
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "BRAZIOKÊ",
      "image": "https://i.imgur.com/0jeBxb1.png",
      "@id": "https://braziokee.netlify.app",
      "url": "https://braziokee.netlify.app",
      "telephone": "+16892769150",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Orlando Metropolitan Area",
        "addressLocality": "Orlando",
        "addressRegion": "FL",
        "postalCode": "32801",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.5383,
        "longitude": -81.3792
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "23:59"
      },
      "priceRange": "$$",
      "description": "Aluguel de Karaokê Profissional em Orlando e região. Som de alta qualidade, +25.000 músicas e atendimento em português."
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  // Autoplay Testimonial Carousel: 5s
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [formData, setFormData] = useState({
    nome: '',
    data: '',
    cidade: '',
    horarioInicio: '08:00',
    inicioPeriodo: 'PM',
  });

  const [selectedOptionals, setSelectedOptionals] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePackageSelect = (id: string) => {
    setSelectedPackage(id);
  };

  const toggleOptional = (name: string) => {
    setSelectedOptionals(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const formatDateBR = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pkg = PACKAGES.find(p => p.id === selectedPackage);
    const pkgName = pkg?.name || selectedPackage;
    const optionalsList = selectedOptionals.length > 0 ? selectedOptionals.join(', ') : 'Nenhum';
    
    // Calculate total price
    const pkgPriceValue = pkg?.value || 0;
    const optionalsPriceValue = selectedOptionals.reduce((acc, name) => {
      const opt = OPTIONALS.find(o => o.name === name);
      return acc + (opt?.value || 0);
    }, 0);
    const totalPrice = pkgPriceValue + optionalsPriceValue;

    // Structure message for WhatsApp
    const message = `🗓️ *NOVO AGENDAMENTO*%0A` +
      `-------------------------------------------%0A%0A` +
      `👤 *CLIENTE:* ${formData.nome}%0A%0A` +
      `📅 *DATA:* ${formatDateBR(formData.data)}%0A%0A` +
      `📍 *CIDADE:* ${formData.cidade}%0A%0A` +
      `⏰ *HORA DE INÍCIO:* ${formData.horarioInicio} ${formData.inicioPeriodo}%0A%0A` +
      `📦 *PACOTE:* ${pkgName.toUpperCase()}%0A%0A` +
      `➕ *ADICIONAIS:* ${optionalsList}%0A%0A` +
      `-------------------------------------------%0A%0A` +
      `💰 *VALOR TOTAL:* $${totalPrice}%0A%0A` +
      `-------------------------------------------`;
    
    handleGlobalRedirect(`https://wa.me/16892769150?text=${message}`);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Countdown Timer Top Bar */}
      <div className="fixed top-0 left-0 w-full h-[36px] md:h-[40px] bg-[#1a0a2e] border-b border-[#e040fb] flex items-center justify-center px-4 z-[60] text-white text-[12px] md:text-[13px] font-medium tracking-wide">
        <span className="hidden sm:inline">
          ⏳ Condição especial expira em <span className="text-[#e040fb] font-mono font-bold">{timeLeft}</span> — Reserve hoje e garanta seu karaokê
        </span>
        <span className="inline sm:hidden">
          ⏳ Oferta expira em <span className="text-[#e040fb] font-mono font-bold">{timeLeft}</span>
        </span>
      </div>

      {/* Header */}
      <header className={`fixed top-[36px] md:top-[40px] left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-bg-dark/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <img src="https://i.imgur.com/0jeBxb1.png" alt="BRAZIOKÊ Logo" loading="lazy" className="h-[96px] md:h-[143px] w-auto object-contain transition-transform group-hover:scale-105" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Início', 'Pacotes', 'Como Funciona', 'Depoimentos', 'FAQ'].map((item) => (
              <a 
                key={item} 
                href={item === 'Início' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`} 
                onClick={(e) => {
                  if (item === 'Início') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
            <a href="#agendamento" className="btn-magenta !px-5 !py-2 text-sm">Fazer Agendamento</a>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-bg-dark border-b border-white/10 p-6 flex flex-col gap-4 lg:hidden"
            >
              {['Início', 'Pacotes', 'Como Funciona', 'Depoimentos', 'FAQ'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Início' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`} 
                  onClick={(e) => {
                    if (item === 'Início') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    setIsMenuOpen(false);
                  }}
                  className="text-lg font-medium hover:text-primary py-2"
                >
                  {item}
                </a>
              ))}
              <a 
                href="#agendamento" 
                onClick={() => setIsMenuOpen(false)}
                className="btn-magenta text-center"
              >
                Fazer Agendamento
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-[164px] md:pt-[200px] pb-12 md:pb-16 overflow-hidden">
        {/* Background glow - Reduced opacity/blur for performance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] -z-10" />
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
            <div className="lg:w-1/2">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6"
              >
                Aluguel de Karaokê <span className="text-primary">Profissional em Orlando</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-text-muted text-lg lg:text-xl max-w-2xl lg:mx-0 mx-auto mb-6"
              >
                Levamos o karaokê até sua festa com entrega, instalação e +25.000 músicas atualizadas. Atendimento 100% em português.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="my-4 text-[13px] md:text-sm text-primary font-semibold text-center lg:text-left px-4 lg:px-0"
              >
                🗓️ As datas deste mês estão quase esgotadas — Garanta a sua
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
              >
                <a href="#pacotes" className="btn-magenta w-full sm:w-auto text-center px-8 py-4">Ver Pacotes & Preços</a>
                <button 
                  onClick={() => handleGlobalRedirect(`https://wa.me/16892769150?text=Olá,%20BRAZIOKÊ!%20🎤%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20alugar%20o%20karaokê%20para%20minha%20festa%20em%20Orlando.%20Podem%20me%20ajudar?`)}
                  className="btn-outline w-full max-w-[220px] sm:max-w-none sm:w-auto px-8 py-[10px] sm:py-4 flex items-center justify-center gap-2 text-[14px] sm:text-base whitespace-nowrap"
                >
                  💬 WhatsApp
                </button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="lg:w-1/2 relative flex flex-col w-full"
            >
              {/* 📸 Galeria de Eventos - Carrossel de Eventos Realizados */}
              <div className="w-full">
                <div className="relative w-full overflow-hidden group/carousel">
                  {/* Track Wrapper */}
                  <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/10 p-2 relative">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${getTranslateX()}%)` }}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      {GALLERY_IMAGES.map((imgUrl, i) => (
                        <div 
                          key={i} 
                          className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-2"
                        >
                          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 h-[260px] md:h-[340px] group/item">
                            <img 
                              src={imgUrl} 
                              alt={`Eventos BrazioKê ${i + 1}`} 
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Navigation Arrows for Desktop */}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        prevSlide();
                      }}
                      className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-black/75 border border-primary/40 text-primary hover:bg-primary/20 hover:border-primary transition-all z-20 hover:scale-105"
                      aria-label="Slide anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        nextSlide();
                      }}
                      className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-black/75 border border-primary/40 text-primary hover:bg-primary/20 hover:border-primary transition-all z-20 hover:scale-105"
                      aria-label="Próximo slide"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Indicators for Mobile (Dots) */}
                  <div className="flex justify-center gap-1.5 mt-3.5">
                    {GALLERY_IMAGES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setCarouselIndex(i);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          carouselIndex === i ? 'bg-primary w-5' : 'bg-white/20'
                        }`}
                        aria-label={`Ir para foto ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Glow Behind */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[60px]" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-magenta/20 rounded-full blur-[60px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Como <span className="text-primary">funciona</span></h2>
            <p className="text-text-muted">Simples, rápido e sem complicação</p>

            {/* Adição 2: Bloco com contador animado de festas realizadas */}
            <div ref={counterRef} className="mt-8 flex flex-col items-center select-none">
              <div className="text-[48px] md:text-[64px] font-extrabold text-[#e040fb] tracking-tight leading-none drop-shadow-[0_0_20px_rgba(224,64,251,0.6)]">
                +{partyCount}
              </div>
              <p className="text-sm md:text-lg text-white font-semibold mt-2 tracking-wide">
                festas realizadas em Orlando
              </p>
              <p className="text-xs md:text-sm text-text-muted mt-1 font-medium">
                e a sua pode ser a próxima 🎤
              </p>
            </div>
          </div>
          
          <div className="relative">
            {/* Background flow effect */}
            <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 rounded-full scale-110" />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {[
                { n: '1', icon: <MessageSquare size={32} />, title: 'Solicite', desc: 'Formulário ou WhatsApp em segundos.' },
                { n: '2', icon: <Calendar size={32} />, title: 'Agende', desc: 'Confirmamos sua data e pacote.' },
                { n: '3', icon: <Truck size={32} />, title: 'Receba', desc: 'Fazemos a entrega e montagem local.' },
                { n: '4', icon: <Music size={32} />, title: 'Cante!', desc: 'Solte a voz e aproveite seu show.' },
              ].map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="glass-card p-5 md:p-10 flex flex-col items-center text-center h-full hover:border-primary/50 group-hover:bg-white/10">
                    <div className="w-14 h-14 md:w-24 md:h-24 magenta-gradient rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-8 transform group-hover:rotate-12 transition-transform shadow-[0_10px_30px_rgba(224,64,251,0.3)]">
                      <div className="text-white scale-75 md:scale-100">
                        {step.icon}
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 md:top-6 md:left-6 w-6 h-6 md:w-10 md:h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-[10px] md:text-base font-bold text-primary border border-white/10">
                      {step.n}
                    </div>
                    <h3 className="text-sm md:text-2xl font-bold mb-1 md:mb-4">{step.title}</h3>
                    <p className="text-text-muted text-[10px] md:text-base leading-tight md:leading-relaxed">{step.desc}</p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20">
                      <ArrowRight className="text-primary/30 w-8 h-8" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="pacotes" className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Escolha seu <span className="text-primary">pacote</span></h2>
            <p className="text-text-muted mb-4">Todos os pacotes incluem entrega, instalação e suporte técnico remoto.</p>
            <div className="inline-block max-w-2xl px-6 py-2 text-center text-[13px] md:text-sm text-primary font-semibold tracking-wide bg-primary/5 rounded-full border border-primary/10">
              💡 Serviços similares sem instalação incluída custam entre $300–$400 na região. Aqui tudo está incluso.
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch">
            {PACKAGES.map((pkg, idx) => {
              const isPopular = pkg.popular;
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex flex-col rounded-3xl overflow-hidden relative group transition-all duration-500 p-6 md:p-8 border-2 ${
                    isPopular 
                      ? 'border-primary animate-border-pulse-popular lg:scale-[1.05] z-10 bg-gradient-to-b from-[#1c0228] to-[#040008] shadow-[0_15px_40px_rgba(224,64,251,0.4)]' 
                      : 'border-primary/40 animate-border-pulse bg-gradient-to-b from-[#12001c] to-[#040008] shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-primary/65'
                  }`}
                >
                  {/* Top area of the card */}
                  {isPopular && (
                    <div className="flex justify-end mb-4">
                      <div className="bg-primary text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(224,64,251,0.6)] animate-badge-pulse-popular">
                        🔥 Mais Popular
                      </div>
                    </div>
                  )}

                  {/* Package Image Area */}
                  <div className="w-full h-44 overflow-hidden relative rounded-2xl bg-black/30 border border-white/5 mb-6">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name} 
                      loading="lazy"
                      className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent opacity-40" />
                  </div>

                  {/* Title and Price Info */}
                  <div className="mb-4">
                    {/* Ícone do pacote */}
                    <div className="inline-flex items-center justify-center p-3.5 bg-white/5 border border-white/10 rounded-2xl text-primary mb-4">
                      {pkg.icon}
                    </div>
                    {/* Nome do pacote acima do preço */}
                    <div className="mb-2">
                      <h3 className="text-2xl font-extrabold text-white tracking-wide uppercase">{pkg.name}</h3>
                    </div>
                    {/* Preço em tamanho grande e bold com cor rosa neon e animação de pulsação */}
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl md:text-5xl font-extrabold text-primary tracking-tight animate-price-pulse-${idx}`}>
                        {pkg.price}
                      </span>
                      <span className="text-xs text-text-muted uppercase tracking-widest font-semibold">/ aluguel</span>
                    </div>
                    <p className="text-white/80 text-sm mt-3 font-medium italic min-h-[40px]">{pkg.description}</p>
                  </div>

                  {/* Lista de itens com ícone de check colorido */}
                  <ul className="space-y-3 mb-8 flex-grow border-t border-white/5 pt-6">
                    {pkg.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <Check className="text-primary w-5 h-5 shrink-0 bg-primary/10 rounded-full p-0.5" />
                        <span className="text-white/90 font-medium leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Botão "Fazer Agendamento" com gradiente roxo→rosa e hover com brilho */}
                  <a 
                    href="#agendamento"
                    onClick={() => setSelectedPackage(pkg.id)}
                    className="w-full block text-center py-4 rounded-xl font-bold transition-all bg-gradient-to-r from-[#9c27b0] to-[#e040fb] text-white hover:shadow-[0_0_20px_rgba(224,64,251,0.8)] hover:scale-[1.02] active:scale-[0.98] duration-300"
                  >
                    Fazer Agendamento
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Formas de pagamento aceitas */}
          <div className="mt-16 text-center max-w-md mx-auto px-4">
            <p className="text-xs uppercase tracking-widest text-[#aaaaaa]/70 font-semibold mb-3">Formas de pagamento aceitas:</p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-white/95">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                Zelle
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                Cash App
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                Cash (Dinheiro)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Optionals Section */}
      <section className="py-12 md:py-16 bg-bg-dark/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Itens <span className="text-primary">Opcionais</span></h2>
            <p className="text-text-muted">Turbine sua festa com extras incríveis</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2.5 md:gap-6 max-w-4xl mx-auto">
            {OPTIONALS.map((opt, idx) => (
              <div 
                key={idx} 
                className="glass-card p-3 md:p-6 flex flex-col items-center text-center gap-2 md:gap-4 group hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-primary group-hover:scale-110 transition-transform [&_svg]:w-6 [&_svg]:h-6 md:[&_svg]:w-8 md:[&_svg]:h-8 bg-white/5 p-2 rounded-xl">
                  {opt.icon}
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-xs sm:text-base md:text-lg text-white leading-tight">{opt.name}</h3>
                  <p className="text-text-muted text-[10px] sm:text-xs md:text-sm mt-1 leading-snug hidden md:block">{opt.desc}</p>
                  <p className="text-primary font-extrabold mt-1 text-xs sm:text-base md:text-lg">{opt.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Positioned earlier after reorganization */}
      
      {/* Testimonials */}
      <section id="depoimentos" className="py-12 md:py-20 bg-bg-dark/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">O que nossos clientes <span className="text-primary">dizem</span></h2>
            <p className="text-text-muted">Mais de 150 festas realizadas em toda região de Orlando</p>
          </div>
          
          <div className="relative max-w-3xl mx-auto animate-fade-in">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-6 md:p-12 min-h-[280px] md:min-h-[300px] flex flex-col justify-between relative overflow-hidden group hover:border-primary/45 transition-all duration-300"
              >
                <div>
                  <div className="flex text-yellow-500 mb-6 justify-center">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" className="mx-0.5" />
                    ))}
                  </div>
                  <p className="text-white/95 italic text-sm md:text-lg text-center leading-relaxed font-semibold mb-6">
                    {TESTIMONIALS[currentTestimonial].text}
                  </p>
                </div>
                
                <div className="text-center pt-6 border-t border-white/5 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/25 border border-primary/50 flex items-center justify-center font-bold text-sm text-primary mb-2 shadow-[0_0_10px_rgba(224,64,251,0.2)]">
                    {TESTIMONIALS[currentTestimonial].initials}
                  </div>
                  <h4 className="font-extrabold text-white text-base md:text-lg">{TESTIMONIALS[currentTestimonial].author}</h4>
                  <p className="text-[10px] md:text-xs text-text-muted font-bold uppercase tracking-widest mt-1">
                    {TESTIMONIALS[currentTestimonial].event}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Nav controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={prevTestimonial} 
                className="p-2.5 border border-white/10 rounded-full bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-105 active:scale-95 text-white cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentTestimonial === i ? 'bg-primary w-6' : 'bg-white/20 hover:bg-white/40 w-2'}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextTestimonial} 
                className="p-2.5 border border-white/10 rounded-full bg-white/5 hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-105 active:scale-95 text-white cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Adição 3: Botão de compartilhamento 'Indicar para um amigo' */}
          <div className="mt-10 flex flex-col items-center text-center">
            <p className="text-xs md:text-sm text-text-muted mb-3 font-medium">
              Conhece alguém que vai amar isso? 😄
            </p>
            <button
              onClick={handleShare}
              className="px-7 py-3 text-sm font-bold border-[1.5px] border-[#e040fb] text-[#e040fb] bg-transparent rounded-full transition-all duration-300 hover:bg-[#e040fb] hover:text-white hover:shadow-[0_0_15px_rgba(224,64,251,0.5)] hover:scale-105 active:scale-95 max-[480px]:w-full max-[480px]:max-w-[260px] mx-auto cursor-pointer"
            >
              📲 Indicar para um Amigo
            </button>
            <AnimatePresence>
              {showShareToast && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-green-400 mt-3 font-medium tracking-wide"
                >
                  ✅ Link copiado! Cole no WhatsApp para indicar.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>



      {/* Booking Form Section */}
      <section id="agendamento" className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Faça seu <span className="text-primary">Agendamento</span></h2>
            <p className="text-text-muted">Preencha os dados e garanta sua data agora mesmo</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Form / Success View */}
            <div className="glass-card p-6 md:p-12 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!showSuccess ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit} 
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Nome Completo</label>
                      <input 
                        required
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        type="text" 
                        placeholder="Seu nome" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 md:py-4 focus:border-primary focus:outline-none transition-all" 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Data do Evento</label>
                        <input 
                          required
                          name="data"
                          value={formData.data}
                          onChange={handleInputChange}
                          type="date" 
                          className="w-full min-w-0 [color-scheme:dark] bg-white/5 border border-white/10 rounded-xl px-3 py-3 md:py-4 focus:border-primary focus:outline-none transition-all text-sm sm:text-base" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Cidade</label>
                        <input 
                          required
                          name="cidade"
                          value={formData.cidade}
                          onChange={handleInputChange}
                          type="text" 
                          placeholder="Ex: Orlando, Kissimmee..." 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 md:py-4 focus:border-primary focus:outline-none transition-all" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Hora do evento</label>
                      <div className="flex gap-2">
                        <select 
                          name="horarioInicio"
                          value={formData.horarioInicio}
                          onChange={handleInputChange}
                          className="flex-grow bg-white/5 border border-white/10 rounded-xl px-5 py-3 md:py-4 focus:border-primary focus:outline-none transition-all appearance-none text-white cursor-pointer"
                        >
                          {['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'].map(h => (
                            <option key={h} value={h} className="bg-bg-dark">{h}</option>
                          ))}
                        </select>
                        <select 
                          name="inicioPeriodo"
                          value={formData.inicioPeriodo}
                          onChange={handleInputChange}
                          className="w-24 bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 focus:border-primary focus:outline-none transition-all appearance-none text-white text-center cursor-pointer"
                        >
                          <option value="AM" className="bg-bg-dark">AM</option>
                          <option value="PM" className="bg-bg-dark">PM</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-white/10 text-center md:text-left">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Itens Adicionais (Opcionais)</h4>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {OPTIONALS.map((opt) => (
                          <button
                            key={opt.name}
                            type="button"
                            onClick={() => toggleOptional(opt.name)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-[11px] md:text-xs font-bold ${
                              selectedOptionals.includes(opt.name)
                                ? 'bg-primary/20 border-primary text-white'
                                : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
                            }`}
                          >
                            {selectedOptionals.includes(opt.name) ? <Check size={14} className="shrink-0" /> : <div className="w-3.5 h-3.5 rounded border border-white/30 shrink-0" />}
                            <span className="whitespace-nowrap">{opt.name} ({opt.price})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-primary text-center">Pacote Desejado</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {PACKAGES.map((pkg) => (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => handlePackageSelect(pkg.id)}
                            className={`flex flex-col items-center justify-center py-3 px-3 rounded-xl border transition-all duration-300 ${
                              selectedPackage === pkg.id 
                                ? 'magenta-gradient border-primary text-white shadow-lg scale-105 z-10' 
                                : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:bg-white/10'
                            }`}
                          >
                            <span className={`text-[11px] md:text-sm font-bold ${selectedPackage === pkg.id ? 'text-white' : 'text-white/80'}`}>
                              {pkg.name}
                            </span>
                            <span className={`text-base md:text-lg font-black ${selectedPackage === pkg.id ? 'text-white' : 'text-primary'}`}>
                              {pkg.price}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-10">
                      <button type="submit" className="w-full btn-magenta flex items-center justify-center gap-2 py-3 md:py-5 text-xs md:text-lg uppercase tracking-widest font-black">
                        <Send size={18} className="md:w-5 md:h-5" /> FINALIZAR AGENDAMENTO
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                      <Check size={40} />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-white">Solicitação Enviada!</h3>
                    <p className="text-text-muted mb-8 max-w-md">
                      Sua solicitação de agendamento foi enviada para nosso WhatsApp. <br />
                      Fique atento, responderemos em breve para confirmar sua data.
                    </p>
                    <button 
                      onClick={() => setShowSuccess(false)}
                      className="btn-outline"
                    >
                      Voltar ao formulário
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-20 bg-bg-dark/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Perguntas <span className="text-primary">Frequentes</span></h2>
            <p className="text-text-muted">Tire suas dúvidas sobre nosso serviço</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const shouldOpen = idx < 3;
              return (
                <AccordionItem 
                  key={idx} 
                  question={item.q} 
                  answer={item.a} 
                  defaultOpen={shouldOpen} 
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Onde Atendemos Section */}
      <section id="onde-atendemos" className="py-12 md:py-20 bg-bg-dark text-center">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Onde <span className="text-primary">Atendemos</span></h2>
            <p className="text-text-muted">Cobrimos toda a região metropolitana de Orlando</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-3">
            <p className="text-[13px] text-white/80 leading-relaxed font-normal">
              Orlando • Kissimmee • Winter Garden • Clermont • Celebration - Davenport • Lake Buena Vista • Sanford • Altamonte Springs - Windermere • e mais...
            </p>
            <p className="text-[12px] text-text-muted/60 font-normal">
              Entrega Gratuita em toda região.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark pt-12 md:pt-20 pb-10 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-24 mb-16">
            <div>
              <div className="flex items-center mb-6">
                <img src="https://i.imgur.com/0jeBxb1.png" alt="BRAZIOKÊ aluguel de karaokê Orlando" loading="lazy" className="h-[52px] md:h-[62px] w-auto object-contain" />
              </div>
              <p className="text-text-muted leading-relaxed mb-8">
                Transformando festas em shows inesquecíveis. Aluguel de karaoke profissional para a comunidade brasileira em Orlando e região.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/braziokeorlando?igsh=c3BlbnR1dm11aW8=" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="text-white group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h5 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Menu</h5>
                <ul className="space-y-4">
                  {['Início', 'Pacotes', 'Como Funciona', 'Depoimentos', 'FAQ', 'Agendamento'].map((item) => (
                    <li key={item}>
                      <a 
                        href={item === 'Início' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`} 
                        onClick={(e) => {
                          if (item === 'Início') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="text-text-muted text-sm hover:text-primary transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                  <li>
                    <button onClick={() => setShowPrivacy(true)} className="text-text-muted text-sm hover:text-primary transition-colors">
                      Política de Privacidade
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setShowTerms(true)} className="text-text-muted text-sm hover:text-primary transition-colors">
                      Termos de Uso
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contato</h5>
              <ul className="space-y-5">
                <li className="flex items-start gap-4 group">
                  <Phone size={18} className="text-primary shrink-0 transition-transform group-hover:scale-110" />
                  <a href="tel:+16892769150" className="text-text-muted text-sm hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">(689) 276-9150</a>
                </li>
                <li className="flex items-start gap-4">
                  <Mail size={18} className="text-primary shrink-0" />
                  <a href="mailto:braziokeorlando@gmail.com" className="text-text-muted text-sm hover:text-white transition-colors">braziokeorlando@gmail.com</a>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="text-primary shrink-0" />
                  <span className="text-text-muted text-sm text-balance">Orlando, FL e região</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase font-bold tracking-widest text-white/30">
            <div className="text-center md:text-left">
              <p>© 2026 BRAZIOKE. Todos os direitos reservados.</p>
              <p className="mt-2 opacity-50">MIHSA Services USA Corp — Registered Business — Orlando, FL</p>
            </div>
            <p>Feito com amor para brasileiros em Orlando</p>
          </div>
        </div>
      </footer>

      {/* Policies Overlay */}
      <AnimatePresence>
        {(showPrivacy || showTerms) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg-dark/95 backdrop-blur-lg overflow-y-auto p-6 md:p-20"
          >
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => { setShowPrivacy(false); setShowTerms(false); }}
                className="mb-8 flex items-center gap-2 text-primary uppercase font-bold text-xs tracking-widest hover:text-white transition-colors"
              >
                <X size={16} /> Fechar
              </button>
              
              {showPrivacy && (
                <div className="prose prose-invert max-w-none">
                  <h1 className="text-3xl font-bold mb-8">Política de Privacidade — BRAZIOKÊ</h1>
                  <p>Esta política se aplica ao site braziokee.netlify.app. Coletamos apenas nome, WhatsApp e informações do evento fornecidas voluntariamente pelo usuário através do formulário. Essas informações são usadas exclusivamente para contato e envio de orçamento.</p>
                  <p>Não compartilhamos nenhum dado com terceiros. Não utilizamos cookies de rastreamento de terceiros. Utilizamos as informações fornecidas para melhorar nosso atendimento e enviar comunicações relacionadas ao serviço solicitado.</p>
                  <p>O usuário pode solicitar a exclusão de seus dados a qualquer momento pelo WhatsApp (689) 276-9150. Esta política está em conformidade com as diretrizes de privacidade exigidas pelo Google Ads para anunciantes.</p>
                </div>
              )}
              
              {showTerms && (
                <div className="prose prose-invert max-w-none">
                  <h1 className="text-3xl font-bold mb-8">Termos de Uso — BRAZIOKÊ</h1>
                  <p>O uso deste site implica na aceitação dos presentes termos. O BRAZIOKÊ presta serviços de aluguel de equipamento de karaokê na região de Orlando FL. Os preços exibidos no site são valores de referência e podem variar conforme localização e disponibilidade.</p>
                  <p>A reserva só é confirmada após pagamento do sinal. O cliente é responsável pelo equipamento durante o período de uso. O BRAZIOKÊ reserva o direito de recusar atendimento em casos de localização fora da área de cobertura ou indisponibilidade de agenda. Para dúvidas entre em contato pelo WhatsApp (689) 276-9150.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <div className="fixed max-[480px]:bottom-[-8px] max-[480px]:right-[-8px] bottom-2 right-2 md:bottom-4 md:right-4 z-[60] select-none pointer-events-none">
        <div className="relative pointer-events-auto">
          <motion.a 
            href="https://wa.me/16892769150?text=Olá,%20BRAZIOKÊ!%20🎤%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20alugar%20o%20karaokê%20para%20minha%20festa%20em%20Orlando.%20Podem%20me%20ajudar?"
            target="_blank"
            rel="noopener noreferrer"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="block"
            aria-label="Falar no WhatsApp"
          >
            <div className="max-[480px]:w-[124px] max-[480px]:h-[124px] min-[481px]:w-24 min-[481px]:h-24 md:w-36 md:h-36 flex items-center justify-center hover:scale-110 transition-transform duration-300 drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]">
              <img 
                src="https://i.imgur.com/JW5EuSf.png" 
                alt="WhatsApp" 
                className="w-full h-full object-contain"
              />
            </div>
          </motion.a>
        </div>
      </div>

      {/* Global Redirect Modal Removed as per user request for direct access */}
    </div>
  );
}

function AccordionItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean; key?: any }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="glass-card overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <span className="font-bold pr-8">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-primary shrink-0"
        >
          <ChevronRight />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-text-muted text-sm leading-relaxed border-t border-white/5 bg-white/2 cursor-default">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
