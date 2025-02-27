import React, { useState, useRef } from "react";
import { Button, Card, CardContent, Switch, Avatar, AvatarImage, AvatarFallback } from "your-component-library"; // Adjust imports as per your library
import { Bell } from "react-icons"; // Example, replace with your actual icon library

const rightSidebar = ({ profiles }) => {
  const [isRightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setRightSidebarCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={`fixed right-0 top-0 h-full border-l border-indigo-100 bg-gradient-to-b from-white to-indigo-50 transition-all overflow-y-auto duration-300 ease-in-out ${
        isRightSidebarCollapsed ? "w-6" : "w-80"
      } shadow-lg z-10`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSidebarToggle}
        className="absolute top-5 left-[-7px] p-2 rounded-full text-indigo-700 hover:bg-indigo-50"
      >
        {isRightSidebarCollapsed ? "◁" : "▶"}
      </Button>

      {!isRightSidebarCollapsed && (
        <div className="flex h-full flex-col p-6">
          <div className="text-center">
            <Avatar className="mx-auto h-24 w-24 border-4 border-indigo-200 ring-4 ring-indigo-100">
              <AvatarImage src="/profile.jpg" alt="Profile" />
              <AvatarFallback className="bg-indigo-600 text-white text-2xl font-bold">RM</AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-bold text-slate-800">Rajiv Mallisetty</h2>
            <p className="text-sm text-slate-600">Chief Executive Officer</p>
            <p className="text-sm font-bold text-indigo-600 mt-1 bg-indigo-50 py-1 px-3 rounded-full inline-block">Texas, US</p>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-slate-800 text-lg border-b border-indigo-100 pb-2">Network Insights</h3>
            <div className="mt-4 space-y-4">
              {[
                {
                  count: 95,
                  label: "Potential AI-Suggested Connections on LinkedIn",
                },
                {
                  count: 80,
                  label: "Potential AI-Suggested Connections via Email",
                },
              ].map((item, index) => (
                <Card key={index} className="border border-indigo-100 bg-gradient-to-r from-white to-indigo-50 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-2xl font-bold text-indigo-700">{item.count}</p>
                      <p className="text-sm text-slate-600">{item.label}</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-indigo-600" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-lg border-b border-indigo-100 pb-2">Notifications</h3>
              <Button variant="ghost" size="icon" className="hover:bg-indigo-50 text-indigo-600 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
              </Button>
            </div>

            <div className="mt-4 space-y-3">
              {[
                {
                  title: "Your Agent Found a Content Creator",
                  time: "12:15 PM",
                },
                {
                  title: "Your Agent Found a Potential Music Marketer in Your Network",
                  time: "10:30 AM",
                },
                {
                  title: "Your Agent Found a Possible Marketer",
                  time: "9:15 AM",
                },
              ].map((notification, index) => (
                <Card
                  key={index}
                  className={`border border-indigo-100 bg-white p-4 shadow-md transition-all hover:shadow-lg hover:border-indigo-300 ${index === 0 ? 'border-l-4 border-l-indigo-600' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="mt-1 h-8 w-8 border-2 border-indigo-200">
                      <AvatarImage src={profiles?.[0]?.avatar || "/default-avatar.jpg"} alt="Notification" />
                      <AvatarFallback className="bg-indigo-600 text-white">N</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{notification.title}</p>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-sm font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        See Profile
                      </Button>
                    </div>
                    <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded-full">{notification.time}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default rightSidebar;
