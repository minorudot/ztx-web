async function initWasm(statusId, successMsg) {
    const go = new Go();
    try {
        const response = await fetch("manifest.json");
        const manifest = await response.json();
        const version = manifest.version;
        const result = await WebAssembly.instantiateStreaming(fetch("main.wasm?v=" + version), go.importObject);
        go.run(result.instance);
        if (statusId && successMsg) {
            const el = document.getElementById(statusId);
            if (el) el.innerText = successMsg;
        }
    } catch (err) {
        console.error("WASM init error:", err);
        if (statusId) {
            const el = document.getElementById(statusId);
            if (el) el.innerText = "Error loading WASM: " + err;
        }
    }
}
