import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [leveesDeMollet, setLevesDeMollet] = useState<recordRenforcement[]>([])
  const [DebugText, setDebugText] = useState<string>("")
  let nbrLeve:number=0;
  let nbrSquat:number=0;
  useEffect(
    () => {
      console.log(1)
      const leveéMolletData: string = readData("datalevee");
      if (leveéMolletData!="")
        {
          const data: recordRenforcement[] = JSON.parse(leveéMolletData)
          setDebugText(leveéMolletData)
        }
    }, [])

  function writeData(datas: recordRenforcement[]): void {
    const dataString: string = JSON.stringify(datas);
    const key = "data" + datas[0].type;
    localStorage.setItem(key, dataString)
    console.log(key)
    console.log(datas)
    console.log(datas[datas.length-1].quantité)
    alert(datas[datas.length-1].quantité+" "+datas[datas.length-1].type)
  }
  function readData(key: string): string {
    console.log("read")
    let string: string = "";
    const data = localStorage.getItem(key);
    if (data != null) string = data
    console.log(string)
    setDebugText(string)
    return string;
  }
  function inputleveeMollet(data: any): void {
    nbrLeve=data.target.value;
  }
    function inputSquat(data: any): void {
    nbrSquat=data.target.value;
  }
  function putRecordRenfo(type:TypeRenforcement) {
    let qtt = 0;
    if (type==TypeRenforcement.leveeDeMollet ) qtt=nbrLeve
    if (type==TypeRenforcement.squat ) qtt=nbrSquat
    const record: recordRenforcement = { quantité: qtt, type: type, date: new Date() }
    leveesDeMollet.push(record)
    writeData(leveesDeMollet);
  }
  function initData(key: string): void {
    localStorage.setItem(key, [])
  }

  return (
    <>
<div>{DebugText}</div>
      <div className="card">
        <label>levées de mollet :</label>
        <input type='number' onChange={inputleveeMollet}></input>
        <button onClick={() => putRecordRenfo(TypeRenforcement.leveeDeMollet)}>
          Sauvegarder
        </button>
        <button onClick={() => readData("datalevee")}>
          read
        </button>
        <button onClick={() => initData("datalevee")}>
        erase all !!!
        </button>
      </div>

        <div className="card">
        <label>Squats :</label>
        <input type='number' onChange={inputSquat}></input>
        <button onClick={() => putRecordRenfo(TypeRenforcement.squat)}>
          Sauvegarder
        </button>
        <button onClick={() => readData("datasquat")}>
          read
        </button>
        <button onClick={() => initData("datasquat")}>
        erase all !!!
        </button>
      </div>
    </>
  )
}

type recordRenforcement = {
  type: TypeRenforcement,
  quantité: number,
  date: Date

}

enum TypeRenforcement {
  leveeDeMollet="levee",
  leveeDeMolletG="leveeG",
  leveeDeMolletD="leveeD",
  squat="squat",
  pompe="pompe",
  saut="saut",
  gainage="gainage"
}
export default App
