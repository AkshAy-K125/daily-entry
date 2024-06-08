import React, { useState } from 'react'
import './addPage.css';
import { Rings } from 'react-loader-spinner'


const Addpage = ({ data }) => {

    const [ErrorMessageText, setErrorMessageText] = useState(null)
    const [saveClicked, setsaveClicked] = useState(false)

    const homeLoad = () => {
        window.location.replace("http://192.168.1.184:3000")
        //Change the relaod to actual site url in production after first deployment

        // window.location.replace("https://daily-entry-moo-moo.netlify.app/")

        //https://daily-entry-moo-moo.netlify.app/

    }

    const dataFetch = async (dataArray) => {

        const raw = "";

        const requestOptions = {
            method: "POST",
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("https://script.google.com/macros/s/AKfycby0MqdPc3BVON4sWfMprc4ttrbamd0xkRHvwR3cCLUirjDnhv19ErV6qF2k_FZ5mz46Pw/exec?funcName=2&data=" + dataArray, requestOptions)
        console.log(response)
        homeLoad()
    }


    const dateCheck = () => {
        var date = document.getElementById('dateSelected').value
        date = date.split('-')
        date = [date[2], date[1], date[0]].join("/")

        console.log(date)

        if (date) {
            var dataArray = Object.keys(data.data).map((key) => key)
            if (dataArray.indexOf(date) !== -1) {
                setErrorMessageText(date)
            }
            else {
                setErrorMessageText(null)
            }
        }
    }

    const dataEntrySave = () => {
        var dataArray = []

        const divElem = document.querySelector(".formEntry");
        const inputElements = divElem.querySelectorAll("input");

        for (const input of inputElements) {
            dataArray.push(input.value);
        }

        setsaveClicked(true)

        dataFetch(dataArray.join("~"))

    }

    return (
        <div>
            {!saveClicked ?
                <div className='add_container'>
                    {ErrorMessageText && <p className='errorMessage'>{"There is already an entry for: '" + ErrorMessageText + "'"}</p>}
                    <div className='formEntry'>
                        <div className='contentContainer'>
                            <span className='placeholderSpans'>Date*</span>
                            <input id='dateSelected' onChange={() => dateCheck()} type='date' />
                        </div>
                        {
                            ([...Array(20).keys()].map((x) => x + 1)).map((ele) => {
                                return <div>
                                    <div className='contentContainer'>
                                        <span className='placeholderSpans'>{"Task " + ele}</span>
                                        <input type='text' />
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className='save_cancel_cotainer '>
                        <button onClick={homeLoad} className='save_cancel_cotainer_button cancelButton'>
                            Cancel
                        </button>
                        {!ErrorMessageText && <button onClick={() => dataEntrySave()} className='save_cancel_cotainer_button saveButton'>
                            Save
                        </button>}
                    </div>
                </div>
                :
                <div className='loader'>
                    <Rings
                        visible={true}
                        height="40vh"
                        width="25vw"
                        color="#4fa94d"
                        ariaLabel="rings-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            }
        </div>
    )
}

export default Addpage