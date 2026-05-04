export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const assetResponse = await env.ASSETS.fetch(request);
    const headers = new Headers(assetResponse.headers);

    headers.set("X-Robots-Tag", "noindex, nofollow");

    if (path.endsWith(".loader.js")) {
      headers.set("Content-Type", "application/javascript");
      headers.set("Cache-Control", "no-store");
      headers.delete("Content-Encoding");
    }

    if (path.endsWith(".framework.js.br")) {
      headers.set("Content-Type", "application/javascript");
      headers.set("Content-Encoding", "br");
      headers.set("Cache-Control", "public, max-age=31536000, immutable, no-transform");
    }

    if (path.endsWith(".wasm.br")) {
      headers.set("Content-Type", "application/wasm");
      headers.set("Content-Encoding", "br");
      headers.set("Cache-Control", "public, max-age=31536000, immutable, no-transform");
    }

    if (path.endsWith(".data.br")) {
      headers.set("Content-Type", "application/octet-stream");
      headers.set("Content-Encoding", "br");
      headers.set("Cache-Control", "public, max-age=31536000, immutable, no-transform");
    }

    if (path.endsWith(".bundle.br")) {
      headers.set("Content-Type", "application/octet-stream");
      headers.set("Content-Encoding", "br");
      headers.set("Cache-Control", "public, max-age=31536000, immutable, no-transform");
    }

    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
      encodeBody: "manual"
    });
  }
};
