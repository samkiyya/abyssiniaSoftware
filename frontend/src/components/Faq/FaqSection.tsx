import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaq } from "@/lib/services/faq.service";

// const faqs = [
//   {
//     id: 1,
//     question: "What is the company's policy on remote work?",
//     answer:
//       "Our company offers a hybrid model, allowing employees to work remotely a few days a week, based on project needs and team collaboration.",
//   },
//   {
//     id: 2,
//     question: "What tools and technologies does the company use?",
//     answer:
//       "We use tools like Slack for communication, Jira for project management, and GitHub for version control. Development stacks include React, Node.js, Python, and AWS.",
//   },
//   {
//     id: 3,
//     question: "How are projects assigned to teams?",
//     answer:
//       "Projects are assigned based on expertise, team capacity, and individual interests. Team leads ensure a balanced workload across the team.",
//   },
//   {
//     id: 4,
//     question: "What is the company's policy on overtime and work-life balance?",
//     answer:
//       "We strive for a healthy work-life balance. Overtime is discouraged unless absolutely necessary, and compensatory off days are offered when applicable.",
//   },
//   {
//     id: 5,
//     question: "What career development opportunities are available?",
//     answer:
//       "We offer training programs, certifications, and regular workshops. Employees can also access a mentorship program to grow professionally.",
//   },
//   {
//     id: 6,
//     question: "What is the process for reporting bugs and tracking issues?",
//     answer:
//       "All bugs and issues are reported via Jira. Developers prioritize and resolve issues in collaboration with QA and project managers.",
//   },
//   {
//     id: 7,
//     question: "How does the company handle software updates and deployments?",
//     answer:
//       "We follow CI/CD practices using tools like Jenkins and GitHub Actions. Updates are tested in staging environments before production deployment.",
//   },
//   {
//     id: 8,
//     question: "What is the company's approach to security and data privacy?",
//     answer:
//       "We follow industry-standard security practices, including encryption, secure coding, and regular audits, to ensure data privacy and protection.",
//   },
//   {
//     id: 9,
//     question: "What is the onboarding process for new employees?",
//     answer:
//       "New employees go through an onboarding program that includes team introductions, system setups, and an overview of company policies and ongoing projects.",
//   },
//   {
//     id: 10,
//     question: "How are employee feedback and suggestions handled?",
//     answer:
//       "We conduct regular surveys, one-on-one meetings, and feedback sessions. All suggestions are reviewed, and actionable ones are implemented where feasible.",
//   },
//   {
//     id: 11,
//     question: "What kind of projects does the company work on?",
//     answer:
//       "We work on a mix of client projects and in-house products, ranging from web and mobile apps to enterprise solutions and AI-driven technologies.",
//   },
//   {
//     id: 12,
//     question: "How does the company support learning and innovation?",
//     answer:
//       "We provide access to online courses, allocate innovation hours for personal projects, and host hackathons to foster creativity.",
//   },
//   {
//     id: 13,
//     question: "What are the standard working hours?",
//     answer:
//       "Our standard working hours are 9:00 AM to 6:00 PM, Monday to Friday, with flexibility depending on team and project requirements.",
//   },
//   {
//     id: 14,
//     question: "What is the company's policy on taking leaves?",
//     answer:
//       "Employees are entitled to annual, sick, and emergency leaves. All leaves must be approved in advance by the reporting manager.",
//   },
//   {
//     id: 15,
//     question: "How often are performance reviews conducted?",
//     answer:
//       "Performance reviews are conducted biannually, with feedback provided on achievements, areas for improvement, and career growth.",
//   },
// ];

export default async function FaqSection() {
  const faqs = await getFaq();
  if (!faqs || faqs.length === 0) {
    return null;
  }
  return (
    <section
      id="faq"
      className="py-16 px-4 md:px-6 lg:px-8 bg-white text-light_primary"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          FAQ About Abyssinia Software solutions
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full space-y-2 text-gray-700"
        >
          {faqs.slice(0, 5).map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gray-100 px-4 rounded-lg"
            >
              <AccordionTrigger className="text-left text-base hover:no-underline font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
