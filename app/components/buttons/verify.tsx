const VerifyButton = (props: { auth: string}) => {
    function onButtonClicked() {
        window.location.href = props.auth;
    }

    return (
        <button className="btn btn-primary" onClick={onButtonClicked}>Verify</button>
    )
}

export default VerifyButton