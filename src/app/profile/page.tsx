import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function UserProfilePage() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">My Profile</h1>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border">
            <img
              src={user?.picture ? user.picture : "/default-profile.png"}
              alt="Profile Picture"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-xl font-semibold">{user?.given_name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-500 text-sm">
              +91 {user?.phone_number ? user.phone_number : "XXXXXXXXXX"}
            </p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardContent className="space-y-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Name"
                  defaultValue={user?.given_name ? user.given_name : "john doe"}
                />
                <Input
                  placeholder="family_name"
                  defaultValue={
                    user?.family_name ? user.family_name : "Sir name"
                  }
                />
                <Input
                  placeholder="Email"
                  defaultValue={user?.email ? user.email : "johndoe@gmail.com"}
                />
                <Input
                  placeholder="Phone"
                  defaultValue={
                    user?.phone_number ? user.phone_number : "+91 XXXXXXXXXX"
                  }
                />
              </div>
              <Button className="mt-4">Update Info</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardContent className="py-6">
              <div className="space-y-4">
                <p className="text-gray-500">No recent orders found.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="address">
          <Card>
            <CardContent className="space-y-4 py-6">
              <Input
                placeholder="Street Address"
                defaultValue="3302-A, Sector 31-D"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="City" defaultValue="Chandigarh" />
                <Input placeholder="PIN Code" defaultValue="160047" />
              </div>
              <Button className="mt-4"></Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
