import axios from 'axios'

const BOOK_BASE_REST_API_URL = 'http://localhost:8080/api/v1/books';

class BookService{

    getAllBooks(){
        return axios.get(BOOK_BASE_REST_API_URL)
    }

    createBook(book){
        return axios.post(BOOK_BASE_REST_API_URL, book)
    }

    getBookById(bookcode){
        return axios.get(BOOK_BASE_REST_API_URL + '/' + bookcode);
    }

    updateBook(bookcode, book){
        return axios.put(BOOK_BASE_REST_API_URL + '/' + bookcode, book);
    }

    deleteBook(bookcode){
        return axios.delete(BOOK_BASE_REST_API_URL + '/' + bookcode);
    }

    getBookBySearch(txt_search){
        return axios.get(BOOK_BASE_REST_API_URL + '/search', txt_search);
    }
}

export default new BookService();