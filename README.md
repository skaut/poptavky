# IT Poptávky
Kód pro web pro poptávky hostovaný na https://ITpoptavky.skaut.cz.

## Jak zapojím svůj projekt?

Pro zapojení projektu do poptávkového webu kontaktuj [Péťu](mailto:petra.meslova@gmail.com). Po přidání vytvoř v repozitáři svého projektu konfigurační soubor `.project-info.json` s následující strukturou:

```json
{
    "name": "Testovací projekt",
    "short-description": "Tohle je demo - 1 řádek textu",
    "description": "Tohle je projekt, který je jen demo... - 1-2 odstavce textu",
    "issue-label": "help wanted",
    "tags": [
        "php",
        "wordpress"
    ],
    "maintainers": [
        {
            "name": "Pan Testovací"
        }
    ],
    "links": [
        {
            "type": "email",
            "uri": "mailto:user@skaut.cz"
        },
        {
            "type": "homepage",
            "uri": "https://ITpoptavky.skaut.cz"
        },
        {
            "type": "demo",
            "uri": "https://ITpoptavky.skaut.cz"
        },
        {
            "type": "issue-tracker",
            "uri": "https://github.com/skaut/poptavky/issues"
        },
        {
            "type": "wiki",
            "uri": "https://github.com/skaut/poptavky/wiki"
        },
        {
            "type": "docs",
            "uri": "https://napoveda.skaut.cz"
        },
        {
            "type": "github-repo",
            "uri": "https://github.com/skaut/poptavky",
            "name": "skaut/poptavky"
        },
        {
            "type": "slack",
            "uri": "https://app.slack.com/client/T4RRAU265/C4RSPRQQH",
            "space": "SkautIT",
            "channel": "infoodbor"
        },
        {
            "type": "facebook-page",
            "uri": "https://www.facebook.com/skautis",
            "name": "skautIS a informační technologie"
        },
        {
            "type": "facebook-group",
            "uri": "https://www.facebook.com/groups/109571433077978",
            "name": "Dobrý skautský web - Podpora"
        }
    ]
}
```

Povinná jsou pole `name`, `short-description`, `description`, `maintainers` (alespoň jeden) a `links` (ty, které máte).

Celý projekt bude zobrazen na webu spolu se všemi issues, které mají `issue-label` z nastavení (nebo `help wanted`, pokud není nastaven).
