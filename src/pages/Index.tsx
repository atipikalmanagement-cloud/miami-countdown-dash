import { useState, useEffect, useCallback } from "react";
import { Plane, Target, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CountdownTimer from "@/components/CountdownTimer";
import ProgressRing from "@/components/ProgressRing";
import AddPartnerDialog from "@/components/AddPartnerDialog";
import MonthlyBreakdown from "@/components/MonthlyBreakdown";
import PartnersList from "@/components/PartnersList";
import miamiImg from "@/assets/miami-prize.jpg";

const GOAL = 180;
const MONTHLY_GOAL = 20;

interface Partner {
  id: string;
  name: string;
  month: string;
}

const Index = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPartners = useCallback(async () => {
    const { data, error } = await supabase
      .from("partners")
      .select("id, name, month")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Erro ao carregar parceiros");
      console.error(error);
    } else {
      setPartners(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPartners();

    const channel = supabase
      .channel("partners-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "partners" }, () => {
        fetchPartners();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPartners]);

  const addPartner = async (partner: { name: string; month: string }) => {
    const { error } = await supabase.from("partners").insert({ name: partner.name, month: partner.month });
    if (error) {
      toast.error("Erro ao adicionar parceiro");
      console.error(error);
    }
  };

  const removePartner = async (index: number) => {
    const partner = partners[index];
    const { error } = await supabase.from("partners").delete().eq("id", partner.id);
    if (error) {
      toast.error("Erro ao remover parceiro");
      console.error(error);
    }
  };

  const countByMonth = (month: string) => partners.filter((p) => p.month === month).length;
  const total = partners.length;
  const remaining = Math.max(0, GOAL - total);

  const months = [
    { label: "Abril", current: countByMonth("april"), goal: MONTHLY_GOAL },
    { label: "Maio", current: countByMonth("may"), goal: MONTHLY_GOAL },
    { label: "Junho", current: countByMonth("june"), goal: MONTHLY_GOAL },
    { label: "Julho", current: countByMonth("july"), goal: MONTHLY_GOAL },
    { label: "Agosto", current: countByMonth("august"), goal: MONTHLY_GOAL },
    { label: "Setembro", current: countByMonth("september"), goal: MONTHLY_GOAL },
    { label: "Outubro", current: countByMonth("october"), goal: MONTHLY_GOAL },
    { label: "Novembro", current: countByMonth("november"), goal: MONTHLY_GOAL },
    { label: "Dezembro", current: countByMonth("december"), goal: MONTHLY_GOAL },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground animate-pulse text-lg">A carregar...</div>
      </div>
    );
  }

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
            <span className="font-semibold">Challenge Q4 2026</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col items-center gap-8 sm:gap-10">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            <span className="gold-text">180 Parceiros</span> em 9 Meses
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
              Batam a meta de 180 parceiros e a equipa inteira voa para Miami! 🏖️
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
