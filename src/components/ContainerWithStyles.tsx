type StyleProps = {
    style : React.CSSProperties
    children : React.ReactNode
};
const ContainerWithStyles = (props:StyleProps) => {
    return (
        <div style = {props.style}>
            {props.children}
        </div>
    )
}
export default ContainerWithStyles