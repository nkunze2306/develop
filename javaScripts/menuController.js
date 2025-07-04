function loadPage(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Fehler beim Laden der Seite");
            return response.text();
        })
        .then(html => {
            document.getElementById("main-content").innerHTML = html;

            if (url === "HTML/mainPage.html") {
                fetchSalaryStepTable('entgeldstufen.json', 'Optionen');
                if (typeof afterMainPageLoad === 'function') {
                    afterMainPageLoad();
                }
            }

            if (document.getElementById("workingType")) {
                selectedEmployeeType();
            }

            if (url === "HTML/employeePage.html") {
                requestAnimationFrame(() => {
                    loadEmployeeScript().then(() => {
                        initEmployeePage();
                        createEmployeeCard();
                        initScrollToTopButton();
                    });
                });
            }


        const currentTheme = document.documentElement.getAttribute('theme') || 'dark';
        if (typeof switchButtonImagesForTheme === 'function') {
            switchButtonImagesForTheme(currentTheme);
        }


            if (url === "HTML/projectPage.html") {
                if (typeof loadProjectData === "function") {
                    loadProjectData();
                }
            }

        })
        .catch(error => {
            document.getElementById("main-content").innerHTML = "<p>Seite konnte nicht geladen werden.</p>";
            console.error(error);
        });
}

// ⬇️ HIER unterhalb von loadPage kommt loadEmployeeScript hin:
function loadEmployeeScript() {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "javaScripts/mitarbeiter.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}
