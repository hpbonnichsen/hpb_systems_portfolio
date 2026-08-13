# hpb_systems — portfolio

CV-/portfolioside for Hans-Peter Bonnichsen, AI-konsulent & formidler.
Ren HTML, CSS og JavaScript — ingen build, ingen npm, ingen afhængigheder.

## Kør lokalt

Åbn `index.html` direkte i browseren, eller kør en lokal server:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Struktur

```
index.html      forsiden (bento-dashboard)
css/style.css   al styling — designtokens ligger i :root
js/main.js      scroll-reveal og optælling af nøgletal
assets/         portrætfoto og CV-PDF lægges her
```

Forsidens rækkefølge er en bevidst læserute:
nøgletal → hvem jeg er → hvordan jeg arbejder → hvad jeg tilbyder →
hvad jeg kan → beviser (cases) → værktøjer → kontakt.

## Undersider (endnu ikke bygget)

Kortene på forsiden linker allerede til:

- `om.html`
- `ydelser.html`
- `kompetencer.html`
- `cases.html`
- `cases/rag-chatbot.html`
- `cases/escape-room.html`
- `cases/ai-strategi.html`
- `cases/roskilde-elearning.html`

## Ting der mangler

- Portrætfoto: læg det som `assets/portrait.jpg` og udskift monogram-pladsholderen
  i `index.html` (se TODO-kommentaren i `.portrait`).
- CV-PDF: læg den som `assets/cv-hans-peter-bonnichsen.pdf` — linket i
  kontaktkortet peger allerede derhen.
- LinkedIn-URL i kontaktkortet.

## Design

Nostromo-paletten, delt med desktop-opsætningen for visuel konsistens:

Amber er **accentfarve**, ikke brødtekstfarve. Brødteksten er varm off-white,
så siden er behagelig at læse i længere stræk og læser professionelt frem for
retro-terminal.

| Token         | Hex       | Kontrast mod `--panel` | Brug                      |
|---------------|-----------|------------------------|---------------------------|
| `--bg`        | `#0a0a0a` | —                      | baggrund                  |
| `--panel`     | `#141414` | —                      | kort                      |
| `--ink`       | `#ece3d6` | 15,7:1                 | brødtekst, overskrifter   |
| `--ink-dim`   | `#9c9287` | 6,1:1                  | sekundær tekst            |
| `--amber-hot` | `#ffb000` | 10,4:1                 | labels, tal, CTA          |
| `--amber-dim` | `#5a4500` | fejler AA              | **kun** kanter/dekoration |
| `--phosphor`  | `#00ff41` | 13,9:1                 | status og tags            |

Typografi: JetBrains Mono (overskrifter, labels, tal) + Inter (brødtekst).

## Faktagrundlag

Alle tal og påstande stammer fra kandidatprofilen i
`~/Documents/repos/MadsLorentzen/ai-job-search/CLAUDE.md`. Tilføj ikke tal
til siden, der ikke kan spores dertil.
