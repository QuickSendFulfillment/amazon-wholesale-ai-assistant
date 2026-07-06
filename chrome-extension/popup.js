let currentProduct = {};

async function getActiveTab() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0];
}

async function extractAmazonProduct() {
    const tab = await getActiveTab();

    if (!tab.url.includes("amazon.")) {
        document.getElementById("productCard").innerHTML =
            "Open an Amazon product page first.";
        return;
    }

    const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const clean = (value) => (value || "").replace(/\s+/g, " ").trim();
            const text = (selector) => clean(document.querySelector(selector)?.innerText || "");

            const title =
                text("#productTitle") ||
                document.title.replace("Amazon.com:", "").trim();

            let brand =
                text("#bylineInfo") ||
                text(".po-brand .a-span9") ||
                text("tr.po-brand td.a-span9 span") ||
                "";

            brand = brand
                .replace(/^Brand:\s*/i, "")
                .replace(/^Visit the\s+/i, "")
                .replace(/\s+Store$/i, "")
                .replace(/^Shop\s+/i, "")
                .trim();

            const asin =
                document.querySelector("#ASIN")?.value ||
                location.pathname.match(/\/dp\/([A-Z0-9]{10})/)?.[1] ||
                location.pathname.match(/\/gp\/product\/([A-Z0-9]{10})/)?.[1] ||
                "";

            const price =
                text(".a-price .a-offscreen") ||
                text("#corePriceDisplay_desktop_feature_div .a-offscreen") ||
                "";

            const category =
                [...document.querySelectorAll("#wayfinding-breadcrumbs_feature_div a, .a-breadcrumb a")]
                    .map(a => clean(a.innerText))
                    .filter(Boolean)
                    .join(" > ");

            return {
                brand,
                asin,
                title,
                price,
                category,
                amazon_url: location.href,
                extracted_at: new Date().toISOString()
            };
        }
    });

    currentProduct = result || {};
    renderProduct();
    renderRecommendations();
}

function renderProduct() {
    document.getElementById("productCard").innerHTML = `
        <strong>Brand:</strong> ${currentProduct.brand || "-"}<br>
        <strong>ASIN:</strong> ${currentProduct.asin || "-"}<br>
        <strong>Title:</strong> ${currentProduct.title || "-"}<br>
        <strong>Price:</strong> ${currentProduct.price || "-"}<br>
        <strong>Category:</strong> ${currentProduct.category || "-"}
    `;
}

function renderRecommendations() {
    const brand = currentProduct.brand || "this brand";

    document.getElementById("recommendations").innerHTML = `
        Recommended next steps:<br><br>
        1. Find official website for <strong>${brand}</strong><br>
        2. Search global suppliers by target country<br>
        3. Verify supplier legitimacy<br>
        4. Generate outreach email
    `;
}

async function startMission() {

    const mission = {
        missionType: document.getElementById("missionType").value,
        country: document.getElementById("targetCountry").value,
        notes: document.getElementById("missionNotes").value,
        product: currentProduct
    };

    document.querySelector(".card ul").innerHTML =
        "<li>Sending mission to QuickSend AI...</li>";

    try {
        const response = await fetch("http://127.0.0.1:8000/brand-intelligence", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mission)
        });

        const result = await response.json();

        const planItems = result.research_plan
    .map(item => `<li>Step ${item.step}: ${item.task}</li>`)
    .join("");
    const websitePages = result.website_analysis?.pages_to_check
    ?.map(page => `<li>${page.type}: ${result.website_analysis.website_url}${page.search_path}</li>`)
    .join("") || "";

document.querySelector(".card ul").innerHTML = `
    <li><strong>${result.mission_status}</strong></li>
    <li><strong>Agent:</strong> ${result.agent}</li>
    <li><strong>Brand:</strong> ${result.brand}</li>
    <li><strong>Country:</strong> ${result.country}</li>
    <li><strong>Official Website:</strong> ${result.official_website?.official_website || "-"}</li>
    <li><strong>Website Pages to Check:</strong></li>
    ${websitePages}
    <li><strong>Research Plan:</strong></li>
    ${planItems}
    `;

    } catch (err) {
        document.querySelector(".card ul").innerHTML = `
            <li>Backend Offline</li>
            <li>Start FastAPI server.</li>
        `;

        console.error(err);
    }
}

    document.addEventListener("DOMContentLoaded", () => {
    extractAmazonProduct();

    document
        .getElementById("startMission")
        .addEventListener("click", startMission);
});