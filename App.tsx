import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Switch, Text, View } from 'react-native';


const App = () => {
  const [blockerStatus, setBlockerStatus] = useState(false);
  const [blockedApps, setBlockedApps] = useState([]);

  const toggleBlocker = () => {
    setBlockerStatus(!blockerStatus);
  };

  const toggleAppBlock = (appName) => {
    if (blockedApps.includes(appName)) {
      const updatedBlockedApps = blockedApps.filter((app) => app !== appName);
      setBlockedApps(updatedBlockedApps);
    } else {
      setBlockedApps([...blockedApps, appName]);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>App Blocker</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Blocker Status</Text>
          <Switch
            value={blockerStatus}
            onValueChange={toggleBlocker}
          />
          <Text style={styles.statusText}>
            {blockerStatus ? 'Blocker is ON' : 'Blocker is OFF'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Blocked Apps</Text>
          {appList.map((app) => (
            <View style={styles.appItem} key={app}>
              <Text style={styles.appName}>{app}</Text>
              <Switch
                value={blockedApps.includes(app)}
                onValueChange={() => toggleAppBlock(app)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const appList = ['App 1', 'App 2', 'App 3', 'App 4'];

const styles = {
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    color: 'gray',
  },
  appItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appName: {
    fontSize: 16,
  },
};

export default App;