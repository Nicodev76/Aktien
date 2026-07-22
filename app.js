const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Farben
const RESET = "\x1b[0m";
const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const MAGENTA = "\x1b[35m";
const BOLD = "\x1b[1m";

function frage(text) {
    return new Promise(resolve => {
        rl.question(text, antwort => resolve(antwort));
    });
}

function linie() {
    console.log(`${CYAN}════════════════════════════════════════════════════════════${RESET}`);
}

function zeigeKapitalProTag(startkapital, prozentProTag, tage) {
    console.log();
    linie();
    console.log(`${BOLD}${CYAN}                  KAPITALVERLAUF${RESET}`);
    linie();

    console.log(
        `${MAGENTA}│ ${"Tag".padEnd(6)} │ ${"Kapital".padStart(15)} │${RESET}`
    );
    console.log(
        `${CYAN}├────────┼─────────────────┤${RESET}`
    );

    for (let tag = 0; tag <= tage; tag++) {
        const kapital = startkapital * Math.pow(1 + prozentProTag / 100, tag);

        console.log(
            `${MAGENTA}│${RESET} ${String(tag).padEnd(6)} ${MAGENTA}│${RESET} ${GREEN}${kapital
                .toFixed(2)
                .padStart(14)} €${RESET} ${MAGENTA}│${RESET}`
        );
    }

    linie();
}

async function main() {
    console.clear();

    linie();
    console.log(`${BOLD}${CYAN}      Rechner für tägliches Kapitalwachstum${RESET}`);
    linie();

    const startkapital = parseFloat(await frage(`${YELLOW}💰 Startkapital: ${RESET}`));
    const zielkapital = parseFloat(await frage(`${YELLOW}🎯 Zielkapital : ${RESET}`));
    const tage = parseInt(await frage(`${YELLOW}📅 Tage        : ${RESET}`));

    if (
        isNaN(startkapital) ||
        isNaN(zielkapital) ||
        isNaN(tage) ||
        startkapital <= 0 ||
        zielkapital <= 0 ||
        tage <= 0
    ) {
        console.log(`${RED}\n❌ Ungültige Eingaben!${RESET}`);
        rl.close();
        return;
    }

    const wachstumsrate =
        Math.pow(zielkapital / startkapital, 1 / tage) - 1;

    console.log();
    linie();
    console.log(`${BOLD}${CYAN}                     ERGEBNIS${RESET}`);
    linie();

    console.log(`${YELLOW}Startkapital      : ${GREEN}${startkapital.toFixed(2)} €${RESET}`);
    console.log(`${YELLOW}Zielkapital       : ${GREEN}${zielkapital.toFixed(2)} €${RESET}`);
    console.log(`${YELLOW}Zeitraum          : ${GREEN}${tage} Tage${RESET}`);
    console.log(
        `${YELLOW}Wachstum pro Tag  : ${GREEN}${(wachstumsrate * 100).toFixed(4)} %${RESET}`
    );

    linie();

    const anzeigen = (
        await frage(
            `\n${YELLOW}📊 Kapitalverlauf anzeigen? (ja/nein): ${RESET}`
        )
    )
        .trim()
        .toLowerCase();

    if (anzeigen === "ja" || anzeigen === "j") {
        zeigeKapitalProTag(startkapital, wachstumsrate * 100, tage);
    }

    console.log(`\n${CYAN}Vielen Dank fürs Benutzen des Rechners! 👋${RESET}`);

    rl.close();
}

main();