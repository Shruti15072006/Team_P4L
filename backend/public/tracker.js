// tracker.js
(function () {
  // Pick API key & email from window OR localStorage
  const apiKey = window.dataPulseKey || localStorage.getItem("dp_apiKey");
  const userEmail =
    window.dataPulseEmail ||
    localStorage.getItem("dp_email") ||
    "no-email@example.com";

  if (!apiKey) {
    console.warn(
      "DataPulse key not found. Please set window.dataPulseKey or login first.",
    );
    return;
  }

  // Send tracking data to server
  function sendData(data) {
    fetch("http://localhost:5000/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey,
        page: window.location.href,
        data,
        time: new Date().toISOString(),
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log("DataPulse tracked:", res))
      .catch((err) => console.error("DataPulse error:", err));
  }

  // Serialize form fields into object
  function serializeForm(form) {
    const obj = {};
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }

  // Attach submit listeners to all forms
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // prevent page reload
      const data = serializeForm(form);
      sendData(data);

      // Optional: alert user after submission
      if (data.name) {
        alert(`Thank you, ${data.name}! Your form has been tracked.`);
      } else {
        alert("Form submitted and tracked!");
      }

      // Reset form after submission
      form.reset();
    });
  });

  console.log(
    "✅ DataPulse tracker initialized for key:",
    apiKey,
    "and email:",
    userEmail,
  );
})();
