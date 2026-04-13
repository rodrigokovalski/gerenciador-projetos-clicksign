import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Toggle from "./Toggle.vue";

describe("Toggle", () => {
  it("renderiza o componente", () => {
    const wrapper = mount(Toggle, {
      props: { modelValue: false, label: "Ativar" },
    });

    expect(wrapper.find("[data-testid=\"ds-toggle\"]").exists()).toBe(true);
  });
});
