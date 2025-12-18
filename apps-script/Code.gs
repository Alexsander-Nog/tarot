const CONTACT_EMAIL = "contato.soraiatarot@gmail.com";

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function getExpectedToken_() {
  return PropertiesService.getScriptProperties().getProperty("WEBHOOK_TOKEN") || "";
}

function validateToken_(e) {
  const expected = getExpectedToken_();
  if (!expected) return true; // allow if not configured

  const token = (e && e.parameter && e.parameter.token) ? String(e.parameter.token) : "";
  return token === expected;
}

function safeString_(v, maxLen) {
  if (typeof v !== "string") return "";
  const s = v.trim();
  if (!s) return "";
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

function safeLargeString_(v, maxLen) {
  if (typeof v !== "string") return "";
  // Don't trim HTML/text bodies; trimming can remove intentional whitespace.
  const s = v;
  if (!s) return "";
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

function isEmail_(v) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;
}

function buildHtml_(payload) {
  const name = safeString_(payload.name, 80) || "";
  const profileName = safeString_(payload.profileName, 120) || safeString_(payload.profileId, 30) || "";

  const scores = payload.scores || {};
  const fogo = Number(scores.fogo || 0);
  const terra = Number(scores.terra || 0);
  const ar = Number(scores.ar || 0);
  const agua = Number(scores.agua || 0);

  const whatsappNumber = safeString_(payload.whatsappBusinessNumber, 32);
  const waLink = whatsappNumber
    ? "https://wa.me/" + whatsappNumber.replace(/\D/g, "") + "?text=" + encodeURIComponent(
        "Oi! Acabei de fazer o teste 'Descubra Seu Perfil Amoroso' e meu resultado foi " + profileName + ". Gostaria de saber mais sobre a consulta personalizada!"
      )
    : "";

  return (
    "<div style=\"font-family:Arial,sans-serif;line-height:1.5\">" +
      "<h2>Seu resultado do Quiz</h2>" +
      (name ? ("<p>Olá, <b>" + name + "</b>!</p>") : "") +
      "<p>Seu perfil amoroso foi: <b>" + profileName + "</b></p>" +
      "<h3>Pontuação</h3>" +
      "<ul>" +
        "<li>Fogo: " + fogo + "</li>" +
        "<li>Terra: " + terra + "</li>" +
        "<li>Ar: " + ar + "</li>" +
        "<li>Água: " + agua + "</li>" +
      "</ul>" +
      (waLink ? ("<p><a href=\"" + waLink + "\">Falar no WhatsApp</a></p>") : "") +
      "<hr/>" +
      "<p>Se precisar, responda este email para falar com: " + CONTACT_EMAIL + "</p>" +
    "</div>"
  );
}

function doPost(e) {
  try {
    if (!validateToken_(e)) {
      return json_({ ok: false, error: "unauthorized" });
    }

    const raw = e && e.postData && e.postData.contents ? String(e.postData.contents) : "{}";
    const payload = JSON.parse(raw);

    const to = safeString_(payload.to, 254);
    if (!isEmail_(to)) {
      return json_({ ok: false, error: "invalid_to" });
    }

    const profileName = safeString_(payload.profileName, 120) || safeString_(payload.profileId, 30);
    const subject = safeString_(payload.subject, 160) || (profileName ? ("Seu resultado: " + profileName) : "Seu resultado do Quiz");

    // If the frontend sends a full HTML body, use it; otherwise fall back to the basic template.
    // Apps Script can receive large payloads; keep a safety cap but allow more than 50k.
    const htmlBody = safeLargeString_(payload.htmlBody, 250000) || buildHtml_(payload);
    // Plain-text fallback for clients that strip HTML.
    const textBody = safeLargeString_(payload.textBody, 100000) || "";

    MailApp.sendEmail({
      to: to,
      subject: subject,
      body: textBody || " ",
      htmlBody: htmlBody,
      replyTo: CONTACT_EMAIL,
      name: "Soraiá Tarot",
    });

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  // Quick health check
  if (!validateToken_(e)) {
    return json_({ ok: false, error: "unauthorized" });
  }

  return json_({ ok: true, service: "apps-script-email-webhook" });
}
