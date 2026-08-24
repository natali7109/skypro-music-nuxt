import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Track from "../../components/Track.vue";

describe("Track", () => {
  const track = {
    _id: 1,
    name: "Test Track",
    author: "Test Author",
    album: "Test Album",
    duration_in_seconds: 185,
  };

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("отображает название трека", () => {
    const wrapper = mount(Track, {
      props: { track },
      global: {
        stubs: {
          NuxtImg: true,
        },
      },
    });
    expect(wrapper.text()).toContain("Test Track");
  });

  it("отображает исполнителя", () => {
    const wrapper = mount(Track, {
      props: { track },
      global: {
        stubs: {
          NuxtImg: true,
        },
      },
    });
    expect(wrapper.text()).toContain("Test Author");
  });

  it("отображает альбом", () => {
    const wrapper = mount(Track, {
      props: { track },
      global: {
        stubs: {
          NuxtImg: true,
        },
      },
    });
    expect(wrapper.text()).toContain("Test Album");
  });

  it("отображает длительность трека в формате MM:SS", () => {
    const wrapper = mount(Track, {
      props: { track },
      global: {
        stubs: {
          NuxtImg: true,
        },
      },
    });

    expect(wrapper.text()).toContain("3:05");
  });
});
