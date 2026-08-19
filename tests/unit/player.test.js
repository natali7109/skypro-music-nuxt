import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { usePlayerStore } from "../../stores/player";

describe("shuffleArray", () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = usePlayerStore();
  });

  it("перемешивает массив", () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = store.shuffleArray([...arr]);
    expect(shuffled).not.toEqual(arr);
    expect(shuffled.sort()).toEqual(arr.sort());
  });

  it("возвращает пустой массив для пустого", () => {
    const result = store.shuffleArray([]);
    expect(result).toEqual([]);
  });

  it("возвращает массив из одного элемента без изменений", () => {
    const arr = [42];
    const result = store.shuffleArray([...arr]);
    expect(result).toEqual(arr);
  });
});

describe("getNextTrack", () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = usePlayerStore();
  });

  it("возвращает следующий трек", () => {
    store.playlist = [{ _id: 1 }, { _id: 2 }, { _id: 3 }];
    store.currentTrack = { _id: 1 };
    const next = store.getNextTrack();
    expect(next._id).toBe(2);
  });

  it("возвращает null на последнем треке", () => {
    store.playlist = [{ _id: 1 }, { _id: 2 }];
    store.currentTrack = { _id: 2 };
    const next = store.getNextTrack();
    expect(next).toBeNull();
  });

  it("возвращает null для пустого плейлиста", () => {
    store.playlist = [];
    store.currentTrack = null;
    const next = store.getNextTrack();
    expect(next).toBeNull();
  });
});

describe("getPrevTrack", () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = usePlayerStore();
  });

  it("возвращает предыдущий трек", () => {
    store.playlist = [{ _id: 1 }, { _id: 2 }, { _id: 3 }];
    store.currentTrack = { _id: 2 };
    const prev = store.getPrevTrack();
    expect(prev._id).toBe(1);
  });

  it("возвращает null на первом треке", () => {
    store.playlist = [{ _id: 1 }, { _id: 2 }];
    store.currentTrack = { _id: 1 };
    const prev = store.getPrevTrack();
    expect(prev).toBeNull();
  });

  it("возвращает null для пустого плейлиста", () => {
    store.playlist = [];
    store.currentTrack = null;
    const prev = store.getPrevTrack();
    expect(prev).toBeNull();
  });
});
