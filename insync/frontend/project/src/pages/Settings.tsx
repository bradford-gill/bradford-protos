import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { User, Bell, Shield, Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [alertNotifications, setAlertNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Profile
                </CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue={user?.username} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={user?.role.replace('_', ' ')} disabled className="capitalize" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={`${user?.username}@insynchealth.com`} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Configure how you receive alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-500">Receive updates via email</div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">In-App Alerts</div>
                    <div className="text-sm text-gray-500">Show notifications in the application</div>
                  </div>
                  <Switch checked={alertNotifications} onCheckedChange={setAlertNotifications} />
                </div>

                <div className="pt-4 border-t">
                  <div className="font-medium mb-4">Alert Thresholds</div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="highRisk">High Risk Patient Alerts</Label>
                      <Input id="highRisk" type="number" defaultValue="3" />
                      <p className="text-xs text-gray-500">Number of days before alert for high-risk patients</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mediumRisk">Medium Risk Patient Alerts</Label>
                      <Input id="mediumRisk" type="number" defaultValue="7" />
                      <p className="text-xs text-gray-500">Number of days before alert for medium-risk patients</p>
                    </div>
                  </div>
                </div>

                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="font-medium">Change Password</div>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>

                  <Button>Update Password</Button>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-500">Add an extra layer of security</div>
                    </div>
                    <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                  </div>

                  {twoFactorAuth && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900">
                        Two-factor authentication adds an extra layer of security to your account.
                        You'll need to enter a code from your authenticator app when signing in.
                      </p>
                      <Button size="sm" className="mt-4">Set Up Authenticator</Button>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t">
                  <div className="space-y-2">
                    <div className="font-medium">Session Timeout</div>
                    <p className="text-sm text-gray-500">Automatically log out after period of inactivity</p>
                    <Input type="number" defaultValue="30" />
                    <p className="text-xs text-gray-500">Minutes of inactivity before logout</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Display Preferences
                </CardTitle>
                <CardDescription>Customize your dashboard experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultView">Default Dashboard View</Label>
                  <Input id="defaultView" defaultValue="Care Team Dashboard" disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="itemsPerPage">Items Per Page</Label>
                  <Input id="itemsPerPage" type="number" defaultValue="10" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Input id="dateFormat" defaultValue="MM/DD/YYYY" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="Eastern Time (ET)" />
                </div>

                <Button>Save Preferences</Button>
              </CardContent>
            </Card>

            {user?.role === 'admin' && (
              <Card>
                <CardHeader>
                  <CardTitle>Organization Settings</CardTitle>
                  <CardDescription>Administrative settings for your organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input id="orgName" defaultValue="InSync Health" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userManagement">User Management</Label>
                    <Button variant="outline">Manage Users</Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="integrations">EHR Integrations</Label>
                    <Button variant="outline">Configure Integrations</Button>
                  </div>

                  <Button>Save Organization Settings</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
