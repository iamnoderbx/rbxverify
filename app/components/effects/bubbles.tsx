const Bubbles = (props: { }) => {
    return (
        <div>
          {[...Array(10)].map((x, i) =>
            <div key = {i} className="bubble z-0"></div>
          )}
        </div>
    )
}

export default Bubbles