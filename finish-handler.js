// finish-handler.js

// Wenn die Finish‑Page kommt, binden wir den Form-Submit ab
$(document).on('pagebeforeshow', function(ev) {
  if (ev.target.id === 'page_finish') {
    // a) Form-Submit abfangen
    $('#page_finish form')
      .off('submit')                       // sicherheitshalber altes Binding entfernen
      .on('submit', function(e) {
        e.preventDefault();               // Verhindert das Default-POST
        e.stopImmediatePropagation();     // stellt sicher, dass nichts anderes feuert

        // b) hier erst deine Ergebnisse versenden
        const testId = session.testId;
        const csv    = buildCSVfromSession(session);

        const title = encodeURIComponent(`MUSHRA Results: ${testId}`);
        const body  = encodeURIComponent("```csv\n" + csv + "\n```");
        const url   = `https://github.com/giuliadavilap/webmushra-biodiversity-pretest/issues/new`
                    + `?title=${title}&body=${body}&labels=auto-results`;
        window.open(url, '_blank');
        return false;                      // noch ein Sicherheitspuffer
      });
  }
});
