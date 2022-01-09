import React from "react"

type ButtonProps = {
    handleClick : (event: React.MouseEvent<HTMLButtonElement>, id: number) => void,
    title: string
}
const Button = (props: ButtonProps) => {
    return (
        <button onClick={event => props.handleClick(event, 1)}>
            {props.title}
        </button>
    )
}
export default Button