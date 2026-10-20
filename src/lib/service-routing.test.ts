import { describe, expect, test } from "bun:test";
import { findServiceBySlug } from "./service-routing";

const services = [
  { slug: "glass-railings", title: "درابزين زجاج" },
  { slug: "glass-doors", title: "أبواب زجاج" },
  { slug: "glass-maintenance", title: "صيانة الزجاج" },
];

describe("public service URL resolution", () => {
  test("literal $slug is missing, not another service", () => {
    expect(findServiceBySlug(services, "$slug")).toBeUndefined();
  });
  test("glass-railings resolves to railings", () => {
    expect(findServiceBySlug(services, "glass-railings")?.title).toBe("درابزين زجاج");
  });
  test("glass-doors resolves to doors", () => {
    expect(findServiceBySlug(services, "glass-doors")?.title).toBe("أبواب زجاج");
  });
  test("glass-maintenance resolves to maintenance", () => {
    expect(findServiceBySlug(services, "glass-maintenance")?.title).toBe("صيانة الزجاج");
  });
  test("unknown and encoded placeholder values are missing", () => {
    expect(findServiceBySlug(services, "nonexistent-service")).toBeUndefined();
    expect(findServiceBySlug(services, "%24slug")).toBeUndefined();
  });
});