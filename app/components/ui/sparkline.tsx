"use client";

import { useId } from "react";

export function Sparkline({
  data,
  trend,
  surface = "#ffffff",
  className,
}: {
  data: number[];
  trend: "up" | "down";
  surface?: string;
  className?: string;
}) {
  const id = useId();
  const width = 100;
  const height = 36;
  const padY = 4;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - padY - ((value - min) / range) * (height - padY * 2);
    return [x, y] as const;
  });

  let linePath = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const midX = (x0 + x1) / 2;
    const midY = (y0 + y1) / 2;
    linePath += ` Q ${x0},${y0} ${midX},${midY}`;
  }
  const [lastX, lastY] = points[points.length - 1];
  linePath += ` T ${lastX},${lastY}`;

  const areaPath = `${linePath} L ${lastX},${height} L ${points[0][0]},${height} Z`;

  const accent = trend === "up" ? "#059669" : "#e11d48";
  const fillGradientId = `spark-fill-${id}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Trend sparkline, ${trend === "up" ? "trending up" : "trending down"}`}
    >
      <defs>
        <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${fillGradientId})`} stroke="none" />
      <path d={linePath} fill="none" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r={4} fill={accent} stroke={surface} strokeWidth={2} />
    </svg>
  );
}
