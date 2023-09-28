import './app-info.css';

const AppInfo = ({totalEmployees, increasedEmployees}) => {
    return (
        <div className="app-info">
            <h1 className="header-info">Accounting of employees</h1>
            <h2>Total amount of employees: {totalEmployees}</h2>
            <h2>Promotion will get: {increasedEmployees} </h2>
        </div>
    )
}

export default AppInfo;