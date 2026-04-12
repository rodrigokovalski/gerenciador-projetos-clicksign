import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Span from "./Span.vue";

describe("Span", () => {
  it("renderiza span com cor padrão", () => {
    const wrapper = mount(Span, {
      slots: { default: "inline" },
    });

    expect(wrapper.find("[data-testid=\"ds-span\"]").exists()).toBe(true);
    expect(wrapper.find("span").attributes("style")).toMatch(/color:\s*#717171/i);
    expect(wrapper.text()).toContain("inline");
  });
});
