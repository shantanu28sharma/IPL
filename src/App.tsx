import React, { useEffect } from 'react';
import './App.css';
import {parseData} from './utils/dataParser'

let dataCached:any = {};

const App = () => {
  useEffect(()=>{
    async function checkData(){
      let data = localStorage.getItem('data');
      if(!data){
        let response:any = await fetch('./data/matches.csv');
        const reader = response.body.getReader()
        const result = await reader.read()
        const decoder = new TextDecoder('utf-8')
        const csv = decoder.decode(result.value) 
        const data = parseData(csv);
        dataCached=data;
      }
      else{
        dataCached=JSON.parse(localStorage.getItem('data')!)
        console.log(dataCached)
      }
    }
    checkData(); 
  },[])
  return (
    <div className="App">

    </div>
  );
}

export default App;
