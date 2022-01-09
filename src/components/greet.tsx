type GreetProp = {
    name:string,
    messageCount?: number
}
const Greet = (props:GreetProp) => {
    // this takes the messageCount from props. If not provided in props, then takes the value 0
    const {messageCount = 0} = props
    return (
        <div>
            <p> {`Hi ${props.name} you have recieved ${messageCount} messages`}</p>
        </div>
    )
}
export default Greet;