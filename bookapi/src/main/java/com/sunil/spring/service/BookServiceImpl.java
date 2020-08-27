package com.sunil.spring.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.sunil.spring.dao.BookDAO;
import com.sunil.spring.model.Book;
@Service
@Repository
public class BookServiceImpl implements BookService {
	
	@Autowired
	private BookDAO bookDAO;

	@Override
	@Transactional
	public long Save(Book book) {
		// TODO Auto-generated method stub
		return bookDAO.Save(book);
	}

	@Override
	@Transactional
	public Book get(long id) {
		// TODO Auto-generated method stub
		return bookDAO.get(id);
	}

	@Override
	@Transactional
	public List<Book> list() {
		// TODO Auto-generated method stub
		return bookDAO.list();
	}

	@Override
	@Transactional
	public void update(long id, Book book) {
		bookDAO.update(id, book);

	}

	@Override
	@Transactional
	public void delete(long id) {
		bookDAO.delete(id);

	}

}
