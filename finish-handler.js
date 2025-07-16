// finish-handler.js
// Dieser Code fängt ab, wenn die letzte Seite ("Finish") angezeigt wird
$(document).on('pagebeforeshow', function(ev) {
  if (ev.target.id === 'page_finish') {
    // Hier sind alle Antworten im `session`-Objekt gesammelt
    const testId = session.testId;
    const csv    = buildCSVfromSession(session); // Deine CSV-Bau-Funktion

    // Issue-Link öffnen
    const title = encodeURIComponent(`MUSHRA Results: ${testId}`);
    const body  = encodeURIComponent("```csv\n" + csv + "\n```");
    const url   = `https://github.com/giuliadavilap/webmushra-biodiversity-pretest/issues/new`
                + `?title=${title}&body=${body}&labels=auto-results`;
    window.open(url, '_blank');
  }
});
