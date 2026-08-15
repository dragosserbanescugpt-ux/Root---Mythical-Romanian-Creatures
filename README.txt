CREATURI DIN MITOLOGIA ROMÂNEASCĂ — ETAPA A

CE ESTE INCLUS
- index.html complet, cu toate cele 20 de personaje și textele lor
- design responsive desktop / tabletă / mobil
- meniu mobil
- index rapid către fiecare creatură
- scroll reveal discret
- lightbox pentru imagini
- secțiune de surse
- imagini placeholder SVG pentru fiecare creatură și pentru hero

IMPORTANT
Imaginile din assets/images sunt PLACEHOLDERE pentru ETAPA A.
În ETAPA B vor fi înlocuite cu ilustrațiile finale, păstrând aceleași nume de fișiere sau actualizând extensiile în HTML.

CUM TESTEZI
1. Dezarhivează folderul.
2. Deschide index.html direct în browser.
3. Nu este nevoie de internet, server local, npm sau instalări.

STRUCTURĂ
romanian-mythology-stage-a/
├── index.html
├── README.txt
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── images/
        ├── hero.svg
        ├── favicon.svg
        └── 20 imagini placeholder

PUBLICARE
Fiind complet static, site-ul poate fi urcat ulterior pe GitHub Pages, Netlify, Vercel, Cloudflare Pages sau pe hosting clasic.


ACTUALIZARE STIL
- versiunea aceasta folosește imaginea de referință încărcată de utilizator ca fundal vizual și ca bază de atmosferă pentru designul site-ului.
- hero-ul folosește direct această imagine, iar restul paginii păstrează o estetică de hartă veche / manuscris ornamental.


V9 HERO-ONLY OVERRIDE
- Această versiune păstrează integral site-ul inițial.
- Singura modificare este hero-ul: varianta din două coloane a fost înlocuită cu un frontispiciu grimoire central.
- Textul din hero este exact: 'Grimoire al lumii nevăzute' + descrierea furnizată.
- Imaginea din dreapta a fost eliminată.
- În rest, textul, imaginile și structura inițială au rămas neschimbate.


V16 FONT UPDATE
- Fontul de display a fost schimbat din Arhaic_rom în MedievalSharp-Regular.ttf.
- Este aplicat pe titlul hero, titlurile de secțiune, numele creaturilor, brand și index.
- Textele lungi rămân în fontul serif lizibil existent.


V17 FONT UPDATE
- MedievalSharp rămâne fontul pentru titluri și elementele de display.
- Cormorant Garamond este folosit pentru textele lungi și este încărcat prin Google Fonts.
- Site-ul are nevoie de conexiune la internet pentru a încărca Cormorant Garamond; pe Vercel va funcționa normal.


V18 LOCAL FONT
- Cormorant Garamond este inclus direct în proiect în assets/fonts/.
- Nu mai există dependență de Google Fonts.
- Fontul poate fi văzut local, inclusiv prin deschiderea directă a index.html.


V19 HERO TITLE UPDATE
- Titlul principal din hero folosește Cormorant Garamond Local.
- Este mărit și setat bold pentru mai mult impact.


V20 UPDATE
- „al lumii nevăzute” nu mai este italic.
- Titlul din hero folosește Cormorant Garamond și încape pe un singur rând.
- Au fost adăugate corecții pentru cardurile de pe mobil, pentru a evita intercalarea/ suprapunerea ușoară.


V21 HERO TITLE STACKED
- Titlul din hero este împărțit vizual în două niveluri: „Grimoire” mare sus și „al lumii nevăzute” mai mic dedesubt.
- Linia a doua este setată pe lățimea totală a titlului pentru a se încadra elegant sub cuvântul principal.


V22 RESEARCH CONTENT
- Cele 20 de creaturi au fost înlocuite cu lista finală din documentul de research.
- Fata Pădurii a fost înlocuită cu Zânele Bune.
- Borsocăile au fost înlocuite cu Spiridușul.
- Textele fișelor sunt preluate din bestiarul enciclopedic furnizat.
- Sunt păstrate exclusiv cele două surse: Tudor Pamfile și Marcel Olinescu.


V23 — ALL 20 CREATURE ILLUSTRATIONS
- Au fost aplicate cele 20 de ilustrații medievale generate, fiecare la creatura corespunzătoare.
- Imaginile sunt PNG transparente în assets/images/creatures/.
- Afișarea folosește object-fit: contain și fără chenar/box-shadow, inclusiv pe mobil.
