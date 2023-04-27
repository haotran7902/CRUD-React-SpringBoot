import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookService from '../services/BookService';

const AddBookComponent = () => {

    const [book, setBook] = useState({});
    const [message , setMessage] = useState('')

    const navigate = useNavigate();
    const { bookcode } = useParams();

    const handleChange = (key, value) => {
        setBook({...book, [key]:value});
    }

    const saveOrUpdateBook = (e) => {
        e.preventDefault();

        if (bookcode) {
            BookService.updateBook(bookcode, book)
            .then((response) => {
                console.log(bookcode);
                if(response.data.message !== undefined){
                    setMessage(response.data.message)
                    navigate(`/edit-book/${bookcode}`)
                } else{
                    navigate('/books');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            BookService.createBook(book)
            .then((response) => {
                // console.log(response.data);
                if(response.data.message !== undefined){
                    setMessage(response.data.message)
                    navigate('/add-book')
                } else{
                    navigate('/books');
                }
            })
            .catch((error) => {
                console.log(error);
            });

        }
    };

    useEffect(() => {
        BookService.getBookById(bookcode)
            .then((response) => {
                setBook(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const Up_title = () => {
        if (bookcode) {
            return <h2 className="text-center">Update Book</h2>;
        } else {
            return <h2 className="text-center">Add Book</h2>;
        }
    };

    const alert = () => {
        if(message !== ""){
            return <div>
            <div class="alert alert-danger d-flex align-items-center" role="alert">
                <div>
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    &#160;{message}
                </div>
            </div>
        </div>
        }
    }

    return (
        <div>
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {Up_title()}
                        <div className="card-body">
                            <form className='form-group'>
                                <div className="form-group mb-2">
                                    <label className="form-label"> Title </label>
                                    <span style={{ color: 'red' }}>&#160;(*)</span>
                                    <input
                                        type="text"
                                        name="title"
                                        id='title'
                                        className="form-control"
                                        value={book.title}
                                        onChange={e => handleChange(e.target.name, e.target.value)} required
                                    ></input>
                                </div>
                                <span id='nulltitle'></span>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Author </label>
                                    <span style={{ color: 'red' }}>&#160;(*)</span>
                                    <input
                                        type="text"
                                        name="author"
                                        className="form-control"
                                        value={book.author}
                                        onChange={e => handleChange(e.target.name, e.target.value)} required
                                    ></input>
                                </div>
                                <span id='nullauthor'></span>
                                {alert()}

                                <div className="form-group mb-2">
                                    <label className="form-label"> Category </label>
                                    <input
                                        type="text"
                                        name="category"
                                        className="form-control"
                                        value={book.category}
                                        onChange={e => handleChange(e.target.name, e.target.value)}
                                    ></input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Approved &#160;</label>
                                    <input
                                        type="checkbox"
                                        name="approved"
                                        checked={book.approved}
                                        onChange={e => handleChange(e.target.name, e.target.checked)}
                                    ></input>
                                </div>

                                <button onClick={e => saveOrUpdateBook(e)} className='btn btn-primary'>Submit</button> &#160;
                                <Link to="/books" className="btn btn-danger">
                                    Cancel
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBookComponent;
