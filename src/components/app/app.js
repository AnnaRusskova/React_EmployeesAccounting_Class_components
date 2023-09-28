import {Component} from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data :[
                {name:'John C.', salary: 800, increase: false, rise: true, id: 1},
                {name:'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
                {name:'Carl W.', salary: 5000, increase: false, rise: false, id: 3},
            ],
            term:'',
            filter:'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data})=>{
            const newData = data.filter(item => item.id !==id)
            return {data: newData}
        })
    }

    addItem = (name, salary) => {
        const newItem ={
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data})=>{
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        // 1 option to solve:
        // this.setState(({data})=>{
        //     const index = data.findIndex(elem => elem.id === id);
        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr =[...data.slice(0, index), newItem, ...data.slice(index +1)]
        //     return {
        //         data: newArr
        //     }
        // })

        //2nd option:
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id){
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if(term.length === ''){
            return items;
        }

        return items.filter(item => { // при введении в строку поиска букв(терм) выводятся только совпадающие работники по буквам и терм
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term: term})
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);// if rise === true
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    changeSalary = (newSalary, name) => {
        this.setState(({data})=> ({
            data: data.map(person => {
                if (person.name === name) {
                    return {...person, salary: newSalary}
                }
                return person
            })
        }))
    }

    render() {
        const {data, term, filter} = this.state;
        const totalEmployees = this.state.data.length;
        const increasedEmployees = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter); //по фильтрам фильтруем отфильрованный по поиску

        return(
            <div className="app">
                <AppInfo
                totalEmployees={totalEmployees}
                increasedEmployees={increasedEmployees}
                />
                <div className="search-panel">
                   <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                   <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    changeSalary={this.changeSalary}
                />
                <EmployeesAddForm onAdd={this.addItem}
/>
            </div>
        );
    }
}

export default App;