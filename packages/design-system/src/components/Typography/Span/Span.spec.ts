import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Span from "./Span.vue";

describe("Span", () => {
  it("renderiza span com cor via token (sem estilo inline sem color)", () => {
    const wrapper = mount(Span, {
      slots: { default: "inline" },
    });

    expect(wrapper.find("[data-testid=\"ds-span\"]").exists()).toBe(true);
    expect(wrapper.find("span").attributes("style")).toBeUndefined();
    expect(wrapper.text()).toContain("inline");
  });

  it("aplica cor inline quando a prop color é passada", () => {
    const wrapper = mount(Span, {
      props: { color: "#695ccd" },
      slots: { default: "inline" },
    });

    expect(wrapper.find("span").attributes("style")).toMatch(/color:\s*#695ccd/i);
  });
});
