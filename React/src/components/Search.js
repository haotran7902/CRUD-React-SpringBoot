import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import BookService from '../services/BookService'
import axios from 'axios'

const Search = () => {

    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBooks() {
            const response = await axios.get('http://localhost:8080/api/v1/books/search', { params: { txt: searchParams.get("txt") } });
            setBooks(response.data);
            console.log(response.data)
        }

        fetchBooks();
    }, [searchParams]);

    useEffect(() => {
        getAllBooksBySearch();
    }, [])

    const getAllBooksBySearch = () => {
        BookService.getBookBySearch(searchParams.get("txt")).then((response) => {
            setBooks(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteBook = (bookcode) => {
        BookService.deleteBook(bookcode).then((response) => {
            // getAllBooksBySearch();
            navigate(`/books`)
        }).catch(error => {
            console.log(error);
        })

    }

    return (
        <div className="container">
            <h2 className="text-center mt-3 mb-3"> List Books contain key "{searchParams.get("txt")}"</h2>
            <Link to="/add-book" className="btn btn-primary mb-2" > Add Book </Link>&#160;&#160;&#160;&#160;
            <Link to="/books" className="btn btn-danger mb-2">Back</Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Book Id </th>
                    <th> Title </th>
                    <th> Author </th>
                    <th> Category </th>
                    <th> Approved </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        books.map(
                            book =>
                                <tr key={book.bookcode}>
                                    <td> {book.bookcode} </td>
                                    <td> {book.title} </td>
                                    <td> {book.author} </td>
                                    <td>{book.category}</td>
                                    <td>
                                        <input type='checkbox' defaultChecked={book.approved} />
                                    </td>
                                    <td>
                                        <Link className="btn btn-info" to={`/edit-book/${book.bookcode}`} >Edit</Link>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                if (window.confirm("Are you sure delete this book?")) {
                                                    deleteBook(book.bookcode);
                                                }
                                            }}
                                            style={{ marginLeft: "10px" }}
                                        >
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Search;