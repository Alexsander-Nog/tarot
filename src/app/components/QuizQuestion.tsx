import { motion } from "motion/react";
import { ReactNode } from "react";

export interface QuizOption {
  id: string;
  text: string;
  emoji: string;
  scores: {
    fogo?: number;
    terra?: number;
    ar?: number;
    agua?: number;
  };
}

export interface Question {
  id: number;
  text: string;
  type: "multiple-choice" | "form";
  options?: QuizOption[];
  fields?: {
    name: string;
    type: string;
    label: string;
    required: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
  }[];
}

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
  icon?: ReactNode;
}

export function QuizQuestion({ question, onAnswer, icon }: QuizQuestionProps) {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {};
    
    question.fields?.forEach((field) => {
      data[field.name] = formData.get(field.name);
    });
    
    onAnswer(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-[#6B46C1]/30 shadow-2xl">
        {/* Question Header */}
        <div className="text-center mb-8">
          {icon && (
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              {icon}
            </motion.div>
          )}
          <motion.h2
            className="text-2xl md:text-3xl text-[#F9FAFB] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {question.text}
          </motion.h2>
        </div>

        {/* Multiple Choice Options */}
        {question.type === "multiple-choice" && question.options && (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={option.id}
                onClick={() => onAnswer(option)}
                className="w-full text-left p-5 bg-white/10 hover:bg-gradient-to-r hover:from-[#6B46C1]/30 hover:to-[#EC4899]/30 rounded-2xl border border-white/20 hover:border-[#F59E0B] transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="text-[#F9FAFB] flex-1 group-hover:text-[#F59E0B] transition-colors">
                    {option.text}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Form Fields */}
        {question.type === "form" && question.fields && (
          <motion.form
            onSubmit={handleFormSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {question.fields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <label className="block text-[#F59E0B] mb-2 text-sm">
                  {field.label}
                  {field.required && <span className="text-[#EC4899]"> *</span>}
                </label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    required={field.required}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-[#F9FAFB] focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/30 transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-black">
                      {field.placeholder ?? "Selecione"}
                    </option>
                    {(field.options ?? []).map((opt) => (
                      <option key={opt.value} value={opt.value} className="text-black">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-[#F9FAFB] placeholder-gray-400 focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/30 transition-all"
                  />
                )}
              </motion.div>
            ))}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6B46C1] to-[#EC4899] text-white py-4 rounded-xl hover:shadow-lg hover:shadow-[#EC4899]/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continuar ✨
            </motion.button>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
}
