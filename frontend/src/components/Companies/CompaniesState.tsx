import { Users, BarChart2, Handshake } from "lucide-react";

const stats = [
  {
    id: 1,
    number: "254",
    title: "Satisfied Clients",
    subtitle: "Delivering exceptional service",
    icon: Users,
  },
  {
    id: 2,
    number: "87",
    title: "Completed Projects",
    subtitle: "Achieving milestones together",
    icon: BarChart2,
  },
  {
    id: 3,
    number: "26",
    title: "Partners",
    subtitle: "Building lasting collaborations",
    icon: Handshake,
  },
];

export default function CompaniesState() {
  return (
    <section className=" py-16 px-4 bg-black bg-opacity-55 text-light_primary">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-4 p-4 rounded-full bg-light_primary/10 group-hover:bg-light_primary/50 transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <h3 className="text-t_bg-light_primary font-semibold text-lg mb-1">
                  {stat.title}
                </h3>
                <p className="text-gray-50 text-sm">{stat.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
