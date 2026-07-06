import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface AddPartnerDialogProps {
  onAdd: (partner: { name: string; month: string }) => void;
}

const MONTHS = [
  { value: "april", label: "Abril" },
  { value: "may", label: "Maio" },
  { value: "june", label: "Junho" },
  { value: "july", label: "Julho" },
  { value: "august", label: "Agosto" },
  { value: "september", label: "Setembro" },
  { value: "october", label: "Outubro" },
  { value: "november", label: "Novembro" },
  { value: "december", label: "Dezembro" },
];

const AddPartnerDialog = ({ onAdd }: AddPartnerDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");

  const getCurrentMonth = () => {
    const now = new Date();
    const m = now.getMonth();
    const map: Record<number, string> = {
      3: "april",
      4: "may",
      5: "june",
      6: "july",
      7: "august",
      8: "september",
      9: "october",
      10: "november",
      11: "december",
    };
    return map[m] ?? "april";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Insere o nome do parceiro");
      return;
    }
    const selectedMonth = month || getCurrentMonth();
    onAdd({ name: name.trim(), month: selectedMonth });
    toast.success(`🎉 ${name.trim()} adicionado com sucesso!`);
    setName("");
    setMonth("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gold-gradient font-bold text-base gap-2 pulse-gold px-8">
          <Plus className="h-5 w-5" />
          Novo Parceiro Fechado
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Adicionar Novo Parceiro</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="partner-name">Nome do Parceiro</Label>
            <Input
              id="partner-name"
              placeholder="Ex: Imobiliária XYZ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary border-border"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label>Mês</Label>
            <Select value={month || getCurrentMonth()} onValueChange={setMonth}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full gold-gradient font-bold text-base">
            Confirmar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPartnerDialog;
