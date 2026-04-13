import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import DropDownItem from "./DropDownItem.vue";

describe("DropDownItem", () => {
  it("renderiza o botão", () => {
    const wrapper = mount(DropDownItem, {
      props: { label: "Editar" },
    });

    const btn = wrapper.find("[data-testid=\"ds-dropdown-item\"]");
    expect(btn.exists()).toBe(true);
    expect(btn.element.tagName).toBe("BUTTON");
    expect(btn.attributes("type")).toBe("button");
  });
});
