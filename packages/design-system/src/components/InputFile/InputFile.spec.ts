import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import InputFile from "./InputFile.vue";

describe("InputFile", () => {
  it("renderiza zona de upload e input nativo oculto", () => {
    const wrapper = mount(InputFile, {
      slots: {
        description: "Texto de apoio",
      },
    });

    expect(wrapper.find("[data-testid=\"ds-file-input\"]").exists()).toBe(true);
    expect(wrapper.find("[data-testid=\"ds-file-input-native\"]").exists()).toBe(true);
    expect(wrapper.text()).toContain("Texto de apoio");
    expect(wrapper.text()).toContain("Selecionar arquivo");
  });
});
