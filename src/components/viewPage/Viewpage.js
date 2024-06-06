import { useState } from 'react'
import './viewpage.css'
import { Detailspage } from './../../components'



const ViewPage = (data) => {
    const [isRendered, setisRendered] = useState(false)

    const clickHadler_viewDetails = (date) => {

        console.log(date["key"])
        setisRendered(date["key"])
    }

    const renderComponent = () => {
        return <Detailspage data={data} date={isRendered} />
    }

    return (
        <>

            {
                !isRendered && (
                    <div className='viewContainer'>
                        {Object.keys(data.data).map((key) => (
                            <button onClick={() => clickHadler_viewDetails({ key })} className='viewPage_button' key={key}>
                                {key}
                            </button>
                        ))}
                        <div className='addbutton_navigator'>
                            <button className='addbutton'>
                                +
                            </button>
                        </div>
                    </div>
                )
            }
            {isRendered && renderComponent()}
        </>
    );
}

export default ViewPage