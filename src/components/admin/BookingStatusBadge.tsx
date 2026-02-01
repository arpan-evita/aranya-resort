import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/types/booking";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  new_enquiry: {
    label: "New Enquiry",
    className: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100",
  },
  pending_confirmation: {
    label: "Pending",
    className: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
  },
  completed: {
    label: "Completed",
    className: "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-100",
  },
};

export function BookingStatusBadge({ status, className }: BookingStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.new_enquiry;

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium text-xs px-2.5 py-0.5",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
