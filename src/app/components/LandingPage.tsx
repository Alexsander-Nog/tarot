import { motion } from "motion/react";
import { Sparkles, Heart, Moon, Star } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1F2937] via-[#2D1B4E] to-[#1F2937] text-[#F9FAFB] relative overflow-hidden">
      {/* Floating stars animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#F59E0B] opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles size={12 + Math.random() * 8} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header Icons */}
          <motion.div
            className="flex justify-center gap-6 mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Moon className="text-[#EC4899]" size={40} />
            <Star className="text-[#F59E0B]" size={40} />
            <Heart className="text-[#EC4899]" size={40} />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl md:text-6xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-[#F59E0B]">TESTE REVELADOR:</span>
            <br />
            Qual Seu{" "}
            <span className="text-[#EC4899]">VERDADEIRO</span> Perfil Amoroso
            <br />
            Segundo as Estrelas?
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Em apenas <span className="text-[#F59E0B]">3 minutos</span>, descubra os segredos que seu
            mapa astral esconde sobre sua vida amorosa - e por que você sempre
            atrai os mesmos padrões...
          </motion.p>

          {/* Image Placeholder */}
          <motion.div
            className="mb-8 relative h-64 md:h-80 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#6B46C1] via-[#EC4899] to-[#F59E0B] opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Moon size={80} className="mx-auto mb-4 text-[#F59E0B]" />
                <p className="text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Olhe para as estrelas e descubra seu destino
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={onStart}
            className="bg-gradient-to-r from-[#6B46C1] to-[#EC4899] text-white px-8 py-5 rounded-full text-xl shadow-2xl hover:shadow-[#EC4899]/50 transition-all duration-300 transform hover:scale-105 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌟 INICIAR TESTE GRATUITO AGORA 🌟
          </motion.button>

          {/* Social Proof */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <div className="flex items-center justify-center gap-2 text-[#F59E0B]">
              <Sparkles size={20} />
              <p className="text-sm md:text-base">
                Mais de 50.000 mulheres já descobriram seus segredos astrológicos
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-[#EC4899]">
              <Moon size={20} />
              <p className="text-sm md:text-base">
                Análise baseada em astrologia ancestral
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-[#6B46C1]">
              <Heart size={20} />
              <p className="text-sm md:text-base">
                Resultado personalizado em seu e-mail
              </p>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            className="mt-12 grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {[
              {
                name: "Ana Carolina",
                text: "Incrível! Descobri padrões que eu nem sabia que existiam 💕",
              },
              {
                name: "Mariana Silva",
                text: "Esse teste mudou minha forma de ver relacionamentos ✨",
              },
              {
                name: "Júlia Santos",
                text: "Muito preciso! Me identifiquei totalmente com o resultado 🌙",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-[#6B46C1]/30"
              >
                <p className="text-sm italic mb-2">"{testimonial.text}"</p>
                <p className="text-xs text-[#F59E0B]">- {testimonial.name}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
