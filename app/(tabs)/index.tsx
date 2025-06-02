import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { users } from '@/data/users';

const medalImages: Record<number, any> = {
  1: require('@/assets/medals/medal-gold.png'),
  2: require('@/assets/medals/medal-silver.png'),
  3: require('@/assets/medals/medal-bronze.png'),
};

const seasons = [
  'Workout Season 1',
  'Workout Season 2',
  'Workout Season 3',
  'October TS 2018',
  'Lifting International',
  'Workout TC 2019',
  'Athletic TSC 2019',
];

export default function LeaderboardScreen() {
  const router = useRouter();

  const [selectedSeason, setSelectedSeason] = useState('Workout Season 2');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const sortedUsers = users
    .slice()
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({ ...user, rank: index + 1 }));

  const topThree = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  const renderItem = ({ item }: { item: typeof sortedUsers[number] }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: '/profile', params: { id: item.id.toString() } })
      }
      style={[styles.linkWrapper, { paddingHorizontal: 16 }]}
    >
      <View style={styles.userRow}>
        <Text style={styles.rank}>{item.rank}</Text>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.score}>{item.score}</Text>
        </View>
        <Text
          style={[
            styles.change,
            {
              color:
                item.rankChange > 0
                  ? 'green'
                  : item.rankChange < 0
                  ? 'red'
                  : 'gray',
            },
          ]}
        >
          {item.rankChange > 0 ? `+${item.rankChange}` : item.rankChange}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderPodium = () => (
    <View style={styles.podiumContainer}>
      <View style={styles.seasonHeader}>
        <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
          <Text style={styles.title}>
            {selectedSeason} <Text style={{ color: '#aaa' }}>▼</Text>
          </Text>
        </TouchableOpacity>

        {dropdownVisible && (
          <View style={styles.dropdownMenu}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {seasons.map((season) => (
                <TouchableOpacity
                  key={season}
                  onPress={() => {
                    setSelectedSeason(season);
                    setDropdownVisible(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      season === selectedSeason && {
                        color: '#fff',
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {season}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={styles.topThree}>
        {[topThree[1], topThree[0], topThree[2]].map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.podium}
            onPress={() =>
              router.push({ pathname: '/profile', params: { id: user.id.toString() } })
            }
          >
            <View style={styles.avatarMedalContainer}>
              <Image
                source={user.avatar}
                style={
                  user.rank === 1 ? styles.topAvatarLarge : styles.topAvatar
                }
              />
              <View style={styles.medalWrapper}>
                <Image
                  source={medalImages[user.rank]}
                  style={styles.medalImage}
                />
              </View>
            </View>
            <Text style={styles.topName}>{user.name}</Text>
            <Text style={styles.topScore}>{user.score}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      {renderPodium()}
      <FlatList
        data={rest}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  podiumContainer: {
    backgroundColor: '#2B2B2B',
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 32,
    paddingBottom: 24,
  },
  seasonHeader: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    backgroundColor: '#1e1e1e',
    padding: 14,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 1000,
    width: 390,
    height: 190,
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  dropdownText: {
    color: '#aaa',
    fontSize: 28,
    textAlign: 'center',
  },
  topThree: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  podium: {
    alignItems: 'center',
    width: 100,
  },
  avatarMedalContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  topAvatarLarge: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  medalWrapper: {
    position: 'absolute',
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medalImage: {
    width: 22,
    height: 27,
    resizeMode: 'contain',
  },
  topName: {
    color: '#fff',
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
  },
  topScore: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 2,
    textAlign: 'center',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  rank: {
    width: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 16,
  },
  score: {
    color: '#aaa',
  },
  change: {
    width: 40,
    textAlign: 'right',
  },
  linkWrapper: {},
});