export default function Footer() {
  return (
    <footer className="absolute bottom-0 md:w-[90%] border-t border-zinc-800 bg-zinc-950 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} Chore Chuckles. All rights reserved.</p>

        <p className="text-zinc-400">Built with ❤️ by Moeen</p>
      </div>
    </footer>
  );
}
