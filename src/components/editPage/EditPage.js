import React, { useState, useEffect } from 'react';
import { Rings } from 'react-loader-spinner'


const EditPage = ({ data, date }) => {
    const [dateSelected, setDateSelected] = useState('');
    const [inputValues, setInputValues] = useState([]);
    const [saveClicked, setsaveClicked] = useState(false)

    useEffect(() => {
        const initialLoad = () => {
            let dateParts = date.split('/');
            let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
            setDateSelected(formattedDate);
        };

        initialLoad();
        setInputValues(data);
    }, [date, data]);

    const homeLoad = () => {
        // window.location.replace("http://192.168.1.184:3000");

        //Change the reload to actual site url in production after first deployment

        window.location.replace("https://daily-entry-moo-moo.netlify.app/");
    };

    const dataFetch = async (dataArray) => {

        const raw = "";

        const requestOptions = {
            method: "POST",
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("https://script.google.com/macros/s/AKfycby0MqdPc3BVON4sWfMprc4ttrbamd0xkRHvwR3cCLUirjDnhv19ErV6qF2k_FZ5mz46Pw/exec?funcName=3&data=" + encodeURIComponent(dataArray), requestOptions)
        console.log(response)
        homeLoad()
    }


    const dataEntrySave = () => {
        console.log((dateSelected + "~" + inputValues.join("~")));

        setsaveClicked(true)

        dataFetch(dateSelected + "~" + inputValues.join("~"));
    };

    const handleInputChange = (index, event) => {
        const newValues = [...inputValues];
        newValues[index] = event.target.value;
        setInputValues(newValues);
    };

    return (
        <div>
            {!saveClicked ?
                <div className='edit_container'>
                    <div className='formEntry'>
                        <div className='contentContainer'>
                            <span className='placeholderSpans'>Date*</span>
                            <input disabled
                                id='dateSelected'
                                type='date'
                                value={dateSelected}
                                onChange={(e) => setDateSelected(e.target.value)}
                            />
                        </div>
                        {inputValues.map((ele, i) => (
                            <div key={i}>
                                <div className='contentContainer'>
                                    <span className='placeholderSpans'>{"Task " + (i + 1)}</span>
                                    <input
                                        value={ele}
                                        type='text'
                                        onChange={(e) => handleInputChange(i, e)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='save_cancel_cotainer '>
                        <button onClick={homeLoad} className='save_cancel_cotainer_button cancelButton'>
                            Cancel
                        </button>
                        <button onClick={dataEntrySave} className='save_cancel_cotainer_button saveButton'>
                            Save
                        </button>
                    </div>
                </div>
                : <div className='loader'>
                    <Rings
                        visible={true}
                        height="40vh"
                        width="25vw"
                        color="#4fa94d"
                        ariaLabel="rings-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    /></div>}
        </div>
    );
};

export default EditPage;
