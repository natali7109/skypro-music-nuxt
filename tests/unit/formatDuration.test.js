import { describe, it, expect } from "vitest";
import { formatDuration } from "../../utils/formatDuration";

describe("formatDuration", () => {
  it("форматирует секунды в mm:ss", () => {
    expect(formatDuration(0)).toBe("0:00");
    expect(formatDuration(5)).toBe("0:05");
    expect(formatDuration(65)).toBe("1:05");
    expect(formatDuration(600)).toBe("10:00");
    expect(formatDuration(3599)).toBe("59:59");
  });

  it("обрабатывает крайние случаи", () => {
    expect(formatDuration(-5)).toBe("");
    expect(formatDuration("abc")).toBe("");
    expect(formatDuration(null)).toBe("");
    expect(formatDuration(undefined)).toBe("");
  });
});
