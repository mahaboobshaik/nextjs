// import { useState } from 'react';

const Sidemenu = (props) => {

    // const [ count, setCount ] = useState(0);

    // const stateArray = useState(0);
    // const count = stateArray[0];
    // const setCount = stateArray[1]


    // const increment = () => {
    //     const newCount = count + 1;
    //     setCount(newCount);
    // }

    // const decrement = () => {
    //     const newCount = count - 1;
    //     setCount(newCount);
    // }

    return (
        <div>
            <button onClick={props.clickHandler}>Click Me</button>
            <h1 className="my-4">{props.appName}</h1>
            <div className="list-group">
                <a href="#" className="list-group-item">Category 1</a>
                <a href="#" className="list-group-item">Category 2</a>
                <a href="#" className="list-group-item">Category 3</a>
            </div>
            <div>
                {/* <button className="btn btn-primary" onClick={increment}>Increment Number</button>
                <button className="btn btn-primary" onClick={decrement}>Decrement Number</button> */}
                <h1>{props.count}</h1>
            </div>
        </div>
    )
}

export default Sidemenu;