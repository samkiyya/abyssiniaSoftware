import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PricingPlan {
  name: string;
  price: number;
  features: string[];
}

const plans: PricingPlan[] = [
  {
    name: "ERP System",
    price: 25,
    features: [
      "Finance and Accounting System",
      "Inventory and Warehouse Management System",
      "Human Resource Management System",
      "Customer Relationship Management (CRM) System",
      "Point of Sale (POS) System",
      "Supply Chain Management System",
    ],
  },
  {
    name: "Mall Building System",
    price: 50,
    features: [
      "Web Application",
      "Desktop Computer App",
      "Finance System",
      "Building Information System",
      "Properties Management System",
    ],
  },
  {
    name: "School Information System",
    price: 100,
    features: [
      "Separate Android App for All Users: Teachers, Accountants, Students, Administrators",
      "School Website",
      "Desktop Computer App",
      "Finance System",
      "Student Information System",
      "Student Grading System",
      "Online Learning Management System",
      "Library Management System",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="py-16 px-2 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto text-light_primary">
          <h2 className="text-3xl font-bold mb-2">SaaS Services</h2>
          <p className="text-gray-600">
            Explore our SaaS offerings designed to streamline your operations,
            boost productivity, and empower your business with innovative
            technology solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="relative flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="text-center pb-8 pt-6">
                <CardTitle className="text-2xl mb-1">
                  <div className="max-w-xs mx-auto capitalize">{plan.name}</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-light_primary flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="mt-auto p-4">
                <Button className="w-full bg-light_secondary hover:bg-light_secondary/70">
                  Order Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
