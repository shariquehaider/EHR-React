
export default function Result(props) {
    return (
        <div>
        <div className="result"><label>{props.innerText}</label>&nbsp;<p>{props.result}</p></div>
        </div>
    )
}