export default function Home() {
  return (
    <>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative"
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-6xl/18 font-bold mb-6 bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent leading-right">
            Transforming Compliance
          </h1>

          <p className="tex-gray-400 text-lg mb-8 max-w-lg mx-auto">
            A a technology services company on a mission to create new wisdom in the compliance space to give organizations the tools and knowledge needed to deliver safe and effective services to their clients.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/blog/"
              className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.4)]"
            >
              View Blog
            </a>

          </div>
        </div>
      </section>
    </>
  );
};