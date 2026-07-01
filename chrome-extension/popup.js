let currentProduct = {};

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

function setStatus(message) {
  document.getElementById("status").textContent = message;
}

function text(selector) {
  const el = document.querySelector(selector);
  return el ? el.innerText.trim() : "";
}

async function extractProductData() {
  const tab = await getActiveTab();

  if (!tab.url.includes("amazon.")) {
    setStatus("Open an Amazon product page first.");
    return;
  }

  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const clean = (value) => (value || "").replace(/\s+/g, " ").trim();
      const text = (selector) => clean(document.querySelector(selector)?.innerText || "");
      const attr = (selector, name) => document.querySelector(selector)?.getAttribute(name) || "";

      const title =
        text("#productTitle") ||
        text("span#productTitle") ||
        document.title.replace("Amazon.com:", "").trim();

      let brand =
        text("#bylineInfo") ||
        text("a#bylineInfo") ||
        text(".po-brand .a-span9") ||
        text("tr.po-brand td.a-span9 span") ||
        text("#brand") ||
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
        text("#priceblock_ourprice") ||
        text("#priceblock_dealprice") ||
        text("#corePriceDisplay_desktop_feature_div .a-offscreen") ||
        text("#corePrice_feature_div .a-offscreen") ||
        "";

      const category =
        [...document.querySelectorAll("#wayfinding-breadcrumbs_feature_div a, .a-breadcrumb a")]
          .map(a => clean(a.innerText))
          .filter(Boolean)
          .join(" > ");

      const mainImage =
        attr("#landingImage", "src") ||
        attr("#imgBlkFront", "src") ||
        attr("#ebooksImgBlkFront", "src") ||
        "";

      const seller =
        text("#sellerProfileTriggerId") ||
        text("#merchant-info") ||
        text("#tabular-buybox .tabular-buybox-text") ||
        "";

      const availability =
        text("#availability") ||
        text("#outOfStock") ||
        "";

      const bulletPoints =
        [...document.querySelectorAll("#feature-bullets li span.a-list-item")]
          .map(el => clean(el.innerText))
          .filter(Boolean)
          .slice(0, 8);

      const details = {};
      [...document.querySelectorAll("#productDetails_techSpec_section_1 tr, #productDetails_detailBullets_sections1 tr")]
        .forEach(row => {
          const key = clean(row.querySelector("th")?.innerText || "");
          const value = clean(row.querySelector("td")?.innerText || "");
          if (key && value) details[key] = value;
        });

      [...document.querySelectorAll("#detailBullets_feature_div li")]
        .forEach(li => {
          const raw = clean(li.innerText || "");
          const parts = raw.split(":");
          if (parts.length >= 2) {
            const key = clean(parts[0]);
            const value = clean(parts.slice(1).join(":"));
            if (key && value) details[key] = value;
          }
        });

      return {
        brand,
        asin,
        title,
        price,
        category,
        seller,
        availability,
        main_image: mainImage,
        bullet_points: bulletPoints,
        product_details: details,
        amazon_url: location.href,
        extracted_at: new Date().toISOString()
      };
    }
  });

  currentProduct = result || {};
  renderProduct(currentProduct);
  setStatus("Product data extracted.");
}

function renderProduct(product) {
  document.getElementById("brand").textContent = product.brand || "-";
  document.getElementById("asin").textContent = product.asin || "-";
  document.getElementById("title").textContent = product.title || "-";
  document.getElementById("price").textContent = product.price || "-";
  document.getElementById("category").textContent = product.category || "-";
  document.getElementById("seller").textContent = product.seller || "-";

  const urlEl = document.getElementById("url");
  urlEl.textContent = product.amazon_url || "-";
  urlEl.href = product.amazon_url || "#";

  const img = document.getElementById("mainImage");
  if (product.main_image) {
    img.src = product.main_image;
    img.style.display = "inline-block";
  } else {
    img.style.display = "none";
  }

  document.getElementById("debug").textContent = JSON.stringify(product, null, 2);
}

async function saveLead() {
  if (!currentProduct.asin && !currentProduct.title) {
    setStatus("Extract product data first.");
    return;
  }

  const brandWebsite = document.getElementById("brandWebsite").value.trim();
  const notes = document.getElementById("notes").value.trim();

  const lead = {
    ...currentProduct,
    brand_website: brandWebsite,
    notes
  };

  const data = await chrome.storage.local.get({ leads: [] });
  data.leads.push(lead);
  await chrome.storage.local.set({ leads: data.leads });

  updateLeadCount();
  setStatus("Lead saved.");
}

function csvEscape(value) {
  if (Array.isArray(value)) value = value.join(" | ");
  if (typeof value === "object" && value !== null) value = JSON.stringify(value);
  const str = String(value ?? "");
  return `"${str.replace(/"/g, '""')}"`;
}

async function exportCSV() {
  const { leads } = await chrome.storage.local.get({ leads: [] });

  if (!leads.length) {
    setStatus("No leads saved.");
    return;
  }

  const headers = [
    "brand",
    "asin",
    "title",
    "price",
    "category",
    "seller",
    "availability",
    "amazon_url",
    "main_image",
    "brand_website",
    "notes",
    "bullet_points",
    "product_details",
    "extracted_at"
  ];

  const rows = [
    headers.join(","),
    ...leads.map(lead => headers.map(h => csvEscape(lead[h])).join(","))
  ];

  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  chrome.downloads.download({
    url,
    filename: "amazon_phase1_product_leads.csv",
    saveAs: true
  });

  setStatus("CSV export started.");
}

async function clearSavedLeads() {
  await chrome.storage.local.set({ leads: [] });
  updateLeadCount();
  setStatus("Saved leads cleared.");
}

async function updateLeadCount() {
  const { leads } = await chrome.storage.local.get({ leads: [] });
  document.getElementById("leadCount").textContent = leads.length;
}

document.getElementById("extractBtn").addEventListener("click", extractProductData);
document.getElementById("saveBtn").addEventListener("click", saveLead);
document.getElementById("exportBtn").addEventListener("click", exportCSV);
document.getElementById("clearBtn").addEventListener("click", clearSavedLeads);

updateLeadCount();
