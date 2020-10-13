import React, { useEffect, useState } from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Pie, PieChart} from 'recharts';
import {parseTeamName} from '../../utils/dataParser'

interface Props {
  info : any
}

const Chart:React.FC<Props> = ({info}) => {
  const [oppData, setOppData] = useState<Array<any>>([]);
  const [_batData, setBatData] = useState<Array<any>>([]);
  const [_bowlData, setBowlData] = useState<Array<any>>([]);
  useEffect(()=>{
    let data : Array<any> = [];
    let batData : Array<any> = [];
    let bowlData : Array<any> = [];
    for (const team in info){
      if(team==="bat"){
        batData.push({
          name:"win",
          value:info["bat"]["win"]
        })
        batData.push({
          name:"lose",
          value:info["bat"]["lose"]
        })
      }
      else if(team==="bowl"){
        bowlData.push({
          name:"win",
          value:info["bowl"]["win"]
        })
        bowlData.push({
          name:"lose",
          value:info["bowl"]["lose"]
        })
      }
      else{
        data.push({
          name:parseTeamName(team),
          win:info[team]["win"],
          loss:info[team]["loss"]
        })
      }
    }
    setBatData(batData);
    setBowlData(bowlData);
    setOppData(data);
  },[info])
  return(
    <div>
      {
        info!==undefined&&
        <div>
          <BarChart data={oppData} width={1000} height={300} margin={{
          top: 20, right: 30, left: 20, bottom: 20,
        }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip itemStyle={{"padding":10}}/>
          <Legend />
          <Bar dataKey="win" stackId="a" fill="#008000" />
          <Bar dataKey="loss" stackId="a" fill="#FF0000" />
          </BarChart>
          <PieChart width={800} height={400}>
        <Pie dataKey="value" nameKey="name" data={_batData} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
        <Pie dataKey="value" nameKey="name" data={_bowlData} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" label/>
        <Tooltip/>
       </PieChart>
        </div>
      }
    </div>
  )
}

export default Chart;