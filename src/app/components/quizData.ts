import { Question } from "./QuizQuestion";

export const questions: Question[] = [
  {
    id: 1,
    text: "Para começarmos sua jornada cósmica, preciso conhecer sua essência astral:",
    type: "form",
    fields: [
      {
        name: "fullName",
        type: "text",
        label: "Nome completo",
        required: true,
        placeholder: "Seu nome completo",
      },
      {
        name: "sex",
        type: "select",
        label: "Seu sexo",
        required: true,
        placeholder: "Selecione",
        options: [
          { value: "feminino", label: "Feminino" },
          { value: "masculino", label: "Masculino" },
        ],
      },
      {
        name: "birthDate",
        type: "date",
        label: "Data de nascimento",
        required: true,
      },
      {
        name: "birthTime",
        type: "time",
        label: "Horário de nascimento (opcional)",
        required: false,
      },
      {
        name: "birthCity",
        type: "text",
        label: "Cidade natal",
        required: true,
        placeholder: "Cidade onde você nasceu",
      },
    ],
  },
  {
    id: 2,
    text: "Como está sua vida amorosa neste momento?",
    type: "multiple-choice",
    options: [
      {
        id: "2a",
        emoji: "💔",
        text: "Solteiro(a) e procurando alguém especial",
        scores: { fogo: 2, ar: 1 },
      },
      {
        id: "2b",
        emoji: "😔",
        text: "Em um relacionamento, mas com dificuldades",
        scores: { agua: 2, terra: 1 },
      },
      {
        id: "2c",
        emoji: "💕",
        text: "Em um relacionamento feliz, mas quero aprofundar",
        scores: { terra: 2, agua: 1 },
      },
      {
        id: "2d",
        emoji: "🌪️",
        text: "Saindo de um término recente",
        scores: { agua: 2, fogo: 1 },
      },
      {
        id: "2e",
        emoji: "🦋",
        text: "Focado(a) em mim mesmo(a) no momento",
        scores: { ar: 2, terra: 1 },
      },
    ],
  },
  {
    id: 3,
    text: "Qual padrão você mais identifica em seus relacionamentos?",
    type: "multiple-choice",
    options: [
      {
        id: "3a",
        emoji: "😓",
        text: "Sempre acabo me doando demais e sendo pouco valorizado(a)",
        scores: { agua: 3 },
      },
      {
        id: "3b",
        emoji: "🛡️",
        text: "Tenho dificuldade para confiar e me abrir completamente",
        scores: { terra: 3 },
      },
      {
        id: "3c",
        emoji: "🚪",
        text: "Atraio pessoas emocionalmente indisponíveis",
        scores: { ar: 3 },
      },
      {
        id: "3d",
        emoji: "✨",
        text: "Idealizo muito o amor e depois me decepciono",
        scores: { fogo: 3 },
      },
      {
        id: "3e",
        emoji: "🏃‍♀️",
        text: "Tenho medo de me comprometer de verdade",
        scores: { ar: 2, fogo: 1 },
      },
    ],
  },
  {
    id: 4,
    text: "Em situações de conflito amoroso, você costuma:",
    type: "multiple-choice",
    options: [
      {
        id: "4a",
        emoji: "🔥",
        text: "Agir por impulso e confrontar na hora",
        scores: { fogo: 3 },
      },
      {
        id: "4b",
        emoji: "🤔",
        text: "Analisar muito antes de tomar qualquer decisão",
        scores: { terra: 3 },
      },
      {
        id: "4c",
        emoji: "💬",
        text: "Tentar conversar e encontrar um meio termo",
        scores: { ar: 3 },
      },
      {
        id: "4d",
        emoji: "🌊",
        text: "Se fechar e processar internamente",
        scores: { agua: 3 },
      },
    ],
  },
  {
    id: 5,
    text: "Como você demonstra amor?",
    type: "multiple-choice",
    options: [
      {
        id: "5a",
        emoji: "🏠",
        text: "Através de gestos práticos e cuidado no dia a dia",
        scores: { terra: 2, agua: 1 },
      },
      {
        id: "5b",
        emoji: "💭",
        text: "Com palavras de afirmação e conversas profundas",
        scores: { ar: 2, agua: 1 },
      },
      {
        id: "5c",
        emoji: "🤗",
        text: "Por meio de toque físico e presença constante",
        scores: { agua: 2, fogo: 1 },
      },
      {
        id: "5d",
        emoji: "🎁",
        text: "Criando momentos especiais e surpresas românticas",
        scores: { fogo: 2, ar: 1 },
      },
    ],
  },
  {
    id: 6,
    text: "Qual é seu maior medo em relacionamentos?",
    type: "multiple-choice",
    options: [
      {
        id: "6a",
        emoji: "😨",
        text: "Ser abandonado(a) ou traído(a)",
        scores: { agua: 2, terra: 1 },
      },
      {
        id: "6b",
        emoji: "🔗",
        text: "Perder minha independência e liberdade",
        scores: { ar: 2, fogo: 1 },
      },
      {
        id: "6c",
        emoji: "🎭",
        text: "Não ser amada pelo que realmente sou",
        scores: { agua: 2, ar: 1 },
      },
      {
        id: "6d",
        emoji: "🔄",
        text: "Repetir os mesmos erros do passado",
        scores: { terra: 2, agua: 1 },
      },
      {
        id: "6e",
        emoji: "👑",
        text: "Não encontrar alguém à minha altura",
        scores: { fogo: 2, ar: 1 },
      },
    ],
  },
  {
    id: 7,
    text: "Que tipo de pessoa você sempre acaba atraindo?",
    type: "multiple-choice",
    options: [
      {
        id: "7a",
        emoji: "👑",
        text: "Pessoas dominantes e controladoras",
        scores: { agua: 2, terra: 1 },
      },
      {
        id: "7b",
        emoji: "🥺",
        text: "Pessoas carentes e dependentes emocionais",
        scores: { fogo: 2, terra: 1 },
      },
      {
        id: "7c",
        emoji: "🌫️",
        text: "Pessoas distantes e misteriosas",
        scores: { ar: 2, agua: 1 },
      },
      {
        id: "7d",
        emoji: "🎭",
        text: "Pessoas instáveis e dramáticas",
        scores: { fogo: 2, agua: 1 },
      },
      {
        id: "7e",
        emoji: "🚫",
        text: "Pessoas comprometidas ou indisponíveis",
        scores: { ar: 2, fogo: 1 },
      },
    ],
  },
  {
    id: 8,
    text: "Em qual fase da lua você se sente mais poderosa?",
    type: "multiple-choice",
    options: [
      {
        id: "8a",
        emoji: "🌑",
        text: "Lua Nova - momento de recomeços",
        scores: { terra: 2, agua: 1 },
      },
      {
        id: "8b",
        emoji: "🌓",
        text: "Lua Crescente - tempo de crescimento",
        scores: { fogo: 2, terra: 1 },
      },
      {
        id: "8c",
        emoji: "🌕",
        text: "Lua Cheia - pico de energia feminina",
        scores: { fogo: 2, agua: 1 },
      },
      {
        id: "8d",
        emoji: "🌗",
        text: "Lua Minguante - período de reflexão",
        scores: { agua: 2, ar: 1 },
      },
    ],
  },
  {
    id: 9,
    text: "Quando conhece alguém novo, em que mais presta atenção?",
    type: "multiple-choice",
    options: [
      {
        id: "9a",
        emoji: "👁️",
        text: "No olhar e na energia que a pessoa transmite",
        scores: { agua: 2, fogo: 1 },
      },
      {
        id: "9b",
        emoji: "🤝",
        text: "Na forma como ela trata outras pessoas",
        scores: { terra: 2, agua: 1 },
      },
      {
        id: "9c",
        emoji: "🧠",
        text: "Na conversa e conexão mental",
        scores: { ar: 2, terra: 1 },
      },
      {
        id: "9d",
        emoji: "⚡",
        text: "Na química física e atração imediata",
        scores: { fogo: 2, agua: 1 },
      },
    ],
  },
  {
    id: 10,
    text: "O que você mais deseja em sua vida amorosa agora?",
    type: "multiple-choice",
    options: [
      {
        id: "10a",
        emoji: "💫",
        text: "Encontrar minha alma gêmea",
        scores: { agua: 2, ar: 1 },
      },
      {
        id: "10b",
        emoji: "🩹",
        text: "Curar feridas do passado",
        scores: { terra: 2, agua: 1 },
      },
      {
        id: "10c",
        emoji: "💪",
        text: "Fortalecer meu relacionamento atual",
        scores: { terra: 2, fogo: 1 },
      },
      {
        id: "10d",
        emoji: "🪞",
        text: "Aprender a me amar primeiro",
        scores: { ar: 2, terra: 1 },
      },
      {
        id: "10e",
        emoji: "🎯",
        text: "Atrair alguém específico",
        scores: { fogo: 2, ar: 1 },
      },
    ],
  },
];
