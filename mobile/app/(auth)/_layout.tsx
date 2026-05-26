import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/CustomDrawerComponent';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/slices/AuthSlice';

export default function DrawerLayout() {
    // const { isSignedIn, isLoaded } = useAuth();
    // if (!isLoaded) return null;
    // if (!isSignedIn) return <Redirect href="/(auth)" />;
    const isAuthenticated = useSelector(
        selectIsAuthenticated
    );

    if (!isAuthenticated) {
        return <Redirect href="/(auth)" />;
    }
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerPosition: 'left',
                drawerStyle: {
                    width: 280,
                    backgroundColor: '#111827',
                },
            }}
        >
            <Drawer.Screen name="(tabs)" options={{ title: 'Home' }} />
        </Drawer>
    );
}