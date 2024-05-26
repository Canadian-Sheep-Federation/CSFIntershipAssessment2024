package com.csf.exchangeRate.ExchangeRateTool.model;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExchangeRateResponse {

    @JsonProperty("base_code")
    private String baseCode;

    @JsonProperty("conversion_rates")
    private Map<String, Double> conversionRates;

    // Getters and Setters
    public String getBaseCode() {
        return baseCode;
    }

    public void setBaseCode(String baseCode) {
        this.baseCode = baseCode;
    }

    public Map<String, Double> getConversionRates() {
        return conversionRates;
    }

    public void setConversionRates(Map<String, Double> conversionRates) {
        this.conversionRates = conversionRates;
    }
}