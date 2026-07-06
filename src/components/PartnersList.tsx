import { Users, X } from "lucide-react";

interface Partner {
  name: string;
  month: string;
}

const MONTH_LABELS: Record<string, string> = {
  april: "Abril",
  may: "Maio",
  june: "Junho",
  july: "Julho",
  august: "Agosto",
  september: "Setembro",
  october: "Outubro",
  november: "Novembro",
  december: "Dezembro",
};

interface PartnersListProps {
  partners: Partner[];
  onRemove: (index: number) => void;
}

const PartnersList = ({ partners, onRemove }: PartnersListProps) => {
  if (partners.length === 0) return null;

  return (
    <div className="w-full rounded-xl border border-border bg-secondary p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
          Parceiros Fechados ({partners.length})
        </h3>
      </div>
      <div className="grid gap-2 max-h-[200px] overflow-y-auto pr-1">
        {partners.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-background px-3 py-2 text-sm animate-count-up"
          >
            <span className="font-medium">{p.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{MONTH_LABELS[p.month]}</span>
              <button
                onClick={() => onRemove(i)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersList;
