import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Card from "./Card.vue";

describe("Card", () => {
  it("renderiza o container do card", () => {
    const wrapper = mount(Card, {
      slots: { default: "Texto interno" },
    });

    expect(wrapper.find("[data-testid=\"ds-card\"]").exists()).toBe(true);
    expect(wrapper.text()).toContain("Texto interno");
  });
});
