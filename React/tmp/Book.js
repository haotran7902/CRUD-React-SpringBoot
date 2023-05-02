import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Books(props) {
    const params = useParams();
    const [book, setBook] = useState({});
    const bookcode = params.bookcode;

    const onSaveClick = () => {
        console.log(book);
        // send data to the backend via POST
        fetch(`http://localhost:8080/book/save/${bookcode}`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(book), // body data type must match "Content type" header
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch(`http://localhost:8080/book/${bookcode}`)
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(err => console.log(err))
    }, []);

    return (
        <div>
            <h1>{bookcode < 0 ? "New Book" : `Book ${bookcode}`}</h1>
            Bookcode:{" "}
            <input type="number" value={book.bookcode}
                onchange={e => setBook({ ...book, title: e.target.value })} />
            <br />
            Title:{" "}
            <input type="text" value={book.title}
                onchange={e => setBook({ ...book, title: e.target.value })} />
            <br />
            Author:{" "}
            <input type="text" value={book.bookcode}
                onchange={e => setBook({ ...book, title: e.target.value })} />
            <br />
            Category:{" "}
            <input type="text" value={book.bookcode}
                onchange={e => setBook({ ...book, title: e.target.value })} />
            <br />
            Approved:{" "}
            <input type="checkbox" value={book.bookcode}
                onchange={e => setBook({ ...book, title: e.target.value })} />
            <br />
            <button onClick={onSaveClick}>Save</button>
        </div>
    )
}
export default Book;