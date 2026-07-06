import { ClipboardList } from "lucide-react";
import { BookingsTable } from "./bookings-table";

export default function MyBookingsPage() {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <ClipboardList size={19} />
        </span>
        <div>
          <h1 className="text-lg font-bold text-slate-900">My Bookings</h1>
          <p className="text-sm text-slate-500">All flight, hotel, holiday, railway &amp; utility bookings in one place.</p>
        </div>
      </div>

      <BookingsTable />
    </div>
  );
}
