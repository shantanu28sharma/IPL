import React from 'react';

interface Props {
  teams : Array<string>
  current : string|undefined
  setTeam : (team:string)=>void
}

const Top:React.FC<Props> = ({teams, current, setTeam}) => {
  return (
      <div>
        <select value={current} onChange={(e)=>setTeam(e.target.value)}>
          {
            teams.map((team)=>(
            <option value={team} key={team}>{team}</option>
            ))
          }
        </select>
      </div>
  );
}

export default Top;