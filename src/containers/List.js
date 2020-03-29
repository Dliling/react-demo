import React from 'react';


const List = (props) => {
    // 若使用这种写法，必须return，且会警告没有key值
    const list = props.ListItems.map((el, i) => {
        return <li key={i}>{i + 1}.
                <span style={el.done ? {'textDecoration': 'line-through'} : {'textDecoration': 'none'}} onClick={props.onDown.bind(null, i)}>{el.item}</span>
                &nbsp;<button className="btn btn-danger" onClick={props.onDelete.bind(null, i)}>del</button>
            </li>
    });

    // const list = props.ListItems.map((el, i) => (
    //     <li key={i}><h2>{el}</h2></li>
    // ));

    return (
        <div>
            <ul>
                {
                    list
                }
            </ul>
        </div>
    )
}

export default List;
