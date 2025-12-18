import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { profiles, type Profile } from "./profiles";

interface ResultPageProps {
  profile: Profile;
  userName: string;
  userSex?: "feminino" | "masculino";
  whatsappNumber: string;
}

export function ResultPage({ profile: profileData, userName, userSex, whatsappNumber }: ResultPageProps) {
  const profile = profiles[profileData.id] || profiles.fenix;
  const Icon = profile.icon;
  const dear = userSex === "masculino" ? "Querido" : userSex === "feminino" ? "Querida" : "Olá";

  const whatsappMessage = encodeURIComponent(
    `Oi! Acabei de fazer o teste 'Descubra Seu Perfil Amoroso' e meu resultado foi ${profile.name}. Gostaria de saber mais sobre a consulta personalizada! 🌟`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1F2937] via-[#2D1B4E] to-[#1F2937] text-[#F9FAFB] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Icon size={80} className="text-[#F59E0B]" />
          </motion.div>
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: profile.color }}
          >
            {profile.emoji} SEU PERFIL ASTRAL REVELADO {profile.emoji}
          </h1>
          <h2 className="text-3xl md:text-4xl text-[#F9FAFB]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {profile.title}
          </h2>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Greeting */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-[#6B46C1]/30">
            <p className="text-xl leading-relaxed">
              {dear} <span className="text-[#F59E0B]">{userName}</span>,
            </p>
            <p className="text-lg mt-4 leading-relaxed text-gray-300">{profile.description}</p>
          </div>

          {/* Analysis */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-[#6B46C1]/30">
            <h3 className="text-2xl mb-6 text-[#F59E0B]" style={{ fontFamily: "'Playfair Display', serif" }}>
              ANÁLISE DO SEU SIGNO AMOROSO
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-lg">
                  <span className="text-[#10B981]">✨ Força:</span> {profile.strengths[0]}
                </p>
              </div>
              <div>
                <p className="text-lg">
                  <span className="text-[#F59E0B]">⚠️ Desafio:</span> {profile.challenges[0]}
                </p>
              </div>
              <div>
                <p className="text-lg">
                  <span className="text-[#EC4899]">🔍 Padrão oculto:</span> {profile.hiddenPattern}
                </p>
              </div>
            </div>
          </div>

          {/* Tarot Cards */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-[#6B46C1]/30">
            <h3 className="text-2xl mb-6 text-[#F59E0B]" style={{ fontFamily: "'Playfair Display', serif" }}>
              SUAS 3 CARTAS DO AMOR
            </h3>
            <div className="space-y-4">
              {profile.tarotCards.map((card, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <span className="text-2xl">{index + 1}.</span>
                  <div>
                    <p className="text-lg">
                      <span className="text-[#F59E0B]">{card.name}</span> - {card.meaning}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ritual */}
          <div className="bg-gradient-to-br from-[#6B46C1]/20 to-[#EC4899]/20 backdrop-blur-lg rounded-3xl p-8 border border-[#F59E0B]/50">
            <h3 className="text-2xl mb-4 text-[#F59E0B]" style={{ fontFamily: "'Playfair Display', serif" }}>
              ✨ RITUAL DE ATRAÇÃO PERSONALIZADO
            </h3>
            <p className="text-lg leading-relaxed">{profile.ritual}</p>
          </div>

          {/* Weekly Guidance */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-[#6B46C1]/30">
            <h3 className="text-2xl mb-6 text-[#F59E0B]" style={{ fontFamily: "'Playfair Display', serif" }}>
              ORIENTAÇÕES PARA OS PRÓXIMOS 30 DIAS
            </h3>
            <div className="space-y-4">
              {profile.weeklyGuidance.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <span className="text-[#F59E0B]">📅</span>
                  <p>
                    <span className="text-[#EC4899]">Semana {item.week}:</span> {item.guidance}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="bg-gradient-to-r from-[#6B46C1] to-[#EC4899] rounded-3xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              🔮 QUER UMA ANÁLISE AINDA MAIS PROFUNDA?
            </h3>
            <p className="text-lg mb-6 leading-relaxed">
              Seu resultado é apenas o começo da sua jornada de autoconhecimento astrológico!
            </p>
            <p className="mb-6">
              Como astróloga especializada em relacionamentos, posso fazer uma análise COMPLETA e
              personalizada da sua situação amorosa atual, incluindo:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
              <div className="flex items-start gap-2">
                <span>✨</span>
                <span>Mapa astral completo do amor</span>
              </div>
              <div className="flex items-start gap-2">
                <span>💕</span>
                <span>Compatibilidade com parceiros específicos</span>
              </div>
              <div className="flex items-start gap-2">
                <span>🌙</span>
                <span>Influências planetárias dos próximos meses</span>
              </div>
              <div className="flex items-start gap-2">
                <span>🔮</span>
                <span>Orientações personalizadas para sua situação</span>
              </div>
              <div className="flex items-start gap-2">
                <span>💎</span>
                <span>Rituais exclusivos para seu perfil</span>
              </div>
            </div>
            <p className="text-xl mb-6">👇 FALE COMIGO AGORA NO WHATSAPP PARA UMA CONSULTA INDIVIDUAL 👇</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-5 rounded-full text-xl shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle size={24} />
              💬 QUERO MINHA CONSULTA PERSONALIZADA
            </a>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p>✨ Que as estrelas iluminem seu caminho do amor ✨</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
