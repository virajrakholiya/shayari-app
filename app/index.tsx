import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Home() {
  const features = [
    {
      id: 1,
      title: 'Shayari Collection',
      description: 'Explore beautiful shayaris',
      icon: 'book-outline',
      route: '/shayari'
    },
    {
      id: 2,
      title: 'Favorites',
      description: 'View your liked shayaris',
      icon: 'heart-outline',
      route: '/favorites'
    },
    {
      id: 3,
      title: 'Rate App',
      description: 'Share your feedback',
      icon: 'star-outline',
      route: 'https://play.google.com/store'
    },
    {
      id: 4,
      title: 'More Apps',
      description: 'Discover our other apps',
      icon: 'apps-outline',
      route: 'https://play.google.com/store'
    }
  ];

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Gulzar Shayari</Text>
          <Text style={styles.subtitle}>Express your feelings through words</Text>
          
          <View style={styles.grid}>
            {features.map((feature) => (
              <Link
                key={feature.id}
                href={feature.route as any}
                asChild
              >
                <TouchableOpacity style={styles.card}>
                  <Ionicons name={feature.icon as any} size={32} color="#fff" />
                  <Text style={styles.cardTitle}>{feature.title}</Text>
                  <Text style={styles.cardDescription}>{feature.description}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20
  },
  card: {
    width: width * 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center'
  },
  cardDescription: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
    textAlign: 'center'
  }
})
