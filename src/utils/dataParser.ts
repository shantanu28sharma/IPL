import Papa from 'papaparse'

export function parseData(csv:string){
  const results = Papa.parse(csv, { header: true });
  const rows:Array<any> = results.data;
  console.log(rows[0]);
  let data:any = {};
  rows.forEach((row:any)=>{
    if(row.team1==="Rising Pune Supergiant"){
      row.team1="Rising Pune Supergiants";
    }
    if(row.team2==="Rising Pune Supergiant"){
      row.team2="Rising Pune Supergiants";
    }
    if(row.winner==="Rising Pune Supergiant"){
      row.winner="Rising Pune Supergiants";
    }
    if(!data[row.team1]){
      data[row.team1]={

      }
    }
    if(!data[row.team1][row.team2]){
      data[row.team1][row.team2]={

      }
    }
    if(!data[row.team2]){
      data[row.team2]={
        
      }
    }
    if(!data[row.team2][row.team1]){
      data[row.team2][row.team1]={
        
      }
    }
    if(!data[row.team2][row.team1]["win"]){
      data[row.team2][row.team1]["win"]=0
    }
    if(!data[row.team2][row.team1]["loss"]){
      data[row.team2][row.team1]["loss"]=0
    }
    if(!data[row.team1][row.team2]["win"]){
      data[row.team1][row.team2]["win"]=0
    }
    if(!data[row.team1][row.team2]["loss"]){
      data[row.team1][row.team2]["loss"]=0
    }
    if(!data[row.team1]["bowl"]){
      data[row.team1]["bowl"]={}
      data[row.team1]["bowl"]["win"]=0;
      data[row.team1]["bowl"]["lose"]=0;
    }
    if(!data[row.team1]["bat"]){
      data[row.team1]["bat"]={}
      data[row.team1]["bat"]["win"]=0;
      data[row.team1]["bat"]["lose"]=0;
    }
    if(!data[row.team2]["bowl"]){
      data[row.team2]["bowl"]={};
      data[row.team2]["bowl"]["win"]=0;
      data[row.team2]["bowl"]["lose"]=0;
    }
    if(!data[row.team2]["bat"]){
      data[row.team2]["bat"]={};
      data[row.team2]["bat"]["win"]=0;
      data[row.team2]["bat"]["lose"]=0;
    }
    data[row.team1][row.team2]["win"]+=1?row.winner===row.team1:0;
    data[row.team1][row.team2]["loss"]+=1?row.winner===row.team2:0;
    data[row.team2][row.team1]["win"]+=1?row.winner===row.team2:0;
    data[row.team2][row.team1]["loss"]+=1?row.winner===row.team1:0;
    if(((row.toss_winner===row.team1&&row.toss_decision==="bat")||(row.toss_winner===row.team2&&row.toss_decision==="field"))&&row.winner===row.team1){
      data[row.team1]["bat"]["win"]+=1
      data[row.team2]["bowl"]["lose"]+=1
    }
    else if(((row.toss_winner===row.team1&&row.toss_decision==="bat")||(row.toss_winner===row.team2&&row.toss_decision==="field"))&&row.winner===row.team2){
      data[row.team1]["bat"]["lose"]+=1
      data[row.team2]["bowl"]["win"]+=1
    }
    if(((row.toss_winner===row.team1&&row.toss_decision==="field")||(row.toss_winner===row.team2&&row.toss_decision==="bat"))&&row.winner===row.team1){
      data[row.team1]["bowl"]["win"]+=1
      data[row.team2]["bat"]["lose"]+=1
    }
    else if(((row.toss_winner===row.team1&&row.toss_decision==="field")||(row.toss_winner===row.team2&&row.toss_decision==="bat"))&&row.winner===row.team2){
      data[row.team1]["bowl"]["lose"]+=1
      data[row.team2]["bat"]["win"]+=1
    }
  })
  localStorage.setItem('data', JSON.stringify(data));
  return data;
}