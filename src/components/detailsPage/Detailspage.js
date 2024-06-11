
import './detailsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHome, faSort } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { EditPage, SortPage } from './../../components'

const Detailspage = (props) => {

    const [editClicked, seteditClicked] = useState(false)
    const [sortClicked, setsortClicked] = useState(false)

    const homeLoad = () => {
        // window.location.replace("http://192.168.1.184:3000")

        window.location.replace("https://daily-entry-moo-moo.netlify.app/")

    }

    const handleEditClicked = () => {
        seteditClicked(true)
    }
    const handleSortClicked = () => {
        setsortClicked(true)
    }

    return (<>{
        sortClicked ?
            <SortPage data={props.data.data[props.date]} date={props.date} /> :
            editClicked ?
                <EditPage data={props.data.data[props.date]} date={props.date} />
                :
                <div className='detailsContainer'>
                    <div>
                        <h1>
                            {props.date}
                        </h1>
                        {
                            props.data.data[props.date].map((task, i) => {
                                return (
                                    task ? (
                                        <div key={"key" + i} >
                                            <div className='taskEnum'>{"Task " + (i + 1)}</div>
                                            <div className='taskData'>{task}</div>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                )
                            })
                        }
                    </div>
                    <div className='opsContainer'>
                        <button onClick={homeLoad} className='opsbutton'>
                            <FontAwesomeIcon icon={faHome} />
                        </button>
                        <button onClick={handleSortClicked} className='opsbutton'>
                            <FontAwesomeIcon icon={faSort} />
                        </button>
                        <button onClick={handleEditClicked} className='opsbutton'>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                </div>
    }
    </>
    )
}

export default Detailspage