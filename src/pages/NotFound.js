const NotFound = () => {
    return (
        <div className="d-flex w-100 flex-column align-items-center justify-content-center" style={{ height: "400px" }}>
            <img id="notFound" className="img-fluid" src="/search.png" alt="Not Found"></img>
            <h3 className="mt-2">Sorry, we cannot find what you are looking for</h3>
        </div>
    );
}

export default NotFound;