import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowBetweeen: { flexDirection: "row", justifyContent: "space-between" },
  rowCenterBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  figRegular: {
    fontFamily: "Figtree-Regular.ttf",
  },
  figBold: {
    fontFamily: "Figtree-Bold.ttf",
  },
  figSemiBold: {
    fontFamily: "Figtree-SemiBold.ttf",
  },
  figMedium: {
    fontFamily: "Figtree-Medium.ttf",
  },
});
