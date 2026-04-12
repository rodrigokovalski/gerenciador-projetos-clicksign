import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Label from "./Label.vue";

describe("Label", () => {
  it("renderiza label associável ao campo", () => {
    const wrapper = mount(Label, {
      props: { htmlFor: "field-id" },
      slots: { default: "E-mail" },
    });

    const el = wrapper.find("[data-testid=\"ds-label\"]");
    expect(el.exists()).toBe(true);
    expect(el.attributes("for")).toBe("field-id");
    expect(el.text()).toContain("E-mail");
  });
});
