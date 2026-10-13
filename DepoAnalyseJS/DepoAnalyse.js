function datumFürDenEintragEinstellen() {
  const heute = new Date();
  const jahr = heute.getFullYear();
  const monat = String(heute.getMonth() + 1).padStart(2, "0"); // Sorgt für "01" bis "12"
  const tag = String(heute.getDate()).padStart(2, "0"); // Sorgt für "01" bis "31"

  // Ins richtige Format für das Datum-Input bringen (YYYY-MM-DD)
  const formatiertesDatum = `${jahr}-${monat}-${tag}`;

  // In das Input-Feld einfügen (über die ID)
  document.getElementById("datumFeldFürEintrag").value = formatiertesDatum;
}

datumFürDenEintragEinstellen(); // Funktion beim Laden der Seite aufrufen