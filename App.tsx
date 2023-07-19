import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Switch, Text, View, NativeModules, Linking, Button } from 'react-native';

const App = () => {
  const [blockerStatus, setBlockerStatus] = useState(false);
  const [blockedApps, setBlockedApps] = useState([]);
  const [appList, setAppList] = useState([]);

  useEffect(() => {
    NativeModules.AppList.getApps().then(apps => {
      setAppList(apps);
    }).catch(error => {
      console.error(error);
    });

  }, []);

  const onRegister = (token) => {
    console.log( 'TOKEN:', token);
  };


  const requestPermission = () => {
    Linking.openURL('android.settings.APPLICATION_DETAILS_SETTINGS?package=com.nodistractions2');
  };

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>No Distractions</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Blocker Status</Text>
          <View style={styles.switchContainer}>
            <Switch
              value={blockerStatus}
              onValueChange={toggleBlocker}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={blockerStatus ? '#f5dd4b' : '#f4f3f4'}
            />
            <Text style={styles.statusText}>
              {blockerStatus ? 'Blocker is ON' : 'Blocker is OFF'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Blocked Apps</Text>
          {appList.map((app, index) => (
            <View style={styles.appItem} key={index}>
              <Text style={styles.appName}>{app}</Text>
              <Switch
                value={blockedApps.includes(app)}
                onValueChange={() => toggleAppBlock(app)}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={blockedApps.includes(app) ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 8,
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
