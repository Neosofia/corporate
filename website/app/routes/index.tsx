import Button from '../components/Button';

export default function Home() {
  return (
    <>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900"
      >
        {/* Content */}
        <div className="text-center z-10 px-4 relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-900 via-red-800 to-red-900 bg-clip-text text-transparent leading-tight">
            Transforming Compliance
          </h1>
          <p className="text-slate-300 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
            A technology services company on a mission to create new wisdom in the compliance space to give organizations the tools and knowledge needed to deliver safe and effective services to their clients.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/blog" className="text-lg px-8 py-4">Blog</Button>
            <Button href="/resources" className="text-lg px-8 py-4">Resources</Button>
          </div>
        </div>
      </section>
    </>
  );
}