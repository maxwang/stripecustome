(function () {
    var elements = stripe.elements({
        // Stripe's examples are localized to specific languages, but if
        // you wish to have Elements automatically detect your user's locale,
        // use `locale: 'auto'` instead.
        locale: window.__exampleLocale
    });

    var card = elements.create("card", {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#fff",
                color: "#fff",
                fontWeight: 400,
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "15px",
                fontSmoothing: "antialiased",

                "::placeholder": {
                    color: "#BFAEF6"
                },
                ":-webkit-autofill": {
                    color: "#fce883"
                }
            },
            invalid: {
                iconColor: "#FFC7EE",
                color: "#FFC7EE"
            }
        }
    });
    card.mount("#example-card");

    var paymentRequest = stripe.paymentRequest({
        country: "SG",
        currency: "sgd",
        total: {
            amount: 2500,
            label: "Total"
        },
        requestShipping: false,
        // shippingOptions: [
        //     {
        //         id: "free-shipping",
        //         label: "Free shipping",
        //         detail: "Arrives in 5 to 7 days",
        //         amount: 0
        //     }
        // ]
    });
    paymentRequest.on("token", function (result) {
        var example = document.querySelector(".example");
        example.querySelector(".token").innerText = result.token.id;
        example.classList.add("submitted");
        result.complete("success");
    });

    var paymentRequestElement = elements.create("paymentRequestButton", {
        paymentRequest: paymentRequest,
        style: {
            paymentRequestButton: {
                theme: "light"
            }
        }
    });

    paymentRequest.canMakePayment().then(function (result) {
        if (result) {
            document.querySelector(".example .card-only").style.display = "none";
            document.querySelector(
                ".example .payment-request-available"
            ).style.display =
                "block";
            paymentRequestElement.mount("#example-paymentRequest");
        }
    });

    registerElements([card], "example");

})();