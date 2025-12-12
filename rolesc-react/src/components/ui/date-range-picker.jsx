import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

function DateRangePicker({ dateRange, onDateRangeChange, className }) {
    const [open, setOpen] = useState(false);

    const handleSelect = (range) => {
        onDateRangeChange(range);
        if (range?.from && range?.to) {
            setOpen(false);
        }
    };

    return (
        <div className={cn("w-full", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "group w-full h-12 justify-between bg-white px-4 font-normal text-base",
                            "border-gray-200 rounded-xl shadow-sm",
                            "hover:bg-gray-50 hover:border-primary/50",
                            "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
                            "transition-all duration-200",
                            !dateRange && "text-gray-400",
                        )}
                    >
                        <span className={cn(
                            "truncate font-medium",
                            dateRange?.from ? "text-foreground" : "text-gray-400"
                        )}>
                            {dateRange?.from ? (
                                dateRange.to ? (
                                    <>
                                        {format(dateRange.from, "dd MMM", { locale: ptBR })} → {format(dateRange.to, "dd MMM, yyyy", { locale: ptBR })}
                                    </>
                                ) : (
                                    format(dateRange.from, "dd 'de' MMMM, yyyy", { locale: ptBR })
                                )
                            ) : (
                                "📅 Selecione o período"
                            )}
                        </span>
                        <CalendarDays
                            size={20}
                            strokeWidth={2}
                            className={cn(
                                "shrink-0 transition-colors duration-200",
                                dateRange?.from ? "text-primary" : "text-gray-400",
                                "group-hover:text-primary"
                            )}
                            aria-hidden="true"
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0 rounded-2xl border-gray-200 shadow-xl"
                    align="center"
                    sideOffset={8}
                >
                    <div className="p-4 bg-gradient-to-b from-gray-50/50 to-white rounded-2xl">
                        <Calendar
                            mode="range"
                            selected={dateRange}
                            onSelect={handleSelect}
                            locale={ptBR}
                            numberOfMonths={1}
                            className="!p-0"
                        />
                        {dateRange?.from && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <button
                                    onClick={() => onDateRangeChange(undefined)}
                                    className="w-full py-2 text-sm text-gray-500 hover:text-primary transition-colors"
                                >
                                    Limpar seleção
                                </button>
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export { DateRangePicker };
