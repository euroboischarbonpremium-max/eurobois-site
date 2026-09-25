// Envoi des commandes, messages et inscriptions vers l'email du site (service Web3Forms).
// Remplacez la valeur ci-dessous par la clé reçue par email de Web3Forms.
var FORM_ACCESS_KEY = "1d1d36d7-9c2b-4d7b-84b5-1d42fc964858";

function sendToOwner(subject, fields, replyEmail, fromName) {
    if (!FORM_ACCESS_KEY || FORM_ACCESS_KEY.indexOf("VOTRE_") === 0) {
        return Promise.reject(new Error("not-configured"));
    }
    var body = Object.assign({ access_key: FORM_ACCESS_KEY, subject: subject, from_name: fromName || "Site Eurobois" }, fields);
    if (replyEmail) body.email = replyEmail;
    return fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(body)
    }).then(function (r) { return r.json(); }).then(function (d) {
        if (!d.success) throw new Error(d.message || "error");
        return d;
    });
}

function tr(key, fallback) {
    return typeof t === "function" ? (t(key) || fallback) : fallback;
}

function validEmail(v) { return /^\S+@\S+\.\S+$/.test((v || "").trim()); }

// ---- Newsletter
function subscribeNewsletter() {
    var input = document.getElementById("newsletter-email");
    var email = input.value.trim();
    if (!validEmail(email)) { alert(tr("newsletter.invalid", "Invalid email address.")); return; }
    sendToOwner("Nouvelle inscription newsletter", { Email_inscrit: email }, email, "Newsletter Eurobois")
        .then(function () { input.value = ""; alert(tr("newsletter.thanks", "Thank you, you are subscribed!")); })
        .catch(function () { alert(tr("contact.error", "Unable to send for the moment. Please try again later.")); });
}

// ---- Contact form
function sendContact() {
    var name = document.getElementById("contact-name").value.trim();
    var email = document.getElementById("contact-email").value.trim();
    var msg = document.getElementById("contact-message").value.trim();
    var status = document.getElementById("contact-status");
    if (!name || !validEmail(email) || !msg) {
        status.textContent = tr("contact.fillAll", "Please fill in all fields.");
        status.className = "text-sm mt-3 text-red-600";
        return;
    }
    status.textContent = tr("contact.sending", "Sending…");
    status.className = "text-sm mt-3 text-gray-500";
    sendToOwner("Message contact - " + name, {
        Nom: name,
        Email: email,
        Message: msg
    }, email, name)
        .then(function () {
            status.textContent = tr("contact.thanks", "Thank you, your message has been sent!");
            status.className = "text-sm mt-3 text-green-600";
            document.getElementById("contact-name").value = "";
            document.getElementById("contact-email").value = "";
            document.getElementById("contact-message").value = "";
        })
        .catch(function () {
            status.textContent = tr("contact.error", "Unable to send for the moment. Please try again later.");
            status.className = "text-sm mt-3 text-red-600";
        });
}

// ---- Manual order (email only – no online payment)
function placeOrder() {
    var ids = ["f-last", "f-first", "f-email", "f-phone", "f-address", "f-postal", "f-city"];
    var ok = true;
    ids.forEach(function (id) {
        var el = document.getElementById(id);
        var bad = !el.value.trim() || (id === "f-email" && !validEmail(el.value));
        el.style.borderColor = bad ? "#dc2626" : "";
        if (bad) ok = false;
    });
    if (!ok) { alert(tr("checkout.fillRequired", "Please fill in all required fields.")); return; }

    var cart = getCart();
    if (!cart.length) { alert(tr("checkout.emptyCart", "Cart is empty")); return; }

    var val = function (id) { return document.getElementById(id).value.trim(); };
    var chosen = function (name) {
        var r = document.querySelector('input[name="' + name + '"]:checked');
        var l = r && r.closest("label");
        var f = l && l.querySelector(".font-medium");
        return f ? f.textContent.trim() : "";
    };
    var fmt = function (n) { return n.toFixed(2).replace(".", ",") + " €"; };
    var total = 0;
    var lines = cart.map(function (i) {
        var sub = i.price * i.qty; total += sub;
        return "- " + i.qty + " x " + i.name + " (" + fmt(i.price) + ") = " + fmt(sub);
    }).join("\n");
    var country = document.querySelector("select") ? document.querySelector("select").selectedOptions[0].textContent : "";
    var num = "EB" + new Date().getFullYear() + String(Math.floor(10000 + Math.random() * 90000));
    var name = val("f-first") + " " + val("f-last");
    var email = val("f-email");
    var address = val("f-address") + ", " + val("f-postal") + " " + val("f-city") + ", " + country;
    var shippingMode = chosen("shipping");

    var btn = document.getElementById("place-order-btn");
    var label = btn.innerHTML;
    btn.disabled = true; btn.style.opacity = "0.6";
    btn.textContent = tr("checkout.sending", "Sending your order…");

    localStorage.setItem("eurobois_order", JSON.stringify({ number: num, email: email, name: name }));

    sendToOwner("New order " + num + " - " + name + " (awaiting bank details)", {
        Order_number: num,
        Customer: name,
        Phone: val("f-phone"),
        Email: email,
        Address: address,
        Shipping_method: shippingMode,
        Payment_method: "Bank transfer (manual – send IBAN by reply email)",
        Products: "\n" + lines,
        Total: fmt(total) + " (free shipping)",
        Status: "Awaiting your bank details email to the customer"
    }, email, name)
    .then(function () {
        window.location.href = "confirmation.html";
    })
    .catch(function (err) {
        console.error(err);
        btn.disabled = false; btn.style.opacity = ""; btn.innerHTML = label;
        alert(tr("checkout.sendError", "Unable to send the order. Please check your connection and try again, or contact us at +370 661 02523.") + "\n\n(" + (err.message || "") + ")");
    });
}
