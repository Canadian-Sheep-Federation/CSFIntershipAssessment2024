package com.csf.exchangeRate.ExchangeRateTool.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.csf.exchangeRate.ExchangeRateTool.model.ExchangeRateResponse;

import reactor.core.publisher.Mono;

@Service
public class ExchangeRateService {

    @Value("${exchangerate.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public ExchangeRateService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://v6.exchangerate-api.com/v6/").build();
    }

    public Mono<Double> getExchangeRate(String baseCurrency, String targetCurrency) {
        return this.webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(apiKey+"/latest/"+baseCurrency)
                        .build())
                .retrieve()
                .bodyToMono(ExchangeRateResponse.class)
                .map(response -> {
                    Double rate = response.getConversionRates().get(targetCurrency);
                    if (rate == null) {
                        throw new IllegalArgumentException("Invalid target currency: " + targetCurrency);
                    }
                    return rate;
                });
    }
}
