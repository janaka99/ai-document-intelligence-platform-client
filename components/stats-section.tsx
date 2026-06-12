"use client";

import { FileText, CheckCircle, Zap, Clock } from "lucide-react";

interface StatItem {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  description?: string;
}

interface StatsSectionProps {
  totalDocuments: number;
  trainedDocuments: number;
  totalSize: string;
  trainingInProgress: number;
}

export function StatsSection({
  totalDocuments,
  trainedDocuments,
  totalSize,
  trainingInProgress,
}: StatsSectionProps) {
  const stats: StatItem[] = [
    {
      label: "Total Documents",
      value: totalDocuments,
      icon: <FileText className="w-5 h-5" />,
      color: "text-blue-400",
      description: "All uploaded documents",
    },
    {
      label: "Trained & Ready",
      value: trainedDocuments,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-green-400",
      description: "Ready for chat",
    },
    {
      label: "Storage Used",
      value: totalSize,
      icon: <Zap className="w-5 h-5" />,
      color: "text-purple-400",
      description: "Total file size",
    },
    {
      label: "Training in Progress",
      value: trainingInProgress,
      icon: <Clock className="w-5 h-5" />,
      color: "text-orange-400",
      description: "Currently processing",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              {stat.description && (
                <p className="text-xs text-muted-foreground mt-2">
                  {stat.description}
                </p>
              )}
            </div>
            <div className={`${stat.color} opacity-80`}>{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
