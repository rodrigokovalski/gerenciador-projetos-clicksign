import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Paragraph from "./Paragraph.vue";

describe("Paragraph", () => {
  it("renderiza o elemento p com tamanho md e cor via token (sem estilo inline sem color)", () => {
    const wrapper = mount(Paragraph, {
      slots: { default: "Conteúdo" },
    });

    expect(wrapper.find("[data-testid=\"ds-paragraph\"]").exists()).toBe(true);
    expect(wrapper.find("p").attributes("data-size")).toBe("md");
    expect(wrapper.find("p").attributes("style")).toBeUndefined();
    expect(wrapper.text()).toContain("Conteúdo");
  });

  it("aplica cor inline quando a prop color é passada", () => {
    const wrapper = mount(Paragraph, {
      props: { color: "#695ccd" },
      slots: { default: "Conteúdo" },
    });

    expect(wrapper.find("p").attributes("style")).toMatch(/color:\s*#695ccd/i);
  });

  it("aplica o tamanho lg", () => {
    const wrapper = mount(Paragraph, {
      props: { size: "lg" },
      slots: { default: "Texto" },
    });

    expect(wrapper.find("p").attributes("data-size")).toBe("lg");
  });
});
