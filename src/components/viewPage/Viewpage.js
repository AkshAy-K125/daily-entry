import { useState } from 'react'
import './viewpage.css'
import { Detailspage, Addpage } from './../../components'



const ViewPage = (data) => {
    const [dateclicked, setdateclicked] = useState(null)
    const [addClicked, setaddClicked] = useState(false)

    const clickHadler_viewDetails = (date) => {
        setdateclicked(date["key"])
    }

    const clickHadler_addDetails = () => {
        setdateclicked(null)
        setaddClicked(true)
    }

    return (
        <>

            {
                (dateclicked === null && !addClicked) && (
                    <div className='viewContainer'>
                        {Object.keys(data.data).map((key) => (
                            <button onClick={() => clickHadler_viewDetails({ key })} className='viewPage_button' key={key}>
                                {key}
                            </button>
                        ))}
                        <div className='addbutton_navigator'>
                            <button onClick={() => clickHadler_addDetails()} className='addbutton'>
                                +
                            </button>
                        </div>
                    </div>
                )
            }
            {(dateclicked && !addClicked) && <Detailspage data={data} date={dateclicked} />}
            {(!dateclicked && addClicked) && <Addpage data={data} />}
        </>
    );
}

export default ViewPage