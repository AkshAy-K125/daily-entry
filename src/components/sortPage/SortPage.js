import React, { useEffect, useState } from 'react';
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMove from 'array-move'
import { Rings } from 'react-loader-spinner'
import './sortPage.css';

const SortPage = ({ date, data }) => {
    const [items, setItems] = useState([]);
    const [dateSelected, setDateSelected] = useState(null);
    const [saveClicked, setsaveClicked] = useState(false)


    const onSortEnd = (oldIndex, newIndex) => {
        setItems((data) => arrayMove(data, oldIndex, newIndex));
    };

    const homeLoad = () => {
        // window.location.replace("http://192.168.1.184:3000");
        window.location.replace("https://daily-entry-moo-moo.netlify.app/");
    };

    const saveOrder = async () => {
        setsaveClicked(true)

        var dataArray = (dateSelected + "~" + items.join("~"))
        const raw = "";

        const requestOptions = {
            method: "POST",
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("https://script.google.com/macros/s/AKfycby0MqdPc3BVON4sWfMprc4ttrbamd0xkRHvwR3cCLUirjDnhv19ErV6qF2k_FZ5mz46Pw/exec?funcName=3&data=" + encodeURIComponent(dataArray), requestOptions)
        console.log(response)
        homeLoad()
    };

    useEffect(() => {
        const initialLoad = () => {
            let dateParts = date.split('/');
            let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
            setDateSelected(formattedDate);
        };

        initialLoad();
        setItems(data);
    }, [date, data]);



    return (
        <>
            {!saveClicked ?

                <div>
                    <div className='sort_container'>
                        <SortableList
                            onSortEnd={onSortEnd}
                            className="list"
                            draggedItemClassName="dragged"
                        >
                            {items.map((item, index) => (
                                <SortableItem key={index}>
                                    <div className={`item ${item === "" ? 'hidden' : ''}`}>
                                        {item}
                                    </div>
                                </SortableItem>
                            ))}
                        </SortableList>
                    </div>
                    <div className='save_cancel_container'>
                        <button onClick={homeLoad} className='save_cancel_container_button cancelButton'>
                            Cancel
                        </button>
                        <button onClick={saveOrder} className='save_cancel_container_button saveButton'>
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

        </>
    );
};

export default SortPage;
