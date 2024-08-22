import Image from "next/image";

type StatsCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

export default function StatsCard({
  type,
  count = 0,
  label,
  icon,
}: StatsCardProps) {
  return (
    <div className="flex flex-col gap-6 w-full bg-gradient-to-br from-foreground/15 to-foreground/5 px-5 py-5 rounded-lg drop-shadow-2xl">
      <div className="flex gap-4">
        <Image src={icon} width={32} height={32} alt={type} className="" />
        <h1 className="text-2xl font-semibold">{count}</h1>
      </div>
      <p>{label}</p>
    </div>
  );
}
