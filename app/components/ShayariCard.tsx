import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Clipboard, ToastAndroid } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const theme = {
  colors: {
    primary: '#6A9C89',
    accent: '#FFA725',
    background: '#FFF5E4',
    text: '#6A9C89',
    secondaryText: '#C1D8C3',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
  }
};

interface ShayariCardProps {
  content: string;
  author: string;
  category: string;
  onPress?: () => void;
  onShare?: () => void;
  onLike?: () => void;
  liked?: boolean;
}

export const ShayariCard = React.memo<ShayariCardProps>(({ 
  content, 
  author, 
  category, 
  onPress, 
  onShare, 
  onLike, 
  liked = false, 
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const tooltipOpacity = React.useRef(new Animated.Value(0)).current;

  const handleLikePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    onLike?.();
  };

  const handleCopyPress = () => {
    Clipboard.setString(content);
    ToastAndroid.show('Shayari copied!', ToastAndroid.SHORT);
    
    // Show tooltip animation
    Animated.sequence([
      Animated.timing(tooltipOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(tooltipOpacity, {
        toValue: 0,
        duration: 200,
        delay: 1000, // Tooltip stays visible for 1 second
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer} activeOpacity={1}>
      <Card style={styles.card}>
        <LinearGradient
          colors={['#FFF5E4', '#FFF5E4']}
          style={styles.gradient}
        >
          <Card.Content>
            <Text
              variant="bodyLarge"
              style={styles.content}
              accessible
              accessibilityLabel={content}
            >
              {content}
            </Text>
            <Text variant="bodyMedium" style={styles.author}>
              - {author}
            </Text>
            <View style={styles.footer}>
              <Text variant="labelSmall" style={styles.category}>
                {category}
              </Text>
              <View style={styles.actions}>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <IconButton
                    icon={liked ? 'heart' : 'heart-outline'}
                    size={20}
                    onPress={handleLikePress}
                    iconColor={liked ? '#e91e63' : theme.colors.primary}
                  />
                </Animated.View>
                <IconButton
                  icon="share-variant"
                  size={20}
                  onPress={onShare}
                  iconColor={theme.colors.primary}
                />
                <View style={styles.copyButtonContainer}>
                  <IconButton
                    icon="content-copy"
                    size={20}
                    onPress={handleCopyPress}
                    iconColor={theme.colors.primary}
                  />
                  <Animated.View style={[styles.tooltip, { opacity: tooltipOpacity }]}>
                    <Text style={styles.tooltipText}>Copied!</Text>
                  </Animated.View>
                </View>
              </View>
            </View>
          </Card.Content>
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    overflow: 'visible',
  },
  card: {
    borderRadius: theme.borderRadius.medium,
    elevation: 2,
  },
  gradient: {
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
  },
  content: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  author: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  category: {
    color: '#666',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButtonContainer: {
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    bottom: 40, // Position above the copy button
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'center',
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
  },
});