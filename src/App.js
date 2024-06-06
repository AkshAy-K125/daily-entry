import React, { useEffect, useState } from 'react';
import { Viewpage } from './components';
import { DNA } from 'react-loader-spinner'
import './App.css'


const App = () => {
  const [allData, setAllData] = useState(null)

  const dataFetch = async () => {
    const raw = "";

    const requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow"
    };

    const response = await fetch("https://script.google.com/macros/s/AKfycbxwQS5ttQNi6unpIHb8pZBAJTpPC5okkR55r9HPE06DOtdOzay3MQiBaD6SYwXJMiUe/exec?funcName=dataFetch", requestOptions)
    const result = await response.json();
    setAllData(result)
  }

  useEffect(() => {
    dataFetch()
  }, [])

  return (<>
    {allData === null ?
      <div className='loader'>
        <DNA
          visible={true}
          height="40vh"
          width="25vw"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
      : <Viewpage data={allData} />}


  </>
  )
}

export default App