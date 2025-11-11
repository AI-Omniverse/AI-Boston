export async function onRequestPost({ request }) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Google Apps Script Web App endpoint (replace with your actual one)
    const googleScriptURL = "https://script.google.com/macros/s/AKfycby0-Sossc_dBh_DTIja_I_vvcwXioAcNDSw79gJjNuzSSmiulnlWIXB4GoR5rwSAWWyvQ/exec";

    // Forward the data to Google Sheets via Google Apps Script
    const response = await fetch(googleScriptURL, {
      method: "POST",
      body: new URLSearchParams({ name, email, message }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    const result = await response.text();
    console.log("Google Script response:", result);

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
