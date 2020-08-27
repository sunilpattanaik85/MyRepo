package com.sunil.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.sunil.spring.model.Book;
import com.sunil.spring.service.BookService;

@RestController
public class BookController {
	
	@Autowired
	private BookService bookservice;
	@GetMapping("/api/book")
	public ResponseEntity<List<Book>> list()
	{
		List<Book> list =bookservice.list();
		return ResponseEntity.ok().body(list);
	}
	@PostMapping("/api/book")
	public ResponseEntity<?> save(@RequestBody Book book)
	{
		long id = bookservice.Save(book);
		return ResponseEntity.ok().body("Book Created" +id);
	}
	@GetMapping("/api/book/{id}")
	public ResponseEntity<Book> get(@PathVariable("id") long id)
	{
		Book book = bookservice.get(id);
		return ResponseEntity.ok().body(book);
	}
	@PutMapping("/api/book/{id}")
	public ResponseEntity<?> update(@PathVariable("id") long id,@RequestBody Book book)
	{
		bookservice.update(id, book);
		return ResponseEntity.ok().body("Book has been updated "+id);
	}
	@DeleteMapping("/api/book/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") long id)
	{
		bookservice.delete(id);
		return ResponseEntity.ok().body("book has been deleted "+id);
	}

}

