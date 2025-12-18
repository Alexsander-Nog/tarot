import { Flame, Sprout, Wind, Droplet, Sparkles } from "lucide-react";

export interface Profile {
  id: string;
  name: string;
  icon: any;
  emoji: string;
  color: string;
  title: string;
  description: string;
  strengths: string[];
  challenges: string[];
  hiddenPattern: string;
  tarotCards: { name: string; meaning: string }[];
  ritual: string;
  weeklyGuidance: { week: number; guidance: string }[];
}

export const profiles: Record<string, Profile> = {
  fogo: {
    id: "fogo",
    name: "Guerreira Apaixonada",
    icon: Flame,
    emoji: "🔥",
    color: "#F59E0B",
    title: "GUERREIRA APAIXONADA",
    description:
      "Suas estrelas revelam uma alma de FOGO puro! Você ama com a intensidade de mil sóis, mas isso também pode ser sua maior armadilha...",
    strengths: [
      "Sua paixão é magnética e irresistível",
      "Coragem para ir atrás do que deseja",
      "Energia contagiante que inspira outros",
    ],
    challenges: [
      "Pode se queimar na própria intensidade",
      "Impaciência em relacionamentos",
      "Dificuldade em lidar com a rotina",
    ],
    hiddenPattern:
      "Atrai pessoas que precisam de sua energia, mas não conseguem retribuir na mesma intensidade",
    tarotCards: [
      { name: "👑 A IMPERATRIZ", meaning: "Sua energia feminina magnética" },
      { name: "🏎️ O CARRO", meaning: "Necessidade de controlar a direção do amor" },
      { name: "💔 CINCO DE COPAS", meaning: "Decepções passadas que ainda influenciam" },
    ],
    ritual:
      "Toda terça-feira (dia de Marte), acenda uma vela vermelha e escreva em um papel: 'Eu atraio um amor que iguala minha intensidade'. Queime o papel na chama da vela.",
    weeklyGuidance: [
      { week: 1, guidance: "Pratique a paciência amorosa - nem tudo precisa ser urgente" },
      { week: 2, guidance: "Trabalhe o equilíbrio entre dar e receber" },
      { week: 3, guidance: "Fortaleça sua autoestima independente de validação externa" },
      { week: 4, guidance: "Abra-se para um amor que te complemente, não que te consume" },
    ],
  },
  terra: {
    id: "terra",
    name: "Rainha Terrena",
    icon: Sprout,
    emoji: "🌿",
    color: "#10B981",
    title: "RAINHA TERRENA",
    description:
      "Você é o alicerce sólido que todo amor verdadeiro precisa. Sua estabilidade é um tesouro raro, mas cuidado para não se tornar uma fortaleza intransponível...",
    strengths: [
      "Oferece segurança e estabilidade emocional",
      "Confiável e leal",
      "Prática e realista no amor",
    ],
    challenges: [
      "Pode ser rígida demais em suas expectativas",
      "Resistência a mudanças",
      "Dificuldade em expressar emoções",
    ],
    hiddenPattern:
      "Atrai pessoas que buscam estabilidade, mas você pode acabar sendo 'mãe' em vez de parceira",
    tarotCards: [
      { name: "👸 A RAINHA DE OUROS", meaning: "Sua natureza provedora e estável" },
      { name: "🙃 O ENFORCADO", meaning: "Necessidade de flexibilidade" },
      { name: "💕 DOIS DE COPAS", meaning: "Parceria equilibrada que você busca" },
    ],
    ritual:
      "Toda sexta-feira (dia de Vênus), plante uma semente em um vaso e regue pensando: 'Eu permito que o amor cresça naturalmente em minha vida'.",
    weeklyGuidance: [
      { week: 1, guidance: "Permita-se ser mais espontânea no amor" },
      { week: 2, guidance: "Pratique a vulnerabilidade controlada" },
      { week: 3, guidance: "Reduza as expectativas e aumente a aceitação" },
      { week: 4, guidance: "Cultive a leveza e o humor na relação" },
    ],
  },
  ar: {
    id: "ar",
    name: "Borboleta Social",
    icon: Wind,
    emoji: "🦋",
    color: "#3B82F6",
    title: "BORBOLETA SOCIAL",
    description:
      "Sua mente brilhante e comunicação magnética conquistam corações por onde passa. Mas cuidado para não voar tanto que esqueça de pousar...",
    strengths: [
      "Comunicação irresistível e versatilidade",
      "Mente aberta e curiosa",
      "Capacidade de se adaptar a diferentes pessoas",
    ],
    challenges: [
      "Pode evitar intimidade emocional profunda",
      "Inconstância em relacionamentos",
      "Medo de comprometimento",
    ],
    hiddenPattern:
      "Atrai muitos admiradores, mas tem dificuldade para escolher e se aprofundar",
    tarotCards: [
      { name: "🎩 O MAGO", meaning: "Seu poder de comunicação e charme" },
      { name: "⚔️ SETE DE ESPADAS", meaning: "Tendência a fugir quando fica intenso" },
      { name: "💑 OS AMANTES", meaning: "A escolha que precisa fazer" },
    ],
    ritual:
      "Toda quarta-feira (dia de Mercúrio), escreva uma carta de amor para si mesma e leia em voz alta olhando no espelho.",
    weeklyGuidance: [
      { week: 1, guidance: "Pratique a presença total em conversas íntimas" },
      { week: 2, guidance: "Explore suas emoções mais profundas" },
      { week: 3, guidance: "Comprometa-se com uma pessoa ou situação" },
      { week: 4, guidance: "Equilibre liberdade com intimidade" },
    ],
  },
  agua: {
    id: "agua",
    name: "Sereia Emocional",
    icon: Droplet,
    emoji: "🌊",
    color: "#6366F1",
    title: "SEREIA EMOCIONAL",
    description:
      "Você sente o amor com uma profundidade oceânica que poucos conseguem compreender. Sua intuição é um dom, mas cuidado para não se afogar nas próprias emoções...",
    strengths: [
      "Intuição amorosa infalível e profundidade emocional",
      "Empatia e compaixão extraordinárias",
      "Conexão espiritual profunda",
    ],
    challenges: [
      "Pode se perder em fantasias ou dramatizar situações",
      "Absorve emoções alheias facilmente",
      "Dificuldade em estabelecer limites",
    ],
    hiddenPattern:
      "Atrai almas feridas porque quer curar, mas acaba se machucando no processo",
    tarotCards: [
      { name: "🌙 A LUA", meaning: "Sua intuição poderosa e mistério natural" },
      { name: "🍷 QUATRO DE COPAS", meaning: "Apatia emocional por decepções passadas" },
      { name: "⭐ A ESTRELA", meaning: "Esperança e cura que está chegando" },
    ],
    ritual:
      "Toda segunda-feira (dia da Lua), tome um banho com sal grosso e pétalas de rosa, visualizando suas mágoas sendo lavadas.",
    weeklyGuidance: [
      { week: 1, guidance: "Estabeleça limites emocionais saudáveis" },
      { week: 2, guidance: "Confie mais na razão, não só na intuição" },
      { week: 3, guidance: "Comunique seus sentimentos com clareza" },
      { week: 4, guidance: "Pratique o amor próprio antes de dar amor" },
    ],
  },
  fenix: {
    id: "fenix",
    name: "Fênix Transformadora",
    icon: Sparkles,
    emoji: "🔥🦅",
    color: "#EC4899",
    title: "FÊNIX TRANSFORMADORA",
    description:
      "Você é uma força da natureza em constante evolução. Cada relacionamento te transforma, e você tem o dom raro de transformar quem ama. Mas cuidado para não queimar pontes desnecessariamente...",
    strengths: [
      "Capacidade única de transformação e renovação",
      "Resiliência extraordinária",
      "Poder de transformar relacionamentos",
    ],
    challenges: [
      "Instabilidade pode assustar parceiros",
      "Ciclos intensos de transformação",
      "Impaciência com processos lentos",
    ],
    hiddenPattern:
      "Atrai relacionamentos intensos e transformadores, mas nem sempre duradouros",
    tarotCards: [
      { name: "☠️ A MORTE", meaning: "Sua natureza transformadora" },
      { name: "🎡 A RODA DA FORTUNA", meaning: "Ciclos constantes em sua vida amorosa" },
      { name: "☀️ O SOL", meaning: "O amor radiante que você pode manifestar" },
    ],
    ritual:
      "A cada lua nova, queime papéis com padrões antigos que quer liberar e plante sementes de girassol pensando no amor que deseja atrair.",
    weeklyGuidance: [
      { week: 1, guidance: "Identifique quais padrões quer manter ou transformar" },
      { week: 2, guidance: "Pratique a estabilidade sem perder sua essência" },
      { week: 3, guidance: "Comunique suas mudanças ao parceiro" },
      { week: 4, guidance: "Celebre sua evolução e atraia quem te acompanha" },
    ],
  },
};
