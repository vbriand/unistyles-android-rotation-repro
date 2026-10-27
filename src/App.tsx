import { LegendList } from '@legendapp/list/react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';

const SECTIONS = Array.from({ length: 8 }, (_, i) => `Section ${i + 1}`);
const PAGES = Array.from({ length: 5 }, (_, i) => i + 1);

const Carousel = ({ width }: { width: number }) => (
  <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
    {PAGES.map(page => (
      <View key={page} style={[styles.page, { width }]}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Card {page}</Text>
        </View>
      </View>
    ))}
  </ScrollView>
);

// Like the app: the carousel width comes from the runtime through withUnistyles
const UniCarousel = withUnistyles(Carousel, (_theme, rt) => ({
  width: rt.screen.width - (rt.insets.left + rt.insets.right),
}));

const HomeScreen = () => (
  <View style={styles.screen}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Home</Text>
    </View>
    <LegendList
      contentContainerStyle={styles.listContent}
      data={SECTIONS}
      keyExtractor={item => item}
      recycleItems
      renderItem={({ item }) => (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{item} — the start of this title</Text>
          <UniCarousel />
        </View>
      )}
    />
  </View>
);

const OtherScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.headerText}>Other</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen component={HomeScreen} name="Home" />
        <Tab.Screen component={OtherScreen} name="Other" />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  cardText: {
    color: theme.colors.text,
    textAlign: 'center',
  },
  header: {
    backgroundColor: theme.colors.header,
    paddingBottom: theme.spacing,
    paddingHorizontal: {
      landscape: theme.spacing * 2,
      portrait: theme.spacing,
    },
    paddingTop: rt.insets.top,
  },
  headerText: {
    color: theme.colors.text,
    fontSize: 24,
  },
  listContent: {
    paddingBottom: theme.spacing + rt.insets.bottom,
  },
  page: {
    height: {
      landscape: 120,
      portrait: 200,
    },
    padding: theme.spacing,
  },
  screen: {
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingLeft: rt.insets.left,
    paddingRight: rt.insets.right,
  },
  section: {
    paddingVertical: theme.spacing,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: {
      landscape: 18,
      portrait: 22,
    },
    paddingHorizontal: {
      landscape: theme.spacing * 2,
      portrait: theme.spacing,
    },
  },
}));
