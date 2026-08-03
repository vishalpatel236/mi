import React from 'react';
import { Briefcase, Building2, Users, CheckCircle2 } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      id: 'stat-jobs',
      value: '30+',
      label: 'Verified Jobs Active',
      sublabel: 'New opportunities updated weekly across Ontario',
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      colorClass: 'bg-blue-50 border-blue-100'
    },
    {
      id: 'stat-employers',
      value: '400+',
      label: 'Verified Employers',
      sublabel: 'CRA registration confirmed',
      icon: <Building2 className="w-6 h-6 text-emerald-600" />,
      colorClass: 'bg-emerald-50 border-emerald-100'
    },
    {
      id: 'stat-candidates',
      value: '3,800+',
      label: 'Active Candidates',
      sublabel: 'Verified digital badge holders',
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      colorClass: 'bg-indigo-50 border-indigo-100'
    },
    {
      id: 'stat-hiring',
      value: '84%',
      label: 'Successful Placement Rate',
      sublabel: 'Immediate background verification',
      icon: <CheckCircle2 className="w-6 h-6 text-violet-600" />,
      colorClass: 'bg-violet-50 border-violet-100'
    }
  ];

  return (
    <section className="bg-slate-50 py-10 border-b border-slate-200" id="stats-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex items-start space-x-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className={`p-3 rounded-lg ${stat.colorClass} flex-shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <span className="block text-2xl font-black tracking-tight text-slate-950">
                  {stat.value}
                </span>
                <span className="block text-sm font-semibold text-slate-800 mt-0.5">
                  {stat.label}
                </span>
                <span className="block text-xs text-slate-500 mt-0.5">
                  {stat.sublabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
