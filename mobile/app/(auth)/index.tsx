import { COLORS } from "@/constants/colors";
import { useSocialAuth } from "@/hooks/useSocialAuth";
import { useAuth } from "@clerk/expo";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { router } from "expo-router";
import SCText from "@/components/CustomText";
import { deviceWidth } from "@/utils/AllContext";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, setAuthenticated } from "@/redux/slices/AuthSlice";

export default function Index() {

  const dispatch = useDispatch();

  const { handleSocialAuth, isLoading } = useSocialAuth();

  const { isSignedIn, isLoaded } = useAuth({
    treatPendingAsSignedOut: false,
  });

  const isAuthenticated = useSelector(
    selectIsAuthenticated
  );

  useEffect(() => {

    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      dispatch(setAuthenticated(false))
    } else {
      dispatch(setAuthenticated(true))

    }


    if (isAuthenticated) {
      router.replace("/(drawer)/(tabs)");
    }
  }, [isSignedIn, isAuthenticated]);

  return (
    <LinearGradient
      colors={["#05010D", "#140821", "#24103D", "#05010D"]}
      locations={[0, 0.4, 0.75, 1]}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: 60,
            }}
          >

            <LinearGradient
              colors={[
                "rgba(168,85,247,0.45)",
                "rgba(168,85,247,0.12)",
                "transparent",
              ]}
              style={{
                width: 180,
                height: 180,
                borderRadius: 180 / 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >

              <View

              >
                <Image
                  source={require("../../assets/images/hamper_logo.png")}
                  style={{


                    height: 250,
                    width: 800,
                    marginLeft: deviceWidth / 12 - 24

                  }}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>

            {/* Title */}
            <SCText
              varient="bold"
              color={"#E9D5FF"}
              size={44}
              style={{

                marginTop: 16,
              }}
            >
              Hamper
            </SCText>

            {/* Subtitle */}
            <SCText
              size={18}
              color={"#8B7AA8"}
              style={{

                marginTop: 4,

              }}
            >
              drop in. tune in. vibe out.
            </SCText>
          </View>

          {/* Buttons */}
          <View
            style={{
              gap: 12,
              marginTop: 60,
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                height: 54,
                borderRadius: 30,
                backgroundColor: "#FFFFFF",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Image
                    source={require("../../assets/images/google.png")}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />

                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 16,
                    }}
                  >
                    Continue with Google
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {Platform.OS === "ios" && (
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 54,
                  borderRadius: 30,
                  backgroundColor: "#FFFFFF",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 10,
                }}
                onPress={() => handleSocialAuth("oauth_apple")}
                disabled={isLoading}
              >
                <Image
                  source={require("../../assets/images/apple.png")}
                  style={{
                    width: 22,
                    height: 28,
                  }}
                />

                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                  }}
                >
                  Continue with Apple
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Footer */}
          <View
            style={{
              alignItems: "center",
              marginTop: 24,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                letterSpacing: 1,
                textAlign: "center",
                color: "#A78BFA",
              }}
            >
              By signing up, you agree to our{" "}
              <Text
                style={{
                  color: "#C084FC",
                }}
              >
                Terms, Privacy Policy,
              </Text>{" "}
              and{" "}
              <Text
                style={{
                  color: "#C084FC",
                }}
              >
                Cookie Use.
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}