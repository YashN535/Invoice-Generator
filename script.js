document.addEventListener("DOMContentLoaded", () => {
  const getStartedButton = document.getElementById("getStarted");
  const invoiceFormContainer = document.querySelector(".form-container");
  const backToLandingButton = document.getElementById("backToLanding");
  const invoiceForm = document.getElementById("invoiceForm");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Check local storage for theme preference
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    body.classList.add(currentTheme);
  }

  // Toggle Dark Mode on button click
  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save theme preference in local storage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark-mode");
    } else {
      localStorage.removeItem("theme");
    }
  });

  getStartedButton.addEventListener("click", () => {
    document.querySelector(".landing-container").style.display = "none";
    invoiceFormContainer.classList.remove("hidden");
    invoiceFormContainer.style.display = "block";
  });

  backToLandingButton.addEventListener("click", () => {
    invoiceFormContainer.style.display = "none";
    document.querySelector(".landing-container").style.display = "flex";
  });

  invoiceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const logoFile = document.getElementById("logoUpload").files[0];
    const businessName = document.getElementById("businessName").value;
    const businessAddress = document.getElementById("businessAddress").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const pincode = document.getElementById("pincode").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const clientName = document.getElementById("clientName").value;
    const invoiceNumber = document.getElementById("invoiceNumber").value;
    const poNumber = document.getElementById("poNumber").value;
    const dateIssued = document.getElementById("dateIssued").value;
    const paymentTerms = document.getElementById("paymentTerms").value;
    const items = document.getElementById("items").value.split("\n");

    let logoHTML = "";
    if (logoFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        logoHTML = `<img src="${e.target.result}" alt="Business Logo" style="max-width: 200px; margin-bottom: 10px;">`;
        displayInvoice();
      };
      reader.readAsDataURL(logoFile);
    } else {
      displayInvoice();
    }

    function displayInvoice() {
      const invoiceOutput = document.getElementById("invoice");
      invoiceOutput.innerHTML = `
          <h2>${businessName} Invoice</h2>
          ${logoHTML}
          <p>${businessAddress}, ${city}, ${state}, ${pincode}</p>
          <p>Phone: ${phone}</p>
          <p>Email: ${email}</p>
          <h3>Invoice Details</h3>
          <p>Client Name: ${clientName}</p>
          <p>Invoice Number: ${invoiceNumber}</p>
          <p>PO Number: ${poNumber}</p>
          <p>Date Issued: ${dateIssued}</p>
          <p>Payment Terms: ${paymentTerms}</p>
          <h3>Items:</h3>
          <ul>
              ${items.map((item) => `<li>${item}</li>`).join("")}
          </ul>
      `;
    }
  });
});
