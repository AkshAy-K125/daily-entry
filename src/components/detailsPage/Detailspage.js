
import './detailsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHome } from '@fortawesome/free-solid-svg-icons';

const Detailspage = (props) => {
    console.log(props.data.data)
    console.log(props.data.data[props.date])

    const homeLoad = () => {
        window.location.replace("https://daily-entry-moo-moo.netlify.app/")
        //Change the relaod to actual site url in production after first deployment

        //https://daily-entry-moo-moo.netlify.app/

    }

    return (
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
                <button className='opsbutton'>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </div>
        </div>
    )
}

export default Detailspage