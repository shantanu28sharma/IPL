import React, { useEffect, useState } from 'react';
import './App.css';
import {parseData} from './utils/dataParser';
import Top from './components/top';
import Chart from './components/charts'

const App = () => {
  const [dataCached, setData] = useState<any>({});
  const [activeTeam, setActiveTeam] = useState<string>("");  

  const setTeam = (team:string)=>{
    setActiveTeam(team);
  }

  useEffect(()=>{
    async function checkData(){
      let data = localStorage.getItem('data');
      if(!data){
        let response:any = await fetch('./data/matches.csv');
        const reader = response.body.getReader()
        const result = await reader.read()
        const decoder = new TextDecoder('utf-8')
        const csv = decoder.decode(result.value) 
        data = parseData(csv);
        setData(data);
        setActiveTeam(Object.keys(data!)[0]);
      }
      else{
        setData(JSON.parse(data)!)
        setActiveTeam(Object.keys(JSON.parse(data!)!)[0])
      }
    }
    checkData(); 
  },[])
  return (
    <div className="App">
      <Top teams={Object.keys(dataCached)} current={activeTeam} setTeam={setTeam}/>
      <h1>{activeTeam}</h1>
      <Chart info={dataCached[activeTeam]}/>
    </div>
  );
}

export default App;
