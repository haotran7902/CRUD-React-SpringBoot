package com.apple.book;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/books")

public class BookController {
	@Autowired
	private BookRepository bookRepository;
	
	@GetMapping
	public List<Book> getAll(){
		return bookRepository.findAll();
	}
	@GetMapping("/search")
	public List<Book> getAllBySerch(@RequestParam String searchValue){
		return bookRepository.getAllBookBySearch(searchValue);
	}
	
	// REST API for create a new book
	@PostMapping
	public ResponseEntity<?> createBook(@RequestBody Book book){
		List<Book> list_tmp = bookRepository.getAllBookByTitleAndAuthorIdNot(book.getTitle(), 
				book.getAuthor(), book.getBookcode());
		if(list_tmp.size() > 0) {
			Error error = new Error();
			error.setMessage("This book is alrealdy existed");
			return new ResponseEntity<>(error, HttpStatus.OK);
		}
		
		return new ResponseEntity<>(bookRepository.save(book), HttpStatus.CREATED);
	}
	
	// REST API for get a book by id
	@GetMapping("{id}")
	public ResponseEntity<?> getBookById(@PathVariable int id){
		Book book = bookRepository.findById(id).get();
		return ResponseEntity.ok(book);
	}
	
	// REST API for update 
	@PutMapping("{id}")
	public ResponseEntity<?> updateBook(@PathVariable int id, @RequestBody Book book){
		Book updateBook = bookRepository.findById(id).get();
		
		updateBook.setTitle(book.getTitle());
		updateBook.setAuthor(book.getAuthor());
		updateBook.setCategory(book.getCategory());
		updateBook.setApproved(book.isApproved());
		
		List<Book> list_tmp = bookRepository.getAllBookByTitleAndAuthorIdNot(updateBook.getTitle(), 
				updateBook.getAuthor(), updateBook.getBookcode());
		if(list_tmp.size() > 0) {
			Error error = new Error();
			error.setMessage("This book is alrealdy existed");
			return new ResponseEntity<>(error, HttpStatus.OK);
		}
		
		return new ResponseEntity<>(bookRepository.save(updateBook), HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteBook(@PathVariable int id){
		Book book = bookRepository.findById(id).get();
		bookRepository.delete(book);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
