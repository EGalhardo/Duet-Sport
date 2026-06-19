import { Match } from '../types';

export const FOOTBALL_MARKETS: Record<string, { id: string, label: (m: Match) => string }[]> = {
  'Resultado Final': [
    { id: 'Vitória A', label: (match: Match) => `Vitória ${match.teamA.name}` },
    { id: 'Empate', label: () => 'Empate' },
    { id: 'Vitória B', label: (match: Match) => `Vitória ${match.teamB.name}` }
  ],
  'Ambas Equipas Marcam': [
    { id: 'Sim', label: () => 'Sim' },
    { id: 'Não', label: () => 'Não' }
  ],
  'Total de Golos': [
    { id: '+2.5 Golos', label: () => '+2.5 Golos' },
    { id: '-2.5 Golos', label: () => '-2.5 Golos' }
  ],
  'Primeira Equipa a Marcar': [
    { id: 'Equipa A', label: (match: Match) => match.teamA.name },
    { id: 'Equipa B', label: (match: Match) => match.teamB.name },
    { id: 'Nenhuma', label: () => 'Nenhuma' }
  ],
  'Dupla Hipótese': [
    { id: '1X', label: () => '1X (Vence A ou Empata)' },
    { id: '12', label: () => '12 (Vence A ou B)' },
    { id: 'X2', label: () => 'X2 (Vence B ou Empata)' }
  ]
};

export const PRIVATE_MARKETS = [
  { name: "Resultado Final", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'X', label: 'Empate' }, { id: 'B', label: m.teamB.name }] },
  { name: "Ambas Marcam", options: () => [{ id: 'Sim', label: 'Sim' }, { id: 'Não', label: 'Não' }] },
  { name: "Mais/Menos 2.5 Golos", options: () => [{ id: 'Mais', label: 'Mais de 2.5' }, { id: 'Menos', label: 'Menos de 2.5' }] },
  { name: "Primeira Equipa a Marcar", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }, { id: 'Nenhum', label: 'Nenhum' }] },
  { name: "Resultado ao Intervalo", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'X', label: 'Empate' }, { id: 'B', label: m.teamB.name }] },
  { name: "Total de Cantos", options: () => [{ id: 'Mais', label: 'Mais de 8.5' }, { id: 'Menos', label: 'Menos de 8.5' }] },
  { name: "Total de Cartões", options: () => [{ id: 'Mais', label: 'Mais de 3.5' }, { id: 'Menos', label: 'Menos de 3.5' }] },
  { name: "Equipa com Mais Cantos", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }, { id: 'Igual', label: 'Igual' }] },
  { name: "Equipa com Mais Remates à Baliza", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }, { id: 'Igual', label: 'Igual' }] },
  { name: "Posse de Bola", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }, { id: 'Igual', label: 'Igual' }] },
];

export const BASKETBALL_PRIVATE_MARKETS = [
  { name: "Equipa Vencedora", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }] },
  { name: "Total de Pontos", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }] },
  { name: "Primeira Equipa a Marcar", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }] },
  { name: "Jogador MVP", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }] },
  { name: "Jogador com Mais Pontos", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }] },
  { name: "Triplo-Duplo", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }] },
  { name: "Mais Ressaltos", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }] },
  { name: "Mais Assistências", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }] },
  { name: "Mais Roubos de Bola", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }] },
  { name: "Mais Tampões / Desarmes", options: (m: Match) => [{ id: 'A', label: m.teamA.name }, { id: 'B', label: m.teamB.name }] },
];

const F1_DRIVERS = [
  { id: 'verstappen', label: 'Max Verstappen' },
  { id: 'hamilton', label: 'Lewis Hamilton' },
  { id: 'leclerc', label: 'Charles Leclerc' },
  { id: 'norris', label: 'Lando Norris' },
  { id: 'piastri', label: 'Oscar Piastri' },
  { id: 'sainz', label: 'Carlos Sainz' },
  { id: 'russell', label: 'George Russell' },
  { id: 'perez', label: 'Sergio Perez' },
  { id: 'alonso', label: 'Fernando Alonso' },
  { id: 'gasly', label: 'Pierre Gasly' }
];

export const F1_PRIVATE_MARKETS = [
  { name: "1- Classificado", options: () => F1_DRIVERS },
  { name: "2- Classificado", options: () => F1_DRIVERS },
  { name: "3- Classificado", options: () => F1_DRIVERS },
  { name: "4- Classificado", options: () => F1_DRIVERS },
  { name: "5- Classificado", options: () => F1_DRIVERS },
  { name: "6- Classificado", options: () => F1_DRIVERS },
  { name: "7- Classificado", options: () => F1_DRIVERS },
  { name: "8- Classificado", options: () => F1_DRIVERS },
  { name: "9- Classificado", options: () => F1_DRIVERS },
  { name: "10- Classificado", options: () => F1_DRIVERS },
];
