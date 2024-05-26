package com.csf.exchangeRate.ExchangeRateTool.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csf.exchangeRate.ExchangeRateTool.exception.NotFoundException;
import com.csf.exchangeRate.ExchangeRateTool.model.FormResponse;
import com.csf.exchangeRate.ExchangeRateTool.service.FormResponseService;


@RestController
@RequestMapping("/api/form-responses")
public class FormResponseController {
    @Autowired
    private FormResponseService service;

    @PostMapping("/submit")
    public Long createFormResponse(@RequestBody FormResponse formResponse) {
        return service.save(formResponse).getId();
    }

    @GetMapping("/{id}")
    public FormResponse getFormResponse(@PathVariable Long id) {
        FormResponse formResponse = service.get(id);
        if (formResponse == null) {
            throw new NotFoundException("FormResponse not found with id: " + id);
        }
        return formResponse;
    }

    @GetMapping
    public List<FormResponse> getAllFormResponses() {
        return service.getAll();
    }
}
