package com.csf.exchangeRate.ExchangeRateTool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csf.exchangeRate.ExchangeRateTool.service.ExchangeRateService;

import reactor.core.publisher.Mono;

@RestController
public class ExchangeRateController {

    @Autowired
    private ExchangeRateService exchangeRateService;

    @GetMapping("/api/exchange-rate")
    public Mono<Double> getExchangeRate(@RequestParam String base, @RequestParam String target) {
        return exchangeRateService.getExchangeRate(base, target);
    }
}

