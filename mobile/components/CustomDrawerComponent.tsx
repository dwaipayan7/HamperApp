import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSignOut } from '@/hooks/useSignOut';
import { useUser } from '@clerk/expo';
import SCText from './CustomText';
import GradientWrapper from './GradientWrapper';

export default function CustomDrawerContent(props: any) {
    const { user } = useUser();
    const { handleSignOut } = useSignOut();

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
                flex: 1,
                backgroundColor: '#05010D',
                justifyContent: 'center'
            }}
        >
            <GradientWrapper>
                <View
                    style={{
                        padding: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: '#374151',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={{ uri: user?.imageUrl }}
                        style={{ width: 70, height: 70, borderRadius: 35, marginBottom: 12 }}
                    />
                    <SCText size={18} color='white' >
                        {user?.fullName}
                    </SCText>
                    <SCText style={{ color: '#9CA3AF', marginTop: 4 }}>
                        {user?.primaryEmailAddress?.emailAddress}
                    </SCText>


                </View>
            </GradientWrapper>

            <View style={{ flex: 1 }} />
            <View>
                <SCText style={{ textAlign: 'center', marginBottom: 10 }} color='white'>Version: 1.0.0</SCText>
            </View>

            <View
                style={{
                    padding: 20,
                    borderTopWidth: 1,
                    borderTopColor: '#374151',
                }}
            >
                <TouchableOpacity
                    onPress={handleSignOut}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
                >
                    <Feather name="log-out" size={20} color="#EF4444" />
                    <Text style={{ color: '#EF4444', fontWeight: '600', fontSize: 16 }}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}