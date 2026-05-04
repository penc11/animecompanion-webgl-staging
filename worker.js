export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const assetResponse = await env.ASSETS.fetch(request);
    const headers = new Headers(assetResponse.headers);

    headers.set("X-Robots-Tag", "noindex, nofollow");

    if (path === "/" || path.endsWith("/index.html")) {
      headers.set("Content-Type", "text/html; charset=utf-8");
      headers.set("Cache-Control", "no-store");
      headers.delete("Content-Encoding");
    }

    if (path.endsWith(".loader.js")) {
      headers.set("Content-Type", "application/javascript");
      headers.set("Cache-Control", "no-store");
      headers.delete("Content-Encoding");
    }

    if (path.endsWith(".framework.js.br")) {
      headers.set("Content-Type", "application/javascript");
      headers.set("Content-Encoding", "br");
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    if (path.endsWith(".wasm.br")) {
      headers.set("Content-Type", "application/wasm");
      headers.set("Content-Encoding", "br");
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    if (path.endsWith(".data.br")) {
      headers.set("Content-Type", "application/octet-stream");
      headers.set("Content-Encoding", "br");
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    if (path.endsWith(".bundle.br")) {
      headers.set("Content-Type", "application/octet-stream");
      headers.set("Content-Encoding", "br");
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    if (path.endsWith(".symbols.json.br")) {
      headers.set("Content-Type", "application/json");
      headers.set("Content-Encoding", "br");
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    if (path.startsWith("/StreamingAssets/")) {
      headers.set("Cache-Control", "no-store");
      headers.delete("Content-Encoding");
    }

    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
      encodeBody: "manual"
    });
  }
};
