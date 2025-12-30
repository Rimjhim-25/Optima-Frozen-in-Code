// frontend/src/components/StatCard.jsx
const StatCard = ({ title, value, subtitle, color }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-1">
      <div className={`w-8 h-8 rounded-lg text-xs flex items-center justify-center ${colorMap[color]}`}>
        ●
      </div>
      <div className="text-xs text-slate-500 mt-1">{title}</div>
      <div className="text-2xl font-semibold text-slate-900">{value}</div>
      {subtitle && <div className="text-xs text-emerald-500">{subtitle}</div>}
    </div>
  );
};

export default StatCard;
