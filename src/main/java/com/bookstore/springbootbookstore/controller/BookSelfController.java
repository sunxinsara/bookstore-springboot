package com.bookstore.springbootbookstore.controller;

import com.bookstore.springbootbookstore.entity.BatchPostDTO;
import com.bookstore.springbootbookstore.entity.Book;
import com.bookstore.springbootbookstore.repository.BookRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// curl http://localhost:8080/book/all
@Controller // This indicates that this class is a Controller
@RequestMapping(path="/book") // This means URLs start with /book (after Application path)
public class BookSelfController {
    @Autowired // This injects the BookRepository bean which is auto-generated by Spring, used to handle data operations
    private BookRepository bookRepository;

    @GetMapping
    public @ResponseBody Iterable<Book> getAllBooks() {
        // This returns a JSON or XML with the books
        return bookRepository.findAll();
    }

    @GetMapping(path="/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> book = bookRepository.findById(Math.toIntExact(id));
        if (book.isPresent()) {
            return ResponseEntity.ok(book.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public @ResponseBody
    ResponseEntity<String> addNewBook(@RequestBody Book book){
        try {
            bookRepository.save(book);
            // Returns a 201 Created status code with a message body
            return ResponseEntity.status(HttpStatus.CREATED).body("Saved");
        } catch (Exception e) {
            // Returns a 500 Internal Server Error status code with an error message on exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the book");
        }
    }

    @PutMapping
    public ResponseEntity<Book> updateBook(@RequestBody Book book) {
        try {
            // Check if the book exists
            if (bookRepository.existsById(book.getId())) {
                // Update the book information and retrieve the updated instance
                Book updatedBook = bookRepository.save(book);
                // Returns a success response with the updated book data
                return ResponseEntity.ok(updatedBook);
            } else {
                // If the book does not exist, return a 404 Not Found status code
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            // Returns a 500 Internal Server Error status code on exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable int id) {
        try {
            // Check if the book exists
            if (bookRepository.existsById(id)) {
                // If exists, then delete
                bookRepository.deleteById(id);
                // Return a success message for deletion
                return ResponseEntity.ok("Book deleted successfully");
            } else {
                // If the book does not exist, return a 404 Not Found status code
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found");
            }
        } catch (Exception e) {
            // Returns a 500 Internal Server Error status code on exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting the book");
        }
    }

    @PostMapping("/deleteBooks")
    @Transactional
    public ResponseEntity<String> deleteBooks(@RequestBody BatchPostDTO dto) {
        List<Integer> ids = dto.getIds();  // Get the list of IDs from DTO
        try {
            // Check if all books exist
            for (Integer id : ids) {
                if (!bookRepository.existsById(id)) {
                    // If any book does not exist, return a 404 Not Found
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("One or more books not found");
                }
            }
            // Delete all specified books
            bookRepository.deleteAllById(ids);
            return ResponseEntity.ok("Books deleted successfully");
        } catch (Exception e) {
            // Returns a 500 Internal Server Error on exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting books");
        }
    }
}
