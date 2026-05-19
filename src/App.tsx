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
  { icon: <Tv size={32} />, name: 'TV Compacta 32"', desc: 'Ideal para espaços menores', price: '+$30', value: 30 },
  { icon: <Tv size={32} />, name: 'TV Grande 43"', desc: 'Para grupos maiores', price: '+$50', value: 50 },
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

  const handleGlobalRedirect = (link: string) => {
    // Redirecting immediately to avoid browser popup blocks/confirmations
    window.location.href = link;
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
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-bg-dark/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
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
            <a href="tel:+16892769150" className="p-2 bg-primary/20 rounded-full text-white">
              <Phone size={24} />
            </a>
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
      <section id="inicio" className="relative pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden">
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
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
              >
                <a href="#pacotes" className="btn-magenta w-full sm:w-auto text-center px-8 py-4">Ver Pacotes & Preços</a>
                <button 
                  onClick={() => handleGlobalRedirect(`https://wa.me/16892769150?text=Olá! Gostaria de saber mais sobre o aluguel de karaokê.`)}
                  className="btn-outline w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2"
                >
                  <Phone size={18} /> Falar no WhatsApp
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6 border-t border-white/10"
              >
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-primary fill-primary" />
                  <span className="text-xs font-bold text-white"><span className="text-primary">+150</span> festas realizadas em Orlando</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <div className="flex text-primary">
                    {Array(5).fill(0).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <span className="text-xs font-bold text-white"><span className="text-primary">5.0</span> estrelas no Google</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-primary" />
                  <span className="text-xs font-bold text-white uppercase flex items-center gap-1">Atendimento em <span className="text-primary">português</span></span>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="lg:w-1/2 relative space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(224,64,251,0.2)] border border-white/10 group h-[300px] lg:h-[450px]">
                  <img 
                    src="https://i.imgur.com/bC8TFzr.jpg" 
                    alt="Festa de karaokê com brasileiros em Orlando" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-white/5"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/40 via-transparent to-transparent" />
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(224,64,251,0.1)] border border-white/10 group h-[140px] lg:h-[215px]">
                    <img 
                      src="https://i.imgur.com/jAKs3b5.jpg" 
                      alt="Evento Real BrazioKê" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-white/5"
                    />
                  </div>
                  <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(224,64,251,0.1)] border border-white/10 group h-[140px] lg:h-[215px]">
                    <img 
                      src="https://i.imgur.com/cAQUH67.jpg" 
                      alt="Festa brasileira com karaokê em Orlando" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-white/5"
                    />
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

      {/* Why Choose Us */}
      <section className="py-12 md:py-24 bg-bg-dark/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Experiência <span className="text-primary">Premium</span> Garantida</h2>
            <p className="text-text-muted italic">Você no palco, nós cuidamos de todo o resto.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Shield className="text-primary" />, 
                title: 'Cuidado & Qualidade', 
                desc: 'Equipamento revisado e cristalino. Microfones com acabamento premium para que sua voz brilhe sem ruídos.' 
              },
              { 
                icon: <Clock className="text-primary" />, 
                title: 'Pontualidade Local', 
                desc: 'Conhecemos Orlando de cabo a rabo. Chegamos cedo para que sua única preocupação seja escolher a primeira música.' 
              },
              { 
                icon: <ThumbsUp className="text-primary" />, 
                title: 'Suporte VIP 24h', 
                desc: 'Nada interrompe seu show. Nosso suporte via WhatsApp está ativo durante toda a sua festa para qualquer ajuste.' 
              },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 hover:bg-white/5 transition-all text-left group border-primary/10"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Como <span className="text-primary">funciona</span></h2>
            <p className="text-text-muted">Simples, rápido e sem complicação</p>
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
            <p className="text-text-muted">Todos os pacotes incluem entrega, instalação e suporte técnico remoto.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col glass-card p-0 overflow-hidden relative group transition-all duration-500 hover:-translate-y-2 ${pkg.popular ? 'package-glow-popular border-primary lg:scale-105 z-10' : 'package-glow hover:border-primary/30'}`}
              >
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 rounded-xl transition-opacity duration-500 -z-10 ${pkg.popular ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'} magenta-gradient blur-2xl`} />
                
                {/* Package Image Area */}
                <div className="w-full h-64 overflow-hidden relative border-b border-white/10 bg-[#1a001a]">
                  <img 
                    src={pkg.image} 
                    alt="Kit de karaokê profissional para aluguel em Orlando" 
                    loading="lazy"
                    className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-tighter px-2 py-1 rounded border border-white/10 z-20">
                    Som HD Profissional
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a001a] via-transparent to-transparent opacity-60" />
                  
                  {pkg.popular && (
                    <div className="absolute top-4 left-4 magenta-gradient text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full shadow-lg z-20">
                      Mais Popular
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow relative">
                  
                  <div className="mb-6 flex justify-between items-start">
                    <div className="p-3 bg-white/5 rounded-xl">{pkg.icon}</div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-white">{pkg.price}</span>
                      <span className="text-xs text-text-muted block font-medium">/ ALUGUEL</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-text-muted text-sm mb-6 italic leading-relaxed">{pkg.description}</p>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="text-primary w-5 h-5 shrink-0" />
                        <span className="text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href="#agendamento"
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`w-full block text-center py-4 rounded-xl font-bold transition-all ${pkg.popular ? 'magenta-gradient text-white hover:opacity-90' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    Fazer Agendamento
                  </a>
                </div>
              </motion.div>
            ))}
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
          
          <div className="grid md:grid-cols-3 gap-6">
            {OPTIONALS.map((opt, idx) => (
              <div key={idx} className="glass-card p-6 flex items-center gap-6 group hover:border-primary/50">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {opt.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{opt.name}</h3>
                  <p className="text-text-muted text-sm">{opt.desc}</p>
                  <p className="text-primary font-bold mt-1 text-lg">{opt.price}</p>
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
          
          <div className="relative max-w-5xl mx-auto">
            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="glass-card p-8 flex flex-col justify-between hover:bg-white/10">
                  <div>
                    <div className="flex text-yellow-500 mb-4">
                      {Array(5).fill(0).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-white/90 italic text-sm leading-relaxed mb-6">{t.text}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center font-bold text-primary">
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{t.author}</h4>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">{t.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View / Carousel */}
            <div className="md:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card p-8 min-h-[300px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex text-yellow-500 mb-4">
                      {Array(5).fill(0).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-white/90 italic text-lg leading-relaxed mb-6">{TESTIMONIALS[currentTestimonial].text}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center font-bold text-primary">
                      {TESTIMONIALS[currentTestimonial].initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-white">{TESTIMONIALS[currentTestimonial].author}</h4>
                      <p className="text-xs text-text-muted">{TESTIMONIALS[currentTestimonial].event}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex items-center justify-center gap-4 mt-8">
                <button onClick={prevTestimonial} className="p-2 border border-white/20 rounded-full hover:bg-primary hover:border-primary">
                  <ChevronLeft />
                </button>
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${currentTestimonial === i ? 'bg-primary w-6' : 'bg-white/20'}`} />
                  ))}
                </div>
                <button onClick={nextTestimonial} className="p-2 border border-white/20 rounded-full hover:bg-primary hover:border-primary">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="agendamento" className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(224,64,251,0.2)] border border-white/10 group">
              <img 
                src="https://i.imgur.com/FRRUNQG.jpg" 
                alt="Festa de karaokê com brasileiros em Orlando" 
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
                   <Star className="text-primary w-5 h-5 fill-primary" /> Eventos Reais, Diversão Real
                </p>
              </div>
            </div>
          </motion.div>

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
                    
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Itens Adicionais (Opcionais)</h4>
                      <div className="flex flex-wrap gap-2">
                        {OPTIONALS.map((opt) => (
                          <button
                            key={opt.name}
                            type="button"
                            onClick={() => toggleOptional(opt.name)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-[10px] md:text-sm font-bold ${
                              selectedOptionals.includes(opt.name)
                                ? 'bg-primary/20 border-primary text-white'
                                : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
                            }`}
                          >
                            {selectedOptionals.includes(opt.name) ? <Check size={14} /> : <div className="w-3.5 h-3.5 rounded border border-white/30" />}
                            {opt.name} ({opt.price})
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Pacote Desejado</h4>
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
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem key={idx} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Onde Atendemos Section */}
      <section id="onde-atendemos" className="py-12 md:py-20 bg-bg-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Onde <span className="text-primary">Atendemos</span></h2>
            <p className="text-text-muted">Cobrimos toda a região metropolitana de Orlando</p>
          </div>
          <div className="flex items-center justify-center gap-4 py-8 glass-card border-white/5 max-w-2xl mx-auto">
            <MapPin className="text-primary" size={32} />
            <span className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">Orlando e Região</span>
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
      <motion.a 
        href="https://wa.me/16892769150?text=Olá,%20BRAZIOKÊ!%20🎤%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20alugar%20o%20karaokê%20para%20minha%20festa%20em%20Orlando.%20Podem%20me%20ajudar?"
        target="_blank"
        rel="noopener noreferrer"
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="fixed bottom-[-6px] right-[-16px] sm:bottom-[-8px] sm:right-[-12px] z-[60] flex flex-col items-center group"
        aria-label="Falar no WhatsApp"
      >
        <div className="w-32 h-32 md:w-44 md:h-44 flex items-center justify-center hover:scale-110 transition-transform duration-300 drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]">
          <img 
            src="https://i.imgur.com/JW5EuSf.png" 
            alt="WhatsApp" 
            className="w-full h-full object-contain"
          />
        </div>
      </motion.a>

      {/* Global Redirect Modal Removed as per user request for direct access */}
    </div>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string, key?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  
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
