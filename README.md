# Installation und Nutzung
* für die Nutzung ist eine aktuelle Version von Node.js nötig
* im root-Ordner `npm install` ausführen
* das Skript wird mit `node index` gestartet
* die generierten zim-Dateien sind in dem Ordner "zim" zu finden
* der Ordner "zim" muss über das Programm ZIM Wiki geöffnet werden
* dort muss das notizbuch als Latex-Datei exportiert werden
* als Vorlage dafür sollte das durch das Skript generierte `latex/ModuleTemplate.tex` benutzt werden
* die entstanden tex-Datein dann in PDF umwandeln. Den Umwandlungsprozess zwei mal ausführen,
damit das Inhaltsverzeichnis korrekt erstell wird.
* die Nutzung von `pdflatex` ist an dieser Stelle empfehlenswert. Wenn beim Prozess Fehler auftreten ist
das normal. Den Vorgang mit `Q` abbrechen, die Datei wurde trotzdem korrekt erstellt.