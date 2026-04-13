import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Modal from "./Modal.vue";

describe("Modal", () => {
  it("renderiza o dialog", () => {
    const wrapper = mount(Modal, {
      props: { modelValue: false },
      slots: { default: "Conteúdo" },
    });

    const el = wrapper.find("[data-testid=\"ds-modal\"]");
    expect(el.exists()).toBe(true);
    expect(el.element.tagName).toBe("DIALOG");
  });
});
