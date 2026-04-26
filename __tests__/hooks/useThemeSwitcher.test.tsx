import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();

beforeEach(() => {
  localStorageMock.clear();
  document.documentElement.className = "";
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });
});

describe("useThemeSwitcher", () => {
  it("defaults to dark theme when localStorage is empty", () => {
    const { result } = renderHook(() => useThemeSwitcher());
    const [activeTheme] = result.current;
    expect(activeTheme).toBe("light"); // activeTheme is the opposite of the current theme
  });

  it("adds the current theme class to document root on mount", () => {
    renderHook(() => useThemeSwitcher());
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("persists the default theme to localStorage on mount", () => {
    renderHook(() => useThemeSwitcher());
    expect(localStorageMock.getItem("theme")).toBe("dark");
  });

  it("restores theme from localStorage on mount", () => {
    localStorageMock.setItem("theme", "light");
    const { result } = renderHook(() => useThemeSwitcher());
    const [activeTheme] = result.current;
    expect(activeTheme).toBe("dark"); // activeTheme is the opposite of restored "light"
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("does not restore when localStorage is empty", () => {
    const { result } = renderHook(() => useThemeSwitcher());
    const [activeTheme] = result.current;
    expect(activeTheme).toBe("light"); // default dark → activeTheme is light
  });

  it("toggles class and persists when setTheme is called", () => {
    const { result } = renderHook(() => useThemeSwitcher());
    const [, setTheme] = result.current;

    act(() => { setTheme("light"); });

    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorageMock.getItem("theme")).toBe("light");
  });

  it("returns the updated activeTheme after setTheme", () => {
    const { result } = renderHook(() => useThemeSwitcher());
    const [, setTheme] = result.current;

    act(() => { setTheme("light"); });

    const [activeTheme] = result.current;
    expect(activeTheme).toBe("dark"); // after switching to light, activeTheme is dark
  });

  it("does not re-read localStorage after the initial mount (no infinite loop)", () => {
    const getSpy = vi.spyOn(localStorageMock, "getItem");
    const { result } = renderHook(() => useThemeSwitcher());
    const [, setTheme] = result.current;

    // Clear spy call count recorded during mount
    getSpy.mockClear();

    // Trigger a theme change — should NOT call getItem again
    act(() => { setTheme("light"); });
    act(() => { setTheme("dark"); });

    expect(getSpy).not.toHaveBeenCalled();
    getSpy.mockRestore();
  });
});
