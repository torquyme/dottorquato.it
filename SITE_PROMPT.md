# Prompt: dottorquato.it portfolio site

Paste this whole file as a prompt to build Dr. Torquato's (dottorquato) personal portfolio website. It has two jobs: (1) be a small, calm portfolio listing DangerZone as a project, and (2) host DangerZone's privacy policy at a stable public URL, since Google Play and Apple App Store both require one. No backend, no build step required — plain HTML/CSS, a page or two of vanilla JS at most (language toggle, nothing else). Plan is to host it on GitHub Pages at the custom domain `dottorquato.it`.

## What to build

A small static site, three pages:

1. **Home** (`/`) — a short, quiet "about" landing page plus a list of projects. Today that list has exactly one entry: DangerZone.
2. **DangerZone project page** (`/dangerzone/`) — what the app is, why it exists, a couple of screenshots, a link to the Play Store listing once it is live, and a link to the privacy policy.
3. **DangerZone privacy policy** (`/dangerzone/privacy/`) — the actual policy text, English by default with an Italian toggle. This is the URL that goes into the Play Store / App Store "privacy policy" field, so it needs to be stable once published — do not restructure this path later without redirecting the old one.

No analytics, no trackers, no ads, no third-party embeds that phone home more than necessary (no font CDNs beyond what's already used, no share buttons, no comment widgets). The owner's own apps make a point of collecting nothing they don't need; this site should hold to the same standard.

## Brand direction

This is a personal portfolio, not the DangerZone app, so it should read as its own calm, editorial space — not a reskin of the app. Reuse the same type pairing as the app (same hand, same person), but keep the portfolio pages themselves neutral:

- **Portfolio pages (Home):** paper background `#E7EDEF`, ink text `#13252D`, secondary text / links `#2E5A6B` ("fathom"), rule lines `#9FB4BC` ("contour" — never for text). Optional dark mode: background `#0E1A20`, text `#D8E4E8`, secondary `#7FB0C0`. No magenta here — it is not a hazard page.
- **DangerZone project page:** same palette, but it is the one place on the site allowed a small amount of the app's danger magenta (`#B0106A`), used sparingly and only to echo the app's own identity (e.g. a small accent rule or the app icon mark) — not as a background or a call-to-action color. Keep it minor; this page is a portfolio entry, not the app itself.
- **DangerZone privacy page:** no magenta at all, same as [[PRIVACY_PAGE_PROMPT]] in the app repo specifies — a privacy policy isn't a hazard.
- **Type:** headings in a serif display face (the app uses "Source Serif 4"; Georgia is a fine fallback), body text in a humanist sans (the app uses "Atkinson Hyperlegible Next"; system-ui/sans-serif is a fine fallback).
- **Tone:** plain, direct sentences, sentence case, no marketing language, no superlatives. Match the register of the privacy text below exactly — it is already written in that voice, and the portfolio copy should sound like the same person wrote it.

## Site structure and copy

### Home (`/`)

- A short header: "dottorquato" (serif), maybe a one-line tagline (the owner should supply this — leave a clearly marked placeholder if not provided: `[ONE-LINE TAGLINE]`).
- A short "About" paragraph — placeholder, owner to fill in: `[SHORT BIO — who you are, what you build]`.
- A "Projects" section listing DangerZone as a card/row: name, one-sentence description, link to `/dangerzone/`.
  - One-sentence description to use: "DangerZone — a map that shows hazards other people nearby have reported, and lets you report one yourself."
- Footer: contact line, `torquyme@gmail.com`.

### DangerZone project page (`/dangerzone/`)

Content to include (adapt lightly for a portfolio page, but keep it factual — do not invent features):

- **What it is.** DangerZone is a Flutter app for Android (iOS planned) that shows hazards — road hazards, crime, fire, flood, dangerous animals — reported by people nearby, on a map and as a plain-language verdict ("Flood, 400 m east"). Reports are anonymous, shared, and expire on their own unless someone confirms they're still there.
- **Why it exists.** Safety information that's local and current is scattered or missing; DangerZone lets people nearby share what they're seeing right now, without accounts or personal data.
- **How it works, briefly:** anonymous sign-in (no name, email or phone number), a "Here" view that gives a direct verdict for your location, a map view of everything reported nearby, and a simple report flow capped to your actual location (within 2 km) so nothing can be placed somewhere the reporter can't vouch for.
- **Screenshots:** pull 2–4 from `danger-zone-flutter/docs/design/` (e.g. `here.png`, `chart.png`, `report.png`, `detail.png`) — these are the real, current app UI, not mockups to redraw.
- **Links:**
  - Play Store listing: `[PLAY STORE URL]` (placeholder until the app is published — omit the link or gray it out until it exists, don't publish a dead link).
  - Privacy policy: `/dangerzone/privacy/` (relative link on this same site).

### DangerZone privacy policy (`/dangerzone/privacy/`)

Same requirements as a standalone privacy page: readable on a phone (most visitors arrive from a store listing), English by default with a simple toggle or two anchored sections for Italian, both texts included in full and unabridged — do not summarize or rewrite them, they are fact-checked against the app's actual code and Firestore rules.

## English text (verbatim)

```markdown
# DangerZone: Privacy Policy

Last updated: 22 September 2026

DangerZone ("the app") is published by Dr. Torquato (dottorquato). You can write to us at torquyme@gmail.com.

## In short

- The app has no login screen, no name, email address or phone number of yours. It signs you into an anonymous account on first launch, so your reports and votes can be told apart from everyone else's without knowing who you are.
- What you report is shared: it is visible to everyone nearby using the app, not just you.
- Your live location is never stored or sent anywhere. Only when you choose to send a report is a position sent: the coordinates of that report.
- Google's Firebase service stores and serves this shared data on our behalf, in the EU (region `eur3`). We do not run our own servers.
- The map is Google Maps. Loading it sends some technical data to Google, as does the shared-reports connection.

## What you send when you use the app

When you send a report, three things are sent together, tied to your anonymous account: the report itself, a small record that limits how often you can report, and, from then on, your votes and abuse flags on any report.

**A report** contains:

- the type of hazard and how serious you said it is;
- the text you typed in "Add details", if any — this is shown to other people, so do not put anything in it you would not want strangers to read;
- the coordinates of the place you reported (your position, or the spot you chose on the map);
- when the report was made and when it expires;
- your anonymous account id, as the report's author;
- an approximate location code (a "geohash") derived from the coordinates, used only to find reports near a person efficiently.

**Still there / No longer there** on someone else's report sends a vote (which of the two, and when) tied to your anonymous account id, and raises a counter on that report. One vote per report per account.

**Report this warning** sends an abuse flag: the reason you picked, and your anonymous account id. It is visible only to you and to us — not to the report's author or to anyone else — and raises a counter on the report. One flag per report per account.

**Sending any report** also updates a small record under your own account: when you last reported and how many times today, so the app can enforce "at most one report every 30 seconds, and 20 a day." This record holds no report content, only timestamps and counts.

The app also remembers, on your phone only, the language you picked in Settings, and which of these you have voted or flagged, so it does not offer the same choice twice.

## Who can see it

Anyone using the app nearby can see an active report's type, severity, description, location and how many "Still there" / "No longer there" votes it has — this is what "shared" means. Your anonymous account id travels with the report as its author, but it is not a name and cannot be turned into one. Nobody, including us, can use it to find out who you are.

Your individual votes and abuse flags are private: only you (and, for flags, us, if we need to look into a report) can see which reports you voted on or flagged.

## Your location

The app asks for permission to use your location, precise or approximate. It uses it to:

- work out which hazards are near you, and how far away and in which direction they are;
- show where you are on the map and centre the map on you;
- place a report where you are, or nearby, if you choose to send one.

Your location is used only while the app is open. The app does not ask for background location and does not read your position when it is closed. Your live position is not stored or sent anywhere, and the app does not keep a history of where you have been. The only place a position is ever sent is inside a report you choose to send, as the location of that report — and, briefly, as the approximate area your phone is asking to see reports in (see "The shared reports service" below).

You can refuse or withdraw the location permission in your phone's settings. The app still works: you can look at the map and browse nearby hazards. Sending a report needs a location fix, so that no report can be placed somewhere you cannot vouch for — with location off, reporting is unavailable until you turn it back on.

On Android, the app asks for the location permissions (precise and approximate) and for network access (to load the map and reach the shared reports). On iPhone, it asks for location "While Using the App".

## The shared reports service

Reports, votes and flags are stored in Cloud Firestore, part of Google's Firebase, under our own project. To read or send any of this, your phone connects to Google's Firestore service and, among other things, asks for reports in the area you are looking at (as the geohash code mentioned above, not your exact position). Google's infrastructure receives the technical data any such connection needs — your IP address and a Firebase installation identifier — to operate the connection; we do not separately collect or see this. Google's own privacy policy covers what Google itself does with it: https://policies.google.com/privacy

**How long we keep it.** A report is deleted automatically some time after it expires — usually promptly, guaranteed within about a day. When a report is deleted, its votes and flags stop being reachable through the app; we clear out what is left of them from time to time. Your own rate-limit record (last report time, today's count) is never deleted while the account exists, because deleting it would reset your daily limit — it holds no report content.

**Reporting abuse.** "Report this warning" sends a private note to us about a report you think is wrong, offensive or against the rules. We use it to decide whether to remove a report; we do not tell the report's author who flagged it, and we cannot connect the flag to a real name.

## The map

The map comes from Google Maps, through Google's Maps software development kit. To draw the map, your phone connects to Google and asks for the map of the area you are looking at, so Google can tell roughly which area you are viewing. According to Google, the Maps SDK also collects technical data such as your IP address, device metadata (for example device model and operating system version), a pseudonymous identifier of the SDK, crash reports, and map interactions such as panning and zooming. Google uses this data under its own privacy policy: https://policies.google.com/privacy

We do not separately receive this data from Google.

## What we do not do

- We do not ask you to create an account with a name, email address or phone number. The account the app makes for you is anonymous.
- We do not show ads.
- We do not use analytics or advertising tools of our own, and we do not track you across other apps or websites.
- We do not sell your data.
- The app does not send notifications.

## Deleting your data

**Remove my report**, on the detail page of a report you made, ends it immediately — that works at any time, for any report you sent, without contacting us. For anything else — a vote or a flag you want removed, or your rate-limit record — write to torquyme@gmail.com. Because your account is anonymous, we cannot look it up by name; tell us roughly when and where you used the app so we can find the right records.

Uninstalling the app, or clearing its storage in your phone's settings, deletes your language choice and the local record of what you have voted on. It does not delete reports you already sent, or your account on Google's Firebase service: those live until the report expires and is purged, or until you ask us to remove them.

## Your choices and rights

You can turn location off at any time, in your phone's settings (see "Your location"). You can remove any report you made yourself, at any time, from its own page. For anything else you'd like changed or deleted, write to torquyme@gmail.com — see "Deleting your data" above. For the technical data Google's own services receive when you use the map or the shared reports service, read Google's privacy policy, linked above.

## Children

The app is not designed for children, and we do not knowingly collect data from anyone.

## Emergencies

DangerZone is not an emergency service. It does not contact emergency services on your behalf, and reports can be wrong or out of date. The "Call emergency services" button on an Emergency-level hazard only opens your phone's own dialer with a number filled in — it never places a call for you, and no report data is sent by pressing it. In an emergency, call your local emergency number first.

## Changes to this policy

If a future version of the app handles data differently, we will update this policy before that version is released and change the date at the top.

## Contact

Dr. Torquato (dottorquato)
torquyme@gmail.com
```

## Italian text (verbatim — machine-translated draft, not yet reviewed by a native speaker; publish as-is for now, flag that a review is pending)

```markdown
# DangerZone: Informativa sulla privacy

Ultimo aggiornamento: 22 settembre 2026

DangerZone ("l'app") è pubblicata da Dr. Torquato (dottorquato). Puoi scriverci a torquyme@gmail.com.

## In breve

- L'app non ha una schermata di accesso, né il tuo nome, indirizzo email o numero di telefono. Al primo avvio ti accede con un account anonimo, così le tue segnalazioni e i tuoi voti possono essere distinti da quelli di chiunque altro senza sapere chi sei.
- Ciò che segnali è condiviso: è visibile a chiunque nelle vicinanze usi l'app, non solo a te.
- La tua posizione in tempo reale non viene mai salvata né inviata da nessuna parte. Solo quando scegli di inviare una segnalazione viene inviata una posizione: le coordinate di quella segnalazione.
- Il servizio Firebase di Google salva e distribuisce questi dati condivisi per nostro conto, nell'UE (regione `eur3`). Non gestiamo server nostri.
- La mappa è Google Maps. Caricarla invia alcuni dati tecnici a Google, così come la connessione al servizio di segnalazioni condivise.

## Cosa invii quando usi l'app

Quando invii una segnalazione, vengono inviate insieme tre cose, legate al tuo account anonimo: la segnalazione stessa, un piccolo record che limita quante volte puoi segnalare, e, da quel momento, i tuoi voti e le tue segnalazioni di abuso su qualsiasi segnalazione.

**Una segnalazione** contiene:

- il tipo di pericolo e la gravità che hai indicato;
- il testo che hai scritto in "Aggiungi dettagli", se ce n'è — viene mostrato ad altre persone, quindi non scriverci nulla che non vorresti far leggere a estranei;
- le coordinate del punto segnalato (la tua posizione, o il punto che hai scelto sulla mappa);
- quando è stata fatta la segnalazione e quando scade;
- il tuo id account anonimo, come autore della segnalazione;
- un codice di posizione approssimativa ("geohash") calcolato dalle coordinate, usato solo per trovare in modo efficiente le segnalazioni vicine a una persona.

**C'è ancora / Non c'è più** sulla segnalazione di qualcun altro invia un voto (quale dei due, e quando) legato al tuo id account anonimo, e fa salire un contatore su quella segnalazione. Un voto per segnalazione per account.

**Segnala questa segnalazione** invia una segnalazione di abuso: il motivo che hai scelto e il tuo id account anonimo. È visibile solo a te e a noi — non all'autore della segnalazione né a chiunque altro — e fa salire un contatore sulla segnalazione. Una segnalazione di abuso per segnalazione per account.

**Ogni invio di una segnalazione** aggiorna anche un piccolo record legato al tuo account: quando hai segnalato l'ultima volta e quante volte oggi, così l'app può far rispettare il limite di "al massimo una segnalazione ogni 30 secondi, e 20 al giorno". Questo record non contiene il testo delle segnalazioni, solo orari e conteggi.

L'app ricorda anche, solo sul tuo telefono, la lingua che hai scelto nelle Impostazioni e su quali di queste hai già votato o segnalato, così non ti propone due volte la stessa scelta.

## Chi può vederlo

Chiunque usi l'app nelle vicinanze può vedere il tipo, la gravità, la descrizione, la posizione e quanti voti "C'è ancora" / "Non c'è più" ha una segnalazione attiva — è questo che significa "condiviso". Il tuo id account anonimo viaggia insieme alla segnalazione come suo autore, ma non è un nome e non può diventarlo. Nessuno, noi compresi, può usarlo per scoprire chi sei.

I tuoi singoli voti e le tue segnalazioni di abuso sono privati: solo tu (e, per le segnalazioni di abuso, noi, se dobbiamo esaminare una segnalazione) potete vedere su quali segnalazioni hai votato o quali hai segnalato.

## La tua posizione

L'app chiede il permesso di usare la tua posizione, precisa o approssimativa. La usa per:

- capire quali pericoli sono vicini a te, a che distanza e in quale direzione;
- mostrare dove ti trovi sulla mappa e centrare la mappa su di te;
- inserire una segnalazione nel punto in cui ti trovi, o vicino ad esso, se scegli di inviarne una.

La posizione viene usata solo mentre l'app è aperta. L'app non chiede la posizione in background e non legge la tua posizione quando è chiusa. La tua posizione in tempo reale non viene salvata né inviata da nessuna parte, e l'app non tiene uno storico dei luoghi in cui sei stato. L'unico caso in cui una posizione viene inviata è dentro una segnalazione che scegli di inviare, come posizione di quella segnalazione — e, brevemente, come area approssimativa per cui il telefono chiede le segnalazioni presenti (vedi "Il servizio di segnalazioni condivise" più sotto).

Puoi rifiutare o revocare il permesso di posizione dalle impostazioni del telefono. L'app continua a funzionare: puoi guardare la mappa e vedere i pericoli vicini. Per inviare una segnalazione serve una posizione rilevata, così nessuna segnalazione può essere collocata in un punto che non puoi garantire — con la posizione disattivata, non è possibile segnalare finché non la riattivi.

Su Android l'app richiede i permessi di posizione (precisa e approssimativa) e l'accesso alla rete (per caricare la mappa e raggiungere le segnalazioni condivise). Su iPhone richiede la posizione "Mentre usi l'app".

## Il servizio di segnalazioni condivise

Segnalazioni, voti e segnalazioni di abuso sono salvati in Cloud Firestore, parte di Firebase di Google, nel nostro progetto. Per leggere o inviare uno qualsiasi di questi dati, il telefono si collega al servizio Firestore di Google e, tra le altre cose, chiede le segnalazioni nella zona che stai guardando (come il codice geohash citato sopra, non la tua posizione esatta). L'infrastruttura di Google riceve i dati tecnici necessari a questa connessione — il tuo indirizzo IP e un identificativo di installazione Firebase — per farla funzionare; noi non li raccogliamo né li vediamo separatamente. L'informativa sulla privacy di Google copre cosa fa Google stessa con questi dati: https://policies.google.com/privacy

**Per quanto tempo li conserviamo.** Una segnalazione viene cancellata automaticamente qualche tempo dopo la sua scadenza — di solito rapidamente, comunque entro circa un giorno. Quando una segnalazione viene cancellata, i suoi voti e le sue segnalazioni di abuso smettono di essere raggiungibili tramite l'app; ripuliamo periodicamente ciò che ne resta. Il tuo record del limite di frequenza (ultimo orario di segnalazione, conteggio di oggi) non viene mai cancellato finché l'account esiste, perché cancellarlo azzererebbe il tuo limite giornaliero — non contiene il testo di alcuna segnalazione.

**Segnalare un abuso.** "Segnala questa segnalazione" ci invia una nota privata su una segnalazione che ritieni sbagliata, offensiva o contraria alle regole. La usiamo per decidere se rimuovere una segnalazione; non diciamo all'autore chi l'ha segnalata, e non possiamo collegare la segnalazione di abuso a un nome reale.

## La mappa

La mappa proviene da Google Maps, tramite il kit di sviluppo (SDK) di Google Maps. Per disegnarla, il tuo telefono si collega a Google e chiede la mappa della zona che stai guardando: così Google può capire, più o meno, quale zona stai visualizzando. Secondo Google, l'SDK di Google Maps raccoglie anche dati tecnici come l'indirizzo IP, i metadati del dispositivo (per esempio modello e versione del sistema operativo), un identificativo pseudonimo dell'SDK, le segnalazioni di arresto anomalo e le interazioni con la mappa, come spostamenti e zoom. Google usa questi dati secondo la propria informativa sulla privacy: https://policies.google.com/privacy

Noi non riceviamo separatamente questi dati da Google.

## Cosa non facciamo

- Non ti chiediamo di creare un account con nome, indirizzo email o numero di telefono. L'account che l'app crea per te è anonimo.
- Non mostriamo pubblicità.
- Non usiamo strumenti di statistica o pubblicitari nostri e non ti tracciamo su altre app o siti web.
- Non vendiamo i tuoi dati.
- L'app non invia notifiche.

## Cancellare i tuoi dati

**Rimuovi la mia segnalazione**, nella pagina dei dettagli di una segnalazione che hai fatto, la termina immediatamente — funziona in qualsiasi momento, per qualsiasi segnalazione tu abbia inviato, senza contattarci. Per qualsiasi altra cosa — un voto o una segnalazione di abuso che vuoi rimuovere, o il tuo record del limite di frequenza — scrivi a torquyme@gmail.com. Poiché il tuo account è anonimo, non possiamo cercarlo per nome: dicci indicativamente quando e dove hai usato l'app, così possiamo trovare i record giusti.

Disinstallare l'app, o cancellarne i dati dalle impostazioni del telefono, cancella la lingua scelta e il record locale di ciò su cui hai votato. Non cancella le segnalazioni che hai già inviato, né il tuo account sul servizio Firebase di Google: quelli restano finché la segnalazione scade e viene eliminata, o finché non ci chiedi di rimuoverli.

## Le tue scelte e i tuoi diritti

Puoi disattivare la posizione in qualsiasi momento, nelle impostazioni del telefono (vedi "La tua posizione"). Puoi rimuovere in qualsiasi momento una segnalazione che hai fatto tu, dalla sua stessa pagina. Per qualsiasi altra cosa che vuoi cambiare o cancellare, scrivi a torquyme@gmail.com — vedi "Cancellare i tuoi dati" sopra. Per i dati tecnici che i servizi di Google ricevono quando usi la mappa o il servizio di segnalazioni condivise, leggi l'informativa di Google indicata sopra.

## Minori

L'app non è pensata per i bambini e non raccogliamo consapevolmente dati da nessuno.

## Emergenze

DangerZone non è un servizio di emergenza. Non contatta i servizi di emergenza per conto tuo, e le segnalazioni possono essere sbagliate o non più aggiornate. Il pulsante "Chiama i soccorsi" su un pericolo di livello Emergenza apre solo il tastierino del tuo telefono con un numero già inserito — non effettua mai una chiamata al posto tuo, e premerlo non invia alcun dato di segnalazione. In caso di emergenza, chiama prima il numero di emergenza del tuo Paese.

## Modifiche a questa informativa

Se una versione futura dell'app tratterà i dati in modo diverso, aggiorneremo questa informativa prima del rilascio di quella versione e cambieremo la data in alto.

## Contatti

Dr. Torquato (dottorquato)
torquyme@gmail.com
```

## Technical notes

- Plain HTML/CSS. A tiny bit of vanilla JS is fine for the language toggle on the privacy page; no framework, no bundler required, though either is fine if the owner prefers one for maintainability.
- Mobile-first: most privacy-page visitors arrive from a store listing on a phone.
- Static hosting target is GitHub Pages with a custom domain (`dottorquato.it`, via a `CNAME` file at the repo root once DNS is pointed at it — DNS/domain setup is the owner's step, not part of this build).
- Keep the privacy page's URL path (`/dangerzone/privacy/`) stable once published — it goes into the Play Console and App Store Connect forms, and both platforms expect it to keep working.

## Source of truth

The privacy policy text above is copied from `docs/store/PRIVACY_POLICY.md` / `PRIVACY_POLICY.it.md` in the `danger-zone-flutter` repo (as of 22 September 2026). If this page and those files ever disagree, the repo files are the source of truth — copy from there again rather than hand-editing this prompt or the published page. The repo also has a matching prompt for a privacy-only page, `docs/design/PRIVACY_PAGE_PROMPT.md`, if a standalone privacy page is ever needed separately from this portfolio site.
