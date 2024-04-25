package com.bookstore.springbootbookstore.repository;

import com.bookstore.springbootbookstore.entity.Book;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Integer> {

    List<Book> findByTitleContainingIgnoreCase(String title);
}
