import { ProjectListings } from "./interfaces/ProjectListings"

export const testData: ProjectListings = {
  projects: [
    {
      owner: "skaut",
      repo: "skaut-google-drive-gallery",
      info: {
        name: "WordPress plugin: Galerie obrázků a videí z Google Disku",
        "short-description": "Plugin pro WordPress, který ze složek s fotkami na Google Disku dělá galerie na webu.",
        description: "Galerie obrázků a videí z Google Disku je plugin pro WordPress, který propojí web s Google Diskem. V pluginu se dá vybrat libovolná složku na Google Disku nebo ve Sdíleném disku a plugin z ní vytvoří galerii s obrázky a videi na libovolné stránce či příspěvku na webu. Ze všech složek a podsložek jsou navíc vytvořeny vnořené “podgalerie”. Plugin vzniknul primárně pro potřeby Junáka, oddílů a středisek, ale vyvíjíme ho tzv. Open-Source (otevřeně pro veřejnost) a nabízíme ho v oficiální databázi pluginů pro WordPress. V tuto chvíli (léto 2021) podle statistik WordPressu plugin běží na víc jak 4 000 webových stránek a z kontaktů s uživateli víme, že ho využívají jak oddíly a střediska v Junáku, tak i \"náhodná veřejnost\" - zvlášť oblíbený se zdá být u skautů z celého světa a profesionálních fotografů, prezentujících svoje fotky.",
        tags: [
          "wordpress",
          "php",
          "javascript",
          "google"
        ],
        maintainers: [
          {
            name: "Marek Dědič – Mlha",
            email: "mlha@skaut.cz"
          }
        ],
        links: [
          {
            type: "email",
            uri: "mailto:mlha@skaut.cz"
          },
          {
            type: "homepage",
            uri: "https://wordpress.org/plugins/skaut-google-drive-gallery/"
          },
          {
            type: "demo",
            uri: "https://demo-skaut-google-drive-gallery.skauting.cz/"
          },
          {
            type: "issue-tracker",
            uri: "https://github.com/skaut/skaut-google-drive-gallery/issues"
          },
          {
            type: "docs",
            uri: "https://napoveda.skaut.cz/dobryweb/cs-skaut-google-drive-gallery"
          },
          {
            type: "github-repo",
            uri: "https://github.com/skaut/skaut-google-drive-gallery",
            name: "skaut/skaut-google-drive-gallery"
          }
        ]
      },
      issues: [
        {
          number: 1,
          title: "Add hint to set videos to public",
          description: "When editing and selecting a folder with videos, the editor could display a notice that setting videos to \"Anyone can view\" will speed them up.\r\n\r\nDepends on #792",
          link: "https://github.com/skaut/skaut-google-drive-gallery/issues/873"
        },
        {
          number: 2,
          title: "If a shortcut name differs from the original, the name in gallery and breadcrumbs differs",
          description: "When in a situation that there is a Google Drive shortcut somewhere in the gallery, the plugin displays the folder and it works for browsing. However, when looking at the shortcut as a member of its parent directory and when being inside the directory and looking at its name in the breadcrumbs, one uses the shortcut name, whereas the other uses the original folder name (when they differ).\r\n\r\nThis is a bug and both should show the shortcut name.",
          link: "https://github.com/skaut/skaut-google-drive-gallery/issues/745"
        },
        {
          number: 3,
          title: "Editing doesn't check path validity",
          description: "When opening the editor which contains a gallery that is made from a folder that has been renamed or deleted, the editor breaks. It shows: `Directory &quot;Galerie ODYWEB&quot; wasn&#039;t found - it may have been deleted or renamed.` Instead, it should verify that the path is valid and if it's not, should display a warning (and possibly move you to either the root directory, or the closest valid ancestor - however, this should not lead to you accidentally changing the gallery!)\r\n\r\nLast tested on 36dc1a10a353ba5bf2b98f33b49b1135a36ae3d3",
          link: "https://github.com/skaut/skaut-google-drive-gallery/issues/683"
        },
        {
          number: 4,
          title: "Ctrl-click on folders does not work",
          description: "Ctrl+click on a gallery item (subfolder) or breadcrumbs should open in a new tab",
          link: "https://github.com/skaut/skaut-google-drive-gallery/issues/571"
        },
        {
          number: 5,
          title: "Add option to specify gallery by a Drive link",
          description: "https://wordpress.org/support/topic/folder-link-instead-of-folder-name/\r\n\r\nBasically, instead of searching for the folder in WP, you'd just paste the link to it into the editor and the plugin would figure out the path (Google Drive files now return a list of parents, so it could be done.)\r\n\r\nDepends on #111.",
          link: "https://github.com/skaut/skaut-google-drive-gallery/issues/311"
        },
        {
          number: 6,
          title: "Add images to the block",
          description: "Currently, images aren't listed in the editor - both block and TinyMCE plugin. This often confuses users.",
          link: "https://github.com/skaut/skaut-google-drive-gallery/issues/257"
        },
        {
          number: 7,
          title: "Add video overlay",
          description: "In the image grid, we should add an overlay to signify that an item is a video (for example a big play icon).",
          link: "https://github.com/skaut/skaut-google-drive-gallery/issues/235"
        },
        {
          number: 8,
          title: "Increase test coverage",
          description: "https://codecov.io/gh/skaut/skaut-google-drive-gallery",
          link: "https://github.com/skaut/skaut-google-drive-gallery/issues/164"
        },
        {
          number: 9,
          title: "Themes with \"editor-styles\" support change the look of the block editor",
          description: "If the active theme contains\r\n```php\r\nadd_theme_support( 'editor-styles' );\r\n```\r\nits styles are also applied to the block editor, which then looks weird. We should implement our own styles for the editor.\r\n\r\nExample of such theme is the Twenty Seventeen theme.",
          link: "https://github.com/skaut/skaut-google-drive-gallery/issues/98"
        },
        {
          number: 10,
          title: "Google app creation manual is outdated",
          description: "https://napoveda.skaut.cz/dobryweb/en-skaut-google-drive-gallery/en-get-google-application\r\nhttps://napoveda.skaut.cz/dobryweb/cs-skaut-google-drive-gallery/cs-ziskani-google-aplikace\r\n\r\nGoogle changed the consent screen layout and require some form of verification.",
          link: "https://github.com/skaut/skaut-google-drive-gallery/issues/92"
        },
        {
          number: 11,
          title: "Directory preview images",
          description: "Currently, the first image in a directory is used for its preview.",
          link: "https://github.com/skaut/skaut-google-drive-gallery/issues/54"
        },
        {
          number: 12,
          title: "UX & design audit",
          description: "Go over the design of:\r\n- [ ] gallery view https://github.com/skaut/skaut-google-drive-gallery/issues/36\r\n- [ ] preview\r\n- [ ] folder thumbnail - overlay, folder title and image count\r\n- [ ] svg folder icon\r\n- [ ] gallery breadcrumbs\r\n- [ ] options page\r\n- [ ] WP.org plugin page\r\n- [ ] TinyMCE & Gutenberg editor plugins\r\n- [ ] TinyMCE & Gutenberg \"Authentication failed\" dialogs\r\n\r\nEverything on the frontend needs to work at least with the default WP template and DSW templates.",
          link: "https://github.com/skaut/skaut-google-drive-gallery/issues/33"
        }
      ]
    },
    {
      owner: "skaut",
      repo: "skautis-integration",
      info: {
        name: "WordPress plugin: SkautIS integrace",
        "short-description": "Plugin pro WordPress, který napojuje přihlašování přes skautIS na skautské weby.",
        description: "Plugin zajišťuje propojení skautských webů se skautISem. Dá se přes plugin registrovat, přihlašovat. Dokáže u stránek nastavovat oprávnění podle roli a dalších nastavení ve skautISu. Skrývá obsah podle toho jaká pravidla na stránce jsou nastavená.",
        tags: [
          "wordpress",
          "php",
          "javascript",
          "skautis"
        ],
        maintainers: [
          {
            name: "Michal Janata – Kalich",
            email: "kalich@skaut.cz"
          },
          {
            name: "Marek Dědič – Mlha",
            email: "mlha@skaut.cz"
          }
        ],
        links: [
          {
            type: "email",
            uri: "mailto:kalich@skaut.cz"
          },
          {
            type: "homepage",
            uri: "https://wordpress.org/plugins/skautis-integration/"
          },
          {
            type: "issue-tracker",
            uri: "https://github.com/skaut/skautis-integration/issues"
          },
          {
            type: "docs",
            uri: "https://napoveda.skaut.cz/skautis/skautis-integration"
          },
          {
            type: "github-repo",
            uri: "https://github.com/skaut/skautis-integration",
            name: "skaut/skautis-integration"
          }
        ]
      },
      issues: [
        {
          number: 1,
          title: "User management smart table is not smart when the registration module is enabled",
          description: "",
          link: "https://github.com/skaut/skautis-integration/issues/115"
        },
        {
          number: 2,
          title: "Chyba v zobrazení",
          description: "![image](https://user-images.githubusercontent.com/8988898/130583907-9aaf6288-2129-42dd-88ef-0a27b0c7ddd1.png)\r\n",
          link: "https://github.com/skaut/skautis-integration/issues/109"
        },
        {
          number: 3,
          title: "WordPress 5.x + Gutenberg",
          description: "Musíme pořešit, jak nejlépe integrovat náš plugin s WP 5.x a hlavně Gutenbergem.\r\n\r\nSkrývání bloků, celých stránek... atd",
          link: "https://github.com/skaut/skautis-integration/issues/70"
        },
        {
          number: 4,
          title: "Profilové fotky",
          description: "Co do WordPressu tahat i profilové fotky, co si lidi do skautISu přidávají. Aby u profilu nějakou fotku měli...",
          link: "https://github.com/skaut/skautis-integration/issues/43"
        },
        {
          number: 5,
          title: "Výběry pravidel v shortcode",
          description: "Přidat Select2 do výběru pravidel v shortcode.",
          link: "https://github.com/skaut/skautis-integration/issues/39"
        },
        {
          number: 6,
          title: "Modul \"Nábory\"",
          description: "modul pro nábory se zobrazením náborové mapy\r\npříklad: http://is.skaut.cz/napoveda/programatori.Hotove-reseni-MapAdvertising-Interaktivni-mapa-naborovych-informaci-zakladni.ashx\r\n\r\nOtevírám k tomu diskuzi...",
          link: "https://github.com/skaut/skautis-integration/issues/25"
        }
      ]
    }
  ]
}