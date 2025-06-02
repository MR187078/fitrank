import React from 'react';
import { users } from '@/data/users';
import { useLocalSearchParams } from 'expo-router';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function ProfileScreen() {
  const params = useLocalSearchParams();
  const id = typeof params.id === 'string' ? parseInt(params.id) : null;

  const user = users.find((u) => u.id === id);

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundText}>User not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={user.avatar} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.subtitle}>Intermediate Athlete</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>🏆</Text>
          <Text style={styles.statNumber}>{user.rankChange}</Text>
          <Text style={styles.statLabel}>Ranking</Text>
        </View>

        <View style={styles.statBox}>
        <Text style={styles.statIcon}>⭐</Text>
          <Text style={styles.statNumber}>{user.score.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>

        <View style={styles.statBox}>
        <Text style={styles.statIcon}>🔥</Text>
          <Text style={styles.statNumber}>{user.goalStreaks}</Text>
          <Text style={styles.statLabel}>Goal streaks</Text>
        </View>
      </View>

      <View style={styles.coachCard}>
        <Image
          source={require('../assets/images/coach.png')}
          style={styles.coachImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.coachName}>Sarah Stratford</Text>
          <Text style={styles.coachRole}>Personal Coach</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>241</Text>
              <Text style={styles.statLabel}>Students</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Champions</Text>
            </View>
          </View>
          <Text>⭐️⭐️⭐️⭐️⭐️</Text>
        </View>
      </View>

      <Text style={styles.progressTitle}>Progress</Text>

      <LineChart
        data={{
          labels: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
          datasets: [
            {
              data: [10, 25, 40, 60, 80, user.weeklyProgress],
              color: () => 'rgba(68, 204, 255, 1)', // azul
              strokeWidth: 3,
            },
            {
              data: [30, 40, 25, 70, 90, 40, 45],
              color: () => 'rgba(128, 128, 128, 0.5)', // gris
              strokeWidth: 2,
            },
          ],
          legend: ['Current', 'Goal'],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#1a1a1a',
          backgroundGradientFrom: '#1a1a1a',
          backgroundGradientTo: '#1a1a1a',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#44ccff',
          },
        }}
        bezier
        style={styles.chart}
      />

      <View style={styles.activitySummary}>
        <Text style={styles.stepsLabel}>Steps</Text>
        <Text style={styles.stepsCount}>{user.stats.steps}</Text>

        <View style={styles.activityStatsRow}>
          <View style={styles.activityStatBox}>
            <Text style={styles.activityStatNumber}>{user.stats.kilometers}</Text>
            <Text style={styles.activityStatLabel}>Kilometers</Text>
          </View>
          <View style={styles.activityStatBox}>
            <Text style={styles.activityStatNumber}>{user.stats.calories}</Text>
            <Text style={styles.activityStatLabel}>Calories</Text>
          </View>
          <View style={styles.activityStatBox}>
            <Text style={styles.activityStatNumber}>{user.stats.points}</Text>
            <Text style={styles.activityStatLabel}>Points</Text>
          </View>
        </View>

        <Text style={styles.exercisesTitle}>Exercises done</Text>

        <View style={styles.exerciseCard}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressPercent}>90</Text>
          </View>
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>{user.exercise.name}</Text>
            <Text style={styles.exerciseCoach}>with Sarah Stratford</Text>
          </View>
          <Image source={user.exercise.image} style={styles.exerciseImage} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  notFoundText: {
    color: '#fff',
    fontSize: 18,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#44ccff',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: '#888',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#222',
    marginHorizontal: 5,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 4,
  },
  coachCard: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginHorizontal: 5,
    marginTop: 16,
    marginBottom: 20
  },
  coachImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  infoContainer: {
    marginLeft: 12,
    flex: 1,
  },
  coachName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  coachRole: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
  statItem: {
    marginRight: 24,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: 'white',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
    marginBottom: 20,
  },
  activitySummary: {
    width: '100%',
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 20,
  },
  stepsLabel: {
    color: '#ccc',
    fontSize: 14,
  },
  stepsCount: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  activityStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  activityStatBox: {
    flex: 1,
    alignItems: 'center',
  },
  activityStatNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityStatLabel: {
    color: '#aaa',
    fontSize: 12,
  },
  exercisesTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: 12,
    padding: 10,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#44ccff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  progressPercent: {
    color: '#44ccff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  exerciseCoach: {
    color: '#888',
    fontSize: 12,
  },
  exerciseImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
  },
});