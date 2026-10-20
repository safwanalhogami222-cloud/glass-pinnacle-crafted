import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { findServiceBySlug } from "./service-routing";

const services = [
  { slug: "glass-railings", title: "درابزين زجاج" },
  { slug: "glass-doors", title: "أبواب زجاج" },
  { slug: "glass-maintenance", title: "صيانة الزجاج" },
];

describe("public service URL resolution", () => {
  test("literal $slug is missing, not another service", () => {
    assert.equal(findServiceBySlug(services, "$slug"), undefined);
  });
  test("glass-railings resolves to railings", () => {
    assert.equal(findServiceBySlug(services, "glass-railings")?.title, "درابزين زجاج");
  });
  test("glass-doors resolves to doors", () => {
    assert.equal(findServiceBySlug(services, "glass-doors")?.title, "أبواب زجاج");
  });
  test("glass-maintenance resolves to maintenance", () => {
    assert.equal(findServiceBySlug(services, "glass-maintenance")?.title, "صيانة الزجاج");
  });
  test("unknown and encoded placeholder values are missing", () => {
    assert.equal(findServiceBySlug(services, "nonexistent-service"), undefined);
    assert.equal(findServiceBySlug(services, "%24slug"), undefined);
  });
});