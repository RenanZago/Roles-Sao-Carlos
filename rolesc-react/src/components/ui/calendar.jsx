import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    components: userComponents,
    ...props
}) {
    const defaultClassNames = {
        months: "relative flex flex-col sm:flex-row gap-4",
        month: "w-full",
        month_caption: "relative mx-10 mb-3 flex h-9 items-center justify-center z-20",
        caption_label: "text-base font-semibold capitalize text-foreground",
        nav: "absolute top-0 flex w-full justify-between z-10",
        button_previous: cn(
            buttonVariants({ variant: "ghost" }),
            "size-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent p-0 transition-all",
        ),
        button_next: cn(
            buttonVariants({ variant: "ghost" }),
            "size-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent p-0 transition-all",
        ),
        weekday: "size-10 p-0 text-xs font-semibold text-muted-foreground uppercase",
        day_button:
            "relative flex size-10 items-center justify-center whitespace-nowrap rounded-full p-0 text-foreground transition-all duration-150 focus:outline-none hover:bg-accent group-data-[selected]:bg-primary group-data-[selected]:text-primary-foreground group-data-[selected]:font-semibold group-data-[disabled]:text-foreground/30 group-data-[disabled]:cursor-not-allowed group-data-[outside]:text-foreground/30 group-data-[outside]:group-data-[selected]:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group-[.range-start:not(.range-end)]:rounded-r-none group-[.range-end:not(.range-start)]:rounded-l-none group-[.range-middle]:rounded-none group-data-[selected]:group-[.range-middle]:bg-primary/15 group-data-[selected]:group-[.range-middle]:text-foreground group-data-[selected]:group-[.range-middle]:font-normal",
        day: "group size-10 px-0 text-sm",
        range_start: "range-start",
        range_end: "range-end",
        range_middle: "range-middle",
        today:
            "*:after:pointer-events-none *:after:absolute *:after:bottom-1.5 *:after:start-1/2 *:after:z-10 *:after:size-1 *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-primary [&[data-selected]:not(.range-middle)>*]:after:bg-white [&[data-disabled]>*]:after:bg-foreground/30 *:after:transition-colors",
        outside: "text-muted-foreground/50",
        hidden: "invisible",
        week_number: "size-10 p-0 text-xs font-medium text-muted-foreground",
    };

    const mergedClassNames = Object.keys(defaultClassNames).reduce(
        (acc, key) => ({
            ...acc,
            [key]: classNames?.[key]
                ? cn(defaultClassNames[key], classNames[key])
                : defaultClassNames[key],
        }),
        {}
    );

    const defaultComponents = {
        Chevron: (props) => {
            if (props.orientation === "left") {
                return <ChevronLeft size={18} strokeWidth={2.5} {...props} aria-hidden="true" />;
            }
            return <ChevronRight size={18} strokeWidth={2.5} {...props} aria-hidden="true" />;
        },
    };

    const mergedComponents = {
        ...defaultComponents,
        ...userComponents,
    };

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("w-fit p-3", className)}
            classNames={mergedClassNames}
            components={mergedComponents}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
