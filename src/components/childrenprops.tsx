type Proptype = {
    children : string
}
const ChildrenProps = (props: Proptype) => {
    return (
        <h2>{props.children}</h2>
    )
}
export default ChildrenProps