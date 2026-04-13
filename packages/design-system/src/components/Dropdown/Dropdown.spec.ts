import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Dropdown from "./Dropdown.vue";

describe("Dropdown", () => {
  it("renderiza o componente", () => {
    const wrapper = mount(Dropdown, {
      slots: {
        header: "<span>Menu</span>",
        default: "<p>Conteúdo</p>",
      },
    });

    expect(wrapper.find("[data-testid=\"ds-dropdown\"]").exists()).toBe(true);
  });
});
