import React from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FavoritesProvider } from "./context/FavoritesContext";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  const router = useRouter();
  return (
    <FavoritesProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FFA725",
          },
          title:"Shayari App",
          headerTintColor: "#FFF5E4",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: "#C1D8C3",
          },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Shayari",
            headerRight: () => (
              <Pressable
                onPress={() => router.push("/favorites")}
                style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, marginRight: 15 })}
              >
                <Ionicons name="heart" size={24} color="#FFF5E4" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="favorites"
          options={{
            title: "Favorites",
          }}
        />
      </Stack>
    </FavoritesProvider>
  );
}