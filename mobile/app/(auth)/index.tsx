import { COLORS } from "@/constants/colors";
import { useSocialAuth } from "@/hooks/useSocialAuth";
import { useAuth } from "@clerk/expo";
import { useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { router } from 'expo-router'

export default function Index() {

  const { handleSocialAuth, isLoading } = useSocialAuth()

  // const isLoading = false

  const { isSignedIn } = useAuth({ treatPendingAsSignedOut: false })

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/(tabs)')
      // <Link href={'/(home)'} />
    }
  }, [isSignedIn])
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-8 justify-between">

        <View className="flex-1 justify-center">

          <View className="items-center">

            <Image

              source={require('../../assets/images/auth2.png')}
              style={{
                height: 300,
                width: '100%',
                marginTop: '50%'
              }}

              resizeMode="contain"
            />
          </View>

          <View style={{ gap: 10 }}>
            <TouchableOpacity
              style={{
                borderWidth: 0.5,
                width: '80%',
                height: 50,
                alignSelf: 'center',
                marginTop: 20,
                borderRadius: 26,
                borderColor: 'gary',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
                flexDirection: 'row',
                elevation: 50
              }}

              onPress={() => handleSocialAuth('oauth_google')}

              disabled={isLoading}
            >


              {isLoading ? <ActivityIndicator /> : (
                <>
                  <Image
                    source={require('../../assets/images/google.png')}
                    style={{
                      height: 25,
                      width: 25,

                    }}
                  />

                  <Text style={{
                    fontWeight: '700',

                  }}>Continue with Google</Text>
                </>

              )}


            </TouchableOpacity>
            {Platform.OS === 'ios' ? <TouchableOpacity
              style={{
                borderWidth: 0.5,
                width: '80%',
                height: 50,
                alignSelf: 'center',
                marginTop: 5,
                borderRadius: 26,
                borderColor: 'gary',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
                flexDirection: 'row'
              }}
              onPress={() => handleSocialAuth('oauth_apple')}
              disabled={isLoading}
            >

              {isLoading ? <ActivityIndicator /> : (
                <>
                  <Image
                    source={require('../../assets/images/apple.png')}
                    style={{
                      height: 30,
                      width: 25,

                    }}
                  />

                  <Text style={{
                    fontWeight: '700',

                  }}>Continue with Apple</Text></>
              )}


            </TouchableOpacity> : null}
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, marginTop: 15 }}>
            <Text style={{
              fontSize: 11,
              letterSpacing: 1.2,
              textAlign: 'center'
            }}

            >
              By signin up, you agree to our <Text style={{
                color: COLORS.lightBlue
              }}>Terms, Privacy Policy,</Text> and <Text
                style={{
                  color: COLORS.lightBlue
                }}
              >Cookie Use.</Text>
            </Text>
          </View>

        </View>

      </View>
    </View>
  );
}
