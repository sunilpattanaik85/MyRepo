package com.sunil.spring.dao;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.sunil.spring.model.Book;


@Repository
public interface BookDAO {
	
	long Save(Book book);
	Book get(long id);
	List<Book> list();
	void update(long id,Book book);
	void delete(long id);

}
