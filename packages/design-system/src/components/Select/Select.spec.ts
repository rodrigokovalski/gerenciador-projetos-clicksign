import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Select from "./Select.vue";

describe("Select", () => {
  it("renderiza o select", () => {
    const wrapper = mount(Select, {
      props: { modelValue: "b" },
      slots: {
        default: "<option value=\"a\">A</option><option value=\"b\">B</option>",
      },
    });

    const el = wrapper.find("[data-testid=\"ds-select\"]");
    expect(el.exists()).toBe(true);
    expect(el.element.tagName).toBe("SELECT");
  });
});
