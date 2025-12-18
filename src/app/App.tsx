import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { QuizQuestion, QuizOption } from "./components/QuizQuestion";
import { ProgressBar } from "./components/ProgressBar";
import { LeadCaptureForm } from "./components/LeadCaptureForm";
import { ResultPage } from "./components/ResultPage";
import { questions } from "./components/quizData";
import { Moon, Heart, Star, Sparkles, Flame, Wind, Droplet, Sprout } from "lucide-react";
import { saveLead } from "@/lib/firestore/leads";
import { sendQuizResultEmailViaAppsScript } from "@/lib/email/appsScript";

type Screen = "landing" | "quiz" | "leadCapture" | "result";

interface Scores {
  fogo: number;
  terra: number;
  ar: number;
  agua: number;
}

interface UserData {
  name: string;
  birthFullName?: string;
  sex?: "feminino" | "masculino";
  email: string;
  whatsapp: string;
  birthDate?: string;
  birthTime?: string;
  birthCity?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({ fogo: 0, terra: 0, ar: 0, agua: 0 });
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [profileResult, setProfileResult] = useState<string>("fenix");

  const handleStartQuiz = () => {
    setCurrentScreen("quiz");
  };

  const normalizeSex = (value: unknown): UserData["sex"] => {
    if (value == null) return undefined;
    const v = String(value).trim().toLowerCase();
    if (v === "masculino" || v === "m") return "masculino";
    if (v === "feminino" || v === "f") return "feminino";
    return undefined;
  };

  const handleAnswer = (answer: QuizOption | any) => {
    // If it's form data (question 1), store user info
    if (answer.fullName) {
      const sex = normalizeSex(answer.sex);
      setUserData((prev) => ({
        ...prev,
        name: String(answer.fullName),
        birthFullName: String(answer.fullName),
        sex,
        birthDate: answer.birthDate ? String(answer.birthDate) : undefined,
        birthTime: answer.birthTime ? String(answer.birthTime) : undefined,
        birthCity: answer.birthCity ? String(answer.birthCity) : undefined,
      }));
    }

    // If it's a multiple choice answer, update scores
    if (answer.scores) {
      const newScores = { ...scores };
      Object.entries(answer.scores).forEach(([element, points]) => {
        newScores[element as keyof Scores] += points as number;
      });
      setScores(newScores);
    }

    // Move to next question or lead capture
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, show lead capture form
      setCurrentScreen("leadCapture");
    }
  };

  const determineProfile = (finalScores: Scores): string => {
    const maxScore = Math.max(...Object.values(finalScores));
    const dominantElements = Object.keys(finalScores).filter(
      (element) => finalScores[element as keyof Scores] === maxScore
    );

    // If there's a tie or mixed scores, return fenix
    if (dominantElements.length > 1 || maxScore < 15) {
      return "fenix";
    }

    return dominantElements[0];
  };

  const handleLeadCapture = (data: {
    name: string;
    email: string;
    whatsapp: string;
    consent: boolean;
  }) => {
    const birthFullName = userData.birthFullName ?? userData.name;
    const userSex = userData.sex;
    setUserData((prev) => ({
      ...prev,
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
    }));

    // Determine final profile
    const profileId = determineProfile(scores);
    setProfileResult(profileId);

    // Persist lead (non-blocking; keep UX unchanged)
    void (async () => {
      try {
        try {
          await saveLead({
            contact: {
              name: data.name,
              email: data.email,
              whatsapp: data.whatsapp,
            },
            consent: data.consent,
            birth: {
              fullName: birthFullName,
              date: userData.birthDate,
              time: userData.birthTime,
              city: userData.birthCity,
            },
            quiz: {
              scores,
              profileId,
            },
          });
        } catch (err) {
          console.error("Failed to save lead to Firestore", err);
        }

        // Optional: send result email via Google Apps Script webhook (works on Firebase free plan)
        if (import.meta.env.VITE_EMAIL_WEBHOOK_URL?.trim()) {
          try {
            await sendQuizResultEmailViaAppsScript({
              to: data.email,
              name: data.name,
              profileId,
              scores,
              whatsappBusinessNumber: import.meta.env.VITE_WHATSAPP_BUSINESS_NUMBER?.trim(),
              sex: userSex,
            });
          } catch (err) {
            console.error("Failed to send quiz result email (Apps Script)", err);
          }
        }
      } catch (err) {
        console.error("Lead capture background task failed", err);
      }
    })();

    // Show result
    setCurrentScreen("result");

    // In a real application, you would send this data to your backend/email service
    console.log("Lead captured:", {
      ...data,
      scores,
      profile: profileId,
      birthDate: userData.birthDate,
      birthCity: userData.birthCity,
    });
  };

  const getQuestionIcon = (questionId: number) => {
    const icons = [
      <Star size={50} className="text-[#F59E0B]" />,
      <Heart size={50} className="text-[#EC4899]" />,
      <Moon size={50} className="text-[#6B46C1]" />,
      <Flame size={50} className="text-[#F59E0B]" />,
      <Sparkles size={50} className="text-[#EC4899]" />,
      <Heart size={50} className="text-[#6B46C1]" />,
      <Moon size={50} className="text-[#F59E0B]" />,
      <Star size={50} className="text-[#EC4899]" />,
      <Sparkles size={50} className="text-[#6B46C1]" />,
      <Heart size={50} className="text-[#F59E0B]" />,
    ];
    return icons[questionId - 1] || <Star size={50} className="text-[#F59E0B]" />;
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {currentScreen === "landing" && <LandingPage onStart={handleStartQuiz} />}

      {currentScreen === "quiz" && (
        <div className="min-h-screen bg-gradient-to-b from-[#1F2937] via-[#2D1B4E] to-[#1F2937] text-[#F9FAFB] py-12 px-4">
          {/* Floating background stars */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-[#F59E0B]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                ✨
              </div>
            ))}
          </div>

          <div className="container mx-auto max-w-4xl relative z-10">
            <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
            <QuizQuestion
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              icon={getQuestionIcon(questions[currentQuestionIndex].id)}
            />
          </div>
        </div>
      )}

      {currentScreen === "leadCapture" && <LeadCaptureForm onSubmit={handleLeadCapture} />}

      {currentScreen === "result" && (
        <ResultPage
          profile={{ id: profileResult } as any}
          userName={userData.name}
          userSex={userData.sex}
          whatsappNumber={
            import.meta.env.VITE_WHATSAPP_BUSINESS_NUMBER?.trim() || userData.whatsapp
          }
        />
      )}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
