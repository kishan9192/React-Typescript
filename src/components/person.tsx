type PersonName = {
    name : {
        firstName: string,
        lastName: string
    }
}
const Person: React.FC<PersonName> = (props) => {
    return (
        <div>
            <p>First Name : {props.name.firstName}</p>
            <p>Last Name : {props.name.lastName}</p>
        </div>
    )
}
export default Person