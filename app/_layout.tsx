import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#666666',
          tabBarStyle: styles.tabBar,
          headerStyle: styles.header,
          headerTintColor: '#FFFFFF',
          headerTitleStyle: styles.headerTitle,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Jobs',
            tabBarIcon: ({ color }) => <FontAwesome name="briefcase" size={26} color={color} />,
          }}
        />
        <Tabs.Screen
          name="bookmarks"
          options={{
            title: 'Bookmarks',
            tabBarIcon: ({ color }) => <FontAwesome name="bookmark" size={26} color={color} />,
          }}
        />
        <Tabs.Screen
          name="job/[id]"
          options={{
            href: null,
            title: 'Details',
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 8,
    paddingTop: 8,
    height: 60,
  },
  header: {
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
});