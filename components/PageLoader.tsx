import { ActivityIndicator, StyleSheet, View } from "react-native";

function PageLoader() {
  return (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default PageLoader;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
