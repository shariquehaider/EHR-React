

export default function Input(props) {
    return (
        <div>
            <input type={props.types} placeholder={props.placeHolder} name={props.name} value={props.value} onInput={props.change}/>
        </div>
    )
}