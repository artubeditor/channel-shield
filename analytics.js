const GA_MEASUREMENT_ID = "";

function isValidGoogleMeasurementId(id) {
  return /^G-[A-Z0-9]+$/i.test(id);
}

if (isValidGoogleMeasurementId(GA_MEASUREMENT_ID)) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const googleTag = document.createElement("script");
  googleTag.async = true;
  googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(googleTag);

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
}
