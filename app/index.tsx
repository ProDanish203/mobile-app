import { Link } from "expo-router";
import { Text, View } from "react-native";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-500 text-5xl">Hello world!</Text>
      <Link href='/home' className="text-blue-500 underline mt-4 text-lg">Go To Home</Link>
    </View>
  );
};

export default App;
