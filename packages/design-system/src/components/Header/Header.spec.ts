import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Header from "./Header.vue";

describe("Header", () => {
  it("renderiza o elemento header", () => {
    const wrapper = mount(Header, {
      slots: { default: "Título" },
    });

    expect(wrapper.find("[data-testid=\"ds-header\"]").exists()).toBe(true);
    expect(wrapper.text()).toContain("Título");
  });
});
