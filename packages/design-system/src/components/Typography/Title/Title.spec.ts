import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Title from "./Title.vue";

describe("Title", () => {
  it("renderiza h1 com cor vinda do token (sem estilo inline quando color não é passada)", () => {
    const wrapper = mount(Title, {
      slots: { default: "Título" },
    });

    expect(wrapper.find("[data-testid=\"ds-title\"]").exists()).toBe(true);
    expect(wrapper.find("h1").exists()).toBe(true);
    expect(wrapper.find("h1").attributes("data-as")).toBe("h1");
    expect(wrapper.find("h1").attributes("style")).toBeUndefined();
    expect(wrapper.text()).toContain("Título");
  });

  it("aplica cor inline quando a prop color é passada", () => {
    const wrapper = mount(Title, {
      props: { color: "#695ccd" },
      slots: { default: "Título" },
    });

    expect(wrapper.find("h1").attributes("style")).toMatch(/color:\s*#695ccd/i);
  });

  it("renderiza a tag solicitada via as", () => {
    const wrapper = mount(Title, {
      props: { as: "h3" },
      slots: { default: "Sub" },
    });

    expect(wrapper.find("h3").exists()).toBe(true);
    expect(wrapper.find("h3").attributes("data-as")).toBe("h3");
  });
});
