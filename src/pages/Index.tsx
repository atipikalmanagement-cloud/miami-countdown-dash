import { useState, useEffect } from "react";
import { Plane, Target, Trophy } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import ProgressRing from "@/components/ProgressRing";
import AddPartnerDialog from "@/components/AddPartnerDialog";
import MonthlyBreakdown from "@/components/MonthlyBreakdown";
import PartnersList from "@/components/PartnersList";
import miamiImg from "@/assets/miami-prize.jpg";

const GOAL = 60;
const MONTHLY_GOAL = 20;

interface Partner {
  name: string;
  month: string;
}

const STORAGE_KEY = "dr-partners";

const loadPartners = (): Partner[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const Index = () => {
  const [partners, setPartners] = useState<Partner[]>(loadPartners);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(partners));
  }, [partners]);

  const addPartner = (partner: Partner) => {
    setPartners((prev) => [...prev, partner]);
  };

  const removePartner = (index: number) => {
    setPartners((prev) => prev.filter((_, i) => i !== index));
  };

  const countByMonth = (month: string) => partners.filter((p) => p.month === month).length;
  const total = partners.length;
  const remaining = Math.max(0, GOAL - total);

  const months = [
    { label: "Abril", current: countByMonth("april"), goal: MONTHLY_GOAL },
    { label: "Maio", current: countByMonth("may"), goal: MONTHLY_GOAL },
    { label: "Junho", current: countByMonth("june"), goal: MONTHLY_GOAL },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border py-4 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-black tracking-tight gold-text">DIGITAL</span>
            <span className="text-lg sm:text-xl font-black tracking-tight text-foreground">REVOLUTION</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Target className="h-4 w-4 text-primary" />
            <span className="font-semibold">Challenge Q2 2026</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col items-center gap-8 sm:gap-10">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            <span className="gold-text">60 Parceiros</span> em 3 Meses
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto">
            Tempo restante para bater a meta e ganhar a viagem a <span className="text-primary font-semibold">Miami</span> 🌴
          </p>
        </div>

        {/* Countdown */}
        <CountdownTimer />

        {/* Progress + Action */}
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
          <ProgressRing current={total} goal={GOAL} label="Total" />
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <span className="text-5xl sm:text-6xl font-black gold-text">{remaining}</span>
              <p className="text-sm text-muted-foreground font-medium mt-1">parceiros restantes</p>
            </div>
            <AddPartnerDialog onAdd={addPartner} />
          </div>
        </div>

        {/* Monthly Breakdown */}
        <MonthlyBreakdown months={months} />

        {/* Partners List */}
        <PartnersList partners={partners} onRemove={removePartner} />

        {/* Miami Prize Banner */}
        <div className="w-full rounded-2xl overflow-hidden border border-border relative group">
          <img
            src={miamiImg}
            alt="Miami Beach - O grande prémio"
            className="w-full h-48 sm:h-64 object-cover brightness-50 group-hover:brightness-75 transition-all duration-500"
            width={1920}
            height={768}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <div className="flex items-center gap-2 mb-2">
              <Plane className="h-6 w-6 text-primary" />
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black gold-text">Destino: Miami</h2>
            <p className="text-foreground/80 text-sm sm:text-base mt-1 max-w-md">
              Batam a meta de 60 parceiros e a equipa inteira voa para Miami! 🏖️
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
