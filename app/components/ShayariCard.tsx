import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const theme = {
  colors: {
    primary: '#6200ee',
    accent: '#03dac6',
    background: '#f5f5f5',
    text: '#333333',
    secondaryText: '#666666',
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
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Card style={styles.card}>
        <LinearGradient
          colors={['#f7f7f7', '#e3e3e3']}
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
                <IconButton
                  icon={liked ? 'heart' : 'heart-outline'}
                  size={20}
                  onPress={onLike}
                  iconColor={liked ? '#e91e63' : theme.colors.secondaryText}
                />
                <IconButton
                  icon="share-variant"
                  size={20}
                  onPress={onShare}
                  iconColor={theme.colors.secondaryText}
                />
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
    textAlign: 'center' as const,
  },
  author: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic' as const,
    marginBottom: 16,
    textAlign: 'right' as const,
  },
  footer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  category: {
    color: '#666',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
});