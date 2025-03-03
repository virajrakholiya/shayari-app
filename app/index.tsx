import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Dimensions, Share } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { ShayariCard } from './components/ShayariCard';
import { shayaris, categories, Shayari } from './data/shayaris';
import { useFavorites } from './context/FavoritesContext';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Dynamic scaling functions
const scale = (size: number) => (width / 375) * size; // Based on standard iPhone 6/7/8 width
const verticalScale = (size: number) => (height / 667) * size; // Based on standard iPhone 6/7/8 height

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleShare = async (id: string) => {
    const shayari = shayaris.find((s) => s.id === id);
    if (shayari) {
      try {
        await Share.share({
          message: `${shayari.content}\n\n- ${shayari.author}`,
          title: 'Share Shayari',
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const handleLike = (id: string) => {
    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  const shuffleArray = (array: Shayari[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const filteredShayaris = React.useMemo(() => {
    const filtered = selectedCategory
      ? shayaris.filter((shayari) => shayari.category === selectedCategory)
      : shayaris;
    return shuffleArray(filtered);
  }, [selectedCategory]);

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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        <Chip
          mode={selectedCategory === null ? 'flat' : 'outlined'}
          style={[
            styles.chip,
            selectedCategory === null && styles.selectedChip,
          ]}
          textStyle={[
            styles.chipText,
            selectedCategory === null && styles.selectedText,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          All
        </Chip>

        {categories.filter(category => category !== 'All').map((category) => (
          <Chip
            key={category}
            mode={selectedCategory === category ? 'flat' : 'outlined'}
            style={[
              styles.chip,
              selectedCategory === category && styles.selectedChip,
            ]}
            textStyle={[
              styles.chipText,
              selectedCategory === category && styles.selectedText,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>

      <FlatList
        data={filteredShayaris}
        keyExtractor={(item) => item.id}
        renderItem={renderShayari}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No shayaris found</Text>
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
  categoriesContainer: {
    maxHeight: verticalScale(80),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C1D8C3',
    height: 90,
    backgroundColor: '#FFF5E4',
  },
  categoriesContent: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    
  },
  chip: {
    marginRight: scale(12),
    marginVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    backgroundColor: '#FFF5E4',
    borderWidth: 1,
    borderColor: '#6A9C89',
    minWidth: scale(70),
  },
  selectedChip: {
    backgroundColor: '#6A9C89',
    borderColor: '#6A9C89',
    elevation: 2,
  },
  chipText: {
    fontSize: scale(14),
    color: '#6A9C89',
  },
  selectedText: {
    color: '#FFF5E4',
    fontWeight: '600',
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