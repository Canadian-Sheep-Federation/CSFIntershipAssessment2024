package com.csf.exchangeRate.ExchangeRateTool.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csf.exchangeRate.ExchangeRateTool.model.FormResponse;
import com.csf.exchangeRate.ExchangeRateTool.repository.FormResponseRepository;


@Service
public class FormResponseService {
	
	@Autowired
    private FormResponseRepository repository;

    public FormResponse save(FormResponse formResponse) {
        return repository.save(formResponse);
    }

    public FormResponse get(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<FormResponse> getAll() {
        return repository.findAll();
    }
}
