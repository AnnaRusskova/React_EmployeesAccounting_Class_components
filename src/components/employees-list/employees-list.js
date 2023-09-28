import EmployeesListItem from "../employees-list-item/employees-list-item";
import './employees-list.css'
const EmployeesList = ({data, onDelete, onToggleProp, changeSalary}) => {

    const elements = data.map(item => {
        const {id} = item;
        return (
            <EmployeesListItem name ={item.name} 
                               salary ={item.salary} 
                               increase ={item.increase}
                               key ={item.id}
                               rise ={item.rise}
                               onDelete ={()=> onDelete(id)}
                               onToggleProp={(e)=> onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                               changeSalary = {changeSalary}
                               />
        )
    })
    return (
        <ul className="app-list list-group">
           {elements} 
        </ul>
    )
}

export default EmployeesList;