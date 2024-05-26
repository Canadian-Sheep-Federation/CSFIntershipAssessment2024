package com.csf.exchangeRate.ExchangeRateTool.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name ="csf_exchangeRate")
public class FormResponse {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Accuracy rating is mandatory")
    private String accuracy;

    @NotBlank(message = "Currency interest is mandatory")
    private String currencyInterest;

    @NotBlank(message = "Exchange usage is mandatory")
    private String exchangeUsage;
    
    private String improvements;

    @NotBlank(message = "Usability rating is mandatory")
    private String usability;

    @Email(message = "Email should be valid")
    private String email;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAccuracy() {
		return accuracy;
	}

	public void setAccuracy(String accuracy) {
		this.accuracy = accuracy;
	}

	public String getCurrencyInterest() {
		return currencyInterest;
	}

	public void setCurrencyInterest(String currencyInterest) {
		this.currencyInterest = currencyInterest;
	}

	public String getExchangeUsage() {
		return exchangeUsage;
	}

	public void setExchangeUsage(String exchangeUsage) {
		this.exchangeUsage = exchangeUsage;
	}

	public String getImprovements() {
		return improvements;
	}

	public void setImprovements(String improvements) {
		this.improvements = improvements;
	}

	public String getUsability() {
		return usability;
	}

	public void setUsability(String usability) {
		this.usability = usability;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}