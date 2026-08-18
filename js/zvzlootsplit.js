const STARTING_GUILDS = 2;

let guildCount = 0;

const guildInputs =
    document.getElementById("guildInputs");

const splitValueInput =
    document.getElementById("splitValue");

const results =
    document.getElementById("splitResults");

const addGuildButton =
    document.getElementById("addGuild");


function addGuild() {

    guildCount++;

    const guild =
        document.createElement("div");

    guild.className =
        "input-container";

    guild.dataset.guildId =
        guildCount;

    guild.innerHTML = `

                <div class="field">

                    <label
                        for="guild${guildCount}Name"
                    >
                        Guild Name
                    </label>

                    <input
                        type="text"
                        id="guild${guildCount}Name"
                        value="Guild ${guildCount}"
                        autocomplete="off"
                    >

                </div>

                <div class="field">

                    <label
                        for="guild${guildCount}Attendance"
                    >
                        Attendance
                    </label>

                    <input
                        type="number"
                        id="guild${guildCount}Attendance"
                        min="0"
                        value="0"
                        inputmode="numeric"
                    >

                </div>

                <button
                    type="button"
                    class="remove-guild"
                    title="Remove Guild"
                    aria-label="Remove Guild"
                >

                    <i class="bx bx-trash"></i>

                </button>

            `;

    guildInputs.appendChild(guild);

    const removeButton =
        guild.querySelector(".remove-guild");

    removeButton.addEventListener(
        "click",
        () => {

            guild.remove();

            calculateSplits();

        }
    );

}


for (
    let i = 0;
    i < STARTING_GUILDS;
    i++
) {

    addGuild();

}


document.addEventListener(
    "click",
    event => {

        if (
            event.target.matches("input")
        ) {

            event.target.select();

        }

    }
);


document.addEventListener(
    "input",
    event => {

        if (
            event.target.matches("input")
        ) {

            calculateSplits();

        }

    }
);


splitValueInput.addEventListener(
    "blur",
    () => {

        const value =
            splitValueInput.value
                .replace(/\D/g, "");

        splitValueInput.value =
            value
                ? Number(value).toLocaleString()
                : "0";

        calculateSplits();

    }
);


addGuildButton.addEventListener(
    "click",
    () => {

        addGuild();

        calculateSplits();

    }
);



function calculateSplits() {

    const splitValue =
        Number(
            splitValueInput.value
                .replace(/,/g, "")
        ) || 0;

    const guilds = [];

    const guildRows =
        guildInputs.querySelectorAll(
            ".input-container"
        );

    guildRows.forEach(
        guildRow => {

            const nameInput =
                guildRow.querySelector(
                    'input[type="text"]'
                );

            const attendanceInput =
                guildRow.querySelector(
                    'input[type="number"]'
                );

            if (
                !nameInput ||
                !attendanceInput
            ) {

                return;

            }

            const name =
                nameInput.value.trim() ||
                `Guild ${guildRow.dataset.guildId}`;

            const attendance =
                Number(
                    attendanceInput.value
                ) || 0;

            guilds.push({

                name:
                    name,

                attendance:
                    attendance

            });

        }
    );


    const activeGuilds =
        guilds.filter(
            guild =>
                guild.attendance > 0
        );


    const totalAttendance =
        activeGuilds.reduce(
            (
                total,
                guild
            ) =>
                total +
                guild.attendance,
            0
        );


    if (
        splitValue <= 0 ||
        totalAttendance <= 0
    ) {

        results.innerHTML = `

                    <div class="results-header">

                        <h2>
                            Split Results
                        </h2>

                        <button
                            type="button"
                            id="copyResultsButton"
                        >

                            <i class="bx bx-copy"></i>

                            Copy Results

                        </button>

                    </div>

                    <p>
                        Enter a loot value and at least
                        one attendance value.
                    </p>

                `;

        setupCopyButton(null);

        return;

    }


    let distributed = 0;

    const shares =
        activeGuilds.map(
            guild => {

                const share =
                    Math.floor(
                        (
                            guild.attendance /
                            totalAttendance
                        ) *
                        splitValue
                    );

                distributed +=
                    share;

                return {

                    name:
                        guild.name,

                    attendance:
                        guild.attendance,

                    share:
                        share

                };

            }
        );


    const remainder =
        splitValue -
        distributed;

    if (
        shares.length > 0
    ) {

        shares[
            shares.length - 1
        ].share += remainder;

    }


    const output =
        shares
            .map(
                guild => `

                            <p class="result">

                                <span class="result-name">

                                    ${escapeHtml(
                    guild.name
                )}

                                </span>

                                <span class="result-value">

                                    ${guild.share
                        .toLocaleString()}

                                </span>

                            </p>

                        `
            )
            .join("");


    const totalDistributed =
        shares.reduce(
            (
                total,
                guild
            ) =>
                total +
                guild.share,
            0
        );


    results.innerHTML = `

                <div class="results-header">

                    <h2>
                        Split Results
                    </h2>

                    <button
                        type="button"
                        id="copyResultsButton"
                    >

                        <i class="bx bx-copy"></i>

                        Copy Results

                    </button>

                </div>

                ${output}

            `;


    setupCopyButton({

        splitValue:
            splitValue,

        shares:
            shares,

        totalDistributed:
            totalDistributed

    });

}


function setupCopyButton(data) {

    const copyButton =
        document.getElementById(
            "copyResultsButton"
        );

    if (!copyButton) {

        return;

    }

    copyButton.addEventListener(
        "click",
        async () => {

            if (!data) {

                copyButton.innerHTML = `

                            <i class="bx bx-x"></i>

                            Nothing to Copy

                        `;

                setTimeout(
                    () => {

                        copyButton.innerHTML = `

                                    <i class="bx bx-copy"></i>

                                    Copy Results

                                `;

                    },
                    1500
                );

                return;

            }

            let copyText =
                `ZvZ Loot Split\n`;

            copyText +=
                `Total Loot: ${data.splitValue.toLocaleString()}\n`;

            copyText +=
                `-------------------------\n`;

            data.shares.forEach(
                guild => {

                    copyText +=
                        `${guild.name}: ${guild.share.toLocaleString()}\n`;

                }
            );

            copyText +=
                `-------------------------\n`;
            try {

                await navigator.clipboard.writeText(
                    copyText
                );

                copyButton.innerHTML = `

                            <i class="bx bx-check"></i>

                            Copied!

                        `;

                setTimeout(
                    () => {

                        copyButton.innerHTML = `

                                    <i class="bx bx-copy"></i>

                                    Copy Results

                                `;

                    },
                    1500
                );

            } catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );

                copyButton.innerHTML = `

                            <i class="bx bx-x"></i>

                            Copy Failed

                        `;

                setTimeout(
                    () => {

                        copyButton.innerHTML = `

                                    <i class="bx bx-copy"></i>

                                    Copy Results

                                `;

                    },
                    1500
                );

            }

        }
    );

}


function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


calculateSplits();
