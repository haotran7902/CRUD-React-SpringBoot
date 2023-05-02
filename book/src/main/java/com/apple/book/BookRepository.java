package com.apple.book;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book, Integer> {
	@Query("select p from Book p where p.title = ?1 and p.author = ?2 and p.bookcode != ?3")
	List<Book> getAllBookByTitleAndAuthorIdNot(String title, String author, Integer bookcode);
	
	@Query("select p from Book p where p.title like %?1% or p.category like %?1%")
	List<Book> getBooksBySearch(String txt_search);
}
