import React from 'react';
import ReactDom from 'react-dom';

import List from '../containers/List';
import AddTodo from '../containers/AddTodo';

class ToDoApp extends React.Component {
    constructor (props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputSubmit = this.onInputSubmit.bind(this);
        this.onItemDelete = this.onItemDelete.bind(this);
        this.downItem = this.downItem.bind(this);
    }
    componentWillMount () {
        this.setState({
            list: [
                {item: 'thing1', done: false},
                {item: 'thing2', done: true},
                {item: 'thing3', done: false},
            ],
            newToDo: 'test1'
        })
    }
    downItem(i) {
        this.setState((prevState) => ({
            list: [
                ...prevState.list.slice(0 ,i),
                Object.assign({}, prevState.list[i], {done: !prevState.list[i].done}),
                ...prevState.list.slice(i + 1)
             ]
        }))
    }
    onItemDelete(i) {
        this.setState((prevState) => ({
            list: [
                ...prevState.list.slice(0 ,i),
                ...prevState.list.slice(i + 1)
            ]
        }))
    }
    onInputChange(e) {
        this.setState({
            newToDo: e.target.value
        });
    }
    onInputSubmit(e) {
        e.preventDefault();
        this.setState((prevState) => ({
            newToDo: '',
            list: [...prevState.list, {item: prevState.newToDo, done: false}]
        }));
    }
    render () {
        return (
            <div>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                              <div className="panel-body">
                                <h1>My To Do App</h1>
                                <hr/>
                                <List ListItems={this.state.list} onDelete={this.onItemDelete} onDown={this.downItem}/>
                                <AddTodo value={this.state.newToDo} onChange={this.onInputChange} onSubmit={this.onInputSubmit}/>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ToDoApp;
