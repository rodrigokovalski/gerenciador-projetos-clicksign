import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Input from "./Input.vue";

describe("Input", () => {
  it("renderiza input de texto", () => {
    const wrapper = mount(Input, {
      props: { modelValue: "abc", type: "text" },
    });

    const el = wrapper.find<HTMLInputElement>("[data-testid=\"ds-input\"]");
    expect(el.exists()).toBe(true);
    expect(el.element.type).toBe("text");
    expect(el.element.value).toBe("abc");
  });

  it("emite update ao digitar", async () => {
    const wrapper = mount(Input, {
      props: { modelValue: "", type: "text" },
    });

    await wrapper.find("[data-testid=\"ds-input\"]").setValue("novo");
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["novo"]);
  });

  it("aceita tipo date", () => {
    const wrapper = mount(Input, {
      props: { modelValue: "2026-04-12", type: "date" },
    });

    expect(wrapper.find("[data-testid=\"ds-input\"]").attributes("type")).toBe("date");
  });
});
