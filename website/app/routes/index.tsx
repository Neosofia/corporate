import Button from '../components/Button';

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
            A technology services company on a mission to create new wisdom in the compliance space to give organizations the tools and knowledge needed to deliver safe and effective services to their clients.
          </p>
          <div className="flex justify-center space-x-4">
            <Button href="/blog">Blog</Button>
            <Button href="/resources">Resources</Button>
          </div>
        </div>
      </section>
    </>
  );
};