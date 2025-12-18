import { motion } from "motion/react";
import { Sparkles, Mail, User, Phone } from "lucide-react";
import { useState } from "react";

interface LeadCaptureFormProps {
  onSubmit: (data: { name: string; email: string; whatsapp: string; consent: boolean }) => void;
}

export function LeadCaptureForm({ onSubmit }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    consent: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1F2937] via-[#2D1B4E] to-[#1F2937] text-[#F9FAFB] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-[#6B46C1]/30 shadow-2xl">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              <Sparkles size={60} className="text-[#F59E0B]" />
            </div>
            <h2
              className="text-3xl md:text-4xl mb-4 text-[#F59E0B]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              SEU RESULTADO ESTÁ PRONTO! 🌟
            </h2>
            <p className="text-gray-300 text-lg">
              Para receber sua análise astrológica completa e personalizada,
              preciso apenas de alguns dados:
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-[#F59E0B] mb-2 text-sm flex items-center gap-2">
                <User size={16} />
                Nome Completo *
              </label>
              <input
                type="text"
                required
                minLength={2}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Seu nome completo"
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-[#F9FAFB] placeholder-gray-400 focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/30 transition-all"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-[#F59E0B] mb-2 text-sm flex items-center gap-2">
                <Mail size={16} />
                E-mail *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu@email.com"
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-[#F9FAFB] placeholder-gray-400 focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/30 transition-all"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-[#F59E0B] mb-2 text-sm flex items-center gap-2">
                <Phone size={16} />
                WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="(00) 00000-0000"
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-[#F9FAFB] placeholder-gray-400 focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/30 transition-all"
              />
            </motion.div>

            <motion.div
              className="flex items-start gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-4 h-4 accent-[#EC4899]"
              />
              <label htmlFor="consent" className="text-sm text-gray-300">
                Quero receber conteúdos sobre astrologia e desenvolvimento pessoal
              </label>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6B46C1] to-[#EC4899] text-white py-5 rounded-xl text-xl shadow-lg hover:shadow-[#EC4899]/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              ✨ REVELAR MEU PERFIL ASTRAL ✨
            </motion.button>
          </form>

          {/* Security Note */}
          <motion.p
            className="text-center text-xs text-gray-400 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            🔒 Seus dados estão seguros e protegidos
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
