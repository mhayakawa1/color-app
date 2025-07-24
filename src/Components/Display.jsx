export default function (props) {

    return (
        <div className={`display ${props.className}`}>{props.children}</div>
    )
}