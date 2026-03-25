import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Mock data representing the 5 major trait dimensions
const mockData = [
  { subject: 'Openness', score: 85, fullMark: 100 },
  { subject: 'Conscientiousness', score: 65, fullMark: 100 },
  { subject: 'Extraversion', score: 92, fullMark: 100 },
  { subject: 'Agreeableness', score: 78, fullMark: 100 },
  { subject: 'Neuroticism', score: 45, fullMark: 100 },
];

export function FactorChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockData}>
        <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }} 
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 100]} 
          tick={false} 
          axisLine={false} 
        />
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          itemStyle={{ color: '#0ea5e9', fontWeight: 'bold' }}
        />
        <Radar
          name="Your Profile"
          dataKey="score"
          stroke="#0ea5e9"
          strokeWidth={3}
          fill="#0ea5e9"
          fillOpacity={0.4}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
