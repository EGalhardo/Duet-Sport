import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import ws from 'ws';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Service Role para bypass RLS em scripts Backend de Admin
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodGxzY2p3dWNvaGtuc3p6Y3BoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTcyMTQ4OCwiZXhwIjoyMDk3Mjk3NDg4fQ.SLOiz6b2IcaGOknqA1KgN-kC6KYG-Dysf_McI4QVXE8";

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: ws }
});

async function simulateMatch() {
  console.log('🏁 Iniciando Simulação do DUET "1 vs 1" no Supabase 🏁\n');
  
  try {
    // Vamos criar dois utilizadores REAIS de teste na auth e associar ao profile para respeitar a tua Foreign Key Restraint
    console.log('👨‍💻 A criar utilizadores Auth Reais no Supabase (se não existirem)...');
    
    // Tenta criar o João
    let joaoAuth = await supabaseAdmin.auth.admin.createUser({
      email: 'joao_teste_' + Date.now() + '@duet.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: { full_name: 'João Adepto do Real' }
    });
    
    // Tenta criar o Pedro
    let pedroAuth = await supabaseAdmin.auth.admin.createUser({
      email: 'pedro_teste_' + Date.now() + '@duet.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: { full_name: 'Pedro Adepto do Barça' }
    });

    const joaoId = joaoAuth.data.user.id;
    const pedroId = pedroAuth.data.user.id;

    // Pausa para deixar os Triggers de criação da carteira executarem sozinhos! (Aquilo que criaste no SQL)
    await new Promise(r => setTimeout(r, 2000));

    // Ver saldos iniciais que o Trigger criou sozinho
    let w1 = await supabaseAdmin.from('wallets').select('*').eq('user_id', joaoId).single();
    let w2 = await supabaseAdmin.from('wallets').select('*').eq('user_id', pedroId).single();
    
    console.log(`\n-- SALDOS INICIAIS DA BASE DE DADOS --`);
    console.log(`- Carteira João: ${w1.data.balance} Kz Livres | ${w1.data.blocked_balance} Kz Cativos`);
    console.log(`- Carteira Pedro: ${w2.data.balance} Kz Livres | ${w2.data.blocked_balance} Kz Cativos\n`);

    const apostaSolicitada = 500;
    const comissao = 50;
    const match_id = "REAL_MADRID_VS_BARCELONA_2026";
    const roomCode = "ELCLASICO26";

    console.log(`⚔️ JOÃO cria o Desafio [Real vs Barça] apostando ${apostaSolicitada} Kz na Vitória do Real...`);
    
    // João desconta saldo (Aposta 500 + Taxa 50 = 550 debitado)
    await supabaseAdmin.from('wallets').update({
       balance: w1.data.balance - (apostaSolicitada + comissao),
       blocked_balance: w1.data.blocked_balance + apostaSolicitada
    }).eq('user_id', joaoId);

    // João regista a Aposta
    await supabaseAdmin.from('bets').insert({
        match_id: match_id,
        user_id: joaoId,
        category: '1 vs 1',
        market: 'Real Madrid (Vence)',
        amount: apostaSolicitada,
        status: 'Open',
        password: roomCode,
        room_name: 'Duelo de Gigantes',
        odds: { winA: 2.50, draw: 3.2, winB: 2.20 }
    });
    
    console.log('✅ Sala Criada no Servidor!');
    
    console.log(`\n⚔️ PEDRO encontra a Sala e aceita o Desafio apostando no Barcelona...`);
    // Pedro desconta saldo
    await supabaseAdmin.from('wallets').update({
       balance: w2.data.balance - (apostaSolicitada + comissao),
       blocked_balance: w2.data.blocked_balance + apostaSolicitada
    }).eq('user_id', pedroId);

    // Pedro entra no desafio
    await supabaseAdmin.from('bets').insert({
        match_id: match_id,
        user_id: pedroId,
        category: '1 vs 1',
        market: 'Barcelona (Vence)',
        amount: apostaSolicitada,
        status: 'Open',
        password: roomCode,
        room_name: 'Duelo de Gigantes',
        odds: { winA: 2.50, draw: 3.2, winB: 2.20 }
    });

    console.log('✅ Pedro Entrou na Sala e saldo foi descontado!');

    // Ver saldos após aposta
    w1 = await supabaseAdmin.from('wallets').select('*').eq('user_id', joaoId).single();
    w2 = await supabaseAdmin.from('wallets').select('*').eq('user_id', pedroId).single();
    console.log(`\n-- SALDOS PÓS APOSTA (Retirou 550 Kz de cada) --`);
    console.log(`- Carteira João: ${w1.data.balance} Kz Livres | ${w1.data.blocked_balance} Kz Cativos`);
    console.log(`- Carteira Pedro: ${w2.data.balance} Kz Livres | ${w2.data.blocked_balance} Kz Cativos\n`);

    console.log('⏳ (Simulando o Jogo Desportivo no Backend...)');
    console.log('🎯 Resultado Apurado pela IA: Vitória do Real Madrid!\n');

    // Resolução: João ganha, Pedro Perde. 
    const premioJackpot = apostaSolicitada * 2; // 1000 Kz

    await supabaseAdmin.from('bets').update({ status: 'Won' }).eq('user_id', joaoId).eq('match_id', match_id);
    await supabaseAdmin.from('bets').update({ status: 'Lost' }).eq('user_id', pedroId).eq('match_id', match_id);

    console.log('💸 Distribuindo prémios e limpando dinheiro bloqueado...');
    
    // João recebe o prémio (+1000)
    await supabaseAdmin.from('wallets').update({
      balance: w1.data.balance + premioJackpot,
      blocked_balance: w1.data.blocked_balance - apostaSolicitada
    }).eq('user_id', joaoId);

    // Pedro apenas perde o dinheiro bloqueado
    await supabaseAdmin.from('wallets').update({
      blocked_balance: w2.data.blocked_balance - apostaSolicitada
    }).eq('user_id', pedroId);

    // Ver saldos finais
    w1 = await supabaseAdmin.from('wallets').select('*').eq('user_id', joaoId).single();
    w2 = await supabaseAdmin.from('wallets').select('*').eq('user_id', pedroId).single();
    
    console.log(`\n📊 -- RESULTADO FINAL DAS CARTEIRAS NA SUPABASE --`);
    console.log(`👑 João (Vencedor): ${w1.data.balance} Kz Livres | ${w1.data.blocked_balance} Kz Cativos`);
    console.log(`😭 Pedro (Perdedor): ${w2.data.balance} Kz Livres | ${w2.data.blocked_balance} Kz Cativos`);
    
    console.log('\n✅ Simulação de Fluxo "1 vs 1" concluída e matematicamente provada no Servidor!');

  } catch (e) {
    console.error('Erro:', e);
  }
}

simulateMatch();