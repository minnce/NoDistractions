package com.nodistractions2;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;

import java.util.ArrayList;
import java.util.List;

public class AppListModule extends ReactContextBaseJavaModule {

    public AppListModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AppList";
    }

    @ReactMethod
    public void getApps(final Promise promise) {
        try {
            final PackageManager pm = getReactApplicationContext().getPackageManager();
            List<ApplicationInfo> packages = pm.getInstalledApplications(PackageManager.GET_META_DATA);

            WritableArray appList = Arguments.createArray();
            for (ApplicationInfo packageInfo : packages) {
                // check if the app is not a system app
                if ((packageInfo.flags & ApplicationInfo.FLAG_SYSTEM) == 0) {
                    String appName = (String) pm.getApplicationLabel(packageInfo);
                    appList.pushString(appName);
                }
            }

            Log.d("AppList", "App list: " + appList.toString());

            promise.resolve(appList);
        } catch (Exception e) {
            Log.e("AppList", "Error getting app list", e);
            promise.reject(e);
        }
    }

    private ArrayList<String> getAppsList() {
        final PackageManager pm = getReactApplicationContext().getPackageManager();
        List<ApplicationInfo> packages = pm.getInstalledApplications(PackageManager.GET_META_DATA);
        ArrayList<String> appNames = new ArrayList<>();
        for (ApplicationInfo packageInfo : packages) {
            if ((packageInfo.flags & ApplicationInfo.FLAG_SYSTEM) == 0) { // Exclude system apps
                String appName = pm.getApplicationLabel(packageInfo).toString();
                appNames.add(appName);
            }
        }
        return appNames;
    }
}