const tierSelect =
    document.getElementById(
        "tierSelect"
    );

const minForOne =
    document.getElementById(
        "minForOne"
    );

const amountInput =
    document.getElementById(
        "amountInput"
    );

const rawMaterialsList =
    document.getElementById(
        "rawMaterialsList"
    );

const calculateButton =
    document.getElementById(
        "calculateButton"
    );

tierSelect.addEventListener(
    "change",
    function () {

        const selectedTier =
            tierSelect.value;

        const minValues = {

            T2: "",
            T3: "Minimum 2",
            T4: "Minimum 2",
            T5: "Minimum 3",
            T6: "Minimum 4",
            T7: "Minimum 5",
            T8: "Minimum 5"

        };

        minForOne.textContent =
            minValues[selectedTier];

    }
);

function calculateRawMaterials() {

    const rawToRefined = {

        T2: 1,
        T3: 2,
        T4: 2,
        T5: 3,
        T6: 4,
        T7: 5,
        T8: 5

    };

    const tier =
        tierSelect.value;

    const amountToRefine =
        parseInt(
            amountInput.value,
            10
        );

    if (
        isNaN(amountToRefine) ||
        amountToRefine <= 0
    ) {

        rawMaterialsList.innerHTML = `

                    <p class="error-message">
                        Please enter a valid amount.
                    </p>

                `;

        return;

    }

    const totalCanBeMade =
        Math.floor(
            amountToRefine /
            rawToRefined[tier]
        );

    let output = "";

    switch (tier) {

        case "T2":

            output = `

                        <div class="material-row">

                            <span>
                                T2 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                    `;

            break;

        case "T3":

            output = `

                        <div class="material-row">

                            <span>
                                T2 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T3 Raw
                            </span>

                            <strong>
                                ${Number(
                amountToRefine
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                    `;

            break;

        case "T4":

            output = `

                        <div class="material-row">

                            <span>
                                T2 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 1
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T3 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 2
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T4 Raw
                            </span>

                            <strong>
                                ${Number(
                amountToRefine
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                    `;

            break;

        case "T5":

            output = `

                        <div class="material-row">

                            <span>
                                T2 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 1
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T3 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 2
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T4 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 2
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T5 Raw
                            </span>

                            <strong>
                                ${Number(
                amountToRefine
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                    `;

            break;

        case "T6":

            output = `

                        <div class="material-row">

                            <span>
                                T2 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 1
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T3 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 2
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T4 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 2
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T5 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 3
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T6 Raw
                            </span>

                            <strong>
                                ${Number(
                amountToRefine
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                    `;

            break;

        case "T7":

            output = `

                        <div class="material-row">

                            <span>
                                T2 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 1
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T3 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 2
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T4 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 2
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T5 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 3
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T6 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 4
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T7 Raw
                            </span>

                            <strong>
                                ${Number(
                amountToRefine
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                    `;

            break;

        case "T8":

            output = `

                        <div class="material-row">

                            <span>
                                T2 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 1
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T3 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 2
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T4 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 2
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T5 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 3
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T6 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 4
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T7 Raw
                            </span>

                            <strong>
                                ${Number(
                totalCanBeMade * 5
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                        <div class="material-row">

                            <span>
                                T8 Raw
                            </span>

                            <strong>
                                ${Number(
                amountToRefine
            ).toLocaleString("en-US")}
                            </strong>

                        </div>

                    `;

            break;

    }

    rawMaterialsList.innerHTML = `

                <div class="materials-title">
                    Required Materials
                </div>

                ${output}

                <div class="refined-total">

                    <span>
                        Total Refined Made
                    </span>

                    <strong>
                        ${Number(
        totalCanBeMade
    ).toLocaleString("en-US")}
                        ${tier} Units
                    </strong>

                </div>

            `;

}

calculateButton.addEventListener(
    "click",
    calculateRawMaterials
);

amountInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            calculateRawMaterials();

        }

    }
);

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.tagName === "INPUT"
        ) {

            event.target.select();

        }

    }
);
