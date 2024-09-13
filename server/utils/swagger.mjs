export async function loadSwaggerDocument() {
  const swaggerDocument = await import("../swagger-output.json", {
    assert: { type: "json" },
  });
  return swaggerDocument.default;
}
