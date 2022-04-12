import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import './assets/css/style.css';
import ReactDOM from 'react-dom';
import React from 'react';
import TodoList from './components/TodoList';
import Panel from './components/Panel';

function App() {
    return (
        <div className='App'>
            <Panel widgetName="待办事项">
                <TodoList />
            </Panel>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
