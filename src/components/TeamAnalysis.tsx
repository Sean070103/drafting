import { Hero, Team } from '@/types/hero';

interface TeamAnalysisProps {
  team: Team;
  picks: (Hero | null)[];
}

export default function TeamAnalysis({ team, picks }: TeamAnalysisProps) {
  const validPicks = picks.filter((hero): hero is Hero => hero !== null);
  
  // Calculate team stats
  const teamStats = validPicks.reduce(
    (acc, hero) => ({
      damage: acc.damage + hero.stats.damage,
      durability: acc.durability + hero.stats.durability,
      crowdControl: acc.crowdControl + hero.stats.crowdControl,
      mobility: acc.mobility + hero.stats.mobility,
      utility: acc.utility + hero.stats.utility,
    }),
    { damage: 0, durability: 0, crowdControl: 0, mobility: 0, utility: 0 }
  );
  
  // Calculate averages
  const avgStats = Object.entries(teamStats).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value / validPicks.length,
    }),
    {} as Record<string, number>
  );
  
  // Analyze team composition
  const analysis = {
    roles: validPicks.reduce((acc, hero) => {
      hero.roles.forEach((role) => {
        acc[role] = (acc[role] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>),
    
    strengths: [] as string[],
    weaknesses: [] as string[],
  };
  
  // Identify strengths
  if (avgStats.damage > 7) analysis.strengths.push('High Damage Output');
  if (avgStats.durability > 7) analysis.strengths.push('Strong Frontline');
  if (avgStats.crowdControl > 7) analysis.strengths.push('Good Crowd Control');
  if (avgStats.mobility > 7) analysis.strengths.push('High Mobility');
  if (avgStats.utility > 7) analysis.strengths.push('Strong Utility');
  
  // Identify weaknesses
  if (avgStats.damage < 4) analysis.weaknesses.push('Low Damage Output');
  if (avgStats.durability < 4) analysis.weaknesses.push('Weak Frontline');
  if (avgStats.crowdControl < 4) analysis.weaknesses.push('Limited Crowd Control');
  if (avgStats.mobility < 4) analysis.weaknesses.push('Low Mobility');
  if (avgStats.utility < 4) analysis.weaknesses.push('Limited Utility');
  
  // Check role balance
  const hasTank = analysis.roles['Tank'] > 0;
  const hasSupport = analysis.roles['Support'] > 0;
  const hasMarksman = analysis.roles['Marksman'] > 0;
  
  if (!hasTank) analysis.weaknesses.push('No Tank');
  if (!hasSupport) analysis.weaknesses.push('No Support');
  if (!hasMarksman) analysis.weaknesses.push('No Marksman');
  
  return (
    <div className={`p-4 rounded-lg bg-gray-900`}>
      <h3 className="text-lg font-semibold mb-4">{team} Team Analysis</h3>
      
      {/* Team Stats */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Team Stats</h4>
        <div className="space-y-2">
          {Object.entries(avgStats).map(([stat, value]) => (
            <div key={stat} className="flex items-center gap-2">
              <span className="text-gray-400 w-32 capitalize">{stat}</span>
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    value > 7 ? 'bg-white' : value < 4 ? 'bg-black' : 'bg-gray-500'
                  }`}
                  style={{ width: `${(value / 10) * 100}%` }}
                />
              </div>
              <span className="text-gray-300 w-8 text-right">{value.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Role Distribution */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Role Distribution</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(analysis.roles).map(([role, count]) => (
            <span
              key={role}
              className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
            >
              {role} ({count})
            </span>
          ))}
        </div>
      </div>
      
      {/* Strengths */}
      {analysis.strengths.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Strengths</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.strengths.map((strength) => (
              <span
                key={strength}
                className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Weaknesses */}
      {analysis.weaknesses.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Weaknesses</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.weaknesses.map((weakness) => (
              <span
                key={weakness}
                className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm"
              >
                {weakness}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 