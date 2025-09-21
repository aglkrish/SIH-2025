"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Moon, Sunrise } from "lucide-react";

export function WelcomeMessage() {
  const { user } = useAuth();

  if (!user) return null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good Morning", icon: Sunrise, color: "text-yellow-600" };
    if (hour < 17) return { text: "Good Afternoon", icon: Sun, color: "text-orange-600" };
    return { text: "Good Evening", icon: Moon, color: "text-blue-600" };
  };

  const getFirstName = (displayName: string) => {
    return displayName.split(' ')[0] || displayName;
  };

  const greeting = getGreeting();
  const firstName = getFirstName(user.displayName);
  const IconComponent = greeting.icon;

  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-white shadow-sm`}>
              <IconComponent className={`w-6 h-6 ${greeting.color}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-900">
                {greeting.text}, {firstName}!
              </h2>
              <p className="text-emerald-700 mt-1">
                Welcome back to your wellness journey
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              {user.role === 'patient' ? 'Patient' : 'Practitioner'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
