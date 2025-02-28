import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const frontendSkills = [
    "React",
    "Vue",
    "TypeScript",
    "TailwindCSS",
    "Svelte",
  ];

  const backendSkills = ["Node.js", "Python", "AWS", "MongoDB", "GraphQL"];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent text-center">
            {" "}
            About Us
          </h2>

          <div className="rounded-xl p-8 border-white/10 border">
            <p className="text-gray-300 mb-6">
              TBD
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section >
  );
};