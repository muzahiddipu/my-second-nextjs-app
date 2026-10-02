"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "common-table-favorites";
const EMPTY_SNAPSHOT = { favoriteIds: [], isReady: false };
const listeners = new Set();
let favoritesSnapshot = EMPTY_SNAPSHOT;
let hasLoaded = false;

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);

  if (!hasLoaded) {
    hasLoaded = true;
    try {
      const savedIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      favoritesSnapshot = {
        favoriteIds: Array.isArray(savedIds) ? savedIds : [],
        isReady: true,
      };
    } catch {
      favoritesSnapshot = { favoriteIds: [], isReady: true };
    }
    notifyListeners();
  }

  return () => listeners.delete(listener);
}

function getSnapshot() {
  return favoritesSnapshot;
}

function getServerSnapshot() {
  return EMPTY_SNAPSHOT;
}

export function FavoritesProvider({ children }) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggleFavorite = (foodId) => {
    const nextIds = snapshot.favoriteIds.includes(foodId)
      ? snapshot.favoriteIds.filter((id) => id !== foodId)
      : [...snapshot.favoriteIds, foodId];
    favoritesSnapshot = { favoriteIds: nextIds, isReady: true };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds));
    } catch {
      // Favorites still work for the current session if storage is unavailable.
    }

    notifyListeners();
  };

  const value = {
    favoriteIds: snapshot.favoriteIds,
    favoritesCount: snapshot.favoriteIds.length,
    isFavorite: (foodId) => snapshot.favoriteIds.includes(foodId),
    isReady: snapshot.isReady,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return context;
}
