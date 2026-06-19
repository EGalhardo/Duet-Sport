import { Match, Category, CategoryDetail } from './types';
// @ts-ignore
import copaLogo from './assets/images/copa_2026_clean_logo_1780766662019.png';

export const MATCH_DATA: Match[] = [
  {
    id: 1,
    league: "Premier League",
    teamA: { name: "Arsenal", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
    teamB: { name: "Chelsea", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
    date: "12/05/2026",
    time: "20:00",
    odds: { winA: 2.10, draw: 3.40, winB: 3.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 2,
    league: "La Liga",
    teamA: { name: "Real Madrid", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
    teamB: { name: "Barcelona", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
    date: "13/05/2026",
    time: "21:30",
    odds: { winA: 2.50, draw: 3.20, winB: 2.80 },
    isLive: true,
    status: 'ao_vivo',
    scoreA: 2,
    scoreB: 1
  },
  {
    id: 3,
    league: "Serie A",
    teamA: { name: "Juventus", logo: "https://upload.wikimedia.org/wikipedia/en/6/69/Juventus_FC_crest.svg" },
    teamB: { name: "Inter Milan", logo: "https://upload.wikimedia.org/wikipedia/en/0/05/Inter_Milan.svg" },
    date: "14/05/2026",
    time: "19:45",
    odds: { winA: 2.30, draw: 3.10, winB: 3.20 },
    isLive: false,
    status: 'terminou',
    scoreA: 1,
    scoreB: 1
  },
  {
    id: 4,
    league: "Bundesliga",
    teamA: { name: "Bayern Munchen", logo: "https://upload.wikimedia.org/wikipedia/en/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg" },
    teamB: { name: "B. Dortmund", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
    date: "15/05/2026",
    time: "17:30",
    odds: { winA: 1.80, draw: 3.80, winB: 4.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 5,
    league: "Ligue 1",
    teamA: { name: "PSG", logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" },
    teamB: { name: "Marseille", logo: "https://upload.wikimedia.org/wikipedia/en/4/43/Olympique_de_Marseille_logo.svg" },
    date: "16/05/2026",
    time: "20:00",
    odds: { winA: 1.65, draw: 4.00, winB: 5.50 },
    isLive: false,
    status: 'ao_vivo',
    scoreA: 3,
    scoreB: 0
  },
  {
    id: 6,
    league: "Girabola",
    teamA: { name: "Petro Luanda", logo: "https://upload.wikimedia.org/wikipedia/pt/d/d4/Petr%C3%B3leo_Atl%C3%A9tico_de_Luanda.png" },
    teamB: { name: "1º de Agosto", logo: "https://upload.wikimedia.org/wikipedia/pt/8/87/1%C2%BA_de_Agosto.png" },
    date: "17/05/2026",
    time: "16:00",
    odds: { winA: 2.10, draw: 3.00, winB: 3.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 3001,
    league: "Unitel Basket",
    teamA: { name: 'Petro de Luanda', logo: 'https://i.postimg.cc/Cnntg6fx/PETRO-LUANDA-ANGOLA.png' },
    teamB: { name: '1º de Agosto', logo: 'https://i.postimg.cc/rRRbkYR7/1-AGOSTO-ANGOLA.png' },
    date: "20/05/2026",
    time: "18:00",
    odds: { winA: 1.85, draw: 0, winB: 1.95 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA / Unitel'
  },
  {
    id: 3002,
    league: "Unitel Basket",
    teamA: { name: 'GD Interclube', logo: 'https://i.postimg.cc/bSSMhF2j/GD-INTERCLUBE-ANGOLA.png' },
    teamB: { name: 'ASA (Aviação)', logo: 'https://i.postimg.cc/8ff3Snf2/AS-Aviacao-ANGOLA.png' },
    date: "20/05/2026",
    time: "16:00",
    odds: { winA: 1.70, draw: 0, winB: 2.10 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 3003,
    league: "Unitel Basket",
    teamA: { name: 'Vila Clotilde', logo: 'https://i.postimg.cc/gLL5WB6x/VILA-CLOLTIDE-ANGOLA.png' },
    teamB: { name: 'Petro de Luanda B', logo: 'https://i.postimg.cc/SYY5htzs/PETRO-LUANDA-B-ANGOLA.png' },
    date: "21/05/2026",
    time: "19:00",
    odds: { winA: 2.05, draw: 0, winB: 1.75 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA'
  },
  {
    id: 3004,
    league: "Unitel Basket",
    teamA: { name: '1º de Agosto Acad.', logo: 'https://i.postimg.cc/mz5qKGhs/1-AGOSTO-ACAD-ANGOLA.png' },
    teamB: { name: 'Desportivo do Kwanza', logo: 'https://i.postimg.cc/YLLVHymM/CF-Desportivo-Kwanza-ANGOLA.png' },
    date: "21/05/2026",
    time: "15:00",
    odds: { winA: 1.50, draw: 0, winB: 2.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Unitel TV'
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'futebol',
    title: 'Futebol',
    image: 'https://i.postimg.cc/T3HnF1K8/Futebol-29.gif',
    path: '/liga/futebol',
  },
  {
    id: 'basket',
    title: 'Basket',
    image: 'https://i.postimg.cc/vZ8rvDQZ/Logo-Animado-Basket.gif',
    path: '/liga/basket',
  },
  {
    id: 'f1',
    title: 'F1',
    image: 'https://i.postimg.cc/xd95kgZj/F1.gif',
    path: '/liga/f1',
  },
];

export const CATEGORY_DATA: Record<string, CategoryDetail> = {
  futebol: {
    title: 'Futebol',
    image: 'https://i.postimg.cc/T3HnF1K8/Futebol-29.gif',
    labels: { practice: 'Nacional', private: 'Taça', community: 'Internacional' },
    cards: {
      practice: [
        { title: 'Girabola', image: 'https://i.postimg.cc/SXW0Y3YY/1-Gira-Bola-Hd.png' },
        { title: 'Bundesliga', image: 'https://i.postimg.cc/rdS6R3R4/2-Bundes-Liga-hd.png' },
        { title: 'La Liga', image: 'https://i.postimg.cc/KKnX3w3Q/3-La-Liga-hd.png' },
        { title: 'Ligue 1', image: 'https://i.postimg.cc/7CgvJdJ7/4-ligue-1-logo.png' },
        { title: 'Eredivisie', image: 'https://i.postimg.cc/Z9rkv2vp/5-Eredivisie.png' },
        { title: 'Premier League', image: 'https://i.postimg.cc/LqzdgwgB/6-Premier-League.png' },
        { title: 'Serie A', image: 'https://i.postimg.cc/gwv9LQLg/7-Serie-A.png' },
        { title: 'Liga Nos', image: 'https://i.postimg.cc/WDMRqCq9/8-Liga-Nos.jpg' },
      ],
      private: [
        { title: 'Taça de Angola', image: 'https://i.postimg.cc/BXWWSJz9/1-Taca-de-Angola.png' },
        { title: 'DFB Pokal', image: 'https://i.postimg.cc/6yCkTDs5/2-Taca-da-Alemanha.png' },
        { title: 'Copa del Rey', image: 'https://i.postimg.cc/mt7vh0xW/3-Taca-de-Espanha-hd.png' },
        { title: 'Copa da França', image: 'https://i.postimg.cc/w7DC3nCS/4-Copa-da-Franca.jpg' },
        { title: 'KNVB Beker', image: 'https://i.postimg.cc/Xp9RXTMv/5-KNVB-Cup-logo.png' },
        { title: 'FA Cup', image: 'https://i.postimg.cc/6yCkTDs3/6-Taca-de-Inglaterra.png' },
        { title: 'TIM Cup', image: 'https://i.postimg.cc/PP1gNBGC/7-Taca-da-Italia.png' },
        { title: 'Taça de Portugal', image: 'https://i.postimg.cc/sMytWwyV/8-Taca-de-Portugal.png' },
      ],
      community: [
        { title: 'CAF Champions League', image: 'https://i.postimg.cc/ygqhJrC6/1-Liga-do-campeoes-Africa.png' },
        { title: 'CAF Confederation Cup', image: 'https://i.postimg.cc/zbnCTSq8/2-Taca-das-confederacoes-Africa.png' },
        { title: 'UEFA Champions League', image: 'https://i.postimg.cc/ZBkP9Dzn/3-Liga-dos-campeoes-Europa.jpg' },
        { title: 'UEFA Europa League', image: 'https://i.postimg.cc/8JhRLBTT/4-Liga-Europa.png' },
        { title: 'Copa do Mundo', image: copaLogo },
      ]
    }
  },
  basket: {
    title: 'Basket',
    image: 'https://i.postimg.cc/vZ8rvDQZ/Logo-Animado-Basket.gif',
    labels: { practice: 'Nacional', private: 'Taça', community: 'Internacional' },
    cards: {
      practice: [
        { title: 'Unitel Basket', image: 'https://i.postimg.cc/jS3Zp15B/Unitel-Basket.jpg' },
        { title: 'Liga ACB', image: 'https://i.postimg.cc/8zcbmb48/Liga-ACB.jpg' },
        { title: 'Liga VTB', image: 'https://i.postimg.cc/d3J2kR3S/Liga-VTB-RUSSIA.png' },
        { title: 'Basket League', image: 'https://i.postimg.cc/sD6Yxhzz/Basket-League-GRECIA.png' },
        { title: 'Serie A Basket', image: 'https://i.postimg.cc/PJfDrtFX/Serie-A-Baske-T-ITALIA.png' },
        { title: 'Jeep Elite', image: 'https://i.postimg.cc/0yKwNXZg/Jeep-Elite-FRANCA.png' },
        { title: 'BBL Alemanha', image: 'https://i.postimg.cc/9MLMbyJV/BBL-ALEMANHA.png' }
      ],
      private: [
        { title: 'Taça de Angola Basket', image: 'https://i.postimg.cc/mkrSpN4r/Taca-de-Angola.png' },
        { title: 'Taça do Rei Basket', image: 'https://i.postimg.cc/pX4BkF6T/Taca-do-Rei.png' },
        { title: 'Taça da Rússia Basket', image: 'https://i.postimg.cc/5Nhw8MX4/Taca-da-Russia.png' },
        { title: 'Taça da Grécia Basket', image: 'https://i.postimg.cc/3NPDjgJz/Taca-da-Grecia.png' },
        { title: 'Taça da Itália Basket', image: 'https://i.postimg.cc/8cr7CjBb/Taca-da-Italia.png' },
        { title: 'Taça de França Basket', image: 'https://i.postimg.cc/K8bDd2mx/Taca-de-Franca.png' },
        { title: 'NBA EUA Leste', image: 'https://i.postimg.cc/mZF3kDDP/NBA-EUA-LESTE.png' },
        { title: 'Taça da Alemanha Basket', image: 'https://i.postimg.cc/J7JJm26z/Taca-da-Alemanha.png' }
      ],
      community: [
        { title: 'BAL', image: 'https://i.postimg.cc/9XR3fGZd/BAL.png' },
        { title: 'Afrobasket 2021', image: 'https://i.postimg.cc/XqFDkkkm/Afrobasket-2021.png' },
        { title: 'EUROPA', image: 'https://i.postimg.cc/KvD0czqB/EUROPA.jpg' },
        { title: 'EuroBasket 2021', image: 'https://i.postimg.cc/fTDvPszw/Euro-Basket-2021-logo.png' }
      ]
    }
  },
  f1: {
    title: 'F1',
    image: 'https://i.postimg.cc/xd95kgZj/F1.gif',
    labels: { community: 'Equipas', practice: 'Classificacao', private: 'G.P' },
    cards: {
      community: [
        { title: 'Mercedes', image: 'https://i.postimg.cc/9RhZbrs6/1-Mercedes.jpg', driver1: 'https://i.postimg.cc/sMCjv7SG/1-Hamilton.png', driver2: 'https://i.postimg.cc/yDC1kc9F/2-Botas.png' },
        { title: 'Red Bull Racing', image: 'https://i.postimg.cc/hzBTsfHB/2-RBR.jpg', driver1: 'https://i.postimg.cc/0z1kbDmG/3-Verstappen.png', driver2: 'https://i.postimg.cc/LJkHf5Bn/4-Albon.png' },
        { title: 'Ferrari', image: 'https://i.postimg.cc/R6BKdNj4/3-Ferrari.jpg', driver1: 'https://i.postimg.cc/Mn0WRHbn/5-Vettel.png', driver2: 'https://i.postimg.cc/YvNpg0fL/6-Leclerc.png' },
        { title: 'Alpine', image: 'https://i.postimg.cc/9RhZbrvV/4-Renault.jpg', driver1: 'https://i.postimg.cc/v47Q9TL7/11-Ricciardo.png', driver2: 'https://i.postimg.cc/QFgX5CkJ/12-Ocon.png' },
        { title: 'Stake F1 Team', image: 'https://i.postimg.cc/CBgk7zWw/5-Alfa-romeo.jpg', driver1: 'https://i.postimg.cc/Js31J0cZ/8-Raikkonen.png', driver2: 'https://i.postimg.cc/yDhV9xXR/7-Giovinazzi.png' },
        { title: 'Visa Cash App RB', image: 'https://i.postimg.cc/phHzCpgT/6-Alfatauri.jpg', driver1: 'https://i.postimg.cc/87d1WcBH/14-Gasly.png', driver2: 'https://i.postimg.cc/Bj5qDbcC/13-Kvyat.png' },
        { title: 'Haas', image: 'https://i.postimg.cc/k6mKsBkG/7-Haas-F1.jpg', driver1: 'https://i.postimg.cc/hX8Sxvby/17-Magnussen.png', driver2: 'https://i.postimg.cc/0zG8mjdH/18-Grosjean.png' },
        { title: 'Williams', image: 'https://i.postimg.cc/r0kxjKvr/10-Williams.jpg', driver1: 'https://i.postimg.cc/18096XcB/15-Russel.png', driver2: 'https://i.postimg.cc/G4PcYtJX/16-Latifi.png' },
        { title: 'Aston Martin', image: 'https://i.postimg.cc/cgSwhrVr/9-Racing-Point.jpg', driver1: 'https://i.postimg.cc/xXG0H8y4/19-Stroll.png', driver2: 'https://i.postimg.cc/Wdm2rz6C/20-Perez.png' },
        { title: 'McLaren', image: 'https://i.postimg.cc/dkYr6Lzd/mclaren-logo.png', driver1: 'https://i.postimg.cc/RW1MfhQc/9-Sainz.png', driver2: 'https://i.postimg.cc/hX8SxvbL/10-Norris.png' },
      ],
      practice: [
        { title: 'Abu Dhabi', image: 'https://i.postimg.cc/hG3BynHh/ABU-DHABI-YAS-MARINA-CIRCUIT.jpg' },
        { title: 'Arábia Saudita', image: 'https://i.postimg.cc/wjfZHVF2/ARABIA-SAUDITA-JEDDAH-STREET-CIRCUIT.jpg' },
        { title: 'Austrália', image: 'https://i.postimg.cc/Y9gs6w7T/AUSTRALIA-MELBOURNE-GRAND-PRIX-CIRCUIT.png' },
        { title: 'Áustria', image: 'https://i.postimg.cc/mgDpd9Rt/AUSTRIA-RED-BULL-RING.png' },
        { title: 'Azerbaijão', image: 'https://i.postimg.cc/XJwsZcc7/AZERBAIJAO-BAKU-CITY-CIRCUIT.png' },
        { title: 'Bélgica', image: 'https://i.postimg.cc/zXDxBhLm/BELGICA-CIRCUIT-DE-SPA-FRANCORCHAMPS.png' },
        { title: 'Brasil', image: 'https://i.postimg.cc/VLHWkVQ4/BRASIL-AUTODROMO-JOSE-CARLOS-PACE.png' },
        { title: 'Canadá', image: 'https://i.postimg.cc/d3VGq85z/CANADA-CIRCUIT-GILLES-VILLENEUVE.png' },
        { title: 'Espanha', image: 'https://i.postimg.cc/Bv5FHhyD/ESPANHA-CIRCUIT-DE-BARCELONA-CATALUNYA.png' },
        { title: 'EUA', image: 'https://i.postimg.cc/QCzKhv9V/EUA-CIRCUIT-OF-THE-AMERICAS.png' },
        { title: 'França', image: 'https://i.postimg.cc/g28LbSYG/FRANCA-CIRCUIT-PAUL-RICARD.png' },
        { title: 'Grã-Bretanha', image: 'https://i.postimg.cc/0jzrWZtW/GRA-BRITANHA-SILVESTONE-CIRCUIT.png' },
        { title: 'Holanda', image: 'https://i.postimg.cc/FKhz5hWc/HOLANDA-CIRCUIT-ZANDVOORT.png' },
        { title: 'Hungria', image: 'https://i.postimg.cc/hhF4CnQr/HUNGRIA-HUNGARORING.png' },
        { title: 'Itália (Imola)', image: 'https://i.postimg.cc/Hk957ZFQ/ITALIA-AUTODROMO-ENZO-E-DINO-FERRARI.png' },
        { title: 'Itália (Monza)', image: 'https://i.postimg.cc/GtDT3qkK/ITALIA-NAZIONALE-E-MONZA.png' },
        { title: 'Japão', image: 'https://i.postimg.cc/43FYzrP4/JAPAO-SUZUKA-INTERNATIONAL-RACING-COURSE.png' },
        { title: 'México', image: 'https://i.postimg.cc/66Z8vbvR/MEXICO-AUTODEOMO-HERMANOS-RODRIGUEZ.png' },
        { title: 'Mónaco', image: 'https://i.postimg.cc/cCG4hZnK/MONACO-CIRCUIT-DE-MONACO.png' },
        { title: 'Portugal', image: 'https://i.postimg.cc/vHzHrJHR/PORTUGAL-AUTODROMO-INTERNACIONAL-DO-ALGARVE.png' },
        { title: 'Rússia', image: 'https://i.postimg.cc/MGhWZxtg/RUSSIA-SOCHI-AUTODROM.png' },
        { title: 'Singapura', image: 'https://i.postimg.cc/X7VnYscV/SINGAPURA-MARINA-BAY-STREET-CIRCUIT.png' }
      ],
      private: [
        { title: 'Abu Dhabi', image: 'https://i.postimg.cc/hG3BynHh/ABU-DHABI-YAS-MARINA-CIRCUIT.jpg' },
        { title: 'Arábia Saudita', image: 'https://i.postimg.cc/wjfZHVF2/ARABIA-SAUDITA-JEDDAH-STREET-CIRCUIT.jpg' },
        { title: 'Austrália', image: 'https://i.postimg.cc/Y9gs6w7T/AUSTRALIA-MELBOURNE-GRAND-PRIX-CIRCUIT.png' },
        { title: 'Áustria', image: 'https://i.postimg.cc/mgDpd9Rt/AUSTRIA-RED-BULL-RING.png' },
        { title: 'Azerbaijão', image: 'https://i.postimg.cc/XJwsZcc7/AZERBAIJAO-BAKU-CITY-CIRCUIT.png' },
        { title: 'Bélgica', image: 'https://i.postimg.cc/zXDxBhLm/BELGICA-CIRCUIT-DE-SPA-FRANCORCHAMPS.png' },
        { title: 'Brasil', image: 'https://i.postimg.cc/VLHWkVQ4/BRASIL-AUTODROMO-JOSE-CARLOS-PACE.png' },
        { title: 'Canadá', image: 'https://i.postimg.cc/d3VGq85z/CANADA-CIRCUIT-GILLES-VILLENEUVE.png' },
        { title: 'Espanha', image: 'https://i.postimg.cc/Bv5FHhyD/ESPANHA-CIRCUIT-DE-BARCELONA-CATALUNYA.png' },
        { title: 'EUA', image: 'https://i.postimg.cc/QCzKhv9V/EUA-CIRCUIT-OF-THE-AMERICAS.png' },
        { title: 'França', image: 'https://i.postimg.cc/g28LbSYG/FRANCA-CIRCUIT-PAUL-RICARD.png' },
        { title: 'Grã-Bretanha', image: 'https://i.postimg.cc/0jzrWZtW/GRA-BRITANHA-SILVESTONE-CIRCUIT.png' },
        { title: 'Holanda', image: 'https://i.postimg.cc/FKhz5hWc/HOLANDA-CIRCUIT-ZANDVOORT.png' },
        { title: 'Hungria', image: 'https://i.postimg.cc/hhF4CnQr/HUNGRIA-HUNGARORING.png' },
        { title: 'Itália (Imola)', image: 'https://i.postimg.cc/Hk957ZFQ/ITALIA-AUTODROMO-ENZO-E-DINO-FERRARI.png' },
        { title: 'Itália (Monza)', image: 'https://i.postimg.cc/GtDT3qkK/ITALIA-NAZIONALE-E-MONZA.png' },
        { title: 'Japão', image: 'https://i.postimg.cc/43FYzrP4/JAPAO-SUZUKA-INTERNATIONAL-RACING-COURSE.png' },
        { title: 'México', image: 'https://i.postimg.cc/66Z8vbvR/MEXICO-AUTODEOMO-HERMANOS-RODRIGUEZ.png' },
        { title: 'Mónaco', image: 'https://i.postimg.cc/cCG4hZnK/MONACO-CIRCUIT-DE-MONACO.png' },
        { title: 'Portugal', image: 'https://i.postimg.cc/vHzHrJHR/PORTUGAL-AUTODROMO-INTERNACIONAL-DO-ALGARVE.png' },
        { title: 'Rússia', image: 'https://i.postimg.cc/MGhWZxtg/RUSSIA-SOCHI-AUTODROM.png' },
        { title: 'Singapura', image: 'https://i.postimg.cc/X7VnYscV/SINGAPURA-MARINA-BAY-STREET-CIRCUIT.png' }
      ]
    }
  }
};

export const COMPETITION_LOGOS: Record<string, string> = {
  'Copa do Mundo': copaLogo,
  'Girabola': 'https://i.postimg.cc/qRvHdhGG/Angola-Girabola-54.gif',
  'Taça de Angola': 'https://i.postimg.cc/RZ7k6QsQ/Angola-Taca-de-Angola.gif',
  'Bundesliga': 'https://i.postimg.cc/qgfFgz2S/Alemanha-Bundes-Liga.gif',
  'BundesLiga': 'https://i.postimg.cc/qgfFgz2S/Alemanha-Bundes-Liga.gif',
  'Taça da Alemanha': 'https://i.postimg.cc/W4bssHNh/Alemanha-Taca-da-Alemanha.gif',
  'DFB Pokal': 'https://i.postimg.cc/W4bssHNh/Alemanha-Taca-da-Alemanha.gif',
  'La Liga': 'https://i.postimg.cc/2SCDxKBM/Espanha-La-Liga.gif',
  'Taça de Espanha': 'https://i.postimg.cc/Yqs66JVr/Espanha-Taca-de-Espanha.gif',
  'Ligue 1': 'https://i.postimg.cc/5N6v2st7/Franca-Ligue-1.gif',
  'Taça de França': 'https://i.postimg.cc/nL0c7tRC/Franca-Taca-de-Franca.gif',
  'Eredivisie': 'https://i.postimg.cc/63F72XTN/Holanda-Eredivisie.gif',
  'Taça da Holanda': 'https://i.postimg.cc/Gmb4sz3R/Holanda-Taca-de-Holanda.gif',
  'Premier League': 'https://i.postimg.cc/VvjNJ03r/Inglaterra-Premier-League.gif',
  'Taça de Inglaterra': 'https://i.postimg.cc/jjgc1L3q/Inglaterra-Taca-de-Inglaterra.gif',
  'Serie A': 'https://i.postimg.cc/6pBh5dDC/Italia-Serie-A.gif',
  'Série A': 'https://i.postimg.cc/6pBh5dDC/Italia-Serie-A.gif',
  'Taça de Itália': 'https://i.postimg.cc/D0VrVsr3/Italia-Taca-da-Italia.gif',
  'Liga Nos': 'https://i.postimg.cc/J0WkY88P/Portugal-Liga-NOS.gif',
  'Liga NOS': 'https://i.postimg.cc/J0WkY88P/Portugal-Liga-NOS.gif',
  'Taça de Portugal': 'https://i.postimg.cc/4NP9PjSy/Portugal-Taca-de-Portugal.gif',
  'CAF Champions League': 'https://i.postimg.cc/VkSktTyg/Africa-Liga-dos-campeoes-Africa.gif',
  'CAF Confederation Cup': 'https://i.postimg.cc/rsF8wZNk/Africa-Confederacoes-Africanas.gif',
  'UEFA Champions League': 'https://i.postimg.cc/kXHn7cVS/Europa-Liga-dos-Campeoes-Europa.gif',
  'UEFA Europa League': 'https://i.postimg.cc/Y9t7dDVS/Europa-Liga-Europa.gif',
  
  // BASKETBALL LOGOS
  'Unitel Basket': 'https://i.postimg.cc/G3WP6SYp/Angola-Unitel-Basket.gif',
  'Liga ACB': 'https://i.postimg.cc/W4xttxs1/Espanha-Liga-Endesa.gif',
  'NBA': 'https://i.postimg.cc/rm6FqW9m/EUA-NBA.gif',
  'Jeep Elite': 'https://i.postimg.cc/vZcQ9XqV/Franca-Jeep.gif',
  'Basket League': 'https://i.postimg.cc/PJSjv81m/Grecia-Basket-League.gif',
  'Serie A Basket': 'https://i.postimg.cc/Gtm0Rh6p/Italia-LBA-Italia.gif',
  'Liga VTB': 'https://i.postimg.cc/qMNYxYrz/Russia-VTB-Russia.gif',
  'BBL Alemanha': 'https://i.postimg.cc/SQv1RrMZ/Alemanha-BBL.gif',

  // BASKETBALL CUP LOGOS
  'Taça de Angola Basket': 'https://i.postimg.cc/CL6Wk0n3/Angola-Taca-Angola-Basket.gif',
  'Taça do Rei Basket': 'https://i.postimg.cc/KzNWzh2j/Espanha-Taca-de-Espanha-Basket.gif',
  'Taça da Rússia Basket': 'https://i.postimg.cc/HxxwQqMH/Russia-Taca-da-Russia.gif',
  'Taça da Grécia Basket': 'https://i.postimg.cc/Pxr4SLBV/Grecia-Taca-da-Grecia.gif',
  'Taça da Itália Basket': 'https://i.postimg.cc/FH5V2CM7/Italia-Taca-da-Italia.gif',
  'Taça de França Basket': 'https://i.postimg.cc/gkwM9ZrB/Franca-Taca-de-Franca.gif',
  'Taça da Alemanha Basket': 'https://i.postimg.cc/cLvGbCNC/Alemanha-Taca-da-Alemanha.gif',

  // F1 GRAND PRIX LOGOS
  'Abu Dhabi GP': 'https://i.postimg.cc/FRk01jcJ/ABU-DHABI.gif',
  'Arábia Saudita GP': 'https://i.postimg.cc/cLD3mDB2/ARABIA-SAUDITA-JEDDAH-STREET-CIRCUIT.gif',
  'Austrália GP': 'https://i.postimg.cc/X74y0M2G/AUSTRALIA-MELBOURNE-GRAND-PRIX-CIRCUIT.gif',
  'Áustria GP': 'https://i.postimg.cc/hGzX0KG6/AUSTRIA-RED-BULL-RING.gif',
  'Azerbaijão GP': 'https://i.postimg.cc/6q0qQ3Hm/AZERBAIJAO-BAKU-CITY-CIRCUIT.gif',
  'Bélgica GP': 'https://i.postimg.cc/X7sXSrBv/BELGICA-CIRCUIT-DE-SPA-FRANCORCHAMPS-63.gif',
  'Brasil GP': 'https://i.postimg.cc/ydC8X9tn/BRASIL-AUTODROMO-JOSE-CARLOS-PACE.gif',
  'Canadá GP': 'https://i.postimg.cc/9XpQZDpJ/CANADA-CIRCUIT-GILLES-VILLENEUVE-68.gif',
  'Espanha GP': 'https://i.postimg.cc/3Rh3Dh0G/ESPANHA-CIRCUIT-DE-BARCELONA-CATALUNYA.gif',
  'EUA GP': 'https://i.postimg.cc/jd2tfZCb/EUA-CIRCUIT-OF-THE-AMERICAS.gif',
  'França GP': 'https://i.postimg.cc/QMQ3DzYk/FRANCA-CIRCUIT-PAUL-RICARD.gif',
  'Grã-Bretanha GP': 'https://i.postimg.cc/brBXLfrB/GRA-BRITANHA-SILVESTONE-CIRCUIT.gif',
  'Holanda GP': 'https://i.postimg.cc/VkMy9T8Z/HOLANDA-CIRCUIT-ZANDVOORT-75.gif',
  'Hungria GP': 'https://i.postimg.cc/W35xbcGq/HUNGRIA-HUNGARORING.gif',
  'Itália (Imola) GP': 'https://i.postimg.cc/KcsC6FcQ/ITALIA-AUTODROMO-ENZO-E-DINO-FERRARI-80.gif',
  'Itália (Monza) GP': 'https://i.postimg.cc/MGxL7pty/ITALIA-NAZIONALE-E-MONZA.gif',
  'Japão GP': 'https://i.postimg.cc/D0WpvJyh/JAPAO-SUZUKA-INTERNATIONAL-RACING-COURSE.gif',
  'México GP': 'https://i.postimg.cc/2yBTpsTP/MEXICO-AUTODEOMO-HERMANOS-RODRIGUEZ.gif',
  'Mónaco GP': 'https://i.postimg.cc/Cx4368RZ/MONACO-CIRCUIT-DE-MONACO.gif',
  'Portugal GP': 'https://i.postimg.cc/LXGwZBWJ/PORTUGAL-AUTODROMO-INTERNACIONAL-DO-ALGARVE-89.gif',
  'Rússia GP': 'https://i.postimg.cc/Jh2d95MP/RUSSIA-SOCHI-AUTODROM-93.gif',
  'Singapura GP': 'https://i.postimg.cc/wTQ46p9y/SINGAPURA-MARINA-BAY-STREET-CIRCUIT.gif'
};

export const getCompetitionLogo = (t: string | null) => {
  if (!t) return COMPETITION_LOGOS['Girabola'];
  // Normalização para casos de nomes com variações
  const name = t.trim();
  if (name.startsWith('Copa do Mundo')) {
    if (typeof window !== 'undefined') {
      const storedImage = localStorage.getItem('duet_world_cup_image');
      if (storedImage && !storedImage.startsWith('/src/assets/')) return storedImage;
    }
    return COMPETITION_LOGOS['Copa do Mundo'];
  }
  if (name === 'PremierLeague' || name === 'Premier League') return COMPETITION_LOGOS['Premier League'];
  if (name === 'BundesLiga' || name === 'Bundesliga') return COMPETITION_LOGOS['Bundesliga'];
  if (name === 'Liga Nos' || name === 'Liga NOS') return COMPETITION_LOGOS['Liga NOS'];
  if (name === 'Serie A' || name === 'Série A') return COMPETITION_LOGOS['Série A'];
  if (name === 'Eredivisie' || name === 'Holanda Eredivisie') return COMPETITION_LOGOS['Eredivisie'];
  if (name === 'Taça da Alemanha' || name === 'DFB Pokal') return COMPETITION_LOGOS['DFB Pokal'];
  if (name === 'Copa del Rey' || name === 'Taça de Espanha') return COMPETITION_LOGOS['Taça de Espanha'];
  if (name === 'Copa da França' || name === 'Taça de França') return COMPETITION_LOGOS['Taça de França'];
  if (name === 'KNVB Beker' || name === 'Taça da Holanda') return COMPETITION_LOGOS['Taça da Holanda'];
  if (name === 'FA Cup' || name === 'Taça de Inglaterra') return COMPETITION_LOGOS['Taça de Inglaterra'];
  if (name === 'TIM Cup' || name === 'Taça de Itália') return COMPETITION_LOGOS['Taça de Itália'];
  
  // BASKETBALL NORMALIZATION
  if (name === 'Unitel Basket' || name === 'Unitel-Basket') return COMPETITION_LOGOS['Unitel Basket'];
  if (name === 'Liga ACB' || name === 'Liga-ACB') return COMPETITION_LOGOS['Liga ACB'];
  if (name === 'NBA' || name === 'NBA EUA Leste') return COMPETITION_LOGOS['NBA'];
  if (name === 'Jeep Elite') return COMPETITION_LOGOS['Jeep Elite'];
  if (name === 'Basket League') return COMPETITION_LOGOS['Basket League'];
  if (name === 'Serie A Basket') return COMPETITION_LOGOS['Serie A Basket'];
  if (name === 'Liga VTB') return COMPETITION_LOGOS['Liga VTB'];
  if (name === 'BBL Alemanha') return COMPETITION_LOGOS['BBL Alemanha'];
  
  // BASKETBALL CUP NORMALIZATION
  if (name === 'Taça de Angola Basket') return COMPETITION_LOGOS['Taça de Angola Basket'];
  if (name === 'Taça do Rei Basket') return COMPETITION_LOGOS['Taça do Rei Basket'];
  if (name === 'Taça da Rússia Basket') return COMPETITION_LOGOS['Taça da Rússia Basket'];
  if (name === 'Taça da Grécia Basket') return COMPETITION_LOGOS['Taça da Grécia Basket'];
  if (name === 'Taça da Itália Basket') return COMPETITION_LOGOS['Taça da Itália Basket'];
  if (name === 'Taça de França Basket') return COMPETITION_LOGOS['Taça de França Basket'];
  if (name === 'Taça da Alemanha Basket') return COMPETITION_LOGOS['Taça da Alemanha Basket'];
  
  // F1 NORMALIZATION
  if (name === 'Abu Dhabi') return COMPETITION_LOGOS['Abu Dhabi GP'];
  if (name === 'Arábia Saudita') return COMPETITION_LOGOS['Arábia Saudita GP'];
  if (name === 'Austrália') return COMPETITION_LOGOS['Austrália GP'];
  if (name === 'Áustria') return COMPETITION_LOGOS['Áustria GP'];
  if (name === 'Azerbaijão') return COMPETITION_LOGOS['Azerbaijão GP'];
  if (name === 'Bélgica') return COMPETITION_LOGOS['Bélgica GP'];
  if (name === 'Brasil') return COMPETITION_LOGOS['Brasil GP'];
  if (name === 'Canadá') return COMPETITION_LOGOS['Canadá GP'];
  if (name === 'Espanha') return COMPETITION_LOGOS['Espanha GP'];
  if (name === 'EUA') return COMPETITION_LOGOS['EUA GP'];
  if (name === 'França') return COMPETITION_LOGOS['França GP'];
  if (name === 'Grã-Bretanha') return COMPETITION_LOGOS['Grã-Bretanha GP'];
  if (name === 'Holanda') return COMPETITION_LOGOS['Holanda GP'];
  if (name === 'Hungria') return COMPETITION_LOGOS['Hungria GP'];
  if (name === 'Itália (Imola)') return COMPETITION_LOGOS['Itália (Imola) GP'];
  if (name === 'Itália (Monza)') return COMPETITION_LOGOS['Itália (Monza) GP'];
  if (name === 'Japão') return COMPETITION_LOGOS['Japão GP'];
  if (name === 'México') return COMPETITION_LOGOS['México GP'];
  if (name === 'Mónaco') return COMPETITION_LOGOS['Mónaco GP'];
  if (name === 'Portugal') return COMPETITION_LOGOS['Portugal GP'];
  if (name === 'Rússia') return COMPETITION_LOGOS['Rússia GP'];
  if (name === 'Singapura') return COMPETITION_LOGOS['Singapura GP'];
  
  return COMPETITION_LOGOS[name] || COMPETITION_LOGOS['Girabola'];
};

export const LEAGUE_CLASSIFICATIONS: Record<string, any[]> = {
  'Girabola': [
    { pos: 1, team: 'Petro Luanda', p: 12, w: 10, d: 2, l: 0, pts: 32 },
    { pos: 2, team: '1º de Agosto', p: 12, w: 9, d: 1, l: 2, pts: 28 },
    { pos: 3, team: 'Sagrada Esperança', p: 12, w: 8, d: 1, l: 3, pts: 25 },
    { pos: 4, team: 'Wiliete de Benguela', p: 12, w: 7, d: 1, l: 4, pts: 22 },
    { pos: 5, team: 'Bravos do Maquis', p: 12, w: 5, d: 3, l: 4, pts: 18 },
    { pos: 6, team: 'Interclube', p: 12, w: 4, d: 3, l: 5, pts: 15 },
    { pos: 7, team: 'Académica do Lobito', p: 12, w: 4, d: 0, l: 8, pts: 12 },
    { pos: 8, team: 'Desportivo da Huíla', p: 12, w: 3, d: 1, l: 8, pts: 10 },
    { pos: 9, team: 'Recreativo do Libolo', p: 12, w: 2, d: 3, l: 7, pts: 9 },
    { pos: 10, team: 'Sporting de Cabinda', p: 12, w: 2, d: 2, l: 8, pts: 8 },
    { pos: 11, team: 'Santa Rita de Cássia', p: 12, w: 2, d: 1, l: 9, pts: 7 },
    { pos: 12, team: 'Cuando Cubango FC', p: 12, w: 1, d: 3, l: 8, pts: 6 },
    { pos: 13, team: 'Desportivo da Lunda Sul', p: 12, w: 1, d: 2, l: 9, pts: 5 },
    { pos: 14, team: 'Isaac de Benguela', p: 12, w: 1, d: 1, l: 10, pts: 4 },
    { pos: 15, team: 'ASK Dragão', p: 12, w: 1, d: 0, l: 11, pts: 3 },
    { pos: 16, team: 'Sporting de Benguela', p: 12, w: 0, d: 1, l: 11, pts: 1 },
  ],
  'Premier League': [
    { pos: 1, team: 'Arsenal', p: 34, w: 26, d: 4, l: 4, pts: 82 },
    { pos: 2, team: 'Man City', p: 34, w: 25, d: 6, l: 3, pts: 81 },
    { pos: 3, team: 'Liverpool', p: 34, w: 24, d: 6, l: 4, pts: 78 },
    { pos: 4, team: 'Aston Villa', p: 34, w: 21, d: 4, l: 9, pts: 67 },
    { pos: 5, team: 'Tottenham', p: 34, w: 19, d: 6, l: 9, pts: 63 },
    { pos: 6, team: 'Newcastle', p: 34, w: 18, d: 5, l: 11, pts: 59 },
    { pos: 7, team: 'Man Utd', p: 34, w: 17, d: 6, l: 11, pts: 57 },
    { pos: 8, team: 'Chelsea', p: 34, w: 16, d: 6, l: 12, pts: 54 },
    { pos: 9, team: 'West Ham', p: 34, w: 15, d: 6, l: 13, pts: 51 },
    { pos: 10, team: 'Brighton', p: 34, w: 13, d: 9, l: 12, pts: 48 },
    { pos: 11, team: 'Wolverhampton', p: 34, w: 13, d: 6, l: 15, pts: 45 },
    { pos: 12, team: 'Bournemouth', p: 34, w: 12, d: 6, l: 16, pts: 42 },
    { pos: 13, team: 'Fulham', p: 34, w: 11, d: 8, l: 15, pts: 41 },
    { pos: 14, team: 'Crystal Palace', p: 34, w: 11, d: 6, l: 17, pts: 39 },
    { pos: 15, team: 'Everton', p: 34, w: 9, d: 9, l: 16, pts: 36 },
    { pos: 16, team: 'Brentford', p: 34, w: 9, d: 8, l: 17, pts: 35 },
    { pos: 17, team: 'Nottingham Forest', p: 34, w: 8, d: 8, l: 18, pts: 32 },
    { pos: 18, team: 'Luton Town', p: 34, w: 7, d: 7, l: 20, pts: 28 },
    { pos: 19, team: 'Burnley', p: 34, w: 6, d: 7, l: 21, pts: 25 },
    { pos: 20, team: 'Sheffield Utd', p: 34, w: 5, d: 6, l: 23, pts: 21 },
  ],
  'La Liga': [
    { pos: 1, team: 'Real Madrid', p: 33, w: 26, d: 6, l: 1, pts: 84 },
    { pos: 2, team: 'Barcelona', p: 33, w: 22, d: 7, l: 4, pts: 73 },
    { pos: 3, team: 'Girona', p: 33, w: 22, d: 5, l: 6, pts: 71 },
    { pos: 4, team: 'Atlético Madrid', p: 33, w: 20, d: 4, l: 9, pts: 64 },
    { pos: 5, team: 'Athletic Club', p: 33, w: 16, d: 10, l: 7, pts: 58 },
    { pos: 6, team: 'Real Sociedad', p: 33, w: 13, d: 12, l: 8, pts: 51 },
    { pos: 7, team: 'Real Betis', p: 33, w: 12, d: 13, l: 8, pts: 49 },
    { pos: 8, team: 'Valencia', p: 33, w: 13, d: 8, l: 12, pts: 47 },
    { pos: 9, team: 'Villarreal', p: 33, w: 12, d: 9, l: 12, pts: 45 },
    { pos: 10, team: 'Getafe', p: 33, w: 10, d: 13, l: 10, pts: 43 },
    { pos: 11, team: 'Osasuna', p: 33, w: 12, d: 5, l: 16, pts: 41 },
    { pos: 12, team: 'Sevilha', p: 33, w: 10, d: 9, l: 14, pts: 39 },
    { pos: 13, team: 'Alavés', p: 33, w: 10, d: 7, l: 16, pts: 37 },
    { pos: 14, team: 'Las Palmas', p: 33, w: 10, d: 5, l: 18, pts: 35 },
    { pos: 15, team: 'Rayo Vallecano', p: 33, w: 7, d: 12, l: 14, pts: 33 },
    { pos: 16, team: 'Celta de Vigo', p: 33, w: 7, d: 10, l: 16, pts: 31 },
    { pos: 17, team: 'Mallorca', p: 33, w: 6, d: 11, l: 16, pts: 29 },
    { pos: 18, team: 'Cádiz', p: 33, w: 4, d: 14, l: 15, pts: 26 },
    { pos: 19, team: 'Granada', p: 33, w: 4, d: 10, l: 19, pts: 22 },
    { pos: 20, team: 'Almeria', p: 33, w: 3, d: 9, l: 21, pts: 18 },
  ],
  'Bundesliga': [
    { pos: 1, team: 'Bayer Leverkusen', p: 31, w: 25, d: 6, l: 0, pts: 81 },
    { pos: 2, team: 'Bayern Munchen', p: 31, w: 22, d: 3, l: 6, pts: 69 },
    { pos: 3, team: 'Stuttgart', p: 31, w: 20, d: 4, l: 7, pts: 64 },
    { pos: 4, team: 'RB Leipzig', p: 31, w: 19, d: 5, l: 7, pts: 62 },
    { pos: 5, team: 'B. Dortmund', p: 31, w: 16, d: 9, l: 6, pts: 57 },
    { pos: 6, team: 'Eintracht Frankfurt', p: 31, w: 11, d: 12, l: 8, pts: 45 },
    { pos: 7, team: 'Freiburg', p: 31, w: 11, d: 7, l: 13, pts: 40 },
    { pos: 8, team: 'Hoffenheim', p: 31, w: 11, d: 6, l: 14, pts: 39 },
    { pos: 9, team: 'Augsburg', p: 31, w: 10, d: 9, l: 12, pts: 37 },
    { pos: 10, team: 'Werder Bremen', p: 31, w: 10, d: 6, l: 15, pts: 36 },
    { pos: 11, team: 'Heidenheim', p: 31, w: 8, d: 10, l: 13, pts: 34 },
    { pos: 12, team: 'Wolfsburg', p: 31, w: 9, d: 5, l: 17, pts: 32 },
    { pos: 13, team: 'Mönchengladbach', p: 31, w: 7, d: 11, l: 13, pts: 30 },
    { pos: 14, team: 'Bochum', p: 31, w: 6, d: 10, l: 15, pts: 28 },
    { pos: 15, team: 'Union Berlin', p: 31, w: 8, d: 3, l: 20, pts: 27 },
    { pos: 16, team: 'Mainz 05', p: 31, w: 4, d: 13, l: 14, pts: 25 },
    { pos: 17, team: 'FC Köln', p: 31, w: 4, d: 10, l: 17, pts: 22 },
    { pos: 18, team: 'Darmstadt 98', p: 31, w: 3, d: 8, l: 20, pts: 17 },
  ],
  'Serie A': [
    { pos: 1, team: 'Inter Milan', p: 33, w: 27, d: 5, l: 1, pts: 86 },
    { pos: 2, team: 'Milan', p: 33, w: 21, d: 6, l: 6, pts: 69 },
    { pos: 3, team: 'Juventus', p: 33, w: 18, d: 10, l: 5, pts: 64 },
    { pos: 4, team: 'Bologna', p: 33, w: 17, d: 11, l: 5, pts: 62 },
    { pos: 5, team: 'Roma', p: 33, w: 17, d: 7, l: 9, pts: 58 },
    { pos: 6, team: 'Atalanta', p: 33, w: 16, d: 6, l: 11, pts: 54 },
    { pos: 7, team: 'Lazio', p: 33, w: 16, d: 4, l: 13, pts: 52 },
    { pos: 8, team: 'Napoli', p: 33, w: 13, d: 11, l: 9, pts: 50 },
    { pos: 9, team: 'Fiorentina', p: 33, w: 14, d: 6, l: 13, pts: 48 },
    { pos: 10, team: 'Torino', p: 33, w: 11, d: 13, l: 9, pts: 46 },
    { pos: 11, team: 'Monza', p: 33, w: 11, d: 11, l: 11, pts: 44 },
    { pos: 12, team: 'Genoa', p: 33, w: 10, d: 12, l: 11, pts: 42 },
    { pos: 13, team: 'Lecce', p: 33, w: 9, d: 13, l: 11, pts: 40 },
    { pos: 14, team: 'Cagliari', p: 33, w: 9, d: 11, l: 13, pts: 38 },
    { pos: 15, team: 'Verona', p: 33, w: 8, d: 12, l: 13, pts: 36 },
    { pos: 16, team: 'Udinese', p: 33, w: 7, d: 13, l: 13, pts: 34 },
    { pos: 17, team: 'Frosinone', p: 33, w: 8, d: 8, l: 17, pts: 32 },
    { pos: 18, team: 'Empoli', p: 33, w: 8, d: 6, l: 19, pts: 30 },
    { pos: 19, team: 'Sassuolo', p: 33, w: 7, d: 7, l: 19, pts: 28 },
    { pos: 20, team: 'Salernitana', p: 33, w: 5, d: 9, l: 19, pts: 24 },
  ],
  'Série A': [
    { pos: 1, team: 'Inter Milan', p: 33, w: 27, d: 5, l: 1, pts: 86 },
    { pos: 2, team: 'Milan', p: 33, w: 21, d: 6, l: 6, pts: 69 },
    { pos: 3, team: 'Juventus', p: 33, w: 18, d: 10, l: 5, pts: 64 },
    { pos: 4, team: 'Bologna', p: 33, w: 17, d: 11, l: 5, pts: 62 },
    { pos: 5, team: 'Roma', p: 33, w: 17, d: 7, l: 9, pts: 58 },
    { pos: 6, team: 'Atalanta', p: 33, w: 16, d: 6, l: 11, pts: 54 },
    { pos: 7, team: 'Lazio', p: 33, w: 16, d: 4, l: 13, pts: 52 },
    { pos: 8, team: 'Napoli', p: 33, w: 13, d: 11, l: 9, pts: 50 },
    { pos: 9, team: 'Fiorentina', p: 33, w: 14, d: 6, l: 13, pts: 48 },
    { pos: 10, team: 'Torino', p: 33, w: 11, d: 13, l: 9, pts: 46 },
    { pos: 11, team: 'Monza', p: 33, w: 11, d: 11, l: 11, pts: 44 },
    { pos: 12, team: 'Genoa', p: 33, w: 10, d: 12, l: 11, pts: 42 },
    { pos: 13, team: 'Lecce', p: 33, w: 9, d: 13, l: 11, pts: 40 },
    { pos: 14, team: 'Cagliari', p: 33, w: 9, d: 11, l: 13, pts: 38 },
    { pos: 15, team: 'Verona', p: 33, w: 8, d: 12, l: 13, pts: 36 },
    { pos: 16, team: 'Udinese', p: 33, w: 7, d: 13, l: 13, pts: 34 },
    { pos: 17, team: 'Frosinone', p: 33, w: 8, d: 8, l: 17, pts: 32 },
    { pos: 18, team: 'Empoli', p: 33, w: 8, d: 6, l: 19, pts: 30 },
    { pos: 19, team: 'Sassuolo', p: 33, w: 7, d: 7, l: 19, pts: 28 },
    { pos: 20, team: 'Salernitana', p: 33, w: 5, d: 9, l: 19, pts: 24 },
  ],
  'Ligue 1': [
    { pos: 1, team: 'PSG', p: 31, w: 20, d: 10, l: 1, pts: 70 },
    { pos: 2, team: 'Monaco', p: 31, w: 17, d: 7, l: 7, pts: 58 },
    { pos: 3, team: 'Brest', p: 31, w: 16, d: 8, l: 7, pts: 56 },
    { pos: 4, team: 'Lille', p: 31, w: 15, d: 10, l: 6, pts: 55 },
    { pos: 5, team: 'Nice', p: 31, w: 14, d: 9, l: 8, pts: 51 },
    { pos: 6, team: 'Lens', p: 31, w: 13, d: 7, l: 11, pts: 46 },
    { pos: 7, team: 'Lyon', p: 31, w: 13, d: 5, l: 13, pts: 44 },
    { pos: 8, team: 'Marseille', p: 31, w: 11, d: 11, l: 9, pts: 44 },
    { pos: 9, team: 'Reims', p: 31, w: 12, d: 6, l: 13, pts: 42 },
    { pos: 10, team: 'Rennes', p: 31, w: 10, d: 10, l: 11, pts: 40 },
    { pos: 11, team: 'Toulouse', p: 31, w: 10, d: 8, l: 13, pts: 38 },
    { pos: 12, team: 'Montpellier', p: 31, w: 9, d: 10, l: 12, pts: 36 },
    { pos: 13, team: 'Nantes', p: 31, w: 9, d: 7, l: 15, pts: 34 },
    { pos: 14, team: 'Strasbourg', p: 31, w: 8, d: 8, l: 15, pts: 32 },
    { pos: 15, team: 'Le Havre', p: 31, w: 7, d: 9, l: 15, pts: 30 },
    { pos: 16, team: 'Metz', p: 31, w: 7, d: 7, l: 17, pts: 28 },
    { pos: 17, team: 'Lorient', p: 31, w: 6, d: 8, l: 17, pts: 26 },
    { pos: 18, team: 'Clermont', p: 31, w: 5, d: 7, l: 19, pts: 22 },
  ],
  'Eredivisie': [
    { pos: 1, team: 'PSV Eindhoven', p: 31, w: 27, d: 3, l: 1, pts: 84 },
    { pos: 2, team: 'Feyenoord', p: 31, w: 23, d: 6, l: 2, pts: 75 },
    { pos: 3, team: 'Twente', p: 31, w: 19, d: 6, l: 6, pts: 63 },
    { pos: 4, team: 'AZ Alkmaar', p: 31, w: 17, d: 7, l: 7, pts: 58 },
    { pos: 5, team: 'Ajax', p: 31, w: 13, d: 10, l: 8, pts: 49 },
    { pos: 6, team: 'NEC Nijmegen', p: 31, w: 13, d: 8, l: 10, pts: 47 },
    { pos: 7, team: 'Utrecht', p: 31, w: 12, d: 10, l: 9, pts: 46 },
    { pos: 8, team: 'Go Ahead Eagles', p: 31, w: 11, d: 9, l: 11, pts: 42 },
    { pos: 9, team: 'Sparta Rotterdam', p: 31, w: 11, d: 7, l: 13, pts: 40 },
    { pos: 10, team: 'Heerenveen', p: 31, w: 10, d: 8, l: 13, pts: 38 },
    { pos: 11, team: 'Fortuna Sittard', p: 31, w: 9, d: 9, l: 13, pts: 36 },
    { pos: 12, team: 'Almere City', p: 31, w: 8, d: 10, l: 13, pts: 34 },
    { pos: 13, team: 'Heracles', p: 31, w: 9, d: 5, l: 17, pts: 32 },
    { pos: 14, team: 'PEC Zwolle', p: 31, w: 8, d: 6, l: 17, pts: 30 },
    { pos: 15, team: 'RKC Waalwijk', p: 31, w: 7, d: 7, l: 17, pts: 28 },
    { pos: 16, team: 'Excelsior', p: 31, w: 6, d: 8, l: 17, pts: 26 },
    { pos: 17, team: 'Volendam', p: 31, w: 5, d: 7, l: 19, pts: 22 },
    { pos: 18, team: 'Vitesse', p: 31, w: 5, d: 3, l: 19, pts: 18 },
  ],
  'Liga NOS': [
    { pos: 1, team: 'Sporting CP', p: 31, w: 26, d: 3, l: 2, pts: 81 },
    { pos: 2, team: 'Benfica', p: 31, w: 24, d: 4, l: 3, pts: 76 },
    { pos: 3, team: 'FC Porto', p: 31, w: 19, d: 6, l: 6, pts: 63 },
    { pos: 4, team: 'Braga', p: 31, w: 19, d: 5, l: 7, pts: 62 },
    { pos: 5, team: 'Vitória SC', p: 31, w: 18, d: 6, l: 7, pts: 60 },
    { pos: 6, team: 'Moreirense', p: 31, w: 13, d: 7, l: 11, pts: 46 },
    { pos: 7, team: 'Arouca', p: 31, w: 14, d: 3, l: 14, pts: 45 },
    { pos: 8, team: 'Famalicão', p: 31, w: 8, d: 12, l: 11, pts: 36 },
    { pos: 9, team: 'Casa Pia', p: 31, w: 9, d: 8, l: 14, pts: 35 },
    { pos: 10, team: 'Farense', p: 31, w: 9, d: 7, l: 15, pts: 34 },
    { pos: 11, team: 'Rio Ave', p: 31, w: 6, d: 15, l: 10, pts: 33 },
    { pos: 12, team: 'Gil Vicente', p: 31, w: 8, d: 8, l: 15, pts: 32 },
    { pos: 13, team: 'Estoril', p: 31, w: 8, d: 7, l: 16, pts: 31 },
    { pos: 14, team: 'Boavista', p: 31, w: 7, d: 9, l: 15, pts: 30 },
    { pos: 15, team: 'Portimonense', p: 31, w: 7, d: 7, l: 17, pts: 28 },
    { pos: 16, team: 'Chaves', p: 31, w: 6, d: 7, l: 18, pts: 25 },
    { pos: 17, team: 'Vizela', p: 31, w: 4, d: 10, l: 17, pts: 22 },
    { pos: 18, team: 'Paços de Ferreira', p: 31, w: 5, d: 5, l: 21, pts: 20 },
  ],
  'NBA': [
    { pos: 1, team: 'Celtics', p: 36, w: 28, d: 0, l: 8, pts: 64 },
    { pos: 2, team: 'Lakers', p: 36, w: 24, d: 0, l: 12, pts: 60 },
    { pos: 3, team: 'Warriors', p: 36, w: 22, d: 0, l: 14, pts: 58 },
    { pos: 4, team: 'Hornets', p: 37, w: 19, d: 0, l: 18, pts: 56 },
    { pos: 5, team: 'Kings', p: 38, w: 15, d: 0, l: 23, pts: 53 },
    { pos: 6, team: 'Nets', p: 36, w: 11, d: 0, l: 25, pts: 47 },
  ],
  'Unitel Basket': [
    { pos: 1, team: 'Petro de Luanda', p: 15, w: 14, d: 0, l: 1, pts: 29 },
    { pos: 2, team: '1º de Agosto', p: 15, w: 13, d: 0, l: 2, pts: 28 },
    { pos: 3, team: 'Interclube', p: 15, w: 12, d: 0, l: 3, pts: 27 },
    { pos: 4, team: 'Vila Clotilde', p: 15, w: 10, d: 0, l: 5, pts: 25 },
    { pos: 5, team: 'ASA', p: 15, w: 9, d: 0, l: 6, pts: 24 },
    { pos: 6, team: 'Jesus Cristo Basket', p: 15, w: 7, d: 0, l: 8, pts: 22 },
  ],
  'Liga ACB': [
    { pos: 1, team: 'Real Madrid', p: 30, w: 25, d: 0, l: 5, pts: 55 },
    { pos: 2, team: 'Unicaja', p: 30, w: 24, d: 0, l: 6, pts: 54 },
    { pos: 3, team: 'Barcelona', p: 30, w: 21, d: 0, l: 9, pts: 51 },
    { pos: 4, team: 'Tenerife', p: 30, w: 19, d: 0, l: 11, pts: 49 },
    { pos: 5, team: 'Gran Canaria', p: 30, w: 18, d: 0, l: 12, pts: 48 },
    { pos: 6, team: 'Valencia', p: 30, w: 18, d: 0, l: 12, pts: 48 },
  ],
  'VTB United League': [
    { pos: 1, team: 'CSKA Moscow', p: 26, w: 22, d: 0, l: 4, pts: 48 },
    { pos: 2, team: 'UNICS Kazan', p: 26, w: 20, d: 0, l: 6, pts: 46 },
    { pos: 3, team: 'Zenit', p: 26, w: 17, d: 0, l: 9, pts: 43 },
    { pos: 4, team: 'Lokomotiv Kuban', p: 26, w: 16, d: 0, l: 10, pts: 42 },
    { pos: 5, team: 'Enisey', p: 26, w: 13, d: 0, l: 13, pts: 39 },
    { pos: 6, team: 'Parma', p: 26, w: 12, d: 0, l: 14, pts: 38 },
  ],
  'Basket League': [
    { pos: 1, team: 'Panathinaikos', p: 22, w: 21, d: 0, l: 1, pts: 43 },
    { pos: 2, team: 'Olympiacos', p: 22, w: 20, d: 0, l: 2, pts: 42 },
    { pos: 3, team: 'Peristeri', p: 22, w: 15, d: 0, l: 7, pts: 37 },
    { pos: 4, team: 'Promitheas', p: 22, w: 13, d: 0, l: 9, pts: 35 },
    { pos: 5, team: 'Aris', p: 22, w: 12, d: 0, l: 10, pts: 34 },
    { pos: 6, team: 'AEK', p: 22, w: 9, d: 0, l: 13, pts: 31 },
  ],
  'Serie A Basket': [
    { pos: 1, team: 'Brescia', p: 25, w: 18, d: 0, l: 7, pts: 36 },
    { pos: 2, team: 'Virtus Bologna', p: 25, w: 17, d: 0, l: 8, pts: 34 },
    { pos: 3, team: 'Olimpia Milano', p: 25, w: 17, d: 0, l: 8, pts: 34 },
    { pos: 4, team: 'Venezia', p: 25, w: 16, d: 0, l: 9, pts: 32 },
    { pos: 5, team: 'Reggiana', p: 25, w: 14, d: 0, l: 11, pts: 28 },
    { pos: 6, team: 'Napoli', p: 25, w: 13, d: 0, l: 12, pts: 26 },
  ],
  'Jeep Elite': [
    { pos: 1, team: 'Monaco', p: 28, w: 25, d: 0, l: 3, pts: 53 },
    { pos: 2, team: 'Paris Basket', p: 28, w: 21, d: 0, l: 7, pts: 49 },
    { pos: 3, team: 'ASVEL', p: 28, w: 20, d: 0, l: 8, pts: 48 },
    { pos: 4, team: 'JL Bourg', p: 28, w: 19, d: 0, l: 9, pts: 47 },
    { pos: 5, team: 'Nanterre 92', p: 28, w: 17, d: 0, l: 11, pts: 45 },
    { pos: 6, team: 'Cholet', p: 28, w: 15, d: 0, l: 13, pts: 43 },
  ],
  'BBL Alemanha': [
    { pos: 1, team: 'Bayern München', p: 27, w: 23, d: 0, l: 4, pts: 46 },
    { pos: 2, team: 'ALBA Berlin', p: 27, w: 21, d: 0, l: 6, pts: 42 },
    { pos: 3, team: 'Chemnitz 99', p: 27, w: 19, d: 0, l: 8, pts: 38 },
    { pos: 4, team: 'ratiopharm Ulm', p: 27, w: 17, d: 0, l: 10, pts: 34 },
    { pos: 5, team: 'Ludwigsburg', p: 27, w: 16, d: 0, l: 11, pts: 32 },
    { pos: 6, team: 'Bonn', p: 27, w: 16, d: 0, l: 11, pts: 32 },
  ],
  'Copa do Mundo - Grupo A': [
    { pos: 1, team: 'México', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 2, team: 'Coreia do Sul', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 3, team: 'República Checa', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 4, team: 'África do Sul', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ],
  'Copa do Mundo - Grupo B': [
    { pos: 1, team: 'Suíça', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 2, team: 'Canadá', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 3, team: 'Bósnia', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 4, team: 'Catar', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ],
  'Copa do Mundo - Grupo C': [
    { pos: 1, team: 'Brasil', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 2, team: 'Marrocos', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 3, team: 'Escócia', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 4, team: 'Haiti', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ],
  'Copa do Mundo - Grupo D': [
    { pos: 1, team: 'Estados Unidos', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 2, team: 'Turquia', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 3, team: 'Austrália', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 4, team: 'Paraguai', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ],
  'Copa do Mundo - Grupo E': [
    { pos: 1, team: 'Alemanha', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 2, team: 'Costa do Marfim', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 3, team: 'Equador', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 4, team: 'Curaçao', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ],
  'Copa do Mundo - Grupo F': [
    { pos: 1, team: 'Holanda', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 2, team: 'Japão', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 3, team: 'Suécia', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 4, team: 'Tunísia', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ],
  'Copa do Mundo - Grupo G': [
    { pos: 1, team: 'Bélgica', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 2, team: 'Egito', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 3, team: 'Irão', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 4, team: 'Nova Zelândia', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ],
  'Copa do Mundo - Grupo H': [
    { pos: 1, team: 'Espanha', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 2, team: 'Uruguai', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 3, team: 'Arábia Saudita', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 4, team: 'Cabo Verde', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ],
  'Copa do Mundo - Grupo I': [
    { pos: 1, team: 'França', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 2, team: 'Noruega', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 3, team: 'Senegal', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 4, team: 'Iraque', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ],
  'Copa do Mundo - Grupo J': [
    { pos: 1, team: 'Argentina', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 2, team: 'Áustria', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 3, team: 'Jordânia', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 4, team: 'Argélia', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ],
  'Copa do Mundo - Grupo K': [
    { pos: 1, team: 'Portugal', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 2, team: 'Colômbia', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 3, team: 'Uzbequistão', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 4, team: 'Congo', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ],
  'Copa do Mundo - Grupo L': [
    { pos: 1, team: 'Inglaterra', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 2, team: 'Croácia', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 3, team: 'Gana', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { pos: 4, team: 'Panamá', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ],
};

export const GIRABOLA_CLUBS = [
  { name: 'Académica do Lobito', logo: 'https://i.postimg.cc/cHHjmmtP/Academica-do-Lobito.png' },
  { name: 'Baixa de Kassange', logo: 'https://i.postimg.cc/05655GXd/baixa-de-kassange.jpg' },
  { name: 'Bravos do Maquis', logo: 'https://i.postimg.cc/15w9wmQw/Bravos-Maquis.png' },
  { name: '1º de Agosto', logo: 'https://i.postimg.cc/Cx4Srcd8/CD-Primeiro-de-Agosto-(logo).png' },
  { name: 'CR Caála', logo: 'https://i.postimg.cc/XqF0f8TG/CR-Caala.png' },
  { name: 'Cuando Cubango FC', logo: 'https://i.postimg.cc/kXQmDTQV/Cuando-Cubango-FC-Logo.png' },
  { name: 'Desportivo da Huíla', logo: 'https://i.postimg.cc/t49H6FkM/Desportivo-da-Huila.png' },
  { name: 'Ferroviário do Huambo', logo: 'https://i.postimg.cc/HLxDZHft/Ferroviario-do-Huambo.jpg' },
  { name: 'Sagrada Esperança', logo: 'https://i.postimg.cc/FsgMh7vq/GD-Sagrada-Esperanca.png' },
  { name: 'Interclube', logo: 'https://i.postimg.cc/fR810pJr/Interclube.png' },
  { name: 'Progresso do Sambizanga', logo: 'https://i.postimg.cc/xd776mGM/PA-Sambizanga.png' },
  { name: 'Petro de Luanda', logo: 'https://i.postimg.cc/sxPNf0kv/Petro-Luanda.png' },
  { name: 'Santa Rita de Cássia', logo: 'https://i.postimg.cc/wTVGSZcB/Santa-Rita-de-Cassia-FC-Logo.jpg' },
  { name: 'Sporting de Cabinda', logo: 'https://i.postimg.cc/zG2Pfhcx/Sporting-de-Cabinda.png' },
  { name: 'Wiliete de Benguela', logo: 'https://i.postimg.cc/mDCdV52N/wiliete-esport-clube.png' }
];

export const GIRABOLA_MATCHES: Match[] = [
  {
    id: 101,
    league: "Girabola",
    teamA: GIRABOLA_CLUBS[11], // Petro Luanda
    teamB: GIRABOLA_CLUBS[3], // 1º de Agosto
    date: "14/05/2026",
    time: "16:00",
    odds: { winA: 2.10, draw: 3.10, winB: 3.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 102,
    league: "Girabola",
    teamA: GIRABOLA_CLUBS[8], // Sagrada Esperança
    teamB: GIRABOLA_CLUBS[9], // Interclube
    date: "14/05/2026",
    time: "16:00",
    odds: { winA: 1.95, draw: 3.20, winB: 3.80 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 103,
    league: "Girabola",
    teamA: GIRABOLA_CLUBS[14], // Wiliete
    teamB: GIRABOLA_CLUBS[0], // Académica do Lobito
    date: "15/05/2026",
    time: "15:30",
    odds: { winA: 1.80, draw: 3.40, winB: 4.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 104,
    league: "Girabola",
    teamA: GIRABOLA_CLUBS[2], // Bravos do Maquis
    teamB: GIRABOLA_CLUBS[6], // Desportivo da Huíla
    date: "15/05/2026",
    time: "15:30",
    odds: { winA: 2.20, draw: 3.00, winB: 3.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const BUNDESLIGA_CLUBS = [
  { name: 'Arminia Bielefeld', logo: 'https://i.postimg.cc/6pSJmFt9/ARMINIA-BIELEFELD.png' },
  { name: 'Augsburg', logo: 'https://i.postimg.cc/PJdBDjzw/AUGSBURG.png' },
  { name: 'Bayer Leverkusen', logo: 'https://i.postimg.cc/sgMb7K7y/BAYER-LEVERKUSEN.png' },
  { name: 'Bayern Munchen', logo: 'https://i.postimg.cc/hv45j0cL/Bayer-Munchen.png' },
  { name: 'Borussia Dortmund', logo: 'https://i.postimg.cc/rygHH7N9/BORUSSIA-DORTMUND.png' },
  { name: 'Borussia M.Gladbach', logo: 'https://i.postimg.cc/rFPPVWb1/BORUSSIA-M-GLADBACH.png' },
  { name: 'Eintracht Frankfurt', logo: 'https://i.postimg.cc/8cntCQyP/EINTRACHT-FRANKFURT.png' },
  { name: 'Freiburg', logo: 'https://i.postimg.cc/g0P4jKKM/FREIBURG.png' },
  { name: 'Hertha BSC', logo: 'https://i.postimg.cc/ydLTfCCR/HERTHA-BSC.png' },
  { name: 'Hoffenheim', logo: 'https://i.postimg.cc/DfYgLhgn/HOFFENHEIM.png' },
  { name: 'FC Köln', logo: 'https://i.postimg.cc/wv4hX5Dr/KOLN.png' },
  { name: 'RB Leipzig', logo: 'https://i.postimg.cc/h4wLhrDd/Leipzig.png' },
  { name: 'Mainz 05', logo: 'https://i.postimg.cc/MpJ1mpjx/MAINZ-05.png' },
  { name: 'Schalke 04', logo: 'https://i.postimg.cc/d0qdgNB9/SCHALKE-04.png' },
  { name: 'Stuttgart', logo: 'https://i.postimg.cc/1tdqnmQR/STUTTGART.png' },
  { name: 'Union Berlin', logo: 'https://i.postimg.cc/7b8J9KhB/UNION-BERLIN.png' },
  { name: 'Werder Bremen', logo: 'https://i.postimg.cc/BZdmRs1N/WERDER-BREMEN.png' },
  { name: 'Wolfsburg', logo: 'https://i.postimg.cc/qvGQt3Zd/Wolfs-Burg.png' }
];

export const BUNDESLIGA_MATCHES: Match[] = [
  {
    id: 201,
    league: "Bundesliga",
    teamA: BUNDESLIGA_CLUBS[3], // Bayern
    teamB: BUNDESLIGA_CLUBS[4], // Dortmund
    date: "16/05/2026",
    time: "17:30",
    odds: { winA: 1.75, draw: 3.90, winB: 4.10 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 202,
    league: "Bundesliga",
    teamA: BUNDESLIGA_CLUBS[11], // Leipzig
    teamB: BUNDESLIGA_CLUBS[2], // Leverkusen
    date: "16/05/2026",
    time: "14:30",
    odds: { winA: 2.10, draw: 3.40, winB: 3.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 203,
    league: "Bundesliga",
    teamA: BUNDESLIGA_CLUBS[6], // Frankfurt
    teamB: BUNDESLIGA_CLUBS[5], // Gladbach
    date: "17/05/2026",
    time: "16:30",
    odds: { winA: 2.00, draw: 3.30, winB: 3.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 204,
    league: "Bundesliga",
    teamA: BUNDESLIGA_CLUBS[17], // Wolfsburg
    teamB: BUNDESLIGA_CLUBS[16], // Werder Bremen
    date: "17/05/2026",
    time: "14:30",
    odds: { winA: 1.85, draw: 3.50, winB: 4.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const LALIGA_CLUBS = [
  { name: 'Athletic Club', logo: 'https://i.postimg.cc/Czyyzfv5/ATHLETIC-CLUB.png' },
  { name: 'Atlético Madrid', logo: 'https://i.postimg.cc/0bggbJtz/ATLETICO-MADRID.png' },
  { name: 'Barcelona', logo: 'https://i.postimg.cc/MvkkvjsM/BARCELONA.png' },
  { name: 'Cádiz', logo: 'https://i.postimg.cc/nC88CQdQ/CADIZ.png' },
  { name: 'Celta de Vigo', logo: 'https://i.postimg.cc/HVGGV7SJ/CELTA-DE-VIGO.png' },
  { name: 'Deportivo Alavés', logo: 'https://i.postimg.cc/zVmmVRdW/DEPORTIVO-ALAVES.png' },
  { name: 'Eibar', logo: 'https://i.postimg.cc/mtxxtFd7/EIBAR.png' },
  { name: 'Elche', logo: 'https://i.postimg.cc/jLVVLJ8H/ELCHE.png' },
  { name: 'Getafe', logo: 'https://i.postimg.cc/D8VV8bCQ/GETAFE.png' },
  { name: 'Granada', logo: 'https://i.postimg.cc/rK66KthN/GRANADA.png' },
  { name: 'Huesca', logo: 'https://i.postimg.cc/XpMMpy2g/HUESCA.png' },
  { name: 'Levante', logo: 'https://i.postimg.cc/dLGbdtXy/LEVANTE.png' },
  { name: 'Osasuna', logo: 'https://i.postimg.cc/yk0M9Y59/OSASUNA.png' },
  { name: 'Real Betis', logo: 'https://i.postimg.cc/JGjfJ4gj/REAL-BETIS.png' },
  { name: 'Real Madrid', logo: 'https://i.postimg.cc/6yCkR5Sd/REAL-MADRID.png' },
  { name: 'Real Sociedad', logo: 'https://i.postimg.cc/BX2rDQyC/REAL-SOCIEDAD.png' },
  { name: 'Real Valladolid', logo: 'https://i.postimg.cc/gn3CRk5N/REAL-VALLADOLID.png' },
  { name: 'Sevilha', logo: 'https://i.postimg.cc/BX2rDQyh/SEVILHA.png' },
  { name: 'Valencia', logo: 'https://i.postimg.cc/SJcB8N5T/VALENCIA.png' },
  { name: 'Villarreal', logo: 'https://i.postimg.cc/hfVkxPwZ/VILLARREAL.png' }
];

export const LALIGA_MATCHES: Match[] = [
  {
    id: 301,
    league: "La Liga",
    teamA: LALIGA_CLUBS[14], // Real Madrid
    teamB: LALIGA_CLUBS[2], // Barcelona
    date: "18/05/2026",
    time: "20:00",
    odds: { winA: 2.15, draw: 3.50, winB: 3.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 302,
    league: "La Liga",
    teamA: LALIGA_CLUBS[1], // Atletico Madrid
    teamB: LALIGA_CLUBS[17], // Sevilha
    date: "18/05/2026",
    time: "18:00",
    odds: { winA: 1.80, draw: 3.40, winB: 4.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 303,
    league: "La Liga",
    teamA: LALIGA_CLUBS[15], // Real Sociedad
    teamB: LALIGA_CLUBS[0], // Athletic Club
    date: "19/05/2026",
    time: "19:00",
    odds: { winA: 2.10, draw: 3.20, winB: 3.60 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 304,
    league: "La Liga",
    teamA: LALIGA_CLUBS[19], // Villarreal
    teamB: LALIGA_CLUBS[18], // Valencia
    date: "19/05/2026",
    time: "17:00",
    odds: { winA: 1.95, draw: 3.30, winB: 3.90 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const LIGUE1_CLUBS = [
  { name: 'Angers', logo: 'https://i.postimg.cc/Xrd94trv/ANGERS.png' },
  { name: 'Bordeaux', logo: 'https://i.postimg.cc/CRkbS9RZ/BORDEAUX.png' },
  { name: 'Brest', logo: 'https://i.postimg.cc/QF1chvF5/BREST.png' },
  { name: 'Dijon', logo: 'https://i.postimg.cc/Wdg0TxdG/DIJON.png' },
  { name: 'Lens', logo: 'https://i.postimg.cc/9DZyCsDw/LENS.png' },
  { name: 'Lille', logo: 'https://i.postimg.cc/JsZjMSsq/LILLE.png' },
  { name: 'Lorient', logo: 'https://i.postimg.cc/Ffv3RGSJ/LORIENT.png' },
  { name: 'Metz', logo: 'https://i.postimg.cc/1gSwtMFq/METZ.png' },
  { name: 'Monaco', logo: 'https://i.postimg.cc/B83H6NFD/MONACO.png' },
  { name: 'Montpellier', logo: 'https://i.postimg.cc/mc4CDV9Q/MONTPELLIER.png' },
  { name: 'Nantes', logo: 'https://i.postimg.cc/HJmXx3MX/NANTES.png' },
  { name: 'Nice', logo: 'https://i.postimg.cc/SX4CsV9f/NICE.png' },
  { name: 'Nimes', logo: 'https://i.postimg.cc/yJKcdnRP/NIMES.png' },
  { name: 'Lyon', logo: 'https://i.postimg.cc/QBD1tS7S/OLYMPIQUE-LYONNAIS.png' },
  { name: 'Marseille', logo: 'https://i.postimg.cc/wtzLvFN0/OLYMPIQUE-MARSEILLE.png' },
  { name: 'PSG', logo: 'https://i.postimg.cc/942ZM19L/PSG.png' },
  { name: 'Reims', logo: 'https://i.postimg.cc/mc4CDV9d/REIMS.png' },
  { name: 'Rennes', logo: 'https://i.postimg.cc/WDVg3SZW/RENNES.png' },
  { name: 'Saint-Étienne', logo: 'https://i.postimg.cc/KKbBzQTp/SAINT-ETIENNE.png' },
  { name: 'Strasbourg', logo: 'https://i.postimg.cc/xkQMCgmF/STRASBOURG.png' }
];

export const LIGUE1_MATCHES: Match[] = [
  {
    id: 401,
    league: "Ligue 1",
    teamA: LIGUE1_CLUBS[15], // PSG
    teamB: LIGUE1_CLUBS[13], // Lyon
    date: "20/05/2026",
    time: "20:00",
    odds: { winA: 1.45, draw: 4.50, winB: 6.00 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 402,
    league: "Ligue 1",
    teamA: LIGUE1_CLUBS[14], // Marseille
    teamB: LIGUE1_CLUBS[8], // Monaco
    date: "20/05/2026",
    time: "18:00",
    odds: { winA: 2.30, draw: 3.40, winB: 2.90 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 403,
    league: "Ligue 1",
    teamA: LIGUE1_CLUBS[5], // Lille
    teamB: LIGUE1_CLUBS[17], // Rennes
    date: "21/05/2026",
    time: "19:00",
    odds: { winA: 2.10, draw: 3.20, winB: 3.60 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 404,
    league: "Ligue 1",
    teamA: LIGUE1_CLUBS[11], // Nice
    teamB: LIGUE1_CLUBS[4], // Lens
    date: "21/05/2026",
    time: "17:00",
    odds: { winA: 2.20, draw: 3.10, winB: 3.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const EREDIVISIE_CLUBS = [
  { name: 'ADO Den Haag', logo: 'https://i.postimg.cc/xJhdkT7D/ADO.png' },
  { name: 'Ajax', logo: 'https://i.postimg.cc/N9S0yfVQ/AJAX.png' },
  { name: 'AZ Alkmaar', logo: 'https://i.postimg.cc/ftpb3TFT/AZ.png' },
  { name: 'Emmen', logo: 'https://i.postimg.cc/tZwg1Cfs/EMMEN.png' },
  { name: 'Feyenoord', logo: 'https://i.postimg.cc/cg2JK4j6/FEYENOORD.png' },
  { name: 'Fortuna Sittard', logo: 'https://i.postimg.cc/RJtZwx5C/FORTUNA.png' },
  { name: 'Groningen', logo: 'https://i.postimg.cc/wRNjDY8j/GRONINGEN.png' },
  { name: 'Heerenveen', logo: 'https://i.postimg.cc/q6Kv2HVq/HEERENVEEN.png' },
  { name: 'Heracles Almelo', logo: 'https://i.postimg.cc/7JzZSr85/HERACLES.png' },
  { name: 'PSV Eindhoven', logo: 'https://i.postimg.cc/q6Kv2HV6/PSV.png' },
  { name: 'Sparta Rotterdam', logo: 'https://i.postimg.cc/zHhGTYZR/SPARTA.png' },
  { name: 'Twente', logo: 'https://i.postimg.cc/p5jLKMbz/TWENTE.png' },
  { name: 'Utrecht', logo: 'https://i.postimg.cc/4HcxpRkz/UTRECHT.png' },
  { name: 'VVV-Venlo', logo: 'https://i.postimg.cc/y3R80C4X/VENLO.png' },
  { name: 'Vitesse', logo: 'https://i.postimg.cc/y3R80C4y/VITESSE.png' },
  { name: 'RKC Waalwijk', logo: 'https://i.postimg.cc/FkSH0X5p/WAALWIJK.png' },
  { name: 'Willem II', logo: 'https://i.postimg.cc/0KSy71Rc/WILLEM-II.png' },
  { name: 'PEC Zwolle', logo: 'https://i.postimg.cc/zHhGTYZx/ZWOLLE.png' }
];

export const EREDIVISIE_MATCHES: Match[] = [
  {
    id: 501,
    league: "Eredivisie",
    teamA: EREDIVISIE_CLUBS[1], // Ajax
    teamB: EREDIVISIE_CLUBS[9], // PSV
    date: "22/05/2026",
    time: "20:00",
    odds: { winA: 1.90, draw: 3.60, winB: 3.80 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 502,
    league: "Eredivisie",
    teamA: EREDIVISIE_CLUBS[4], // Feyenoord
    teamB: EREDIVISIE_CLUBS[2], // AZ
    date: "22/05/2026",
    time: "18:30",
    odds: { winA: 2.10, draw: 3.40, winB: 3.30 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 503,
    league: "Eredivisie",
    teamA: EREDIVISIE_CLUBS[11], // Twente
    teamB: EREDIVISIE_CLUBS[12], // Utrecht
    date: "23/05/2026",
    time: "19:00",
    odds: { winA: 2.20, draw: 3.20, winB: 3.10 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 504,
    league: "Eredivisie",
    teamA: EREDIVISIE_CLUBS[14], // Vitesse
    teamB: EREDIVISIE_CLUBS[7], // Heerenveen
    date: "23/05/2026",
    time: "17:00",
    odds: { winA: 2.05, draw: 3.30, winB: 3.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const PREMIERLEAGUE_CLUBS = [
  { name: 'Arsenal', logo: 'https://i.postimg.cc/sG4bkT5P/ARSENAL.png' },
  { name: 'Aston Villa', logo: 'https://i.postimg.cc/gLH1Cgv9/ASTON-VILLA.png' },
  { name: 'Brighton', logo: 'https://i.postimg.cc/dZjgb5G9/BRIGHTON-HOVE-ALBION.png' },
  { name: 'Burnley', logo: 'https://i.postimg.cc/y3y2ML05/BURNLEY.png' },
  { name: 'Chelsea', logo: 'https://i.postimg.cc/0K0hTV7W/CHELSEA.png' },
  { name: 'Crystal Palace', logo: 'https://i.postimg.cc/RJL2kgc9/CRYSTAL-PALACE.png' },
  { name: 'Everton', logo: 'https://i.postimg.cc/ctBPpFQd/EVERTON.png' },
  { name: 'Fulham', logo: 'https://i.postimg.cc/WqwxB5M2/FULHAM.png' },
  { name: 'Leeds United', logo: 'https://i.postimg.cc/5QSDhsw9/LEEDS-UNITED.png' },
  { name: 'Leicester City', logo: 'https://i.postimg.cc/gry9L21X/LEICESTER-CITY.png' },
  { name: 'Liverpool', logo: 'https://i.postimg.cc/0rGgKyhK/LIVERPOOL.png' },
  { name: 'Manchester City', logo: 'https://i.postimg.cc/V59y0k2b/MANCHESTER-CITY.png' },
  { name: 'Manchester United', logo: 'https://i.postimg.cc/Thj853Bb/MANCHESTER-UNITED.png' },
  { name: 'Newcastle United', logo: 'https://i.postimg.cc/6TVs4pFR/NEWCASTLE-UNITED.png' },
  { name: 'Sheffield United', logo: 'https://i.postimg.cc/Thj853Bg/SHEFFIELD-UNITED.png' },
  { name: 'Southampton', logo: 'https://i.postimg.cc/NL8h2jZ8/SOUTHAMPTON.png' },
  { name: 'Tottenham Hotspur', logo: 'https://i.postimg.cc/Jt3wHzSc/TOTTENHAM-HOTSPUR.png' },
  { name: 'West Bromwich', logo: 'https://i.postimg.cc/w35KRjnF/WEST-BROMWICH-ALBION.png' },
  { name: 'West Ham United', logo: 'https://i.postimg.cc/Thj853Bt/WEST-HAM-UNITED.png' },
  { name: 'Wolverhampton', logo: 'https://i.postimg.cc/Rq1rJZ2P/WOLVERHAMPTON-WANDERERS.png' }
];

export const PREMIERLEAGUE_MATCHES: Match[] = [
  {
    id: 601,
    league: "Premier League",
    teamA: PREMIERLEAGUE_CLUBS[12], // Man Utd
    teamB: PREMIERLEAGUE_CLUBS[10], // Liverpool
    date: "24/05/2026",
    time: "16:30",
    odds: { winA: 2.80, draw: 3.50, winB: 2.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 602,
    league: "Premier League",
    teamA: PREMIERLEAGUE_CLUBS[11], // Man City
    teamB: PREMIERLEAGUE_CLUBS[4], // Chelsea
    date: "24/05/2026",
    time: "19:00",
    odds: { winA: 1.65, draw: 4.20, winB: 5.10 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 603,
    league: "Premier League",
    teamA: PREMIERLEAGUE_CLUBS[0], // Arsenal
    teamB: PREMIERLEAGUE_CLUBS[16], // Tottenham
    date: "25/05/2026",
    time: "14:00",
    odds: { winA: 1.95, draw: 3.60, winB: 3.70 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 604,
    league: "Premier League",
    teamA: PREMIERLEAGUE_CLUBS[18], // West Ham
    teamB: PREMIERLEAGUE_CLUBS[13], // Newcastle
    date: "25/05/2026",
    time: "20:00",
    odds: { winA: 2.45, draw: 3.30, winB: 2.90 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const SERIEA_CLUBS = [
  { name: 'Atalanta', logo: 'https://i.postimg.cc/B85yLhVJ/ATALANTA.png' },
  { name: 'Benevento', logo: 'https://i.postimg.cc/qtcYhm5M/BENEVENTO.png' },
  { name: 'Bologna', logo: 'https://i.postimg.cc/Jy3gDT20/BOLOGNA.png' },
  { name: 'Cagliari', logo: 'https://i.postimg.cc/06G3MtBQ/CAGLIARI.png' },
  { name: 'Crotone', logo: 'https://i.postimg.cc/4KvM78Sn/CROTONE.png' },
  { name: 'Fiorentina', logo: 'https://i.postimg.cc/B85yLhVX/FIORENTINA.png' },
  { name: 'Genoa', logo: 'https://i.postimg.cc/xkG7Js4X/GENOA.png' },
  { name: 'Inter Milan', logo: 'https://i.postimg.cc/3yj64Lcy/INTERNAZIONALE.png' },
  { name: 'Juventus', logo: 'https://i.postimg.cc/HJ0KcSh8/JUVENTUS.png' },
  { name: 'Lazio', logo: 'https://i.postimg.cc/v17jgPN6/LAZIO.png' },
  { name: 'Milan', logo: 'https://i.postimg.cc/sBP8QnNW/MILAN.png' },
  { name: 'Napoli', logo: 'https://i.postimg.cc/p9Q7h06Q/NAPOLI.png' },
  { name: 'Parma', logo: 'https://i.postimg.cc/06G3MtBD/PARMA.png' },
  { name: 'Roma', logo: 'https://i.postimg.cc/ftwPxxGJ/ROMA.png' },
  { name: 'Sampdoria', logo: 'https://i.postimg.cc/ph2SDDwm/SAMPDORIA.png' },
  { name: 'Sassuolo', logo: 'https://i.postimg.cc/N9gn113y/SASSUOLO.png' },
  { name: 'Spezia', logo: 'https://i.postimg.cc/bDz5QQ7D/SPEZIA.png' },
  { name: 'Torino', logo: 'https://i.postimg.cc/S2yPWWBY/TORINO.png' },
  { name: 'Udinese', logo: 'https://i.postimg.cc/gXY7vvCh/UDINESE.png' },
  { name: 'Verona', logo: 'https://i.postimg.cc/cgszQQpY/VERONA.png' }
];

export const SERIEA_MATCHES: Match[] = [
  {
    id: 701,
    league: "Série A",
    teamA: SERIEA_CLUBS[8], // Juventus
    teamB: SERIEA_CLUBS[7], // Inter
    date: "26/05/2026",
    time: "19:45",
    odds: { winA: 2.40, draw: 3.20, winB: 3.00 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 702,
    league: "Série A",
    teamA: SERIEA_CLUBS[10], // Milan
    teamB: SERIEA_CLUBS[11], // Napoli
    date: "26/05/2026",
    time: "17:00",
    odds: { winA: 2.10, draw: 3.40, winB: 3.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 703,
    league: "Série A",
    teamA: SERIEA_CLUBS[13], // Roma
    teamB: SERIEA_CLUBS[9], // Lazio
    date: "27/05/2026",
    time: "19:45",
    odds: { winA: 2.25, draw: 3.15, winB: 3.30 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 704,
    league: "Série A",
    teamA: SERIEA_CLUBS[0], // Atalanta
    teamB: SERIEA_CLUBS[5], // Fiorentina
    date: "27/05/2026",
    time: "14:00",
    odds: { winA: 1.85, draw: 3.50, winB: 4.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const LIGANOS_CLUBS = [
  { name: 'Belenenses', logo: 'https://i.postimg.cc/Mcs7FVcC/BELENENSES.png' },
  { name: 'Benfica', logo: 'https://i.postimg.cc/9Rrd50Tg/BENFICA.png' },
  { name: 'Boavista', logo: 'https://i.postimg.cc/njC4br7d/BOAVISTA.png' },
  { name: 'Braga', logo: 'https://i.postimg.cc/k6BQ3G8z/BRAGA.png' },
  { name: 'Famalicão', logo: 'https://i.postimg.cc/wy7X8MJG/FAMALICAO.png' },
  { name: 'Farense', logo: 'https://i.postimg.cc/sQvYdxSb/FARENSE.png' },
  { name: 'FC Porto', logo: 'https://i.postimg.cc/r0K1XsWB/FC-PORTO.png' },
  { name: 'Gil Vicente', logo: 'https://i.postimg.cc/9Rrd50Z3/GIL-VICENTE.png' },
  { name: 'Marítimo', logo: 'https://i.postimg.cc/S2J6FRCh/MARITIMO.png' },
  { name: 'Moreirense', logo: 'https://i.postimg.cc/LYntK5LM/MOREIRENSE.png' },
  { name: 'Nacional', logo: 'https://i.postimg.cc/CBzGT5kS/NACIONAL.png' },
  { name: 'Paços de Ferreira', logo: 'https://i.postimg.cc/TLpVM1gT/PACOS-FERREIRA.png' },
  { name: 'Portimonense', logo: 'https://i.postimg.cc/YGh6K0Yr/PORTIMONENSE.png' },
  { name: 'Rio Ave', logo: 'https://i.postimg.cc/wy7X8MLT/RIO-AVE.png' },
  { name: 'Santa Clara', logo: 'https://i.postimg.cc/9Rrd50Zf/SANTA-CLARA.png' },
  { name: 'Sporting CP', logo: 'https://i.postimg.cc/47m6kyVd/SPORTING.png' },
  { name: 'Tondela', logo: 'https://i.postimg.cc/PpPWsJYJ/TONDELA.png' },
  { name: 'Vitória SC', logo: 'https://i.postimg.cc/phpfbrzp/V-GUIMARAES.png' }
];

export const LIGANOS_MATCHES: Match[] = [
  {
    id: 801,
    league: "Liga NOS",
    teamA: LIGANOS_CLUBS[1], // Benfica
    teamB: LIGANOS_CLUBS[6], // Porto
    date: "28/05/2026",
    time: "20:30",
    odds: { winA: 2.15, draw: 3.30, winB: 3.10 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 802,
    league: "Liga NOS",
    teamA: LIGANOS_CLUBS[15], // Sporting
    teamB: LIGANOS_CLUBS[3], // Braga
    date: "28/05/2026",
    time: "18:00",
    odds: { winA: 1.95, draw: 3.40, winB: 3.80 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 803,
    league: "Liga NOS",
    teamA: LIGANOS_CLUBS[17], // Vitoria
    teamB: LIGANOS_CLUBS[2], // Boavista
    date: "29/05/2026",
    time: "19:00",
    odds: { winA: 1.85, draw: 3.50, winB: 4.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 804,
    league: "Liga NOS",
    teamA: LIGANOS_CLUBS[13], // Rio Ave
    teamB: LIGANOS_CLUBS[4], // Famalicao
    date: "29/05/2026",
    time: "17:00",
    odds: { winA: 2.20, draw: 3.10, winB: 3.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const TACADEANGOLA_MATCHES: Match[] = [
  {
    id: 901,
    league: "Taça de Angola",
    teamA: GIRABOLA_CLUBS[3], // 1º de Agosto
    teamB: GIRABOLA_CLUBS[11], // Petro Luanda
    date: "30/05/2026",
    time: "16:00",
    odds: { winA: 2.50, draw: 3.10, winB: 2.80 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 902,
    league: "Taça de Angola",
    teamA: GIRABOLA_CLUBS[8], // Sagrada Esperança
    teamB: GIRABOLA_CLUBS[2], // Bravos do Maquis
    date: "30/05/2026",
    time: "15:00",
    odds: { winA: 1.90, draw: 3.20, winB: 4.10 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 903,
    league: "Taça de Angola",
    teamA: GIRABOLA_CLUBS[14], // Wiliete
    teamB: GIRABOLA_CLUBS[9], // Interclube
    date: "31/05/2026",
    time: "15:30",
    odds: { winA: 2.10, draw: 3.00, winB: 3.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 904,
    league: "Taça de Angola",
    teamA: GIRABOLA_CLUBS[0], // Académica do Lobito
    teamB: GIRABOLA_CLUBS[6], // Desportivo da Huíla
    date: "31/05/2026",
    time: "15:30",
    odds: { winA: 2.30, draw: 3.10, winB: 3.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const TACADAALEMANHA_MATCHES: Match[] = [
  {
    id: 1001,
    league: "DFB Pokal",
    teamA: BUNDESLIGA_CLUBS[3], // Bayern
    teamB: BUNDESLIGA_CLUBS[4], // Dortmund
    date: "01/06/2026",
    time: "20:00",
    odds: { winA: 1.85, draw: 3.70, winB: 3.90 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 1002,
    league: "DFB Pokal",
    teamA: BUNDESLIGA_CLUBS[11], // Leipzig
    teamB: BUNDESLIGA_CLUBS[6], // Frankfurt
    date: "01/06/2026",
    time: "18:00",
    odds: { winA: 2.10, draw: 3.40, winB: 3.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 1003,
    league: "DFB Pokal",
    teamA: BUNDESLIGA_CLUBS[2], // Leverkusen
    teamB: BUNDESLIGA_CLUBS[5], // Gladbach
    date: "02/06/2026",
    time: "19:00",
    odds: { winA: 1.70, draw: 4.10, winB: 4.80 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  },
  {
    id: 1004,
    league: "DFB Pokal",
    teamA: BUNDESLIGA_CLUBS[17], // Wolfsburg
    teamB: BUNDESLIGA_CLUBS[15], // Union Berlin
    date: "02/06/2026",
    time: "17:00",
    odds: { winA: 2.20, draw: 3.20, winB: 3.30 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0
  }
];

export const NBA_CLUBS = [
  { name: 'Kings', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c7/Sacramento_Kings_logo.svg', record: '15-23' },
  { name: 'Hornets', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29_logo.svg', record: '19-18' },
  { name: 'Lakers', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg', record: '24-12' },
  { name: 'Warriors', logo: 'https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg', record: '22-14' },
  { name: 'Celtics', logo: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg', record: '28-8' },
  { name: 'Nets', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg', record: '11-25' }
];

export const NBA_MATCHES: Match[] = [
  {
    id: 2001,
    league: "NBA",
    teamA: NBA_CLUBS[0], // Kings
    teamB: NBA_CLUBS[1], // Hornets
    date: "15/03/2026",
    time: "23:00",
    odds: { winA: 1.95, draw: 0, winB: 1.85 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'NBATV C+A'
  },
  {
    id: 2002,
    league: "NBA",
    teamA: NBA_CLUBS[2], // Lakers
    teamB: NBA_CLUBS[3], // Warriors
    date: "15/03/2026",
    time: "02:00",
    odds: { winA: 1.70, draw: 0, winB: 2.20 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'NBA TV'
  },
  {
    id: 2003,
    league: "NBA",
    teamA: NBA_CLUBS[4], // Celtics
    teamB: NBA_CLUBS[5], // Nets
    date: "16/03/2026",
    time: "01:30",
    odds: { winA: 1.25, draw: 0, winB: 4.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'ESPN'
  }
];

export const UNITEL_BASKET_CLUBS = [
  { name: 'Petro de Luanda', logo: 'https://i.postimg.cc/Cnntg6fx/PETRO-LUANDA-ANGOLA.png' },
  { name: '1º de Agosto', logo: 'https://i.postimg.cc/rRRbkYR7/1-AGOSTO-ANGOLA.png' },
  { name: 'GD Interclube', logo: 'https://i.postimg.cc/bSSMhF2j/GD-INTERCLUBE-ANGOLA.png' },
  { name: 'ASA (Aviação)', logo: 'https://i.postimg.cc/8ff3Snf2/AS-Aviacao-ANGOLA.png' },
  { name: 'Vila Clotilde', logo: 'https://i.postimg.cc/gLL5WB6x/VILA-CLOLTIDE-ANGOLA.png' },
  { name: 'Petro de Luanda B', logo: 'https://i.postimg.cc/SYY5htzs/PETRO-LUANDA-B-ANGOLA.png' },
  { name: '1º de Agosto Acad.', logo: 'https://i.postimg.cc/mz5qKGhs/1-AGOSTO-ACAD-ANGOLA.png' },
  { name: 'Desportivo do Kwanza', logo: 'https://i.postimg.cc/YLLVHymM/CF-Desportivo-Kwanza-ANGOLA.png' },
  { name: 'Jesus Cristo Basket', logo: 'https://i.postimg.cc/0KK3sHJ9/JESUS-CRISTO-ANGOLA.png' }
];

export const VTB_CLUBS = [
  { name: 'BK Himki', logo: 'https://i.postimg.cc/VdGxCnzc/BK-himki-RUSSIA.png' },
  { name: 'Enisey', logo: 'https://i.postimg.cc/kB10bK75/enisey-logo-RUSSIA.png' },
  { name: 'Nizhny Novgorod', logo: 'https://i.postimg.cc/CzP3qkwF/Nizhny-Novgorod-logo-RUSSIA.png' },
  { name: 'Parma Basket', logo: 'https://i.postimg.cc/SJTBMCmm/Parma-Basket-logo-RUSSIA.png' },
  { name: 'Lokomotiv Kuban', logo: 'https://i.postimg.cc/N5J3HmQj/PBC-Lokomotiv-Kuban-logo-RUSSIA.png' },
  { name: 'Tsmoki-Minsk', logo: 'https://i.postimg.cc/3kkPCNwQ/Tsmoki-Minsk-RUSSIA.png' },
  { name: 'Unics Kazan', logo: 'https://i.postimg.cc/WddQ6z4j/Unics-kazan-RUSSIA.png' },
  { name: 'Zenit St Petersburg', logo: 'https://i.postimg.cc/9DDvt0fC/Zenit-S-Petersburgo-RUSSIA.png' }
];

export const ITALY_BASKET_CLUBS = [
  { name: 'Dinamo Sassari', logo: 'https://i.postimg.cc/p956wSbb/Dinamo-Sassari-logo-ITALIA.png' },
  { name: 'Vanoli Cremona', logo: 'https://i.postimg.cc/5YcRbm1R/Guerino-Vanoli-Basket-ITALIA.png' },
  { name: 'Pallacanestro Cantù', logo: 'https://i.postimg.cc/xJr4nPYs/Logo-Pallacanestro-Cantu-ITALIA.png' },
  { name: 'Reggio Emilia', logo: 'https://i.postimg.cc/ZBkM4LZQ/Logo-Pallacanestro-Reggiana-ITALIA.png' },
  { name: 'Pallacanestro Trieste', logo: 'https://i.postimg.cc/vgRNbvMk/Logo-Pallacanestro-Trieste-ITALIA.png' },
  { name: 'Brindisi', logo: 'https://i.postimg.cc/7GvWwNDj/New-Basket-Brindisi-logo-2017-ITALIA.png' },
  { name: 'Olimpia Milano', logo: 'https://i.postimg.cc/G805djrW/olimpia-milano-logo-ITALIA.png' },
  { name: 'Pallacanestro Varese', logo: 'https://i.postimg.cc/KkXHx5xS/Pallacanestro-Varese-logo-ITALIA.png' },
  { name: 'Virtus Roma', logo: 'https://i.postimg.cc/PpGRTMTG/Pallacanestro-Virtus-Roma-ITALIA.png' },
  { name: 'Fortitudo Bologna', logo: 'https://i.postimg.cc/BLWV4C40/sport-basket-fortitudo-bologna-logo-ITALIA.png' },
  { name: 'Reyer Venezia', logo: 'https://i.postimg.cc/S20vkGk4/SSP-Reyer-Venezia-ITALIA.png' },
  { name: 'Treviso Basket', logo: 'https://i.postimg.cc/R6rD4T44/Treviso-Basket-logo-ITALIA.png' },
  { name: 'Victoria Libertas', logo: 'https://i.postimg.cc/BLWV4C4J/Victoria-Libertas-ITALIA.png' }
];

export const JEEP_ELITE_CLUBS = [
  { name: 'AS Monaco', logo: 'https://i.postimg.cc/hh89GR9n/AS-Monaco-FRANCA.png' },
  { name: 'BCM Gravelines', logo: 'https://i.postimg.cc/tYXFZv5Q/BCM-Gravelines-Dunkerque-FRANCA.png' },
  { name: 'Boulazac Basket', logo: 'https://i.postimg.cc/KRZtkpNy/Boulazac-Basket-Dordogne-FRANCA.png' },
  { name: 'Cholet Basket', logo: 'https://i.postimg.cc/QVgpMZp8/Cholet-Basket-FRANCA.png' },
  { name: 'Chorale Roanne', logo: 'https://i.postimg.cc/9zPGfHGC/Chorale-Roanne-FRANCA.png' },
  { name: 'Elan Bearnais Pau', logo: 'https://i.postimg.cc/rK850ZJk/Elan-Bearnais-Pau-Orthez-FRANCA.png' },
  { name: 'Elan Chalon', logo: 'https://i.postimg.cc/PPt1pV4H/Elan-Chalon-FRANCA.png' },
  { name: 'ESSM Le Portel', logo: 'https://i.postimg.cc/mtb7zpwB/ESSM-Le-Portel-FRANCA.png' },
  { name: 'Skyliners', logo: 'https://i.postimg.cc/Wh20FYn2/Fraport-Skyliners-ALEMANHA.png' },
  { name: 'JDA Dijon', logo: 'https://i.postimg.cc/ZCT6Bscb/JDA-Dijon-FRANCA.png' },
  { name: 'JL Bourg', logo: 'https://i.postimg.cc/HVpbcv2W/JL-Bourg-Basket-FRANCA.png' },
  { name: 'Le Mans', logo: 'https://i.postimg.cc/KRZtkpNv/Le-Mans-Sarthe-Basket-FRANCA.png' },
  { name: 'Boulogne-Levallois', logo: 'https://i.postimg.cc/hfSVzZrt/Levallois-Metropolitans-FRANCA.png' },
  { name: 'Limoges CSP', logo: 'https://i.postimg.cc/MvW1M3DG/Limoges-CSP-FRANCA.png' },
  { name: 'Nanterre 92', logo: 'https://i.postimg.cc/PPt1pV4N/Nanterre-92-FRANCA.png' },
  { name: 'Champagne Basket', logo: 'https://i.postimg.cc/BXq2L7gX/Reims-Champagne-Basket-logo-FRANCA.png' }
];

export const BBL_CLUBS = [
  { name: 'ALBA Berlin', logo: 'https://i.postimg.cc/jnjdKfzp/ALBA-Berlin-ALEMANHA.png' },
  { name: 'Baskets Bonn', logo: 'https://i.postimg.cc/Lgs6RPtF/Baskets-Bonn-ALEMANHA.png' },
  { name: 'BG Göttingen', logo: 'https://i.postimg.cc/ZvqKZN8Z/BG-Gottingen-ALEMANHA.png' },
  { name: 'Brose Bamberg', logo: 'https://i.postimg.cc/m1r2R9YZ/Brose-Bamberg-ALEMANHA.png' },
  { name: 'Crailsheim Merlins', logo: 'https://i.postimg.cc/jnjdKfHx/Crailsheim-Merlins-ALEMANHA.png' },
  { name: 'Giessen 46ers', logo: 'https://i.postimg.cc/Wq4bjZG1/Giessen-46ers-ALEMANHA.png' },
  { name: 'Hamburg Towers', logo: 'https://i.postimg.cc/V0NL1tqN/Hamburg-Towers-ALEMANHA.png' },
  { name: 'Löwen Braunschweig', logo: 'https://i.postimg.cc/vxmHMnrB/Lowen-Braunschweig-ALEMANHA.png' },
  { name: 'medi Bayreuth', logo: 'https://i.postimg.cc/1Vz5PFG4/medi-Bayreuth-ALEMANHA.png' },
  { name: 'MHP Riesen Ludwigsburg', logo: 'https://i.postimg.cc/vxmHMnrc/MHP-Riesen-Ludwigsburg-ALEMANHA.png' },
  { name: 'Mitteldeutscher BC', logo: 'https://i.postimg.cc/64Q5wZr8/Mitteldeutscher-BC-ALEMANHA.png' },
  { name: 'ratiopharm Ulm', logo: 'https://i.postimg.cc/q67M0Ksh/ratiopharm-Ulm-ALEMANHA.png' },
  { name: 's Oliver Würzburg', logo: 'https://i.postimg.cc/PvqrhDWv/s-Oliver-Wurzburg-ALEMANHA.png' }
];

export const ACB_CLUBS = [
  { name: 'CB Miraflores', logo: 'https://i.postimg.cc/bSdGN1zz/CB-MIRAFLORES-ESPANHA.png' },
  { name: 'CB Murcia', logo: 'https://i.postimg.cc/XBXZ79Vv/CB-Murcia-logo-ESPANHA.png' },
  { name: 'Estudiantes', logo: 'https://i.postimg.cc/rRzdF584/ESTUDIANTES-ESPANHA.png' },
  { name: 'FC Barcelona', logo: 'https://i.postimg.cc/H8jJsbpr/fc-barcelona-basketball-logo-ESPANHA.png' },
  { name: 'Gran Canaria', logo: 'https://i.postimg.cc/q6gtM2kR/GRAN-CANARIA-ESPANHA.png' },
  { name: 'ICL Manresa', logo: 'https://i.postimg.cc/6TQ40xCf/ICL-Manresa-logo-ESPANHA.png' },
  { name: 'RetaBet Bilbao', logo: 'https://i.postimg.cc/z3fHjYT7/LOGOTIPO-RETABET-BILBAO-BASKET-ESPANHA.png' },
  { name: 'Montakit Fuenlabrada', logo: 'https://i.postimg.cc/235LwNn2/Montakit-Fuenlabrada-ESPANHA.png' },
  { name: 'MoraBanc Andorra', logo: 'https://i.postimg.cc/14zVH1Dv/Mora-Banc-Andorra-Logo-ESPANHA.png' },
  { name: 'Obradoiro', logo: 'https://i.postimg.cc/Wt4qnc09/OBRADOIRO-ESPANHA.png' },
  { name: 'Real Betis', logo: 'https://i.postimg.cc/hhGQrRVw/Real-Betis-Energia-Plus-ESPANHA.png' },
  { name: 'Real Madrid', logo: 'https://i.postimg.cc/dD0ZBcGx/REAL-MADRID-BASKET-ESPANHA.png' },
  { name: 'Gipuzkoa', logo: 'https://i.postimg.cc/7bLJVrSj/SAN-SEBASTIAN-GIPUZKOA-ESPANHA.png' },
  { name: 'Saski Baskonia', logo: 'https://i.postimg.cc/c6JtmGfp/Saski-Baskonia-ESPANHA.png' },
  { name: 'Tenerife', logo: 'https://i.postimg.cc/pyd5ZMDM/TENERIFE-ESPANHA.png' },
  { name: 'Unicaja', logo: 'https://i.postimg.cc/8sCfHghV/UNICAJA-ESPANHA.png' },
  { name: 'Valencia Basket', logo: 'https://i.postimg.cc/YjSL3B17/valencia-basket-logo-png-ESPANHA.png' },
  { name: 'Zaragoza', logo: 'https://i.postimg.cc/HjL821Qp/ZARAGOZA-ESPANHA.png' }
];

export const UNITEL_BASKET_MATCHES: Match[] = [
  {
    id: 3001,
    league: "Unitel Basket",
    teamA: UNITEL_BASKET_CLUBS[0],
    teamB: UNITEL_BASKET_CLUBS[1],
    date: "20/05/2026",
    time: "18:00",
    odds: { winA: 1.85, draw: 0, winB: 1.95 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA / Unitel'
  },
  {
    id: 3002,
    league: "Unitel Basket",
    teamA: UNITEL_BASKET_CLUBS[2],
    teamB: UNITEL_BASKET_CLUBS[3],
    date: "20/05/2026",
    time: "16:00",
    odds: { winA: 1.70, draw: 0, winB: 2.10 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 3003,
    league: "Unitel Basket",
    teamA: UNITEL_BASKET_CLUBS[4],
    teamB: UNITEL_BASKET_CLUBS[5],
    date: "21/05/2026",
    time: "19:00",
    odds: { winA: 2.05, draw: 0, winB: 1.75 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA'
  },
  {
    id: 3004,
    league: "Unitel Basket",
    teamA: UNITEL_BASKET_CLUBS[6],
    teamB: UNITEL_BASKET_CLUBS[7],
    date: "21/05/2026",
    time: "15:00",
    odds: { winA: 1.50, draw: 0, winB: 2.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Unitel TV'
  }
];

export const ACB_MATCHES: Match[] = [
  {
    id: 4001,
    league: "Liga ACB",
    teamA: ACB_CLUBS[11], // Real Madrid
    teamB: ACB_CLUBS[3], // Barcelona
    date: "22/05/2026",
    time: "20:00",
    odds: { winA: 1.80, draw: 0, winB: 2.05 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Movistar+'
  },
  {
    id: 4002,
    league: "Liga ACB",
    teamA: ACB_CLUBS[16], // Valencia
    teamB: ACB_CLUBS[15], // Unicaja
    date: "22/05/2026",
    time: "18:30",
    odds: { winA: 1.75, draw: 0, winB: 2.15 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Movistar+'
  },
  {
    id: 4003,
    league: "Liga ACB",
    teamA: ACB_CLUBS[13], // Baskonia
    teamB: ACB_CLUBS[14], // Tenerife
    date: "23/05/2026",
    time: "19:00",
    odds: { winA: 1.65, draw: 0, winB: 2.30 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Movistar+'
  },
  {
    id: 4004,
    league: "Liga ACB",
    teamA: ACB_CLUBS[4], // Gran Canaria
    teamB: ACB_CLUBS[17], // Zaragoza
    date: "23/05/2026",
    time: "17:00",
    odds: { winA: 1.55, draw: 0, winB: 2.60 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Movistar+'
  }
];

export const GREEK_BASKET_CLUBS = [
  { name: 'AEK BC', logo: 'https://i.postimg.cc/kDd60trf/A-E-K-BC-GRECIA.png' },
  { name: 'Aris BC', logo: 'https://i.postimg.cc/LhMYcZdc/Aris-BC-GRECIA.png' },
  { name: 'Lavrio', logo: 'https://i.postimg.cc/7byGFT88/GS-Lavrio-GRECIA.png' },
  { name: 'Iraklis', logo: 'https://i.postimg.cc/rzL0Bt63/Iraklis-B-C-GRECIA.png' },
  { name: 'Kolossos Rodou', logo: 'https://i.postimg.cc/8sVJ2rQ8/Kolossos-Rodou-BC-GRECIA.png' },
  { name: 'Larisa', logo: 'https://i.postimg.cc/Rqz6kn5z/Larisa-BC-GRECIA.png' },
  { name: 'Panionios', logo: 'https://i.postimg.cc/XX0GRyS3/Panionios-BC-Logo-GRECIA.png' },
  { name: 'Panathinaikos', logo: 'https://i.postimg.cc/DmKJ9bkn/paobcopap-card-GRECIA.png' },
  { name: 'PAOK BC', logo: 'https://i.postimg.cc/MX8MCj2W/paokbc-logo-GRECIA.png' },
  { name: 'Peristeri', logo: 'https://i.postimg.cc/t7HZKVQq/PERISTERI-BC-GRECIA.png' },
  { name: 'Promitheas Patras', logo: 'https://i.postimg.cc/xqSJwbDj/Promitheas-Patras-GRECIA.png' }
];

export const GREEK_BASKET_MATCHES: Match[] = [
  {
    id: 6001,
    league: "Basket League",
    teamA: GREEK_BASKET_CLUBS[7], // Panathinaikos
    teamB: GREEK_BASKET_CLUBS[0], // AEK
    date: "26/05/2026",
    time: "20:00",
    odds: { winA: 1.25, draw: 0, winB: 3.80 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'ERT'
  },
  {
    id: 6002,
    league: "Basket League",
    teamA: GREEK_BASKET_CLUBS[8], // PAOK
    teamB: GREEK_BASKET_CLUBS[1], // Aris
    date: "26/05/2026",
    time: "18:00",
    odds: { winA: 1.85, draw: 0, winB: 1.95 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'ERT'
  },
  {
    id: 6003,
    league: "Basket League",
    teamA: GREEK_BASKET_CLUBS[10], // Promitheas
    teamB: GREEK_BASKET_CLUBS[9], // Peristeri
    date: "27/05/2026",
    time: "19:30",
    odds: { winA: 1.70, draw: 0, winB: 2.15 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'ERT Sports'
  },
  {
    id: 6004,
    league: "Basket League",
    teamA: GREEK_BASKET_CLUBS[4], // Kolossos
    teamB: GREEK_BASKET_CLUBS[2], // Lavrio
    date: "27/05/2026",
    time: "16:00",
    odds: { winA: 1.55, draw: 0, winB: 2.45 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'ERT'
  }
];

export const VTB_MATCHES: Match[] = [
  {
    id: 5001,
    league: "VTB United League",
    teamA: VTB_CLUBS[6], // Unics Kazan
    teamB: VTB_CLUBS[7], // Zenit St Petersburg
    date: "24/05/2026",
    time: "19:00",
    odds: { winA: 1.85, draw: 0, winB: 1.95 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Match TV'
  },
  {
    id: 5002,
    league: "VTB United League",
    teamA: VTB_CLUBS[4], // Lokomotiv Kuban
    teamB: VTB_CLUBS[0], // BK Himki
    date: "24/05/2026",
    time: "17:00",
    odds: { winA: 1.70, draw: 0, winB: 2.15 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Match TV'
  },
  {
    id: 5003,
    league: "VTB United League",
    teamA: VTB_CLUBS[2], // Nizhny Novgorod
    teamB: VTB_CLUBS[3], // Parma Basket
    date: "25/05/2026",
    time: "18:00",
    odds: { winA: 1.75, draw: 0, winB: 2.10 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'VTB TV'
  },
  {
    id: 5004,
    league: "VTB United League",
    teamA: VTB_CLUBS[1], // Enisey
    teamB: VTB_CLUBS[5], // Tsmoki-Minsk
    date: "25/05/2026",
    time: "16:00",
    odds: { winA: 1.60, draw: 0, winB: 2.40 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'VTB TV'
  }
];

export const ITALY_BASKET_MATCHES: Match[] = [
  {
    id: 7001,
    league: "Serie A Basket",
    teamA: ITALY_BASKET_CLUBS[6], // Milano
    teamB: ITALY_BASKET_CLUBS[10], // Venezia
    date: "28/05/2026",
    time: "20:30",
    odds: { winA: 1.40, draw: 0, winB: 3.10 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Eurosport'
  },
  {
    id: 7002,
    league: "Serie A Basket",
    teamA: ITALY_BASKET_CLUBS[0], // Sassari
    teamB: ITALY_BASKET_CLUBS[5], // Brindisi
    date: "28/05/2026",
    time: "18:00",
    odds: { winA: 1.75, draw: 0, winB: 2.15 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Eurosport 2'
  },
  {
    id: 7003,
    league: "Serie A Basket",
    teamA: ITALY_BASKET_CLUBS[9], // Fortitudo
    teamB: ITALY_BASKET_CLUBS[8], // Virtus Roma
    date: "29/05/2026",
    time: "19:00",
    odds: { winA: 1.85, draw: 0, winB: 1.95 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Rai Sport'
  },
  {
    id: 7004,
    league: "Serie A Basket",
    teamA: ITALY_BASKET_CLUBS[7], // Varese
    teamB: ITALY_BASKET_CLUBS[2], // Cantú
    date: "29/05/2026",
    time: "17:00",
    odds: { winA: 1.65, draw: 0, winB: 2.30 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Eurosport Player'
  }
];

export const JEEP_ELITE_MATCHES: Match[] = [
  {
    id: 8001,
    league: "Jeep Elite",
    teamA: JEEP_ELITE_CLUBS[0], // Monaco
    teamB: JEEP_ELITE_CLUBS[10], // JL Bourg
    date: "01/06/2026",
    time: "20:00",
    odds: { winA: 1.35, draw: 0, winB: 3.20 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'LNB TV'
  },
  {
    id: 8002,
    league: "Jeep Elite",
    teamA: JEEP_ELITE_CLUBS[14], // Nanterre
    teamB: JEEP_ELITE_CLUBS[3], // Cholet
    date: "01/06/2026",
    time: "18:00",
    odds: { winA: 1.70, draw: 0, winB: 2.15 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'LNB TV'
  },
  {
    id: 8003,
    league: "Jeep Elite",
    teamA: JEEP_ELITE_CLUBS[12], // Boulogne-Levallois
    teamB: JEEP_ELITE_CLUBS[13], // Limoges
    date: "02/06/2026",
    time: "19:00",
    odds: { winA: 1.65, draw: 0, winB: 2.30 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'LNB TV'
  },
  {
    id: 8004,
    league: "Jeep Elite",
    teamA: JEEP_ELITE_CLUBS[11], // Le Mans
    teamB: JEEP_ELITE_CLUBS[1], // Gravelines
    date: "02/06/2026",
    time: "17:00",
    odds: { winA: 1.55, draw: 0, winB: 2.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'LNB TV'
  }
];

export const F1_MATCHES: Match[] = [
  {
    id: 5001,
    league: "Grande Prémio de Abu Dhabi",
    teamA: { name: "Max Verstappen", logo: "https://i.postimg.cc/0z1kbDmG/3-Verstappen.png" },
    teamB: { name: "Lewis Hamilton", logo: "https://i.postimg.cc/sMCjv7SG/1-Hamilton.png" },
    date: "25/05/2026",
    time: "14:00",
    odds: { winA: 1.65, draw: 0, winB: 3.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'F1 TV / Eleven'
  }
];

export const BBL_MATCHES: Match[] = [
  {
    id: 9001,
    league: "BBL Alemanha",
    teamA: BBL_CLUBS[0], // ALBA Berlin
    teamB: BBL_CLUBS[3], // Brose Bamberg
    date: "04/06/2026",
    time: "19:00",
    odds: { winA: 1.25, draw: 0, winB: 3.80 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Magenta Sport'
  },
  {
    id: 9002,
    league: "BBL Alemanha",
    teamA: BBL_CLUBS[1], // Baskets Bonn
    teamB: BBL_CLUBS[9], // Ludwigsburg
    date: "04/06/2026",
    time: "17:30",
    odds: { winA: 1.85, draw: 0, winB: 1.95 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Magenta Sport'
  },
  {
    id: 9003,
    league: "BBL Alemanha",
    teamA: BBL_CLUBS[6], // Hamburg Towers
    teamB: BBL_CLUBS[11], // ratiopharm Ulm
    date: "05/06/2026",
    time: "20:00",
    odds: { winA: 2.10, draw: 0, winB: 1.70 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'Magenta Sport'
  },
  {
    id: 9004,
    league: "BBL Alemanha",
    teamA: BBL_CLUBS[4], // Crailsheim Merlins
    teamB: BBL_CLUBS[12], // Wurzburg
    date: "05/06/2026",
    time: "18:00",
    odds: { winA: 1.90, draw: 0, winB: 1.85 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'BBL TV'
  }
];

export const COPA_DO_MUNDO_MATCHES: Match[] = [
  // Grupo A
  {
    id: 10001,
    league: "Copa do Mundo - Grupo A",
    teamA: { name: "México", logo: "https://i.postimg.cc/c6VBwQfg/Mexico.png" },
    teamB: { name: "África do Sul", logo: "https://i.postimg.cc/nMs1Xd9v/Africa-do-Sul.png" },
    date: "11/06/2026",
    time: "20:00",
    odds: { winA: 1.85, draw: 3.40, winB: 4.20 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1 / SportTV'
  },
  {
    id: 10002,
    league: "Copa do Mundo - Grupo A",
    teamA: { name: "Coreia do Sul", logo: "https://i.postimg.cc/z39FKnTV/Coreia-do-Sul.png" },
    teamB: { name: "República Checa", logo: "https://i.postimg.cc/s1t47p5Z/Republica-Checa.png" },
    date: "12/06/2026",
    time: "03:00",
    odds: { winA: 2.10, draw: 3.20, winB: 3.40 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  },
  {
    id: 10003,
    league: "Copa do Mundo - Grupo A",
    teamA: { name: "República Checa", logo: "https://i.postimg.cc/s1t47p5Z/Republica-Checa.png" },
    teamB: { name: "África do Sul", logo: "https://i.postimg.cc/nMs1Xd9v/Africa-do-Sul.png" },
    date: "18/06/2026",
    time: "17:00",
    odds: { winA: 2.00, draw: 3.25, winB: 3.60 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA Desporto'
  },
  {
    id: 10004,
    league: "Copa do Mundo - Grupo A",
    teamA: { name: "México", logo: "https://i.postimg.cc/c6VBwQfg/Mexico.png" },
    teamB: { name: "Coreia do Sul", logo: "https://i.postimg.cc/z39FKnTV/Coreia-do-Sul.png" },
    date: "19/06/2026",
    time: "02:00",
    odds: { winA: 1.95, draw: 3.30, winB: 3.80 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  // Grupo B
  {
    id: 10005,
    league: "Copa do Mundo - Grupo B",
    teamA: { name: "Canadá", logo: "https://i.postimg.cc/4HCH7Qjv/Canada.png" },
    teamB: { name: "Bósnia", logo: "https://i.postimg.cc/4HCH7Qjp/Bosnia.png" },
    date: "12/06/2026",
    time: "20:00",
    odds: { winA: 1.70, draw: 3.60, winB: 4.80 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 1'
  },
  {
    id: 10006,
    league: "Copa do Mundo - Grupo B",
    teamA: { name: "Catar", logo: "https://i.postimg.cc/JHwHD5Sc/Catar.png" },
    teamB: { name: "Suíça", logo: "https://i.postimg.cc/H8G8c9Ft/Suica.png" },
    date: "13/06/2026",
    time: "20:00",
    odds: { winA: 4.50, draw: 3.50, winB: 1.75 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  },
  {
    id: 10007,
    league: "Copa do Mundo - Grupo B",
    teamA: { name: "Suíça", logo: "https://i.postimg.cc/H8G8c9Ft/Suica.png" },
    teamB: { name: "Bósnia", logo: "https://i.postimg.cc/4HCH7Qjp/Bosnia.png" },
    date: "18/06/2026",
    time: "20:00",
    odds: { winA: 1.80, draw: 3.40, winB: 4.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10008,
    league: "Copa do Mundo - Grupo B",
    teamA: { name: "Canadá", logo: "https://i.postimg.cc/4HCH7Qjv/Canada.png" },
    teamB: { name: "Catar", logo: "https://i.postimg.cc/JHwHD5Sc/Catar.png" },
    date: "18/06/2026",
    time: "23:00",
    odds: { winA: 1.60, draw: 3.75, winB: 5.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 2'
  },
  {
    id: 10009,
    league: "Copa do Mundo - Grupo B",
    teamA: { name: "Suíça", logo: "https://i.postimg.cc/H8G8c9Ft/Suica.png" },
    teamB: { name: "Canadá", logo: "https://i.postimg.cc/4HCH7Qjv/Canada.png" },
    date: "24/06/2026",
    time: "20:00",
    odds: { winA: 2.10, draw: 3.30, winB: 3.35 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10010,
    league: "Copa do Mundo - Grupo B",
    teamA: { name: "Bósnia", logo: "https://i.postimg.cc/4HCH7Qjp/Bosnia.png" },
    teamB: { name: "Catar", logo: "https://i.postimg.cc/JHwHD5Sc/Catar.png" },
    date: "24/06/2026",
    time: "20:00",
    odds: { winA: 1.95, draw: 3.40, winB: 3.70 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  },
  // Grupo C
  {
    id: 10011,
    league: "Copa do Mundo - Grupo C",
    teamA: { name: "Brasil", logo: "https://i.postimg.cc/Mf8XKKjM/Brasil.png" },
    teamB: { name: "Marrocos", logo: "https://i.postimg.cc/xNSqTTby/Marrocos.png" },
    date: "13/06/2026",
    time: "23:00",
    odds: { winA: 1.55, draw: 3.90, winB: 6.00 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA Desporto'
  },
  {
    id: 10012,
    league: "Copa do Mundo - Grupo C",
    teamA: { name: "Haiti", logo: "https://i.postimg.cc/1VZ455NF/Haiti.png" },
    teamB: { name: "Escócia", logo: "https://i.postimg.cc/Zvh0KKy3/Escocia.png" },
    date: "14/06/2026",
    time: "02:00",
    odds: { winA: 5.25, draw: 3.60, winB: 1.65 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 3'
  },
  {
    id: 10013,
    league: "Copa do Mundo - Grupo C",
    teamA: { name: "Escócia", logo: "https://i.postimg.cc/Zvh0KKy3/Escocia.png" },
    teamB: { name: "Marrocos", logo: "https://i.postimg.cc/xNSqTTby/Marrocos.png" },
    date: "19/06/2026",
    time: "23:00",
    odds: { winA: 3.20, draw: 3.20, winB: 2.25 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  },
  {
    id: 10014,
    league: "Copa do Mundo - Grupo C",
    teamA: { name: "Brasil", logo: "https://i.postimg.cc/Mf8XKKjM/Brasil.png" },
    teamB: { name: "Haiti", logo: "https://i.postimg.cc/1VZ455NF/Haiti.png" },
    date: "20/06/2026",
    time: "01:30",
    odds: { winA: 1.12, draw: 7.50, winB: 18.00 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10015,
    league: "Copa do Mundo - Grupo C",
    teamA: { name: "Marrocos", logo: "https://i.postimg.cc/xNSqTTby/Marrocos.png" },
    teamB: { name: "Haiti", logo: "https://i.postimg.cc/1VZ455NF/Haiti.png" },
    date: "24/06/2026",
    time: "23:00",
    odds: { winA: 1.35, draw: 4.75, winB: 8.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  },
  {
    id: 10016,
    league: "Copa do Mundo - Grupo C",
    teamA: { name: "Escócia", logo: "https://i.postimg.cc/Zvh0KKy3/Escocia.png" },
    teamB: { name: "Brasil", logo: "https://i.postimg.cc/Mf8XKKjM/Brasil.png" },
    date: "24/06/2026",
    time: "23:00",
    odds: { winA: 6.50, draw: 4.25, winB: 1.45 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  // Grupo D
  {
    id: 10017,
    league: "Copa do Mundo - Grupo D",
    teamA: { name: "Estados Unidos", logo: "https://i.postimg.cc/8sD6StdY/Estados-Unidos.png" },
    teamB: { name: "Paraguai", logo: "https://i.postimg.cc/9zV7hJPb/Paraguai.png" },
    date: "13/06/2026",
    time: "02:00",
    odds: { winA: 1.80, draw: 3.40, winB: 4.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 1'
  },
  {
    id: 10018,
    league: "Copa do Mundo - Grupo D",
    teamA: { name: "Austrália", logo: "https://i.postimg.cc/14PqQJ0c/Australia.png" },
    teamB: { name: "Turquia", logo: "https://i.postimg.cc/XX3CbQKx/Turquia.png" },
    date: "14/06/2026",
    time: "05:00",
    odds: { winA: 2.70, draw: 3.10, winB: 2.65 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  },
  {
    id: 10019,
    league: "Copa do Mundo - Grupo D",
    teamA: { name: "Estados Unidos", logo: "https://i.postimg.cc/8sD6StdY/Estados-Unidos.png" },
    teamB: { name: "Austrália", logo: "https://i.postimg.cc/14PqQJ0c/Australia.png" },
    date: "19/06/2026",
    time: "20:00",
    odds: { winA: 1.75, draw: 3.50, winB: 4.75 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10020,
    league: "Copa do Mundo - Grupo D",
    teamA: { name: "Turquia", logo: "https://i.postimg.cc/XX3CbQKx/Turquia.png" },
    teamB: { name: "Paraguai", logo: "https://i.postimg.cc/9zV7hJPb/Paraguai.png" },
    date: "20/06/2026",
    time: "04:00",
    odds: { winA: 2.10, draw: 3.30, winB: 3.40 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 4'
  },
  // Grupo E
  {
    id: 10021,
    league: "Copa do Mundo - Grupo E",
    teamA: { name: "Alemanha", logo: "https://i.postimg.cc/hQPv7Zp9/Alemanha.png" },
    teamB: { name: "Curaçao", logo: "https://i.postimg.cc/grYn5rdM/Curacao.png" },
    date: "14/06/2026",
    time: "18:00",
    odds: { winA: 1.15, draw: 7.00, winB: 15.00 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10022,
    league: "Copa do Mundo - Grupo E",
    teamA: { name: "Costa do Marfim", logo: "https://i.postimg.cc/hQPv7ZpL/Costa-do-Marfim.png" },
    teamB: { name: "Equador", logo: "https://i.postimg.cc/XXVphX3s/Equador.png" },
    date: "15/06/2026",
    time: "00:00",
    odds: { winA: 2.75, draw: 3.10, winB: 2.60 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA Desporto'
  },
  {
    id: 10023,
    league: "Copa do Mundo - Grupo E",
    teamA: { name: "Alemanha", logo: "https://i.postimg.cc/hQPv7Zp9/Alemanha.png" },
    teamB: { name: "Costa do Marfim", logo: "https://i.postimg.cc/hQPv7ZpL/Costa-do-Marfim.png" },
    date: "20/06/2026",
    time: "21:00",
    odds: { winA: 1.45, draw: 4.25, winB: 6.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10024,
    league: "Copa do Mundo - Grupo E",
    teamA: { name: "Equador", logo: "https://i.postimg.cc/XXVphX3s/Equador.png" },
    teamB: { name: "Curaçao", logo: "https://i.postimg.cc/grYn5rdM/Curacao.png" },
    date: "21/06/2026",
    time: "01:00",
    odds: { winA: 1.50, draw: 4.00, winB: 6.25 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 1'
  },
  // Grupo F
  {
    id: 10025,
    league: "Copa do Mundo - Grupo F",
    teamA: { name: "Holanda", logo: "https://i.postimg.cc/TyMPc3C4/Holanda.png" },
    teamB: { name: "Japão", logo: "https://i.postimg.cc/Nyq0xjpN/Japao.png" },
    date: "14/06/2026",
    time: "21:00",
    odds: { winA: 1.65, draw: 3.70, winB: 5.00 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  },
  {
    id: 10026,
    league: "Copa do Mundo - Grupo F",
    teamA: { name: "Suécia", logo: "https://i.postimg.cc/Y4KSxCby/Suecia.png" },
    teamB: { name: "Tunísia", logo: "https://i.postimg.cc/xkDdP1tp/Tunisia.png" },
    date: "15/06/2026",
    time: "03:00",
    odds: { winA: 1.85, draw: 3.35, winB: 4.25 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 2'
  },
  {
    id: 10027,
    league: "Copa do Mundo - Grupo F",
    teamA: { name: "Holanda", logo: "https://i.postimg.cc/TyMPc3C4/Holanda.png" },
    teamB: { name: "Suécia", logo: "https://i.postimg.cc/Y4KSxCby/Suecia.png" },
    date: "20/06/2026",
    time: "18:00",
    odds: { winA: 1.80, draw: 3.45, winB: 4.30 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10028,
    league: "Copa do Mundo - Grupo F",
    teamA: { name: "Tunísia", logo: "https://i.postimg.cc/xkDdP1tp/Tunisia.png" },
    teamB: { name: "Japão", logo: "https://i.postimg.cc/Nyq0xjpN/Japao.png" },
    date: "21/06/2026",
    time: "05:00",
    odds: { winA: 3.25, draw: 3.20, winB: 2.22 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  },
  // Grupo G
  {
    id: 10029,
    league: "Copa do Mundo - Grupo G",
    teamA: { name: "Bélgica", logo: "https://i.postimg.cc/fSLWbtRd/Belgica.png" },
    teamB: { name: "Egito", logo: "https://i.postimg.cc/bSJYvDwL/Egipto.png" },
    date: "15/06/2026",
    time: "20:00",
    odds: { winA: 1.52, draw: 3.95, winB: 6.25 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10030,
    league: "Copa do Mundo - Grupo G",
    teamA: { name: "Irão", logo: "https://i.postimg.cc/q6RB7hvL/Irao.png" },
    teamB: { name: "Nova Zelândia", logo: "https://i.postimg.cc/sGXf2Qgm/Nova-Zelandia.png" },
    date: "16/06/2026",
    time: "02:00",
    odds: { winA: 1.70, draw: 3.55, winB: 4.90 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 3'
  },
  {
    id: 10031,
    league: "Copa do Mundo - Grupo G",
    teamA: { name: "Bélgica", logo: "https://i.postimg.cc/fSLWbtRd/Belgica.png" },
    teamB: { name: "Irão", logo: "https://i.postimg.cc/q6RB7hvL/Irao.png" },
    date: "21/06/2026",
    time: "20:00",
    odds: { winA: 1.40, draw: 4.40, winB: 7.80 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA Desporto'
  },
  {
    id: 10032,
    league: "Copa do Mundo - Grupo G",
    teamA: { name: "Nova Zelândia", logo: "https://i.postimg.cc/sGXf2Qgm/Nova-Zelandia.png" },
    teamB: { name: "Egito", logo: "https://i.postimg.cc/bSJYvDwL/Egipto.png" },
    date: "22/06/2026",
    time: "02:00",
    odds: { winA: 4.80, draw: 3.60, winB: 1.72 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  },
  // Grupo H
  {
    id: 10033,
    league: "Copa do Mundo - Grupo H",
    teamA: { name: "Espanha", logo: "https://i.postimg.cc/GBCcySp4/Espanha.png" },
    teamB: { name: "Cabo Verde", logo: "https://i.postimg.cc/rdk8rYps/Cabo-Verde.png" },
    date: "15/06/2026",
    time: "17:00",
    odds: { winA: 1.22, draw: 5.75, winB: 11.00 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10034,
    league: "Copa do Mundo - Grupo H",
    teamA: { name: "Arábia Saudita", logo: "https://i.postimg.cc/2qDzZX55/Arabia-Saudita.png" },
    teamB: { name: "Uruguai", logo: "https://i.postimg.cc/SXhyMtKs/Uruguai.png" },
    date: "15/06/2026",
    time: "23:00",
    odds: { winA: 5.80, draw: 3.90, winB: 1.55 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 1'
  },
  {
    id: 10035,
    league: "Copa do Mundo - Grupo H",
    teamA: { name: "Espanha", logo: "https://i.postimg.cc/GBCcySp4/Espanha.png" },
    teamB: { name: "Arábia Saudita", logo: "https://i.postimg.cc/2qDzZX55/Arabia-Saudita.png" },
    date: "21/06/2026",
    time: "17:00",
    odds: { winA: 1.30, draw: 5.00, winB: 9.00 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA Desporto'
  },
  {
    id: 10036,
    league: "Copa do Mundo - Grupo H",
    teamA: { name: "Uruguai", logo: "https://i.postimg.cc/SXhyMtKs/Uruguai.png" },
    teamB: { name: "Cabo Verde", logo: "https://i.postimg.cc/rdk8rYps/Cabo-Verde.png" },
    date: "21/06/2026",
    time: "23:00",
    odds: { winA: 1.48, draw: 4.10, winB: 6.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  // Grupo I
  {
    id: 10037,
    league: "Copa do Mundo - Grupo I",
    teamA: { name: "França", logo: "https://i.postimg.cc/8sjVjVbH/Franca.png" },
    teamB: { name: "Senegal", logo: "https://i.postimg.cc/WthPhP7S/Senegal.png" },
    date: "16/06/2026",
    time: "20:00",
    odds: { winA: 1.42, draw: 4.25, winB: 7.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10038,
    league: "Copa do Mundo - Grupo I",
    teamA: { name: "Iraque", logo: "https://i.postimg.cc/hhfqfq0p/Iraque.png" },
    teamB: { name: "Noruega", logo: "https://i.postimg.cc/z3V1V1k7/Noruega.png" },
    date: "16/06/2026",
    time: "23:00",
    odds: { winA: 4.95, draw: 3.60, winB: 1.68 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 2'
  },
  {
    id: 10039,
    league: "Copa do Mundo - Grupo I",
    teamA: { name: "França", logo: "https://i.postimg.cc/8sjVjVbH/Franca.png" },
    teamB: { name: "Iraque", logo: "https://i.postimg.cc/hhfqfq0p/Iraque.png" },
    date: "22/06/2026",
    time: "22:00",
    odds: { winA: 1.14, draw: 7.00, winB: 16.00 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10040,
    league: "Copa do Mundo - Grupo I",
    teamA: { name: "Noruega", logo: "https://i.postimg.cc/z3V1V1k7/Noruega.png" },
    teamB: { name: "Senegal", logo: "https://i.postimg.cc/WthPhP7S/Senegal.png" },
    date: "23/06/2026",
    time: "01:00",
    odds: { winA: 2.30, draw: 3.25, winB: 3.05 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  },
  // Grupo J
  {
    id: 10041,
    league: "Copa do Mundo - Grupo J",
    teamA: { name: "Argentina", logo: "https://i.postimg.cc/xk0wYrCH/Argentina.png" },
    teamB: { name: "Argélia", logo: "https://i.postimg.cc/t1XKy0Tx/Argelia.png" },
    date: "17/06/2026",
    time: "02:00",
    odds: { winA: 1.35, draw: 4.75, winB: 8.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 1'
  },
  {
    id: 10042,
    league: "Copa do Mundo - Grupo J",
    teamA: { name: "Áustria", logo: "https://i.postimg.cc/sBwtgnQG/Austria.png" },
    teamB: { name: "Jordânia", logo: "https://i.postimg.cc/4KBrx87h/Jordania.png" },
    date: "17/06/2026",
    time: "05:00",
    odds: { winA: 1.50, draw: 4.00, winB: 6.25 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  },
  {
    id: 10043,
    league: "Copa do Mundo - Grupo J",
    teamA: { name: "Argentina", logo: "https://i.postimg.cc/xk0wYrCH/Argentina.png" },
    teamB: { name: "Áustria", logo: "https://i.postimg.cc/sBwtgnQG/Austria.png" },
    date: "22/06/2026",
    time: "18:00",
    odds: { winA: 1.55, draw: 3.90, winB: 5.75 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10044,
    league: "Copa do Mundo - Grupo J",
    teamA: { name: "Jordânia", logo: "https://i.postimg.cc/4KBrx87h/Jordania.png" },
    teamB: { name: "Argélia", logo: "https://i.postimg.cc/t1XKy0Tx/Argelia.png" },
    date: "23/06/2026",
    time: "04:00",
    odds: { winA: 4.10, draw: 3.25, winB: 1.95 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 3'
  },
  // Grupo K
  {
    id: 10045,
    league: "Copa do Mundo - Grupo K",
    teamA: { name: "Portugal", logo: "https://i.postimg.cc/c6VPCtC4/Portugal.png" },
    teamB: { name: "Congo", logo: "https://i.postimg.cc/XXTtqBqv/Congo.png" },
    date: "17/06/2026",
    time: "18:00",
    odds: { winA: 1.25, draw: 5.50, winB: 10.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10046,
    league: "Copa do Mundo - Grupo K",
    teamA: { name: "Uzbequistão", logo: "https://i.postimg.cc/HVXRyW81/Uzbesquistao.png" },
    teamB: { name: "Colômbia", logo: "https://i.postimg.cc/G9Z6tTt3/Colombia.png" },
    date: "18/06/2026",
    time: "03:00",
    odds: { winA: 4.80, draw: 3.60, winB: 1.70 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 1'
  },
  {
    id: 10047,
    league: "Copa do Mundo - Grupo K",
    teamA: { name: "Portugal", logo: "https://i.postimg.cc/c6VPCtC4/Portugal.png" },
    teamB: { name: "Uzbequistão", logo: "https://i.postimg.cc/HVXRyW81/Uzbesquistao.png" },
    date: "23/06/2026",
    time: "18:00",
    odds: { winA: 1.40, draw: 4.50, winB: 7.50 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA Desporto'
  },
  {
    id: 10048,
    league: "Copa do Mundo - Grupo K",
    teamA: { name: "Colômbia", logo: "https://i.postimg.cc/G9Z6tTt3/Colombia.png" },
    teamB: { name: "Congo", logo: "https://i.postimg.cc/XXTtqBqv/Congo.png" },
    date: "24/06/2026",
    time: "03:00",
    odds: { winA: 1.45, draw: 4.20, winB: 6.80 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'SportTV 2'
  },
  // Grupo L
  {
    id: 10049,
    league: "Copa do Mundo - Grupo L",
    teamA: { name: "Inglaterra", logo: "https://i.postimg.cc/1V6CwMt2/Inglaterra.png" },
    teamB: { name: "Croácia", logo: "https://i.postimg.cc/q6nbyQRW/Croacia.png" },
    date: "17/06/2026",
    time: "21:00",
    odds: { winA: 1.85, draw: 3.35, winB: 4.20 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10050,
    league: "Copa do Mundo - Grupo L",
    teamA: { name: "Gana", logo: "https://i.postimg.cc/rRWnxgmv/Gana.png" },
    teamB: { name: "Panamá", logo: "https://i.postimg.cc/kR81Kw4Z/Panama.png" },
    date: "18/06/2026",
    time: "00:00",
    odds: { winA: 1.90, draw: 3.30, winB: 4.10 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  },
  {
    id: 10051,
    league: "Copa do Mundo - Grupo L",
    teamA: { name: "Inglaterra", logo: "https://i.postimg.cc/1V6CwMt2/Inglaterra.png" },
    teamB: { name: "Gana", logo: "https://i.postimg.cc/rRWnxgmv/Gana.png" },
    date: "23/06/2026",
    time: "21:00",
    odds: { winA: 1.50, draw: 4.10, winB: 6.25 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 1'
  },
  {
    id: 10052,
    league: "Copa do Mundo - Grupo L",
    teamA: { name: "Panamá", logo: "https://i.postimg.cc/kR81Kw4Z/Panama.png" },
    teamB: { name: "Croácia", logo: "https://i.postimg.cc/q6nbyQRW/Croacia.png" },
    date: "24/06/2026",
    time: "00:00",
    odds: { winA: 4.80, draw: 3.55, winB: 1.72 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA 2'
  }
];

