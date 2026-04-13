import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Search from "./Search.vue";

describe("Search", () => {
  it("renderiza em tela", () => {
    const wrapper = mount(Search, {
      props: { modelValue: "" },
    });

    expect(wrapper.find("[data-testid=\"ds-search\"]").exists()).toBe(true);
  });
});
