package com.bookstore.springbootbookstore.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class BatchPostDTO {
    private List<Integer> ids;
}
