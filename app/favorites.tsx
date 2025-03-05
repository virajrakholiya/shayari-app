import React from 'react';
import { View, StyleSheet, FlatList, Dimensions, Share } from 'react-native';
import { Text } from 'react-native-paper';
import { ShayariCard } from './components/ShayariCard';
import { shayaris, Shayari } from './data/shayaris';
import { useFavorites } from './context/FavoritesContext';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Dynamic scaling functions
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 667) * size;

export default function FavoritesScreen() {
  const { favorites, removeFromFavorites, isFavorite } = useFavorites();

  const favoriteShayaris = shayaris.filter((shayari) => favorites.includes(shayari.id));

  const handleShare = async (id: string) => {
    const shayari = shayaris.find((s) => s.id === id);
    if (shayari) {
      try {
        const shareContent = `${shayari.content}\n\n- ${shayari.author}`;
        await Share.share({
          message: shareContent,
          title: 'Share Shayari',
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const handleLike = (id: string) => {
    removeFromFavorites(id);
  };

  const renderShayari = ({ item }: { item: Shayari }) => (
    <ShayariCard
      content={item.content}
      author={item.author}
      category={item.category}
      onShare={() => handleShare(item.id)}
      onLike={() => handleLike(item.id)}
      liked={isFavorite(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteShayaris}
        keyExtractor={(item) => item.id}
        renderItem={renderShayari}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favorite shayaris yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E4',
    width: '100%',
  },
  list: {
    paddingVertical: verticalScale(12),
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
    minHeight: verticalScale(200),
    backgroundColor: '#FFF5E4',
  },
  emptyText: {
    fontSize: scale(16),
    color: '#FFA725',
  },
});