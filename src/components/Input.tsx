import React from "react"

type InputProps = {
    handleChange : (event:React.ChangeEvent<HTMLInputElement>) => void,
    value: string
}
const Input = (props: InputProps) => {
    return (
        <input type = "text" value = {props.value} onChange = {props.handleChange}/>
    )
}
export default Input