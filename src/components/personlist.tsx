type NameObject = {
    first: string,
    last: string
};
type PropType = {
    listOfPeople : NameObject[]
}
const PersonList = (props: PropType) => {
    return (
        <ul>
            {
                props.listOfPeople.map((item, index) => <li key={index}>{`${item.first} ${item.last}`}</li> )
            }
        </ul>
        
    )
}
export default PersonList