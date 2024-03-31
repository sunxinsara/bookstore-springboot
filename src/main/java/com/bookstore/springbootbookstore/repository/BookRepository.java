package com.bookstore.springbootbookstore.repository;

import com.bookstore.springbootbookstore.entity.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Integer> {

}
