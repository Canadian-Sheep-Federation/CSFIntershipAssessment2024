document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        submitSurvey();
    });
});

function validateForm() {
    let isValid = true;

    // Validate Name
    const name = document.getElementById("name").value;
    const nameError = document.getElementById("nameError");
    if (!name.trim()) {
        nameError.textContent = "Name is mandatory.";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    // Validate Accuracy
    const accuracy = document.getElementById("accuracy").value;
    const accuracyError = document.getElementById("accuracyError");
    if (!accuracy) {
        accuracyError.textContent = "Please select an accuracy rating.";
        isValid = false;
    } else {
        accuracyError.textContent = "";
    }

    // Validate Currency Interest
    const currencyInterest = document.getElementById("currencyInterest").value;
    const currencyInterestError = document.getElementById("currencyInterestError");
    if (!currencyInterest.trim()) {
        currencyInterestError.textContent = "Currency interest is mandatory.";
        isValid = false;
    } else {
        currencyInterestError.textContent = "";
    }

    // Validate Exchange Usage
    const exchangeUsageYes = document.getElementById("exchangeUsageYes").checked;
    const exchangeUsageNo = document.getElementById("exchangeUsageNo").checked;
    const exchangeUsageError = document.getElementById("exchangeUsageError");
    if (!exchangeUsageYes && !exchangeUsageNo) {
        exchangeUsageError.textContent = "Please select an option.";
        isValid = false;
    } else {
        exchangeUsageError.textContent = "";
    }

    // Validate Usability
    const usability = document.querySelector('input[name="usability"]:checked');
    const usabilityError = document.getElementById("usabilityError");
    if (!usability) {
        usabilityError.textContent = "Please select a usability rating.";
        isValid = false;
    } else {
        usabilityError.textContent = "";
    }

    return isValid;
}

function submitSurvey() {
    if (!validateForm()) {
        return;
    }

    const form = document.getElementById("form");
    const formData = new FormData(form);
    const surveyData = {};

    formData.forEach((value, key) => {
        surveyData[key] = value;
    });

    fetch("/api/form-responses/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(surveyData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Survey submitted successfully and ID is:"+data);
        form.reset();
    })
    .catch(error => {
        console.error("Error submitting survey:", error);
        alert("An error occurred while submitting the survey.");
    });
}

        function getAllForms() {
            $.get('/api/form-responses', function(data) {
                $('#responses').empty();
                data.forEach(form => {
                    $('#responses').append('<p>' + JSON.stringify(form) + '</p>');
                });
            });
        }
        
        function getSpecificForm() {
			let specificId = document.getElementById('specificId').value ;
			if(specificId==''){
				document.getElementById('specificResponse').textContent = "";
				document.getElementById('specificIdError').textContent = "Id is mandatory.";
				return;
			}else{
				document.getElementById('specificIdError').textContent = "";
			}
            $.get('/api/form-responses/'+specificId, function(data) {
                $('#specificResponse').empty();
                $('#specificResponse').append('<p>' + JSON.stringify(data) + '</p>');
                document.getElementById('specificId').value ='';               
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
        		$('#specificResponse').empty();
        		if (jqXHR.status === 404) {
         	   		$('#specificResponse').append('<p>' + jqXHR.responseJSON.message + '</p>');
       			} else {
            		$('#specificResponse').append('<p>An error occurred: ' + textStatus + ' - ' + errorThrown + '</p>');
        		}
    		});
        }
        
		function getExchangeRate() {

			const baseCurrency = $('#baseCurrency').val().toUpperCase();
		    const targetCurrency = $('#targetCurrency').val().toUpperCase();
		    			
			document.getElementById('baseCurrency').value=baseCurrency;
			document.getElementById('targetCurrency').value= targetCurrency;
			if(baseCurrency=='' || targetCurrency==''){
				document.getElementById('exchangeRateError').textContent = "Both currency fields are mandatory";
				return;
			}else{
				document.getElementById('exchangeRateError').textContent = "";
			}
		    $.get('/api/exchange-rate', { base: baseCurrency, target: targetCurrency }, function(data) {
		        $('#exchangeRateResult').html('<p>Exchange Rate: ' + data + '</p>');
		    }).fail(function(jqXHR) {
		        let errorMessage = "Error: " + jqXHR.status + " - " + jqXHR.statusText;
		        if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
		            errorMessage = jqXHR.responseJSON.message;
		        }
		        $('#exchangeRateResult').html('<p>' + errorMessage + '</p>');
		        
		        $('#exchangeRateResult').empty();
        		if (jqXHR.status === 404) {
         	   		$('#exchangeRateError').append('<p>' + jqXHR.responseJSON.message + '</p>');
       			}
       			else {
            		$('#exchangeRateError').append('<p>Internal error occurred. Please retry !</p>');
        		}
		    });
		}        