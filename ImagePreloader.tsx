import React, { useEffect } from 'react';
import { MATCH_DATA, CATEGORIES, CATEGORY_DATA, COMPETITION_LOGOS, GIRABOLA_CLUBS, BUNDESLIGA_CLUBS, LALIGA_CLUBS, LIGUE1_CLUBS, EREDIVISIE_CLUBS, PREMIERLEAGUE_CLUBS, SERIEA_CLUBS, LIGANOS_CLUBS, NBA_CLUBS, UNITEL_BASKET_CLUBS, VTB_CLUBS, ITALY_BASKET_CLUBS, JEEP_ELITE_CLUBS } from '../constants';

const ImagePreloader: React.FC = () => {
  useEffect(() => {
    const urls = new Set<string>();

    // Collect all URLs from constants
    MATCH_DATA.forEach(m => {
      if (m.teamA?.logo) urls.add(m.teamA.logo);
      if (m.teamB?.logo) urls.add(m.teamB.logo);
    });

    CATEGORIES.forEach(c => {
      if (c.image) urls.add(c.image);
    });

    Object.values(CATEGORY_DATA).forEach(cat => {
      if (cat.image) urls.add(cat.image);
      Object.values(cat.cards || {}).forEach(cards => {
        cards.forEach(card => {
          if (card.image) urls.add(card.image);
          if (card.driver1) urls.add(card.driver1);
          if (card.driver2) urls.add(card.driver2);
        });
      });
    });

    Object.values(COMPETITION_LOGOS).forEach(url => { if(url) urls.add(url) });
    
    // Add all specific Club logos
    const allClubs = [
      ...GIRABOLA_CLUBS, ...BUNDESLIGA_CLUBS, ...LALIGA_CLUBS, ...LIGUE1_CLUBS,
      ...EREDIVISIE_CLUBS, ...PREMIERLEAGUE_CLUBS, ...SERIEA_CLUBS, ...LIGANOS_CLUBS,
      ...NBA_CLUBS, ...UNITEL_BASKET_CLUBS, ...VTB_CLUBS, ...ITALY_BASKET_CLUBS, ...JEEP_ELITE_CLUBS
    ];
    
    allClubs.forEach(c => {
      if (c?.logo) urls.add(c.logo);
    });

    // Special static assets
    urls.add('https://i.postimg.cc/9XT19dr9/l-OGOMARCA-OFICIAL-2.gif');
    urls.add('https://i.postimg.cc/ZKqzCtsV/F1-Classificacao.png');
    urls.add('https://i.postimg.cc/cCCXVsSp/Wallet.gif');
    urls.add('https://i.postimg.cc/mD7Pr65C/Avatar.png');

    // Preload each image natively with high priority
    urls.forEach(url => {
      if (url && url.startsWith('http')) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        // @ts-ignore
        link.fetchpriority = "low"; // Low priority so it doesn't block main JS thread
        document.head.appendChild(link);
      }
    });

    console.log(`[DUET Preloader] ${urls.size} imagens injetadas no cachê do navegador.`);
  }, []);

  return null;
};

export default ImagePreloader;
